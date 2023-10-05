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
import ApplyFiltersOnChildren from './middleware/ApplyFiltersOnChildren/ApplyFiltersOnChildren'
import AccountInfo from 'pages/AccountInfo/AccountInfo'

const Dashboard = ({ addOnFiltersDispatch, filtersDependantRedux, selectedMenuItemRedux }) => {
	const [filterData, setFilterData] = useState(null)
	const [allTasks, setAllTasks] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)
	const [date, setDate] = useState(DEFAULT_DASHBOARD_DATE_FILTERS)

	const load = async () => {
		setIsLoading(true)
		api.get(`/dashboard/get-all-tasks-and-groups-with-members/${date.fromDate}/${date.toDate}`)
			.then((res) => {
				setFilterData(res?.data)
				setAllTasks(res.data?.allTasks)
			})
			.catch((e) => console.error(e.response.data))
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

	return (
		<Grid container>
			<Grid xs={2} style={{ position: 'relative' }}>
				<SideMenu />
			</Grid>
			<Grid xs={10}>
				{!isLoading && allTasks.length > 0 && ['overview', 'log'].includes(selectedMenuItemRedux) && (
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
						<FiltersDashboard data={filterData} />
						<ApplyFiltersOnChildren data={allTasks} filters={filtersDependantRedux} selectedMenuItem={selectedMenuItemRedux} />
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
	filtersDependantRedux: store?.dashboard?.filters?.dependant,
	selectedMenuItemRedux: store?.dashboard?.selectedMenuItem
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(Dashboard))
