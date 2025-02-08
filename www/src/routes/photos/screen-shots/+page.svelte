<script>
import Collection from '../collection.svelte'

/**
 * @typedef {Object} Props
 * @property {import('../$types').PageData} data
 */

/** @type {Props} */
let { data } = $props()
</script>

<Collection {data} collection="screen-shots" />
