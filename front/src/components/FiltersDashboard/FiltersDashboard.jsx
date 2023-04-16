import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { CalendarMonth } from '@mui/icons-material'
import { Button, Card, Modal, Collapse, IconButton, Paper, Typography, Grid } from '@mui/material'
import moment from 'moment-timezone'
//system libs
import api from 'service/service'
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

const FiltersDashboard = ({ filtersRedux, changeFiltersDispatch, resetFiltersDispatch }) => {
	const [filters, setFilters] = useState(filtersRedux)
	const [groups, setGroups] = useState([])
	const [members, setMembers] = useState([])
	const [canRenderMembers, setCanRenderMembers] = useState([])
	const [canRenderGroups, setCanRenderGroups] = useState([])

	const [open, setOpen] = useState(false)
	const [isOpenDatePicker, setIsOpenDatePicker] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const load = () => {
		setIsLoading(true)
		api.get(`/dashboard/get-all-groups-with-members/${filters.fromDate}/${filters.toDate}`)
			.then((res) => {
				//Membros
				let newMembers = []
				res.data.forEach((it) => {
					if (newMembers.length === 0) {
						newMembers.push(...it.members)
					} else {
						it.members.forEach((m) => {
							let foundIndex = newMembers.findIndex((nm) => nm.id === m.id)
							if (foundIndex !== -1) {
								newMembers[foundIndex].accomplice += m.accomplice
								newMembers[foundIndex].auditor += m.auditor
								// newMembers[foundIndex].closer += m.closer
								newMembers[foundIndex].creator += m.creator
								newMembers[foundIndex].responsible += m.responsible
							} else {
								newMembers.push(m)
							}
						})
					}
				})

				const formattedNewMembers = newMembers.map((it) => ({
					...it,
					accomplice: { value: it.accomplice, checked: !!it.accomplice, disabled: !it.accomplice },
					auditor: { value: it.auditor, checked: !!it.auditor, disabled: !it.auditor },
					// closer: { value: it.closer, checked: !!it.closer, disabled: !it.closer },
					creator: { value: it.creator, checked: !!it.creator, disabled: !it.creator },
					responsible: { value: it.responsible, checked: !!it.responsible, disabled: !it.responsible }
				}))

				const filteredMembers = [...new Map(formattedNewMembers.map((item) => [item.id, item])).values()]

				setMembers(filteredMembers)
				setCanRenderMembers(filteredMembers)
				//Grupos
				setGroups(res.data)
				setCanRenderGroups(res.data)
			})
			.catch((e) => console.error(e.response.data))
			.finally(() => {
				setIsLoading(false)
			})
	}

	useEffect(() => {
		load()
	}, [filters.fromDate, filters.toDate])

	const onChangeGroups = (thisGroups) => {
		//Arruma os membros que podem ser mostrados a partir dos grupos selecionados
		let filteredMembers = []
		if (thisGroups?.length > 0) {
			let newMembers = []
			thisGroups.forEach((it) => {
				if (newMembers.length === 0) {
					newMembers.push(...it.members)
				} else {
					it.members.forEach((m) => {
						let foundIndex = newMembers.findIndex((nm) => nm.id === m.id)
						if (foundIndex !== -1) {
							newMembers[foundIndex].accomplice += m.accomplice
							newMembers[foundIndex].auditor += m.auditor
							// newMembers[foundIndex].closer += m.closer
							newMembers[foundIndex].creator += m.creator
							newMembers[foundIndex].responsible += m.responsible
						} else {
							newMembers.push(m)
						}
					})
				}
			})

			console.log(newMembers)

			const formattedNewMembers = newMembers.map((it) => ({
				...it,
				accomplice: { value: it.accomplice, checked: !!it.accomplice, disabled: !it.accomplice },
				auditor: { value: it.auditor, checked: !!it.auditor, disabled: !it.auditor },
				// closer: { value: it.closer, checked: !!it.closer, disabled: !it.closer },
				creator: { value: it.creator, checked: !!it.creator, disabled: !it.creator },
				responsible: { value: it.responsible, checked: !!it.responsible, disabled: !it.responsible }
			}))

			filteredMembers = [...new Map(formattedNewMembers.map((item) => [item.id, item])).values()]
		} else {
			filteredMembers = members
		}
		setCanRenderMembers(filteredMembers)
		//Remove dos selecionados se não possuir o membro naquele grupo
		let canKeepSelectedMembers = filters.members.filter((it) => filteredMembers.find((nm) => nm.id === it.id))
		setFilters({ ...filters, groups: thisGroups, members: canKeepSelectedMembers })
	}
	const onChangeMembers = (thisMembers) => {
		//Arruma os grupos que podem ser mostrados a partir dos membros selecionados
		let newGroups = groups.filter((it) => thisMembers.every((tm) => it.members.find((m) => m.id === tm.id)))
		setCanRenderGroups(newGroups)
		//Remove dos selecionados se não possuir o grupo daquele membro
		let canKeepSelectedGroups = filters.groups.filter((it) => newGroups.find((nm) => nm.id === it.id))
		setFilters({ ...filters, members: thisMembers, groups: canKeepSelectedGroups })
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

	const onChangeFilter = (value, filterName) => {
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
							<SelectTag label='Grupos' options={canRenderGroups} onChange={onChangeGroups} selected={filters.groups} />
							<SelectTag label='Membros' options={canRenderMembers} onChange={onChangeMembers} selected={filters.members} />
						</Grid>
						<Grid item xs={6}>
							<MembersFiltersCheckList data={filters.members} onChange={onChangeFilter} />
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
