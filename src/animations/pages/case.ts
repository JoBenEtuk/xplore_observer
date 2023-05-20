import { Page } from '../classes/page'

export class Case extends Page {
  constructor() {
    super({
      element: '[data-animation="case"]',
      elements: {},
    })
  }

  resetElements(): void {}

  create() {
    super.create()

    // this.resetElements()
  }
}
