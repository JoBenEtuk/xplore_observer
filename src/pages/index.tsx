import { useEffectOnce } from '@studio-lumio/hooks'
import { animate } from './animate'

/**Assets */
import winter from '@/assets/winter.jpg'
import summer from '@/assets/summer.jpg'
import spring from '@/assets/spring.png'
import autumn from '@/assets/autumn.jpg'
type IL = {
	name: string
	href: string
}[]

const Index = () => {
	const hl: IL = [
		{
			name: 'menu',
			href: '',
		},
		{
			name: 'shop',
			href: '',
		},
		{
			name: 'community',
			href: '',
		},
	]

	const fl: IL = [
		{
			name: 'all',
			href: '',
		},
		{
			name: 'men',
			href: '',
		},
		{
			name: 'kids',
			href: '',
		},
		{
			name: 'campaign',
			href: '',
		},
	]

	const children = [
		{ title: `ABOUT:BLANK ‘23 SPRING COLLECTION`, img: spring },
		{ title: `ABOUT:BLANK ‘23 WINTER COLLECTION`, img: winter },
		{ title: `ABOUT:BLANK ‘23 AUTUMN COLLECTION`, img: autumn },
		{ title: `ABOUT:BLANK ‘23 SUMMER COLLECTION`, img: summer },
	]

	useEffectOnce(() => {
		animate()
	})

	return (
		<div className='parent'>
			<div className='grid'>
				{new Array(30).fill(null).map((_, idx) => (
					<div key={idx} />
				))}
			</div>
			<div className='child'>
				<header>
					<nav>
						{hl.map((link) => (
							<a href={link.href} key={link.name}>
								{link.name}
							</a>
						))}
					</nav>
				</header>

				{children.map((child, index) => (
					<div className='section' key={index}>
						<h1 data-splitting='chars' className='text'>
							{child.title}
						</h1>
						<figure className='figure'>
							<img className='img' src={child.img} alt='' width={928} height={682} />
						</figure>
					</div>
				))}

				<footer>
					<nav>
						{fl.map((link) => (
							<a href={link.href} key={link.name}>
								{link.name}
							</a>
						))}
					</nav>
					<p>scroll down &#8595;</p>
				</footer>
			</div>
		</div>
	)
}

export default Index
