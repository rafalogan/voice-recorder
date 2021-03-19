export default class Recorder {

	constructor() {
		this.audioType = 'audio/webm;codecs=ops';
		this.mediaRecorder = {};

		this.recorderBlobs = [];
	}

	_setup() {
		const options = { minType: this.audioType};
		const isSupported = MediaRecorder.isTypeSupported(options);

		if (!isSupported) {
			const message = `The codec: ${options.minType} isn't supported!!`;

			alert(message);
			throw new Error(message);
		}

		return options;
	}

	startRecording(stream) {
		const options = this._setup();
		this.mediaRecorder = new MediaRecorder(stream, options);

		this.mediaRecorder.ondataavailable = (event) => {
			if (!event.data || !event.data.size) return;

			this.recorderBlobs.push(event.data);
		}

		this.mediaRecorder.start();
	}
}
