import React from 'react'
import ReactDOM from 'react-dom/client'

import '../src/scss/index.scss'
import Page from './pages'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Page />
	</React.StrictMode>
)
