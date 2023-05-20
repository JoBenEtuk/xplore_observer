import gsap from 'gsap'
import Splitting from 'splitting'

import { Animation } from '../classes/animation'

export default class Titles extends Animation {
  elementSpan
  constructor({ element }: { element: any }) {
    super({
      element,
      elements: {},
    })

    this.splitText()
    this.elementSpan = this.element.querySelectorAll('.char')
  }

  splitText() {
    Splitting({ target: this.element, by: 'chars' })
  }

  animateIn() {
    ;[this.element].forEach(title => {
      const chars = title.querySelectorAll('.char')
      gsap.to(chars, {
        ease: 'power1.inOut',
        opacity: 1,
        xPercent: 0,
        stagger: { each: 0.03, grid: 'auto', from: 'random' },
      })
    })
  }

  animateOut() {
    ;[this.element].forEach(title => {
      const chars = title.querySelectorAll('.char')

      gsap.set(chars, {
        'will-change': 'opacity, transform',
        opacity: 0,
        // xPercent: () => gsap.utils.random(-150, 150),
      })
    })
  }

  onResize() {
    this.splitText()
  }
}
