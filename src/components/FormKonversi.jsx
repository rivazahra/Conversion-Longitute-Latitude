import { useState } from "react";
import { transformDmsToDd, transformDdToDms } from "../logicConvert";



const FormKonversi = ({ onAddMarker }) => {
	const [conversionType, setConversionType] = useState("DMS to DD");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const [output, setOutput] = useState({ lat: "", lon: "" });

	const handleConvert = () => {
		if (latitude && longitude) {
			const latConverter = conversionType === "DMS to DD" ? transformDmsToDd : parseFloat;
			const lonConverter = conversionType === "DMS to DD" ? transformDmsToDd : parseFloat;

			const latValue = latConverter(latitude);
			const lonValue = lonConverter(longitude);

			setOutput({ lat: `${latValue}°`, lon: `${lonValue}°` });
		}
	};

	const handleMap = () => {
		if (output) {
			onAddMarker(parseFloat(output.lat), parseFloat(output.lon));
		}
	};

	return (
		<div className="absolute top-0 mx-8 my-24  bg-white p-6 rounded-lg shadow-lg border border-gray-500">
			<h2 className="text-lg font-semibold mb-4 text-amber-700">Tambah titik Poin ke Map</h2>
			<div className="flex space-x-4 mb-4">
				<button
					onClick={() => setConversionType("DMS to DD")}
					className={`px-4 py-2 rounded w-full h-12 ${conversionType === "DMS to DD" ? "bg-amber-800 text-white" : "bg-amber-600 text-white"}`}
				>
					DMS to DD
				</button>
				<button
					onClick={() => setConversionType("DD to DMS")}
					className={`px-4 py-2 rounded w-full h-12 ${conversionType === "DD to DMS" ? "bg-amber-800 text-white" : "bg-amber-600 text-white"}`}
				>
					DD to DMS
				</button>
			</div>
			<div className="flex flex-col mb-4">
	<label htmlFor="latitude" className="mb-2 text-gray-800">
		Latitude 
		
	</label>
	<input
		type="text"
		id="latitude"
		value={latitude}
		onChange={(e) => setLatitude(e.target.value)}
		placeholder={conversionType === "DMS to DD" ? "e.g. 90 23 52 N" : "e.g. 90.221"}
		className="border border-gray-400 rounded p-2 w-full h-10"
	/>
</div>
<div className="flex flex-col mb-4">
	<label htmlFor="longitude" className="mb-2 text-gray-800">
		Longitude 
		
	</label>
	<input
		type="text"
		id="longitude"
		value={longitude}
		onChange={(e) => setLongitude(e.target.value)}
		placeholder={conversionType === "DMS to DD" ? "e.g. 54 78 96 W" : "e.g. -84.221"}
		className="border border-gray-400 rounded p-2 w-full h-12"
	/>
</div>
<button onClick={handleConvert} className="bg-amber-900 text-white px-4 py-2 rounded mb-4 w-full h-12">
	Konversi
</button>
<div className="flex flex-col mb-4">
	<label htmlFor="outputLat" className="mb-2 text-gray-800">
		Latitude:
	</label>
	<input
		type="text"
		id="outputLat"
		value={output.lat}
		readOnly
		className="border border-gray-400 rounded p-2 w-full h-12"
	/>
</div>
<div className="flex flex-col mb-4">
	<label htmlFor="outputLon" className="mb-2 text-gray-800">
		Longitude:
	</label>
	<input
		type="text"
		id="outputLon"
		value={output.lon}
		readOnly
		className="border border-gray-400 rounded p-2 w-full h-12"
	/>
</div>
<button onClick={handleMap} className="bg-amber-600 text-white px-4 py-2 rounded w-full h-12">
	Tambahkan ke map
</button>

		</div>
	);
};

export default FormKonversi;
