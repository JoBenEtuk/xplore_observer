import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import '../src/scss/index.scss'
import Transition from './components/Transition'
import About from './pages/about'
import Home from './pages/home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/about',
		element: <About />,
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Transition />
		<RouterProvider router={router} />
	</React.StrictMode>
)
