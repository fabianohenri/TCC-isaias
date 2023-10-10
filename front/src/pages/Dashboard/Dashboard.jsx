import React, { useState, useEffect, memo } from 'react'
import api from 'service/service'
import SideMenu from 'components/SideMenu/SideMenu'
import FiltersDashboard from './components/FiltersDashboard/FiltersDashboard'
import { connect } from 'react-redux'
import { DEFAULT_DASHBOARD_DATE_FILTERS } from 'storage/redux/reducer/main.reducer'
import { Unstable_Grid2 as Grid } from '@mui/material'
import { addOnFiltersAction } from 'storage/redux/actions/dashboard.actions'
import AccountInfo from 'pages/AccountInfo/AccountInfo'
import Overview from './modules/Overview/Overview'
import GraphsModule from './modules/GraphsModule/GraphsModule'
import CalendarDatePicker from 'components/CalendarDatePicker/CalendarDatePicker'

const Dashboard = ({ addOnFiltersDispatch, selectedMenuItemRedux }) => {
	const [originalFilterData, setOriginalFilterData] = useState(null)
	const [tasksFiltered, setTasksFiltered] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const [date, setDate] = useState(DEFAULT_DASHBOARD_DATE_FILTERS)

	const load = async () => {
		setIsLoading(true)
		api.get(`/dashboard/get-all-tasks-and-groups-with-members/${date.fromDate}/${date.toDate}`)
			.then((res) => {
				setOriginalFilterData(res?.data)
				setTasksFiltered(res?.data?.allTasks)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		load()
	}, [date])

	const handleOnApplyFilters = (newTasksFiltered) => {
		setTasksFiltered(newTasksFiltered)
	}

	const handleOnApplyDate = (newDate) => {
		setDate(newDate)
		addOnFiltersDispatch(newDate)
	}

	return (
		<Grid container spacing={0}>
			<Grid xs={2} style={{ position: 'relative' }}>
				<SideMenu />
			</Grid>
			<Grid xs={10}>
				<>
					<div
						style={{
							paddingLeft: '1.3em',
							display: 'flex',
							backgroundColor: '#ffffff',
							borderRadius: '0px 0px 10px 10px',
							boxShadow: '2px 2px rgba(0,0,0,0.1)',
							height: '4em'
						}}
					>
						<CalendarDatePicker onApplyDate={handleOnApplyDate} />
						{!isLoading && (
							<FiltersDashboard
								data={originalFilterData}
								onApplyFilters={handleOnApplyFilters}
								loading={isLoading}
								buttonStyle={{ marginLeft: '1.5em' }}
							/>
						)}
					</div>
					{!isLoading && originalFilterData?.allTasks?.length > 0 && ['overview', 'graphs'].includes(selectedMenuItemRedux) && (
						<>
							{selectedMenuItemRedux === 'overview' && <Overview data={tasksFiltered} />}
							{selectedMenuItemRedux === 'graphs' && <GraphsModule data={tasksFiltered} isLoading={false} />}
						</>
					)}
				</>
				{selectedMenuItemRedux === 'account' && <AccountInfo />}
			</Grid>
		</Grid>
	)
}

const mapDispatchToProps = (dispatch) => ({
	addOnFiltersDispatch: (filters) => dispatch(addOnFiltersAction(filters))
})

const mapStateToProps = ({ store }) => ({
	selectedMenuItemRedux: store?.dashboard?.selectedMenuItem
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Dashboard))
