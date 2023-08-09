import styled from 'styled-components'

export const HashtagDecorator = styled('mark')`
	padding: 2px;
	background-color: #f1f2f2;
	border-radius: 2px;

	&::before {
		content: '#';
		opacity: 0.5;
	}
`
