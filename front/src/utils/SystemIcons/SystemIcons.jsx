import React from 'react'
import { CircularProgress } from '@mui/material'
import { BarChart, Logout, Dashboard, AccountBox, Visibility } from '@mui/icons-material'
export const LoadingIcon = ({ size, alignCenter = false, thickness, ...rest }) => (
	<span style={{ ...(alignCenter && { display: 'flex', alignContent: 'center' }) }}>
		<CircularProgress size={size} thickness={thickness} color='inherit' {...rest} />
	</span>
)

export const GraphIcon = ({ ...rest }) => <BarChart {...rest} />
export const LogoutIcon = ({ ...rest }) => <Logout {...rest} />
export const DashboardIcon = ({ ...rest }) => <Dashboard {...rest} />
export const OverviewIcon = ({ ...rest }) => <Visibility {...rest} />
export const AccountIcon = ({ ...rest }) => <AccountBox {...rest} />
