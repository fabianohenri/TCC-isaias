//Libs
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react' // Importar PersistGate
//System
import { store, persistor } from 'storage/redux/store' // Importar store e persistor
import SystemRoutes from 'routes/routes'
//css
import './global.css'
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<SystemRoutes />
		</PersistGate>
	</Provider>
)
