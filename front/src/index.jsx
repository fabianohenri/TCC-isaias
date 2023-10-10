//Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
//System
import store from 'storage/redux/store'
import SystemRoutes from 'routes/routes'
//css
import './global.css'
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<Provider store={store}>
		<SystemRoutes />
	</Provider>
)
