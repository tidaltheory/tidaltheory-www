const COVER_IMAGES = [
	'**/tlou2_20200623211955.jpg'
]

export default {
	store: 'content/imagemeta.json',
	thumbnails: [
		{ 'cover-sm': { files: COVER_IMAGES, width: 300, height: 250 } },
		{ 'cover-md': { files: COVER_IMAGES, width: 600, height: 500 } },
		{ 'cover-lg': { files: COVER_IMAGES, width: 1200, height: 1000 } },
		{ 'gallery-sm': { files: 'static/images/**/*.jpg', width: 300 } },
		{ 'gallery-md': { files: 'static/images/**/*.jpg', width: 600 } },
		{ 'gallery-lg': { files: 'static/images/**/*.jpg', width: 1200 } },
	],
}
