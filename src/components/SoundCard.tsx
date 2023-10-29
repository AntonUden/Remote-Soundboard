import React from 'react'
import { Button, Card, CardBody, CardTitle, Col } from 'react-bootstrap'
import Sound from '../Sound'
import toast from 'react-hot-toast';
import axios from 'axios';

interface Props {
	sound: Sound;
}

export default function SoundCard({ sound }: Props) {
	async function play() {
		try {
			await axios.post("/api/sounds/play/" + sound.id);
			toast.success("Sound played");
		} catch(err) {
			toast.error("Failed to play sound. Try reloading");
			console.error("Failed to play sound");
			console.error(err);
		}
	}

	return (
		<Col md={4} sm={6} xs={12} className='mx-1 my-1'>
			<Card>
				<CardBody>
					<CardTitle>{sound.name}</CardTitle>
					<Button variant="primary" onClick={play}>Play</Button>
				</CardBody>
			</Card>
		</Col>
	)
}
