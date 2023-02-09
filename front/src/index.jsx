import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from 'storage/redux/store'
import SystemRoutes from 'routes/routes'
import { BrowserRouter } from 'react-router-dom'
import './global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<Provider store={store}>
		<SystemRoutes />
	</Provider>
)
