import { getSampleRate } from "./util.js";

export class AudioRecorder extends EventTarget {
  /** @type {MediaRecorder} */
  instance = null;

  /** @type {Blob[]} */
  chunks = null;

  start(stream) {
    if (this.instance) {
      this.instance.stop();
      this.instance = null;
    }

    this.instance = new MediaRecorder(stream, {
      mimeType: "audio/webm",
    });

    this.chunks = [];

    this.instance.addEventListener("dataavailable", async (event) => {
      this.dispatchEvent(new CustomEvent("data", { detail: event.data }));

      if (event.data.size === 0) {
        return;
      }

      this.chunks.push(event.data);

      if (this.instance.state == "inactive") {
        const blob = new Blob(this.chunks, {
          type: "audio/webm",
        });

        const sampleRate = await getSampleRate(blob);
        this.dispatchEvent(
          new CustomEvent("complete", {
            detail: {
              data: blob,
              sampleRate,
            },
          }),
        );
      }
    });

    this.instance.start(3000);
  }

  stop() {
    if (!this.instance || this.instance.state != "recording") {
      return;
    }

    this.instance.stop();
    this.instance.stream.getTracks().forEach((track) => track.stop());
  }
}
