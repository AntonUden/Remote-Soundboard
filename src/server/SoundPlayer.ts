import { spawn } from 'child_process';

export default class SoundPlayer {
	static async playSound(audioFile: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const ffplay = spawn('ffplay', [audioFile, "-autoexit", "-nodisp"]);

			ffplay.on('close', (code) => {
				if (code === 0) {
					resolve();
				} else {
					reject(new Error(`ffplay process exited with code ${code}`));
				}
			});

			ffplay.on('error', (err) => {
				reject(err);
			});
		});
	}
}