import React from 'react'
import ReactDOM from 'react-dom/client'
import SystemRoutes from 'routes/routes'

import './global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<React.StrictMode>
		<SystemRoutes />
	</React.StrictMode>
)
