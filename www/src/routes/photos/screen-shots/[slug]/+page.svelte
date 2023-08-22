<script>
import Item from '../../item.svelte'

/** @type {import('./$types').PageData} */
export let data
</script>

<Item {data} collection="screen-shots" />
