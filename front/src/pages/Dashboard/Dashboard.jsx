import React, { useState, useEffect, memo } from 'react'
import api from 'service/service'
import SideMenu from 'components/SideMenu/SideMenu'
import FiltersDashboard from './components/FiltersDashboard/FiltersDashboard'
import { connect } from 'react-redux'
import { DEFAULT_DASHBOARD_DATE_FILTERS } from 'storage/redux/reducer/main.reducer'
import DatePicker from 'components/DatePicker/DatePicker'
import { CalendarMonth } from '@mui/icons-material'
import moment from 'moment-timezone'
import { Collapse, IconButton, Paper, Typography, Unstable_Grid2 as Grid } from '@mui/material'
import { addOnFiltersAction } from 'storage/redux/actions/dashboard.actions'
import AccountInfo from 'pages/AccountInfo/AccountInfo'
import Overview from './modules/Overview/Overview'
import GraphsModule from './modules/GraphsModule/GraphsModule'

const Dashboard = ({ addOnFiltersDispatch, selectedMenuItemRedux }) => {
	const [originalFilterData, setOriginalFilterData] = useState(null)
	const [tasksFiltered, setTasksFiltered] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)
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

	const toggleIsOpenDatePicker = () => {
		setIsOpenDatePicker(!isOpenDatePicker)
	}

	const onChangeDatePicker = (fromDate, toDate) => {
		const newDate = {
			fromDate: moment(fromDate).format('YYYY-MM-DD'),
			toDate: moment(toDate).format('YYYY-MM-DD')
		}
		setDate(newDate)
		addOnFiltersDispatch(newDate)
		setIsOpenDatePicker(false)
	}

	const handleOnApplyFilters = (newTasksFiltered) => {
		setTasksFiltered(newTasksFiltered)
	}

	return (
		<Grid container>
			<Grid xs={2} style={{ position: 'relative' }}>
				<SideMenu />
			</Grid>
			<Grid xs={10}>
				{!isLoading && originalFilterData?.allTasks?.length > 0 && ['overview', 'graphs'].includes(selectedMenuItemRedux) && (
					<>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<IconButton onClick={toggleIsOpenDatePicker}>
								<CalendarMonth />
							</IconButton>
							<Typography sx={{ fontSize: '1em' }}>
								{moment(date.fromDate).format('DD/MM/YYYY')} - {moment(date.toDate).format('DD/MM/YYYY')}
							</Typography>
						</div>

						<Collapse in={isOpenDatePicker}>
							<Paper>
								<DatePicker
									onChange={onChangeDatePicker}
									selectionValue={{
										startDate: moment(date.fromDate, 'YYYY-MM-DD').toDate(),
										endDate: moment(date.toDate, 'YYYY-MM-DD').toDate(),
										key: 'selection'
									}}
								/>
							</Paper>
						</Collapse>
						<FiltersDashboard data={originalFilterData} onApplyFilters={handleOnApplyFilters} />
						<>
							{selectedMenuItemRedux === 'overview' && <Overview data={tasksFiltered} />}
							{selectedMenuItemRedux === 'graphs' && <GraphsModule data={tasksFiltered} isLoading={false} />}
						</>
					</>
				)}
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
