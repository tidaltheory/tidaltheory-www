<script>
import PageSection from './page-section.svelte'
</script>

<PageSection>
	<div class="mx-auto grid w-full max-w-[1056px]"><slot /></div>
</PageSection>

<style>
/* .columns {
	--content-area: 1136px;
	--full: minmax(var(--content-area), 1fr);
	--content: min(var(--content-area), 100%);

	grid-template-columns:
		[full-start] var(--full)
		[content-start] var(--content)
		var(--content) [content-end]
		var(--full) [full-end];
} */
</style>
