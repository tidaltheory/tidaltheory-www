<script>
import PageIntro from '$lib/components/page-intro.svelte'

/** @type {import('./$types').PageData} */
export let data
$: ({ title, subtitle, description } = data.json)
$: fullTitle = subtitle ? [title, subtitle].join(' ') : title
</script>

<svelte:head>
	<title>{fullTitle} — Photos — Tidal Theory</title>
</svelte:head>

<article>
	<PageIntro>
		{title}

		<svelte:fragment slot="subtitle"
			>{#if subtitle}{subtitle}{/if}</svelte:fragment
		>
		<svelte:fragment slot="intro">
			{@html description}
		</svelte:fragment>
	</PageIntro>
</article>
