<script>
import '../tailwind.css'
import SiteNav from '$lib/components/site-nav.svelte'
</script>

<div class="grid h-screen w-screen">
	<SiteNav />
	<main class="mt-16 md:mt-0 md:ml-20"><slot /></main>
</div>
