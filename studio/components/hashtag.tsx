import type { ReactElement } from 'react'
import styled from 'styled-components'

export const StyledHashtag = styled('mark')`
	padding: 2px;
	background-color: #f1f2f2;
	border-radius: 2px;

	&::before {
		content: '#';
		opacity: 0.5;
	}
`

type HashtagProperties = {
	children: ReactElement
}

export function Hashtag({ children }: HashtagProperties) {
	return <StyledHashtag>{children}</StyledHashtag>
}
