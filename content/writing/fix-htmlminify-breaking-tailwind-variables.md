---
date: 2022-03-07
title: Fix your TailwindCSS custom properties
tags:
	- nuxt
	- tailwindcss
	- quick-tip
---

For example, if you get things like `--tw-blur: ;` in your injected styles.

[Nuxt config docs](https://nuxtjs.org/docs/configuration-glossary/configuration-build/#htmlminify)

```js
const config = {
	// ...
	build: {
		html: {
			minify: {
				collapseBooleanAttributes: true,
				decodeEntities: true,
				minifyCSS: false,
				minifyJS: true,
				processConditionalComments: true,
				removeEmptyAttributes: true,
				removeRedundantAttributes: true,
				trimCustomFragments: true,
				useShortDoctype: true,
			},
		},
	}
}
```
