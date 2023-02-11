//Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
//System
import store from 'storage/redux/store'
import SystemRoutes from 'routes/routes'
// import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
//css
import './global.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<Provider store={store}>
		{/* <Header /> */}
		<SystemRoutes />
		<Footer />
	</Provider>
)
