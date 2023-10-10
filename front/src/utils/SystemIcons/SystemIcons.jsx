import React from 'react'
import { CircularProgress } from '@mui/material'
import { BarChart, Logout, Dashboard, AccountBox } from '@mui/icons-material'

export const LoadingIcon = ({ size, alignCenter = false, thickness, ...rest }) => (
	<span style={{ ...(alignCenter && { display: 'flex', alignContent: 'center' }) }}>
		<CircularProgress size={size} thickness={thickness} color='inherit' {...rest} />
	</span>
)

export const GraphIcon = ({ size, ...rest }) => <BarChart size={size} {...rest} />
export const LogoutIcon = ({ size, ...rest }) => <Logout size={size} {...rest} />
export const DashboardIcon = ({ size, ...rest }) => <Dashboard size={size} {...rest} />
export const AccountIcon = ({ size, ...rest }) => <AccountBox size={size} {...rest} />
