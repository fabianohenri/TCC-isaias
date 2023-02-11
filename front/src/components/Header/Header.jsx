import { Unstable_Grid2 as Grid } from '@mui/material'
import React from 'react'
import HeaderStyles from './Header.module.css'
import { logoutAction } from 'storage/redux/actions/user.actions'
import { useDispatch } from 'react-redux'

const Header = () => {
	const dispatch = useDispatch()
	const deslogar = async () => {
		dispatch(logoutAction())
	}
	return (
		<Grid>
			<div className={HeaderStyles.headerContainer}>
				<button onClick={deslogar}>deslogar</button>
			</div>
		</Grid>
	)
}

export default Header
