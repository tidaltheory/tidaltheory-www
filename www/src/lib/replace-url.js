export function replaceUrl(cleanUrl) {
	history.replaceState({}, '', cleanUrl)
}
