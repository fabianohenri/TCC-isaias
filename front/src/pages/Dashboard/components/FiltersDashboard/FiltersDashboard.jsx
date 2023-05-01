import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { CalendarMonth } from '@mui/icons-material'
import moment from 'moment-timezone'
import { Button, Card, Modal, Collapse, IconButton, Paper, Typography, Grid } from '@mui/material'
//system libs
import { extractMembersFromData } from 'utils/dataFormatUtils/filtersDashboardUtils'
import DatePicker from 'components/DatePicker/DatePicker'
import SelectTag from 'components/SelectTag/SelectTag'
import { changeFiltersAction } from 'storage/redux/actions/dashboard.actions'
import { DEFAULT_DASHBOARD_FILTERS } from 'storage/redux/reducer/main.reducer'
import MembersFiltersCheckList from './components/MembersFiltersCheckList/MembersFiltersCheckList'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 10
}

const FiltersDashboard = ({ filtersRedux, changeFiltersDispatch, resetFiltersDispatch, data }) => {
	const [filters, setFilters] = useState(filtersRedux)
	const [groups, setGroups] = useState([])
	const [members, setMembers] = useState([])
	const [open, setOpen] = useState(false)
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)

	useEffect(() => {
		if (data) {
			setGroups(data.groups)
			setMembers(extractMembersFromData(data))
		}
	}, [data])

	const onChangeGroups = (thisGroups) => {
		//Arruma os membros que podem ser mostrados a partir dos grupos selecionados
		let filteredMembers = members
		if (thisGroups?.length > 0) {
			let newMembers = []
			thisGroups.forEach((i) => newMembers.push(...i.members))
			filteredMembers = [...new Map(newMembers.map((item) => [item.id, item])).values()]
		}
		//Remove dos selecionados se não possuir o membro naquele grupo
		let canKeepSelectedMembers = filters.members.filter((it) => filteredMembers.find((nm) => nm.id === it.id))
		setFilters({ ...filters, groups: thisGroups, members: canKeepSelectedMembers })
	}

	const onChangeMembers = (thisMembers) => {
		setFilters({ ...filters, members: thisMembers })
	}

	const toggleIsOpenDatePicker = () => {
		setIsOpenDatePicker(!isOpenDatePicker)
	}

	const onChangeDatePicker = (fromDate, toDate) => {
		setFilters({
			...filters,
			fromDate: moment(fromDate).format('YYYY-MM-DD'),
			toDate: moment(toDate).format('YYYY-MM-DD'),
			members: [],
			groups: []
		})
		setIsOpenDatePicker(false)
	}

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const applyFilters = (defaultFilters) => {
		changeFiltersDispatch(defaultFilters || filters)
		setOpen(false)
	}

	const resetFilters = () => {
		setFilters(DEFAULT_DASHBOARD_FILTERS)
		applyFilters(DEFAULT_DASHBOARD_FILTERS)
	}

	const onChangeMemberChecklistFilter = (value, filterName) => {
		setFilters({ ...filters, [filterName]: value })
	}

	return (
		<>
			<Button onClick={handleOpen}>Filtros</Button>
			<Modal open={open} onClose={handleClose}>
				<Card sx={style}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<IconButton onClick={toggleIsOpenDatePicker}>
							<CalendarMonth />
						</IconButton>
						<Typography sx={{ fontSize: '1em' }}>
							{moment(filters.fromDate).format('DD/MM/YYYY')} - {moment(filters.toDate).format('DD/MM/YYYY')}
						</Typography>
					</div>

					<Collapse in={isOpenDatePicker}>
						<Paper>
							<DatePicker
								onChange={onChangeDatePicker}
								selectionValue={{
									startDate: moment(filters.fromDate, 'YYYY-MM-DD').toDate(),
									endDate: moment(filters.toDate, 'YYYY-MM-DD').toDate(),
									key: 'selection'
								}}
							/>
						</Paper>
					</Collapse>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<SelectTag label='Grupos' options={groups} onChange={onChangeGroups} selected={filters.groups} />
							<SelectTag label='Membros' options={members} onChange={onChangeMembers} selected={filters.members} />
						</Grid>
						<Grid item xs={6}>
							<MembersFiltersCheckList
								data={filters.members}
								onChange={onChangeMemberChecklistFilter}
								membersInfo={filters.membersInfo}
							/>
						</Grid>
						<Button onClick={() => applyFilters()}>Aplicar</Button>
						<Button onClick={resetFilters}>Resetar</Button>
					</Grid>
				</Card>
			</Modal>
		</>
	)
}

const mapStateToProps = ({ store }) => ({
	filtersRedux: store?.dashboard?.filters
})

const mapDispatchToProps = (dispatch) => ({
	changeFiltersDispatch: (filters) => dispatch(changeFiltersAction(filters))
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(FiltersDashboard))
