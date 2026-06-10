import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
	api: {
		projectId: 'iic1csde',
		dataset: 'production',
	},
	deployment: {
		appId: 'add988acb972ac048169f9c1',
	},
	typegen: {
		path: '../www/src/lib/sanity/*.js',
		schema: 'schema.json',
		generates: '../www/src/lib/sanity/types.ts',
	},
})
