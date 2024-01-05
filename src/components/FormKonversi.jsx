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
    <div className="absolute  top-0 ml-96 w-1/3 mt-3  bg-white p-2 rounded-lg shadow-lg border border-gray-500">
      <h2 className="text-lg font-semibold mb-4 text-amber-300 ">
	  <hr
      className={`transition-transform transform border-b-2 border-amber-300 ${
        conversionType === "DMS to DD" ? "translate-x-0" : "translate-x-full"
      } absolute bottom-0 left-0 w-full`}
    />
  </h2>
      <div className="flex space-x-4 mb-4 bg-amber-700">
        <button onClick={() => setConversionType("DMS to DD")} className={`px-4 py-2 rounded w-full h-12 ${conversionType === "DMS to DD" ? "bg-amber-800 text-white" : " text-white"}`}>
          DMS to DD
        </button>
        <button onClick={() => setConversionType("DD to DMS")} className={`px-4 py-2 rounded w-full h-12 ${conversionType === "DD to DMS" ? "bg-amber-800 text-white" : " text-white"}`}>
          DD to DMS
        </button>
      </div>
	  <div className="flex gap-2">

      <div className="flex flex-col mb-4">
        <label htmlFor="latitude" className="mb-2 text-gray-800">
          Latitude
        </label>
        <input type="text" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} className="border border-gray-400 rounded p-2  w-full " />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="longitude" className="mb-2 text-gray-800">
          Longitude
        </label>
        <input type="text" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} className="border border-gray-400 rounded p-2  w-full " />
      </div>
	  </div>
      <button onClick={handleConvert} className="bg-amber-900 text-white px-4 py-2 rounded mb-4 w-full ">
        Konversi
      </button>
	  
	  <div className="flex gap-2">

      <div className="flex flex-col mb-4">
        <label htmlFor="outputLat" className="mb-2 text-gray-800">
          Latitude:
        </label>
        <input type="text" id="outputLat" value={output.lat} readOnly className="border border-gray-400 rounded p-2 w-full " />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="outputLon" className="mb-2 text-gray-800">
          Longitude:
        </label>
        <input type="text" id="outputLon" value={output.lon} readOnly className="border border-gray-400 rounded p-2 w-full" />
	  </div>
      </div>
      <button onClick={handleMap} className="bg-amber-600 text-white px-4 py-2 rounded w-full h-12">
        Tambahkan ke map
      </button>
    </div>
  );
};

export default FormKonversi;
