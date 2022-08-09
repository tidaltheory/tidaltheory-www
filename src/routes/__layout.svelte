<script>
import '../tailwind.css'
import SiteNav from '../components/site-nav.svelte'
</script>

<div class="grid w-screen h-screen">
	<SiteNav />
	<main class="mt-16 md:mt-0 md:ml-20"><slot /></main>
</div>
