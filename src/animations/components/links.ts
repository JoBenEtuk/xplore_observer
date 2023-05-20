/* eslint-disable quotes */
import Splitting from 'splitting'
import { Component } from '../classes/component'
import gsap from 'gsap'
import { each } from 'lodash'

export class Links extends Component {
  constructor() {
    super({
      element: 'body',
      elements: {
        links: document.querySelectorAll("[data-animation='link']"),
      },
    })

    this.onHover()
  }

  onHover() {
    each(this.elements.links, link => {
      Splitting({
        target: link,
        by: 'chars',
      })
      const tl = gsap.timeline({ paused: true })
      const linkItem = link.querySelectorAll('span span')
      tl.fromTo(
        linkItem,
        {
          y: '0',
          '--degree': -35,
        },
        {
          y: '-100%',
          '--degree': 0,
          stagger: 0.015,
          duration: 1,
          ease: 'expo.out',
        }
      )

      link.addEventListener('mouseover', () => {
        tl.play()
      })
      link.addEventListener('mouseout', () => {
        tl.reverse()
      })
    })
  }
}
