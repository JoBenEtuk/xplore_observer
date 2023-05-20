import { Page } from '../classes/page'
import gsap from 'gsap'
import Splitting from 'splitting'

export class Index extends Page {
	constructor() {
		super({
			element: '[data-animation="home"]',
			elements: {
				homeHero: '[data-animation="homeHero"]',
				homeSub: '[data-animation="homeSub"]',
			},
		})
	}

	reset(): void {
		gsap.set(this.elements.homeSub, {
			opacity: 0,
		})
		;[this.elements.homeHero].forEach((title) => {
			const chars = title.querySelectorAll('.char')

			gsap.set(chars, {
				'will-change': 'opacity, transform',
				opacity: 0,
				// yPercent: () => gsap.utils.random(-100, 100),
				// xPercent: () => gsap.utils.random(-150, 150),
			})
		})
	}

	create() {
		super.create()

		Splitting({ target: this.elements.homeHero, by: 'chars' })
	}

	show() {
		super.show()
		;[this.elements.homeHero].forEach((title) => {
			const chars = title.querySelectorAll('.char')
			gsap.to(chars, {
				ease: 'power1.inOut',
				delay: () => gsap.utils.random(0.5, 1),
				opacity: 1,
				xPercent: 0,
				yPercent: 0,
				stagger: { each: 0.02, grid: 'auto', from: 'random' },
			})
		})

		gsap.to(this.elements.homeSub, {
			opacity: 1,
			delay: 1,
		})
	}
}
