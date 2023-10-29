import './App.css'
import toast, { Toaster } from 'react-hot-toast'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import Sound from './Sound';
import SoundCard from './components/SoundCard';
import axios from 'axios';

function App() {
	const [sounds, setSounds] = useState<Sound[]>([]);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		fetchSounds();
	}, []);

	async function fetchSounds() {
		try {
			const result = await axios.get("/api/sounds");
			setSounds(result.data as Sound[]);
			console.log("Sounds fetched");
		} catch (err) {
			toast.error("Failed to fetch sound list");
			console.error("Failed to fetch sound list");
			console.error(err);
			setError(true);
		}
	}

	return (
		<>
			<Container className='mt-4'>
				{error &&
					<Row>
						<Col>
							<h1>Failed to fetch sounds</h1>
							Please reload the page
						</Col>
					</Row>
				}

				<Row>
					{sounds.map(s => <SoundCard sound={s} key={s.id} />)}
				</Row>
			</Container>
			<Toaster />
		</>
	)
}

export default App
