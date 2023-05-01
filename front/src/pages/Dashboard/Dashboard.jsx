import React, { useState, useEffect, memo } from 'react'
import { Unstable_Grid2 as Grid } from '@mui/material'
import api from 'service/service'
import SideMenu from 'components/SideMenu/SideMenu'
import Overview from './modules/Overview/Overview'
import FiltersDashboard from './components/FiltersDashboard/FiltersDashboard'
import { connect } from 'react-redux'

const Dashboard = ({ filters }) => {
	const [selectedItem, setSelectedItem] = useState('overview')
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState(null)

	const onSelectItem = (item) => {
		setSelectedItem(item)
	}

	const load = async () => {
		setIsLoading(true)
		api.get(`/dashboard/get-all-tasks-and-groups-with-members/${filters.fromDate}/${filters.toDate}`)
			.then((res) => {
				setData(res.data)
			})
			.catch((e) => console.error(e.response.data))
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		load()
	}, [filters.fromDate, filters.toDate])

	return (
		<Grid container>
			<Grid xs={2} style={{ position: 'relative' }}>
				<SideMenu onSelectItem={onSelectItem} />
			</Grid>
			<Grid xs={10}>
				<FiltersDashboard data={data} />
				{selectedItem === 'overview' && <Overview filters={filters} data={data} />}
			</Grid>
		</Grid>
	)
}

const mapStateToProps = ({ store }) => ({
	filters: store?.dashboard?.filters
})

export default connect(mapStateToProps)(memo(Dashboard))
