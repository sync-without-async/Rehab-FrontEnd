export function registerEvents(eventTarget, eventList, thisArg = this) {
    Object.entries(eventList).forEach(([event, listener]) => {
        eventTarget.addEventListener(event, listener.bind(thisArg));
    });
}

function blobToArrayBuffer(blob) {
    return new Promise((resolve) => {
        const fileReader = new FileReader();

        fileReader.onload = function () {
            resolve(fileReader.result);
        };

        fileReader.readAsArrayBuffer(blob);
    });
}

export async function getSampleRate(blob) {
    const audioContext = new AudioContext();
    const arrayBuffer = await blobToArrayBuffer(blob);
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    return audioBuffer.sampleRate;
}
