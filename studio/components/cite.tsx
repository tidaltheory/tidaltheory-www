import type { ReactNode } from 'react'

type CiteProperties = {
	children: ReactNode
}

export function Cite({ children }: CiteProperties) {
	return <cite>{children}</cite>
}
