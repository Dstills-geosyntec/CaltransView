import esriConfig from '@arcgis/core/config';

const DEFAULT_WORKER_URL = 'https://js.arcgis.com/4.20/';
const DEFAULT_LOADER_URL = `${DEFAULT_WORKER_URL}dojo/dojo-lite.js`;

esriConfig.apiKey = 'AAPK71fe2720593e4453ae7cd4616b3eca1bu5pGHLM-F6VlGXaEkFqSs9ITzpea9uWzRreIOi1H5kaH_ieeQp1b7vDgcjAkXs4Q';
esriConfig.assetsPath = './assets';
esriConfig.workers.loaderUrl = DEFAULT_LOADER_URL;
esriConfig.workers.loaderConfig = {
	baseUrl: `${DEFAULT_WORKER_URL}dojo`,
	packages: [
		{ name: 'esri', location: `${DEFAULT_WORKER_URL}esri` },
		{ name: 'dojo', location: `${DEFAULT_WORKER_URL}dojo` },
		{ name: 'moment', location: `${DEFAULT_WORKER_URL}moment` },
		{ name: '@dojo', location: `${DEFAULT_WORKER_URL}@dojo` },
		{ name: 'cldrjs', location: `${DEFAULT_WORKER_URL}cldrjs`, main: 'dist/cldr' },
		{ name: 'globalize', location: `${DEFAULT_WORKER_URL}globalize`, main: 'dist/globalize' },
		{ name: 'maquette', location: `${DEFAULT_WORKER_URL}maquette`, main: 'dist/maquette.umd' },
		{ name: 'maquette-css-transitions', location: `${DEFAULT_WORKER_URL}maquette-css-transitions`, main: 'dist/maquette-css-transitions.umd' },
		{ name: 'maquette-jsx', location: `${DEFAULT_WORKER_URL}maquette-jsx`, main: 'dist/maquette-jsx.umd' },
		{ name: 'tslib', location: `${DEFAULT_WORKER_URL}tslib`, main: 'tslib' }
	]
};