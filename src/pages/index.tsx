import img from '@/assets/xplore.png'
import { Fragment } from 'react'
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

	return (
		<Fragment>
			<div className='grid'>
				{new Array(30).fill(null).map((item, idx) => (
					<div key={idx} />
				))}
			</div>

			<div className='index'>
				<header>
					<nav>
						{hl.map((link) => (
							<a href={link.href} key={link.name}>
								{link.name}
							</a>
						))}
					</nav>
				</header>

				<h1>ABOUT:BLANK '23 WINTER COLLECTION</h1>
				<figure>
					<img src={img} alt='' width={928} height={682} />
				</figure>

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
		</Fragment>
	)
}

export default Index
