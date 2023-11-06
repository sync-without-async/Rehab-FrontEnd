const URL = import.meta.env.VITE_SIGNALING_SERVICE_URL;

export default class RTCSignalingClient extends EventTarget {
    /** @type {WebSocket} */
    instance = null;

    get readyState() {
        if (this.instance === null) {
            return false;
        } else {
            return this.instance.readyState === 1;
        }
    }

    constructor() {
        super();
    }

    log(...arg) {
        console.log("[RTCWebSocket]", ...arg);
    }

    logError(...arg) {
        console.error("[RTCWebSocket]", ...arg);
    }

    connect(id) {
        return new Promise((resolve, reject) => {
            this.instance = new WebSocket(URL + id);

            this.instance.addEventListener("open", () => {
                this.log("접속 완료.");
                resolve();
            });

            this.instance.addEventListener("error", (event) => {
                this.logError("에러:", event);
                reject(event);
            });

            // 메세지를 받으면, type으로 RTCWebSocket 이벤트 Emit
            this.instance.addEventListener("message", ({ data }) => {
                const message = JSON.parse(data);
                this.dispatchEvent(
                    new CustomEvent(message.type, { detail: message.payload }),
                );
            });
        });
    }

    disconnect() {
        this.instance.close();
        this.instance = null;
    }

    send(type, payload) {
        const message = JSON.stringify({
            type,
            payload,
        });

        this.instance.send(message);
    }

    addEventListener(type, listener) {
        const socketEvents = ["open", "close", "message", "error"];
        if (socketEvents.includes(type)) {
            this.instance.addEventListener(type, listener); // WebSocket 이벤트 등록
        } else {
            super.addEventListener(type, listener); // RTCWebSocket 이벤트 등록
        }
    }
}
