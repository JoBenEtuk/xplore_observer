import { useEffectOnce } from '@studio-lumio/hooks'
import { Fragment } from 'react'
import { animate } from './animate'

/**Assets */
import img1 from '@/assets/img1.webp'
import img2 from '@/assets/img2.webp'
import img3 from '@/assets/img3.webp'
import img4 from '@/assets/img4.webp'
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
		{ title: `ABOUT:BLANK ‘23 WINTER COLLECTION`, img: img1 },
		{ title: `OLA:BLANK ‘23 WINTER COLLECTION`, img: img2 },
		{ title: `NULL:BLANK ‘23 WINTER COLLECTION`, img: img3 },
		{ title: `LUMIO:BLANK ‘23 WINTER COLLECTION`, img: img4 },
	]

	useEffectOnce(() => {
		animate()
	})

	return (
		<Fragment>
			<div className='grid'>
				{new Array(30).fill(null).map((item, idx) => (
					<div key={idx} />
				))}
			</div>

			<div className='parent'>
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
		</Fragment>
	)
}

export default Index
