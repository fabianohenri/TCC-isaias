import React, { useState, useEffect, memo } from 'react'
import SideMenu from 'components/SideMenu/SideMenu'
import Overview from './modules/Overview/Overview'
import { Unstable_Grid2 as Grid } from '@mui/material'

const Dashboard = () => {
	const [selectedItem, setSelectedItem] = useState('overview')

	const onSelectItem = (item) => {
		setSelectedItem(item)
	}

	return (
		<Grid container>
			<Grid xs={2} style={{ position: 'relative' }}>
				<SideMenu onSelectItem={onSelectItem} />
			</Grid>
			<Grid xs={10}>{selectedItem === 'overview' && <Overview />}</Grid>
		</Grid>
	)
}

export default memo(Dashboard)
