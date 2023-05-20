import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { getOffset } from '@/animations/utils/dom'

type Props = {
	children: any
	wrapperClass?: any
	className?: any
	start?: number
	end?: number
	target?: any
}

export function Sticky({
	children,
	wrapperClass,
	className,
	start = 0,
	end = 0,
	target,
}: Props) {
	const pinSpacer = useRef<any>()
	const trigger = useRef<any>()
	const targetRef = useRef<any>()

	useEffect(() => {
		if (!pinSpacer.current || !trigger.current) return () => null
		gsap.set(trigger.current, { clearProps: 'all' })

		const content = trigger.current.querySelector("[data-animation='stickyContent']")

		const rect = getOffset(content)
		gsap.set(content, { y: 0 })

		const timeline = gsap
			.timeline({
				ease: 'none',
				scrollTrigger: {
					trigger: content,
					scrub: true,
					invalidateOnRefresh: true,
					start: `top 55%`,
					end: `5% 0%`,
				},
			})
			.to(
				content,
				{
					y: `-${window.innerHeight - rect.height}px`,
				},
				0
			)

		return () => {
			timeline.kill()
		}
	}, [start, end])

	useEffect(() => {
		if (target) {
			targetRef.current = document.querySelector(target)
		} else {
			targetRef.current = pinSpacer.current.parentNode
		}
	}, [target])

	return (
		<div
			ref={(node) => {
				pinSpacer.current = node
			}}
			className={wrapperClass}>
			<div
				ref={(node) => {
					trigger.current = node
				}}
				className={className}>
				{children}
			</div>
		</div>
	)
}
