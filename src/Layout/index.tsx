import { Cursor } from '@/components/cursor'
import { Link } from '@/components/link'
import { Scrollbar } from '@/components/scrollbar'
import { Lenis, useLenis } from '@studio-freight/react-lenis'
import { raf } from '@studio-freight/tempus'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect } from 'react'
import s from './layout.module.scss'

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
	ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' })

	// merge rafs
	gsap.ticker.lagSmoothing(0)
	gsap.ticker.remove(gsap.updateRoot)
	raf.add((time: number) => {
		gsap.updateRoot(time / 1000)
	}, 0)
}

const Layout = ({ children }: any) => {
	const lenis = useLenis(() => {})

	useEffect(() => {
		lenis?.start()
	}, [lenis])

	useEffect(() => {
		ScrollTrigger.refresh()
	}, [lenis])

	useEffect(() => {
		window.history.scrollRestoration = 'manual'
	}, [])

	return (
		<Lenis root>
			<div className={s.layout}>
				<header>
					<Link href={'/about'}>ABOUT</Link>
					<Link href={'/'}>HOME</Link>
				</header>
				<Cursor />
				<Scrollbar />
				<main className={s.main}>{children}</main>
			</div>
		</Lenis>
	)
}

export default Layout
