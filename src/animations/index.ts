type Props = {
	page: string
}
import Splitting from 'splitting'

import { Index } from './pages'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.normalizeScroll(true)
export class App {
	currentpage: any
	preloader: any
	pages: any
	pagetitle: string
	frame: any

	constructor({ page }: Props) {
		Splitting()
		this.pagetitle = page
		this.createPages()
		this.onResize()
		this.update()

		Splitting()
	}

	createComponents(): void {
		this.createAnimations()
	}

	createAnimations(): void {}

	createPages() {
		this.pages = {
			index: new Index(),
		}

		this.currentpage = this.pages[this.pagetitle]
		this.currentpage.create()
		this.currentpage.reset()
		this.createComponents()
		this.addEventListeners()
	}

	onPreloaded() {
		this.preloader.destroy()
		this.currentpage.show()
	}

	/**
	 * Loop
	 **/
	update() {
		if (this.currentpage && this.currentpage.update) {
			this.currentpage.update()
		}

		this.frame = window.requestAnimationFrame(this.update.bind(this))
	}

	onResize() {
		if (this.currentpage && this.currentpage.onResize) {
			this.currentpage.onResize()
		}
	}

	addEventListeners() {}
}

console.log(
	'%c 💛 & 💡 Josiah — https://jobenetuk.dev/',
	'background: #000; color: #ff873c;'
)
