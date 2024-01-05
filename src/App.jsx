import Form from "./components/FormKonversi";
import { useState } from "react";
import MyMap from "./components/MyMap";

const App = () => {
	const [displayAddPointForm, setDisplayAddPointForm] = useState(false);
	const [marker, setMarkers] = useState([]);
	const [selectedMarker, setSelectedMarker] = useState(null);

	const tambahMarker = (lat, long) => {
		setMarkers([...marker, { lat, long }]);
		setSelectedMarker([long, lat]);
	};

	return (
		<>
			<MyMap onAddMarker={tambahMarker} selectedMarker={selectedMarker} />
			{displayAddPointForm && <Form onAddMarker={tambahMarker} />}
			<button
				onClick={() => setDisplayAddPointForm(!displayAddPointForm)}
				className=" absolute bottom-0 left-0 m-4 p-2 text-white rounded bg-amber-700"
			>
				{displayAddPointForm ? "X" : "Tambah Marker"}
			</button>
		</>
	);
};

export default App;
