import type { DirectiveFunction, PluginFunction } from 'vue'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import type { BodyScrollOptions } from 'body-scroll-lock'

interface VScrollLock {
	enableBodyScroll: typeof enableBodyScroll
	disableBodyScroll: typeof disableBodyScroll
	install: PluginFunction<any>
	inserted: DirectiveFunction
	componentUpdated: DirectiveFunction
	unbind: DirectiveFunction
	bodyScrollOptions?: Partial<BodyScrollOptions>
}

const VScrollLock: VScrollLock = {
	enableBodyScroll,
	disableBodyScroll,
	install(Vue, options) {
		Vue.directive('scroll-lock', {
			inserted: this.inserted.bind(this),
			componentUpdated: this.componentUpdated.bind(this),
			unbind: this.unbind.bind(this),
		})
	},
	inserted(el, binding) {
		if (binding.value) {
			this.disableBodyScroll(el, this.bodyScrollOptions)
		}
	},
	componentUpdated(el, binding) {
		if (binding.value) {
			this.disableBodyScroll(el, this.bodyScrollOptions)
		} else {
			this.enableBodyScroll(el)
		}
	},
	unbind(el) {
		this.enableBodyScroll(el)
	},
}

export default VScrollLock
