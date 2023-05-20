import { BREAKPOINT_TABLET } from '../utils/breakpoints'
import { clamp, map } from '../utils/math'
import Prefix from 'prefix'
import { getOffset } from '../utils/dom'

export default class Parallax {
  transform: any
  element: any
  media: any
  parallax: any
  amount: any
  scale: any
  offset: any
  constructor({ element }) {
    this.transform = Prefix('transform')

    this.element = element
    this.media = element.querySelector('.gatsby-image-wrapper')

    this.media.onload = () => {
      this.onResize()
    }

    this.parallax = {
      current: -this.amount,
      target: -this.amount,
    }

    this.scale = {
      current: 1.15,
      target: 1.15,
    }

    this.onResize()
    window.scroll(0, 0)
    this.update({ current: null })
  }

  onResize() {
    this.amount = window.innerWidth < BREAKPOINT_TABLET ? 50 : 100
    this.offset = getOffset(this.element)
  }

  update({ current }) {
    if (!this.offset) {
      return
    }

    const { innerHeight } = window

    const offsetBottom = current + innerHeight

    if (offsetBottom >= this.offset.top) {
      this.parallax = clamp(
        -this.amount,
        this.amount,
        map(
          this.offset.top - current,
          -this.offset.height,
          innerHeight,
          this.amount,
          -this.amount
        )
      )
      this.scale = clamp(
        1,
        1.15,
        map(this.offset.top - current, -this.offset.height, innerHeight, 1, 1.15)
      )

      this.media.style[
        this.transform
      ] = `translate3d(0, ${this.parallax}px, 0) scale(${this.scale})`
    } else {
      this.media.style[
        this.transform
      ] = `translate3d(0, -${this.amount}px, 0) scale(1.15)`
    }
  }
}
