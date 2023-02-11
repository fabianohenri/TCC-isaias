import { Unstable_Grid2 as Grid, Card, Typography, MenuList, MenuItem, ListItemIcon, Divider } from '@mui/material'
import React from 'react'
import SideMenuStyles from './SideMenuStyles.module.css'
import { Dashboard, AccountBox } from '@mui/icons-material/'

const SideMenu = () => {
	return (
		<Card className={SideMenuStyles.sideMenuContainer}>
			<Grid container direction='column' style={{ width: '100%' }}>
				<Grid xs={12}>
					<Typography className={SideMenuStyles.titleApp} sx={{ fontSize: '2em' }} gutterBottom>
						TCC
					</Typography>
				</Grid>
				<Grid xs={12}>
					<MenuList>
						<MenuItem>
							<ListItemIcon className={SideMenuStyles.item}>
								<Dashboard fontSize='medium' />
							</ListItemIcon>
							<Typography className={SideMenuStyles.item} sx={{ fontSize: '1.5em' }} variant='inherit'>
								Dashboard
							</Typography>
						</MenuItem>

						<div style={{ marginTop: '3em', marginBottom: '1em', marginLeft: '1em' }}>
							<Typography className={SideMenuStyles.titleMenu} variant='inherit'>
								Conta
							</Typography>
						</div>

						<MenuItem>
							<ListItemIcon className={SideMenuStyles.item}>
								<AccountBox fontSize='small' />
							</ListItemIcon>
							<Typography className={SideMenuStyles.item} variant='inherit'>
								Conta
							</Typography>
						</MenuItem>
						<div style={{ width: '100%', height: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<hr className={SideMenuStyles.divider} />
						</div>
					</MenuList>
				</Grid>
			</Grid>
		</Card>
	)
}

export default SideMenu
