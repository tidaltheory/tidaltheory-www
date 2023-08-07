<script>
import {
	differenceInCalendarDays,
	formatDistanceToNow,
	formatRelative,
	formatISO,
} from 'date-fns'

export let date

const datestamp = new Date(date)
const now = Date.now()

let relativeDate =
	differenceInCalendarDays(now, datestamp) > 6
		? formatDistanceToNow(datestamp, { addSuffix: true })
		: formatRelative(datestamp, now, { weekStartsOn: 1 })
				// Remove time text from date string.
				.replace(/at.*$/, '')
				.trimEnd()
</script>

<time class="text-grey-400 text-xs" datetime={formatISO(datestamp)}
	>{relativeDate}</time
>
