import type { ReactNode } from 'react'

interface CiteProperties {
	children: ReactNode
}

export function Cite({ children }: CiteProperties) {
	return <cite>{children}</cite>
}
