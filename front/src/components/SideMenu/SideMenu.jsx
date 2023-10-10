import React, { useState, memo } from 'react'
import { Unstable_Grid2 as Grid, Typography, MenuList, MenuItem, ListItemIcon, Divider } from '@mui/material'
import SideMenuStyles from './SideMenuStyles.module.css'
import { logoutAction } from 'storage/redux/actions/user.actions'
import { connect } from 'react-redux'
import { changeMenuItemAction } from 'storage/redux/actions/dashboard.actions'
import { AccountIcon, DashboardIcon, GraphIcon, LogoutIcon } from 'utils/SystemIcons/SystemIcons'

const SideMenu = ({ logoutDispatch, changeMenuItemDispatch }) => {
	const [selectedMenuItem, setSelectedMenuItem] = useState('overview')

	const logout = async () => {
		logoutDispatch()
	}
	const handleOnClickMenuItem = (menuItemName) => {
		changeMenuItemDispatch(menuItemName)
		setSelectedMenuItem(menuItemName)
	}
	return (
		<div className={SideMenuStyles.sideMenuContainer}>
			<Grid container direction='column' style={{ width: '100%' }}>
				<Grid item xs={12}>
					<Typography className={SideMenuStyles.titleApp} sx={{ fontSize: '2em' }} style={{ textAlign: 'center' }}>
						Dashboard
					</Typography>
					<Typography
						className={SideMenuStyles.titleApp}
						sx={{ fontSize: '0.8em' }}
						style={{ width: '100%', textAlign: 'center' }}
						gutterBottom
					>
						Bitrix24
					</Typography>
				</Grid>
				<div style={{ width: '100%', justifyContent: 'center', display: 'flex', marginBottom: '3em', opacity: 0.8 }}>
					<Divider style={{ backgroundColor: '#0f48aa', width: '90%' }} />
				</div>
				<Grid xs={12}>
					<MenuList>
						<MenuItem onClick={() => handleOnClickMenuItem('overview')} selected={selectedMenuItem === 'overview'}>
							<ListItemIcon className={SideMenuStyles.item}>
								<DashboardIcon size={16} style={{ color: '#ffffff' }} />
							</ListItemIcon>
							<Typography className={SideMenuStyles.item} sx={{ fontSize: '1.5em' }} variant='inherit'>
								Overview
							</Typography>
						</MenuItem>
						<MenuItem onClick={() => handleOnClickMenuItem('graphs')} selected={selectedMenuItem === 'graphs'}>
							<ListItemIcon className={SideMenuStyles.item}>
								<GraphIcon size={16} style={{ color: '#ffffff' }} />
							</ListItemIcon>
							<Typography className={SideMenuStyles.item} sx={{ fontSize: '1.5em' }} variant='inherit'>
								Gráficos
							</Typography>
						</MenuItem>

						<div
							style={{ width: '100%', justifyContent: 'center', display: 'flex', marginTop: '3em', marginBottom: '3em', opacity: 0.8 }}
						>
							<Divider style={{ backgroundColor: 'white', width: '90%' }} />
						</div>

						<MenuItem onClick={() => handleOnClickMenuItem('account')} selected={selectedMenuItem === 'account'}>
							<ListItemIcon className={SideMenuStyles.item}>
								<AccountIcon size={16} style={{ color: '#ffffff' }} />
							</ListItemIcon>
							<Typography className={SideMenuStyles.item} variant='inherit'>
								Conta
							</Typography>
						</MenuItem>
						<MenuItem onClick={logout}>
							<ListItemIcon className={SideMenuStyles.item}>
								<LogoutIcon size={16} style={{ color: '#ffffff' }} />
							</ListItemIcon>
							<Typography className={SideMenuStyles.item} variant='inherit'>
								Deslogar
							</Typography>
						</MenuItem>
					</MenuList>
				</Grid>
			</Grid>
		</div>
	)
}

const mapDispatchToProps = (dispatch) => ({
	changeMenuItemDispatch: (selectedMenuItem) => dispatch(changeMenuItemAction(selectedMenuItem)),
	logoutDispatch: () => dispatch(logoutAction())
})

export default connect(null, mapDispatchToProps)(memo(SideMenu))
