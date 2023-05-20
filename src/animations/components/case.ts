import { Component } from '../classes/component'
import gsap from 'gsap'

export class CaseStudy extends Component {
  constructor() {
    super({
      element: 'body',
      elements: {
        case: document.querySelectorAll('[data-animation="case"]'),
      },
    })

    this.reveal()
  }

  reveal() {
    this.elements.case.forEach(element => {
      const caseImage = element.querySelectorAll('.gatsby-image-wrapper')
      const duration = 1
      const ease = 'Power2.easeInOut'

      gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            invalidateOnRefresh: true,
            toggleActions: 'play reverse play reset',
          },
        })
        .fromTo(
          element,
          {
            'clip-path': 'inset(0% 0% 100% 0%)',
          },
          {
            'clip-path': 'inset(0% 0% 0% 0%)',
            ease,
            duration,
          }
        )
        .fromTo(
          caseImage,
          {
            scale: 1.5,
          },
          {
            scale: 1,
            ease,
            duration,
          },
          0
        )
    })
  }
}
