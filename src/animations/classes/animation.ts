import { Component } from './component'

export class Animation extends Component {
  observer!: IntersectionObserver
  observerOptions: {
    root?: Element | null
    rootMargin?: string
    threshold?: number
  }

  rect: {
    distanceY: number
    targetDistanceY: number
    currentDistanceY: number
  }

  frame!: number
  frameII!: number

  constructor({ element, elements }: { element: string; elements: any }) {
    // call methods here
    super({ element, elements })

    this.createObserver()
  }

  // create intersection observer method to animate in and out
  createObserver(): void {
    this.observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateIn()
        } else {
          this.animateOut()
        }
      })
    })

    this.element && this.observer.observe(this.element)
  }

  animateIn(): void {}
  animateOut(): void {}
}
