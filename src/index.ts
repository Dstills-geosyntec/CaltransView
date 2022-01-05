import './config';
import './css/main.css';

import EsriMap from '@arcgis/core/Map';
import Ground from '@arcgis/core/Ground';
import SceneView from '@arcgis/core/views/SceneView';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import Popup from '@arcgis/core/widgets/Popup';
import FeatureTable from '@arcgis/core/widgets/FeatureTable';
import WFSLayer from '@arcgis/core/layers/WFSLayer';
import ElevationLayer from '@arcgis/core/layers/ElevationLayer';
import LayerList from "@arcgis/core/widgets/LayerList";
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';
import Extent from '@arcgis/core/geometry/Extent';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import Editor from '@arcgis/core/widgets/Editor';
import Expand from '@arcgis/core/widgets/Expand';

const ground = new Ground({
	navigationConstraint: "none",
	layers: [
		new ElevationLayer({ url: 'http://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer' })]
});

const myMap = new EsriMap({
	basemap: 'topo-vector',
	ground
});

const spatialReference = new SpatialReference({ wkid: 4326 });

const extent = new Extent({
	spatialReference,
	xmax: -121.1139,
	xmin: -121.3929,
	ymax: 38.6646,
	ymin: 38.5278
});



const locations = new WFSLayer({
	url: 'http://localhost:8080/geoserver/wfs',
	name: 'locations',
	renderer: new SimpleRenderer({
		symbol: new SimpleMarkerSymbol({
			size: 4,
			color: 'black',
			outline: {
				width: 0,
				color: 'white'
			}
		})
	}),
	popupTemplate: new PopupTemplate({
		title: "{type} {__esri_wfs_id__}", // Activate "Expose Primary Keys" on geoserver layer. Should give access to [name] field
		content: [{
			type: "fields",
			fieldInfos: [{
				fieldName: "status",
				label: "Current Status"
			}]
		}]
	})
});
const locationInfos = {
	layer: locations,
	fieldConfig: [{
		name: 'type',
		label: 'Category'
	}, {
		name: 'status',
		label: 'Current Status'
	}]
};

const site_boundary = new WFSLayer({
	url: 'http://localhost:8080/geoserver/wfs',
	name: 'boundaries',
	definitionExpression: "type = 'site boundary'",
	renderer: new SimpleRenderer({
		symbol: new SimpleFillSymbol({
			color: new Color([0,0,0,0]),
			outline: {
				width: 3,
				color: 'black'
			}
		})
	})
});

// const hydrology = new WFSLayer({
// 	url: 'http://localhost:8080/geoserver/wfs',
// 	name: 'hydrology',
// 	definitionExpression: "zone = 'LAYERC' AND event = '202110 Plantwide DTW event'",
// 	renderer: new SimpleRenderer({
// 		symbol: new SimpleMarkerSymbol({
// 			size: 4,
// 			color: 'blue',
// 			outline: {
// 				width: 0,
// 				color: 'white'
// 			}
// 		})
// 	})
// });

// const groundwater = new WFSLayer({
// 	url: 'http://localhost:8080/geoserver/wfs',
// 	name: 'groundwater',
// 	definitionExpression: "zone = 'LAYERC' AND day > date '2018-11-01 00:00:00' AND cas = '14797-73-0'",
// 	renderer: new SimpleRenderer({
// 		symbol: new SimpleMarkerSymbol({
// 			size: 4,
// 			color: 'green',
// 			outline: {
// 				width: 0,
// 				color: 'white'
// 			}
// 		})
// 	})
// });

myMap.addMany([site_boundary, locations/*, hydrology, groundwater*/]);

const view = new SceneView({
	map: myMap,
	container: "viewDiv",
	viewingMode: 'local',
	clippingArea: extent,
	extent,
	environment: {
		atmosphere: null,
		starsEnabled: false
	}
});

const layerList = new LayerList({ view });
// const slider = new TimeSlider({
// 	fullTimeExtent: { start: new Date('1/1/1992'), end: new Date('4/30/2021')}
// });

// const editor = new Editor({
// 	view,
// 	layerInfos: [{
// 		layer: locations
// 	}]
// });

view.ui.add(layerList, { position: 'bottom-right' });
// view.ui.add(editor, { position: 'top-right' });
// view.ui.add(slider, 'bottom-left');
