<script>
import Collection from '../collection.svelte'

/** @type {import('../$types').PageData} */
export let data
</script>

<Collection {data} collection="screen-shots" />
