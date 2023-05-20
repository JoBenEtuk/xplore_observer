import { Link as ReactLink, useNavigate } from 'react-router-dom'
import gsap from 'gsap'

export function Link({ href, children, ...rest }: { href: string; children: any }) {
	const navigate = useNavigate()
	const isProtocol = href?.startsWith('mailto:') || href?.startsWith('tel:')
	const isExternal = href?.startsWith('http')

	if (isExternal || isProtocol) {
		return (
			<a href={href} target='_blank' rel='noopener noreferrer' {...rest}>
				{children}
			</a>
		)
	}

	return (
		<ReactLink
			to={href}
			onClick={(e) => {
				e.preventDefault()
				if (window.location.pathname !== href) {
					gsap
						.timeline()
						.to("[data-animation='transition']", {
							y: 0,
							ease: 'expo.inOut',
							duration: 1.5,
						})
						.call(() => {
							navigate(href)
						})
						.to("[data-animation='transition']", {
							delay: 0.5,
							y: '100%',
						})
						.set("[data-animation='transition']", {
							y: '-100%',
							ease: 'expo.inOut',
							duration: 1.5,
						})
				}
			}}>
			{children}
		</ReactLink>
	)
}
