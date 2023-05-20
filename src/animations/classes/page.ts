/* eslint-disable no-unused-vars */
import { EventEmitter } from 'events'
import AutoBind from 'auto-bind'
import { each } from 'lodash'

export class Page extends EventEmitter {
  components: any
  elements: any
  selectors: { element: any; elements: any }
  element: any
  preloaders: any

  constructor({ element, elements }: any) {
    super()
    AutoBind(this)

    this.selectors = {
      element,
      elements: {
        preloaders: document.querySelectorAll('img'),
        ...elements,
      },
    }
  }

  create(): void {
    this.element = document.querySelector(this.selectors.element)
    this.elements = {}

    each(this.selectors.elements, (selector, key) => {
      if (selector instanceof window.HTMLElement || selector instanceof window.NodeList) {
        this.elements[key] = selector
      } else if (Array.isArray(selector)) {
        this.elements[key] = selector
      } else {
        this.elements[key] = this.element.querySelectorAll(selector)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = this.element.querySelector(selector)
        }
      }
    })
  }

  show() {}

  reset() {}

  /**
   * Events
   */
  onResize() {}

  onWheel(event: any) {}

  onTouchDown(event: any) {}

  onTouchMove(event: any) {}

  onTouchUp(event: any) {}

  update() {}
}
