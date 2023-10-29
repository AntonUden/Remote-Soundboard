import { Application } from "express";
import * as fs from 'fs';
import Sound from "../Sound";
import UUID from "../utils/UUID";
import SoundPlayer from "./SoundPlayer";

export default class SoundboardServer {
	private _app: Application;
	private _sounds: Sound[];

	constructor(app: Application) {
		console.log("Starting server");
		this._app = app;
		this._sounds = [];

		if (!fs.existsSync("./sounds/")) {
			fs.mkdirSync("./sounds");
		}

		for(const fileName of fs.readdirSync("./sounds/")) {
			console.log(fileName);
			this._sounds.push({
				name: fileName,
				id: UUID.v4()
			});
		}

		this._app.post('/api/sounds/play/:sound_id', (req, res) => {
			try {
			const id = req.params.sound_id;

			const sound = this._sounds.find(s => s.id == id);

			if(sound == null) {
				res.status(404).json({});
			} else {
				console.log("Playing " + sound.name);
				SoundPlayer.playSound("./sounds/" + sound.name);
				res.json({});
			}
		} catch(err) {
			console.error("An error occured");
			console.error(err);
		}
		});

		this._app.get('/api/sounds', (_, res) => {
			res.json(this._sounds);
		});
	}
}