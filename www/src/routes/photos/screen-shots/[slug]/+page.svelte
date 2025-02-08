<script>
import Item from '../../item.svelte'

/**
 * @typedef {Object} Props
 * @property {import('./$types').PageData} data
 */

/** @type {Props} */
let { data } = $props()
</script>

<Item {data} collection="screen-shots" slug={data.slug} />
