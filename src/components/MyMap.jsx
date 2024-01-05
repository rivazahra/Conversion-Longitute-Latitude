import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Select from 'ol/interaction/Select';
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import { toStringHDMS } from "ol/coordinate.js";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import Overlay from "ol/Overlay.js";
import { toLonLat } from "ol/proj";

const MyMap = ({ onAddMarker, titikTarget }) => {
	const mapRef = useRef(null);
	const [vectorLayerSource] = useState(new VectorSource());
  
	useEffect(() => {
	  if (!mapRef.current) {
		mapRef.current = new Map({
		  layers: [
			new TileLayer({
			  source: new OSM(),
			}),
			new VectorLayer({
			  source: vectorLayerSource,
			}),
		  ],
		  target: 'map',
		  view: new View({
			center: [0, 0],
			zoom: 2,
		  }),
		});
		const selectInteraction = new Select();
mapRef.current.addInteraction(selectInteraction);

selectInteraction.on('select', (event) => {
	// ... kode untuk mengubah gaya icon ...
	const lonLat = toLonLat(event.coordinate);
	onAddMarker(lonLat[1], lonLat[0]);
  });
		mapRef.current.on("click", function (event) {
			const lonLat = toLonLat(event.coordinate);
			onAddMarker(lonLat[1], lonLat[0]);
		});
	}

	if (titikTarget) {
		const [long, lat] = titikTarget;
		const view = mapRef.current.getView();
		view.animate({
		  center: fromLonLat([long, lat]),
		  duration: 1000,
		  zoom: 7,
		});
  
		const pointFeature = new Feature({
		  geometry: new Point(fromLonLat([long, lat])),
		});
		pointFeature.setStyle(
			new Style({
				image: new Icon({
					color: 'rgba(0, 255, 0, 0.7)', // Ubah warna icon saat dipilih
					crossOrigin: 'anonymous',
					src: 'https://openlayers.org/en/latest/examples/data/bigdot.png',
					scale: 0.2,
				}),
		  })
		);
		vectorLayerSource.addFeature(pointFeature);
	  }
		mapRef.current.on('click', function (evt) {
		  const coordinate = evt.coordinate;
		  const hdms = toStringHDMS(toLonLat(coordinate));
		  const popup = new Overlay({
			      element: document.getElementById("popup"),
			    });
			    mapRef.current.addOverlay(popup);
		  // Assuming you have a 'popup' and 'element' defined somewhere in your code
		  const element = popup.getElement();
		  popup.setPosition(coordinate);
		  let popover = bootstrap.Popover.getInstance(element);
		  if (popover) {
			popover.dispose();
		  }
		  popover = new bootstrap.Popover(element, {
			animation: false,
			container: element,
			content: "<p>The location you clicked was:</p><code>" + hdms + '</code>',
			html: true,
			
			placement: 'top',
			title: 'Welcome to OpenLayers',
		  });
		  popover.show();
		});
	}, [onAddMarker, titikTarget, vectorLayerSource]);
  
	return (
	  <div>
		<div id="map" className="h-screen border-2 bg-gray-500"></div>
	  </div>
	);
  };
  
  export default MyMap;


