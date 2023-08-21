const COVER_IMAGES = [
	'**/concerts_20120724215543.jpg',
	'**/tlou_20200124225047.jpg',
	'**/ac-origins_20200607204931.jpg',
	'**/tlou2_20200623211955.jpg',
	'**/hzd_20210625230628.jpg',
	'**/ac-valhalla_20210101000058.jpg',
	'**/dsdc_20211001203219.jpg',
	'**/hfw_20220219210113.jpg',
	'**/hss_20220731005256.jpg',
	'**/tlou1_20221008221710.jpg',
	'**/apt-innocence_20221128214433.jpg',
	'**/swjfo_20230206214206.jpg',
]

/** @type {import('@tidaltheory/lens').LensConfig} */
const config = {
	store: 'content/imagemeta.json',
	useFilenameDirectory: true,
	thumbnails: [
		{ 'cover-sm': { files: COVER_IMAGES, width: 300, height: 250 } },
		{ 'cover-md': { files: COVER_IMAGES, width: 600, height: 500 } },
		{ 'cover-lg': { files: COVER_IMAGES, width: 1200, height: 1000 } },
		{ 'gallery-sm': { files: 'static/media/**/*.jpg', width: 300 } },
		{ 'gallery-md': { files: 'static/media/**/*.jpg', width: 600 } },
		{ 'gallery-lg': { files: 'static/media/**/*.jpg', width: 1200 } },
	],
}

export default config