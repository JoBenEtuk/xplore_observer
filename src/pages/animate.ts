import Splitting from 'splitting'
import gsap from 'gsap'
import { Observer } from 'gsap/Observer'
gsap.registerPlugin(Observer)

export const animate = () => {
	Splitting()
	const section: Element[] = gsap.utils.toArray('.section')
	const figure: Element[] = gsap.utils.toArray('.figure')
	const img: Element[] = gsap.utils.toArray('.img')

	const wrap = gsap.utils.wrap(0, figure.length)
	let animating: boolean
	let currentIndex = 0

	/**Reset */
	gsap.set('.char', {
		yPercent: 100,
		willChange: 'transform',
	})
	gsap.set(img, {
		xPercent: 100,
	})

	gsap.set('.section:nth-of-type(1) .char', {
		yPercent: 0,
	})
	gsap.set(img[0], {
		xPercent: 0,
	})

	function gotoSection(index: number, direction: number) {
		animating = true
		index = wrap(index)

		let tl = gsap.timeline({
			defaults: { duration: 1.4, ease: 'power4.inOut' },
			onComplete: () => {
				animating = false
			},
		})

		const currentSection = section[currentIndex]
		const text = currentSection.querySelectorAll('.char')
		const nextSection = section[index]
		const nextText = nextSection.querySelectorAll('.char')

		const scaleY = 1.5

		/**Animate here */
		tl.fromTo(img[currentIndex], { xPercent: 0 }, { xPercent: -100 * direction })
			.fromTo(
				img[index],
				{ xPercent: 100 * direction, scaleY },
				{ xPercent: 0, scaleY: 1 },
				0
			)
			.fromTo(
				text,
				{ yPercent: 0 },
				{
					yPercent: -100 * direction,
					stagger: {
						each: 0.01,
						from: 'random',
					},
				},
				0
			)
			.fromTo(
				nextText,
				{ yPercent: 100 * direction },
				{
					yPercent: 0,
					stagger: {
						each: 0.01,
						from: 'random',
					},
				},
				0
			)

		currentIndex = index
	}

	Observer.create({
		type: 'wheel,touch,pointer',
		preventDefault: true,
		wheelSpeed: -1,
		onUp: () => {
			if (animating) return
			gotoSection(currentIndex + 1, +1)
		},
		onDown: () => {
			if (animating) return
			gotoSection(currentIndex - 1, -1)
		},
		tolerance: 10,
	})

	document.addEventListener('keydown', logKey)

	function logKey(e: { code: string }) {
		if ((e.code === 'ArrowUp' || e.code === 'ArrowLeft') && !animating) {
			gotoSection(currentIndex - 1, -1)
		}
		if (
			(e.code === 'ArrowDown' ||
				e.code === 'ArrowRight' ||
				e.code === 'Space' ||
				e.code === 'Enter') &&
			!animating
		) {
			gotoSection(currentIndex + 1, 1)
		}
	}
}
