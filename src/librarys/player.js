import { modifyMetrics } from "./api/program.js";
import { getMetrics } from "./api/ai.js";
import { sleep } from "./util.js";

class Player {
  static #instance = null;

  videoStream = null;
  guideDuration = null;
  name = null;
  id = null;
  videoId = null;
  status = 0;

  startDate = null;

  onError = (e) => {
    console.error(e);
  };

  onComplete = (time, percentage) => {};

  // reducer dispatch
  dispatch = (value) => {};

  constructor() {}

  static getInstance() {
    if (!Player.#instance) {
      Player.#instance = new Player();
    }

    return Player.#instance;
  }

  clearInstance() {
    if (Player.#instance) {
      Player.#instance.videoStream = null;
      Player.#instance.guideDuration = null;
      Player.#instance.name = null;
      Player.#instance.id = null;
      Player.#instance.videoId = null;
      Player.#instance.status = 0;
      Player.#instance.startDate = null;
      Player.#instance.onError = (e) => {
        console.error(e);
      };
      Player.#instance.onComplete = (time, percentage) => {};
      Player.#instance.dispatch = (value) => {};
    }
  }

  setSubtitle(value) {
    this.dispatch({ type: "setSubtitle", payload: value });
  }

  setPlayButton(value) {
    this.dispatch({ type: "setPlayButton", payload: value });
  }

  setGuideButton(value) {
    this.dispatch({ type: "setGuideButton", payload: value });
  }

  async getVideoStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          frameRate: {
            min: 30,
            ideal: 30,
            max: 31,
          },
        },
        audio: false,
      });

      this.videoStream = stream;

      this.dispatch({ type: "setCameraStatus", payload: true });

      return stream;
    } catch (e) {
      this.dispatch({ type: "setCameraStatus", payload: false });
      if (e.message === "Permission denied") {
        this.onError({
          title: "권한 거부됨",
          message:
            "카메라 권한을 거부하셨습니다.\n브라우저 설정에서 권한을 재설정해주세요.",
          isErrorModal: true,
        });
      }
    }
  }

  async playCountdown() {
    for (let i = 5; i > 0; i--) {
      this.dispatch({ type: "setCountdown", payload: i });
      await sleep(1000);
    }
    this.dispatch({ type: "setCountdown", payload: null });
  }

  async start() {
    this.dispatch({ type: "hideBox" });
    this.startDate = new Date();
    this.setPlayButton(false);
    this.setSubtitle(
      `지금부터 '${this.name}' 운동을 해보겠습니다.\n좌측 상단의 가이드 영상을 잘 봐주세요.`,
    );

    await this.playCountdown();

    this.playGuide();
  }

  playGuide() {
    this.setPlayButton(false);
    this.setGuideButton(false);
    this.dispatch({ type: "playGuide" });
  }

  onPlayClick() {
    if (this.status === 0) {
      this.start();
    } else if (this.status === 1) {
      this.analyze();
    }
  }

  onGuideComplete() {
    if (this.status === 0) {
      this.status = 1;
      this.setSubtitle(
        "가이드 영상을 다시 보려면 다시보기 버튼을 누르고,\n치료를 시작하려면 시작하기 버튼을 누르세요.",
      );

      this.setPlayButton(true);
      this.setGuideButton(true);
    } else if (this.status === 1) {
      this.setPlayButton(true);
      this.setGuideButton(true);
    } else if (this.status === 2) {
      this.setSubtitle(
        "프로그램을 완료하셨습니다.\n운동 종료하기 버튼을 눌러주세요.",
      );
    }
  }

  async analyze() {
    this.setPlayButton(false);
    this.setGuideButton(false);
    this.status = 2;
    this.setSubtitle(
      "지금부터 재활 치료를 시작하겠습니다.\n가이드 영상을 잘 보고 따라해보세요.",
    );

    await this.playCountdown();

    this.playGuide();
    this.record();
  }

  async record() {
    const recorder = new MediaRecorder(this.videoStream, {
      mimeType: "video/webm;codecs=h264",
    });

    recorder.ondataavailable = (event) => {
      if (recorder.state === "recording") {
        this.onRecordComplete(event.data);
      }
    };

    recorder.start(this.guideDuration * 1000);

    setTimeout(() => recorder.stop(), this.guideDuration * 1000 + 300); // 여유있게 300ms 추가
  }

  async onRecordComplete(data) {
    const formData = new FormData();
    formData.append("vno", this.id);
    formData.append("video_file", data);

    let response;

    const time = Math.round((new Date() - this.startDate) / 1000);
    this.onComplete(null, null);

    try {
      // await sleep(1200);
      response = await getMetrics(formData);
      // console.log(response);
    } catch (e) {
      console.log(e);
    }

    const score = response ? response.metrics : 0.01;
    // const score = (Math.floor(Math.random() * 200) + 700) / 1000;

    this.onComplete(time, score);
  }
}

export default Player.getInstance();
