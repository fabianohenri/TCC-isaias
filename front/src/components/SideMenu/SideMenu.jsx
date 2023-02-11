import { Unstable_Grid2 as Grid, Card, Typography, MenuList, MenuItem, ListItemIcon, Divider } from '@mui/material'
import React from 'react'
import SideMenuStyles from './SideMenuStyles.module.css'
import { Send } from '@mui/icons-material/'

const SideMenu = () => {
	return (
		<Card className={SideMenuStyles.sideMenuContainer}>
			<Grid container direction='column' style={{ width: '100%' }}>
				<Grid xs={12}>
					<Typography sx={{ fontSize: '2em', color: 'blue' }} gutterBottom>
						TCC
					</Typography>
				</Grid>
				<Grid xs={12}>
					<MenuList>
						<MenuItem>
							<ListItemIcon>
								<Send fontSize='small' />
							</ListItemIcon>
							<Typography variant='inherit'>Dashboard</Typography>
						</MenuItem>
						<MenuItem>
							<ListItemIcon>
								<Send fontSize='small' />
							</ListItemIcon>
							<Typography variant='inherit'>Dashboard</Typography>
						</MenuItem>
						<MenuItem>
							<ListItemIcon>
								<Send fontSize='small' />
							</ListItemIcon>
							<Typography variant='inherit'>Dashboard</Typography>
						</MenuItem>
						<div style={{ width: '100%', height: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<Divider style={{ width: '80%' }} />
						</div>
					</MenuList>
				</Grid>
			</Grid>
		</Card>
	)
}

export default SideMenu
