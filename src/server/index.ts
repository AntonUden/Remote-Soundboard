import express from 'express';
import SoundboardServer from './SoundboardServer';

export const app = express();

new SoundboardServer(app);