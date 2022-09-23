import React from 'react'
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom'
//page components
import Login from 'pages/Login/Login'
import Dashboard from 'pages/Dashboard/Dashboard'

const routes = [
	//Public
	// { path: '/', component: HOME!!!, exact: true, isPrivate: false }, //sem home no momento
	{ path: '/', label: 'Login', element: Login, exact: true, isPrivate: false },
	{ path: '/dashboard', label: 'Dashboard', element: Dashboard, exact: true, isPrivate: false }
	// { component: Erro, exact: true, isPrivate: false }
]

const Routes = () => (
	<BrowserRouter>
		<Switch>
			{/* <Route path='/' element={<Login />} /> */}
			{routes.map((route) => {
				return <Route key={route.path + route.label} path={route.path} exact={route.exact} element={route.element()} label={route.label} />
			})}
		</Switch>
	</BrowserRouter>
)

export default Routes
