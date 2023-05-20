import { Page } from '../classes/page'
import gsap from 'gsap'
import { getRandomColor } from '@/utils'

export class Works extends Page {
  constructor() {
    super({
      element: '[data-animation="works"]',
      elements: {
        worksItem: '[data-animation="worksItem"]',
        worksTitle: '[data-animation="worksTitle"]',
      },
    })
  }

  resetElements(): void {}

  create() {
    super.create()
    this.hoverItems()
  }

  reset(): void {}

  show() {
    super.show()
  }

  hoverItems() {
    const colorArr = [
      'rgba(24, 70, 186, 1)',
      'rgba(239, 99, 66, 1)',
      'rgba(45, 184, 153, 1)',
      'rgba(237, 179, 146, 1)',
      'rgba(105, 192, 219, 1)',
      'rgba(199, 155, 108, 1)',
    ]

    this.elements.worksItem.forEach(element => {
      function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0
      }

      if (!isTouchDevice()) {
        element.addEventListener('mouseover', () =>
          gsap.to('body', {
            backgroundColor: getRandomColor(colorArr),
          })
        )
        element.addEventListener('mouseout', () =>
          gsap.to('body', {
            backgroundColor: 'rgb(250, 198, 180)',
          })
        )
      }
    })
  }
}
