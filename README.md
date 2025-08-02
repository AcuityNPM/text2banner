# text2banner
This project is a Strapi v5 plugin that provides functionality to generate a simple banner using customizable text and color codes.

### Manually Installation
1. Move to `plugins` folder `WORKDIR/src/plugins/`.
2. Use Git Pull the source code to the `plugins` folder.

### Initial Setup
1. Put below source code to `WORKDIR/config/plugins.ts`
```
export default () => ({
	'text2banner': {
		enabled: true,
		resolve: './src/plugins/text2banner'
	},
});
```
2. Then move to plugin folder `cd WORKDIR/src/plugins/text2banner`
3. Please use the following command to set up the plugin:
```
npm install
npm run build
```