import RTCSignalingClient from "./rtc-signaling.js";
import { registerEvents } from "./util.js";

const CONFIG = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export class RTCClient extends EventTarget {
  id = null;
  role = null;

  /** @type {RTCSignalingClient} */
  signaling = null;

  /** @type {RTCPeerConnection} */
  peer = null;

  /** @type {RTCDataChannel} */
  dataChannel = null;

  /** @type {MediaStream} */
  clientStream = null;

  /** @type {MediaStream} */
  remoteStream = null;

  state = false;

  get readyState() {
    return this.peer.connectionState;
  }

  constructor() {
    super();

    const signalingEvents = {
      offer: this._onOffer,
      answer: this._onAnswer,
      candidate: this._onCandidate,
      disconnect: this._onDisconnect,
    };

    this.signaling = new RTCSignalingClient();
    registerEvents(this.signaling, signalingEvents, this);

    this.setRTCPeer();
  }

  async connect(id, role, stream) {
    if (this.state || this.signaling.readyState) {
      return;
    }
    this.id = id;
    this.role = role;
    this.setClientStream(stream);
    await this.signaling.connect(this.id);
    await this.call();
  }

  disconnect() {
    if (this.state === false) {
      return;
    }

    if (this.dataChannel) {
      this.dataChannel.close();
      this.dataChannel = null;
    }

    this.peer.close();
    this.signaling.send("disconnect", {});
    this.signaling.disconnect();

    this.clientStream.getTracks().forEach((track) => track.stop());

    this.clientStream = null;
    this.remoteStream = null;

    this.state = false;

    this.dispatchEvent(new CustomEvent("disconnect"));
  }

  async call() {
    if (!this.signaling.readyState) {
      return;
    }

    this.log("Data channel을 만듭니다.");
    this.setDataChannel(this.peer.createDataChannel("default"));

    this.log("Offer를 보냅니다.");
    const offer = await this.peer.createOffer();
    await this.peer.setLocalDescription(offer);

    this.signaling.send("offer", offer);
  }

  async answer() {
    if (!this.signaling.readyState) {
      return;
    }

    this.log("Answer를 보냅니다.");

    const answer = await this.peer.createAnswer();
    await this.peer.setLocalDescription(answer);

    this.signaling.send("answer", answer);
  }

  sendMessage(message) {
    if (this.dataChannel && this.dataChannel.readyState === "open") {
      this.dataChannel.send(message);
    } else {
      throw new Error("[RTCClient] 아직 연결이 열리지 않았습니다.");
    }
  }

  setRTCPeer() {
    const peerEvents = {
      connectionstatechange: this._onConnectionStateChange,
      icecandidate: this._onIceCandidate,
      datachannel: this._onDataChannel,
      track: this._onTrack,
    };

    this.peer = new RTCPeerConnection(CONFIG);
    registerEvents(this.peer, peerEvents, this);
  }

  async setRemoteDescription(payload) {
    const remoteDescription = new RTCSessionDescription(payload);
    await this.peer.setRemoteDescription(remoteDescription);
  }

  setDataChannel(channel) {
    this.dataChannel = channel;
    this.dataChannel.addEventListener("open", (event) => {
      this.log("data open", event);
    });
    this.dataChannel.addEventListener("message", (event) => {
      this.log("data message", event);
    });
  }

  setClientStream(stream) {
    this.clientStream = stream;
    this.clientStream.getTracks().forEach((track) => {
      this.peer.addTrack(track, this.clientStream);
    });
  }

  // Peer Events
  _onIceCandidate(event) {
    const candidate = event.candidate;
    if (candidate) {
      this.log("Candidate 정보를 전달합니다.");
      this.signaling.send("candidate", candidate);
    }
  }

  _onConnectionStateChange(event) {
    this.log("연결 상태가 변경되었습니다:", this.peer.connectionState);
    if (["disconnected", "failed"].includes(this.peer.connectionState)) {
      this.disconnect();
    } else if (this.peer.connectionState === "connected") {
      this.dispatchEvent(new CustomEvent("open"));
    }
  }

  _onDataChannel(event) {
    if (event.channel) {
      this.log("Channel 데이터를 받았습니다:", event.channel);
      this.setDataChannel(event.channel);
      this.dispatchEvent(new CustomEvent("channelopen"));
    }
  }

  _onTrack(event) {
    if (event.streams) {
      this.log("MediaStream을 받았습니다:", event.streams);
      this.remoteStream = event.streams[0];
      this.dispatchEvent(
        new CustomEvent("stream", { detail: this.remoteStream }),
      );
    }
  }

  // Data Channel Events
  _onChannelOpen(event) {}
  _onChannelMessage(event) {}

  // Signaling Events
  async _onOffer({ detail: payload }) {
    this.log("Offer 정보를 받았습니다.");
    // Remote Description 지정
    await this.setRemoteDescription(payload);
    await this.answer();
  }

  async _onAnswer({ detail: payload }) {
    this.log("Answer 정보를 받았습니다.");
    // Remote Description 지정
    await this.setRemoteDescription(payload);
  }

  async _onCandidate({ detail: payload }) {
    this.log("Candidate 정보를 받았습니다.", event);
    try {
      const candidate = new RTCIceCandidate(payload);
      await this.peer.addIceCandidate(candidate);
    } catch (e) {
      this.logError("ice candidate를 받는데 실패했습니다.", e);
    }
  }

  _onDisconnect({ detail: payload }) {
    this.log("상대가 연결을 종료했습니다.");
    this.disconnect();
  }

  log(...arg) {
    console.log("[RTCClient]", ...arg);
  }

  logError(...arg) {
    console.error("[RTCClient]", ...arg);
  }
}
