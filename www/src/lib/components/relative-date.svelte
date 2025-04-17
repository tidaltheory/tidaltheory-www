<script>
import {
	differenceInCalendarDays,
	formatDistanceToNow,
	formatISO,
	formatRelative,
} from 'date-fns'

let { date } = $props()

const datestamp = new Date(date)
const now = Date.now()

let relativeDate =
	differenceInCalendarDays(now, datestamp) > 6
		? formatDistanceToNow(datestamp, { addSuffix: true })
		: formatRelative(datestamp, now, { weekStartsOn: 1 })
				// Remove time text from date string.
				.replace(/at\s.*$/, '')
				.trimEnd()
</script>

<time class="text-grey-400 text-xs" datetime={formatISO(datestamp)}
	>{relativeDate}</time
>
