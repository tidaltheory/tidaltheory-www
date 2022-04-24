<script lang="ts">
import Vue from 'vue'

function createColumns(count: number): number[][] {
	return [...new Array(count)].map(() => [])
}

/**
 * Based on `vue-masonry-wall`.
 * @see https://github.com/DerYeger/vue2-masonry-wall
 */
export default Vue.extend({
	props: {
		items: {
			type: Array as () => unknown[],
			required: true
		},
		columns: {
			type: Number,
			default: 2,
		},
		gapClass: { type: String, default: '' }
	},

	data() {
		if (this.columns > 0) {
			const columns = createColumns(this.columns)
			this.items.forEach((_, i) => columns[i % this.columns].push(i))
			return {
				cols: columns,
			}
		}
		return {
			cols: [],
		}
	},

	computed: {
		container() {
			return this.$refs.container as HTMLDivElement
		},
		resizeObserver() {
			return new ResizeObserver(() => this.redraw())
		}
	},

	watch: {
		items() {
			this.redraw()
		}
	},

	mounted() {
		this.redraw()
		this.resizeObserver.observe(this.container)
	},

	beforeDestroy() {
		this.resizeObserver.unobserve(this.container)
	},

	methods: {
		async redraw(force = false) {
			this.cols = createColumns(this.columns)
			await this.fillColumns(0)
			this.$emit('redraw')
		},
		async fillColumns(itemIndex: number) {
			if (itemIndex >= this.items.length) return

			await this.$nextTick()

			let columnDivs = [...this.container.children] as HTMLDivElement[]
			let target = columnDivs.reduce((prev, curr) => {
				/** @todo Make this threshold more "fuzzy". */
				return curr.getBoundingClientRect().height < prev.getBoundingClientRect().height ? curr : prev
			})

			this.cols[+target.dataset.index!].push(itemIndex)
			await this.fillColumns(itemIndex + 1)
		}
	},
})
</script>

<template>
	<div ref="container" :class="gapClass" :style="{ display: 'flex' }">
		<div
			v-for="(column, colIdx) in cols"
			:key="colIdx"
			:data-index="colIdx"
			:class="gapClass"
			:style="{
				display: 'flex',
				'flex-direction': 'column',
				'flex-basis': 0,
				'flex-grow': 1,
				height: 'max-content',
			}"
		>
			<div v-for="itemIndex in column" :key="itemIndex" class="grid">
				<slot :item="items[itemIndex]" :index="itemIndex">
					{{ items[itemIndex] }}
				</slot>
			</div>
		</div>
	</div>
</template>
