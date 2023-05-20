type Props = {
  page: string
}
import Lenis from '@studio-freight/lenis'
import Splitting from 'splitting'
import { each, map } from 'lodash'

import { Preloader } from './components/preloader'
import { Links } from './components/links'
import { CaseStudy } from './components/case'

import Parallax from './elements/Parallax'
import Title from './elements/Title'

import { Home } from './pages/home'
import { About } from './pages/about'
import { Case } from './pages/case'
import { Works } from './pages/works'

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

  animations: any[]
  animationsParallax: any

  lenis: any
  links: Links
  caseStudy: CaseStudy
  animationsTitle: any
  scroll: any

  constructor({ page }: Props) {
    Splitting()
    this.pagetitle = page
    this.animations = []
    this.createPages()
    this.onResize()
    this.update()
    this.reset()
    this.initLenis()

    Splitting()
    this.scroll = null
  }

  createPreloader() {
    if (!sessionStorage.getItem('preloader')) {
      this.preloader = new Preloader()
      this.preloader.once('completed', this.onPreloaded.bind(this))
    }
  }

  async reset() {
    if (sessionStorage.getItem('preloader')) {
      await this.currentpage.reset()
      setTimeout(() => {
        this.currentpage.show()
      }, 5500)
    } else {
      this.createPreloader()
    }
  }

  initLenis() {
    this.lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.6,
      smoothTouch: false,
    })

    this.lenis.on('scroll', ({ scroll }) => {
      ScrollTrigger.update()
      this.scroll = scroll
    })

    const raf = (time: any) => {
      this.lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }

  createComponents(): void {
    this.links = new Links()
    this.caseStudy = new CaseStudy()
    this.createAnimations()
  }

  createAnimations(): void {
    // Title
    this.animationsTitle = map(
      document.querySelectorAll('[data-animation="title"]'),
      element => new Title({ element })
    )
    this.animations.push(...this.animationsTitle)

    // Parallax
    this.animationsParallax = map(
      document.querySelectorAll('[data-animation="parallax"]'),
      element => new Parallax({ element })
    )
    this.animations.push(...this.animationsParallax)
  }

  createPages() {
    this.pages = {
      home: new Home(),
      about: new About(),
      case: new Case(),
      works: new Works(),
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
    each(this.animations, animation => {
      animation.update && animation.update({ current: this.scroll })
    })

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
