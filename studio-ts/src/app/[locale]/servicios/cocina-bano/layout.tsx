import { type Metadata } from 'next'
import type { ReactNode } from 'react'
import { generateServiceMetadata } from '@/lib/serviceMetadata'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  return generateServiceMetadata(params.locale, 'kitchenBathroom')
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}

