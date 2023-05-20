import { Page } from '../classes/page'
import gsap from 'gsap'
import Splitting from 'splitting'
export class About extends Page {
  constructor() {
    super({
      element: '[data-animation="about"]',
      elements: {
        aboutHero: '[data-animation="aboutHero"]',
        aboutSub: '[data-animation="aboutSub"]',
      },
    })
  }

  reset(): void {
    gsap.set(this.elements.aboutSub, {
      opacity: 0,
    })
    ;[this.elements.aboutHero].forEach(title => {
      const chars = title.querySelectorAll('.char')

      gsap.set(chars, {
        'will-change': 'opacity, transform',
        opacity: 0,
        xPercent: () => gsap.utils.random(-150, 150),
        // yPercent: () => gsap.utils.random(-100, 100),
      })
    })
  }

  create() {
    super.create()

    Splitting({ target: this.elements.aboutHero, by: 'chars' })
  }

  show() {
    super.show()
    ;[this.elements.aboutHero].forEach(title => {
      const chars = title.querySelectorAll('.char')
      gsap.to(chars, {
        ease: 'power1.inOut',
        opacity: 1,
        xPercent: 0,
        yPercent: 0,
        stagger: { each: 0.03, grid: 'auto', from: 'random' },
      })
    })

    gsap.to(this.elements.aboutSub, {
      opacity: 1,
      delay: 0.5,
    })
  }
}
