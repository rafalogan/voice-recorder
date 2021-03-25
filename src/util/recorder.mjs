export default class Recorder {

	constructor() {
		this.audioType = 'audio/webm;codecs=opus';
		this.mediaRecorder = {};

		this.recorderBlobs = [];
	}

	_setup() {
		const options = { mimeType: this.audioType };
		const isSupported = MediaRecorder.isTypeSupported(options.mimeType);

		if (!isSupported) {
			const message = `The codec: ${options.mimeType} isn't supported!!`;

			alert(message);
			throw new Error(message);
		}

		return options;
	}

	startRecording(stream) {
		const options = this._setup();
		this.mediaRecorder = new MediaRecorder(stream, options);

		this.mediaRecorder.onstop = (event) => console.log('Recorded Blobs', this.recorderBlobs)


		this.mediaRecorder.ondataavailable = (event) => {
			if (!event.data || !event.data.size) return;

			this.recorderBlobs.push(event.data);
		}

		this.mediaRecorder.start();
		console.log('Media Recorded started', this.mediaRecorder)
	}

	async stopRecording() {
		if (this.mediaRecorder.state === 'inactive') return;

		this.mediaRecorder.stop();
		console.log('Media recorded stopped!')
	}
}
