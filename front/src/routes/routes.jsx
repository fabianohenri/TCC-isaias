import React, { memo, useEffect } from 'react'
import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
//page components
import Login from 'pages/Login/Login'
import Dashboard from 'pages/Dashboard/Dashboard'
import { restoreLoggedUserAction } from 'storage/redux/actions/user.actions'
import { is } from 'date-fns/locale'

const routes = [
	//Public
	// { path: '/', element: HOME!!!, exact: true, isPrivate: false }, //sem home no momento
	{ path: '/', label: 'Login', element: <Login />, exact: true, isPrivate: false },
	//private
	{ path: '/dashboard', label: 'Dashboard', element: <Dashboard />, exact: true, isPrivate: true }
]

const checkRoute = (route, user) => {
	let navigate = ''
	if (user && route.path === '/') {
		navigate = <Navigate to='/dashboard' />
	} else if ((user && route.isPrivate) || !route.isPrivate) {
		navigate = route.element
	} else {
		navigate = <Navigate to='/' />
	}

	return navigate
}

const Routes = ({ user, restoreLoggedUserDispatch }) => {
	useEffect(() => {
		restoreLoggedUserDispatch(user)
	}, [])

	return (
		<BrowserRouter>
			<Switch>
				{routes.map((route) => (
					<Route key={route.path + route.label} path={route.path} element={checkRoute(route, user)} />
				))}
				<Route path='*' element={<Navigate to='/' />} />
			</Switch>
		</BrowserRouter>
	)
}

const mapStateToProps = ({ store }) => ({
	user: store?.user
})

const mapDispatchToProps = (dispatch) => ({
	restoreLoggedUserDispatch: () => dispatch(restoreLoggedUserAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Routes))
