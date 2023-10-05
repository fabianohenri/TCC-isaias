import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Modal, Grid, Checkbox } from '@mui/material'
//system libs
import { extractMembersFromData } from 'utils/dataFormatUtils/filtersDashboardUtils'

import SelectTag from 'components/SelectTag/SelectTag'
import { addOnFiltersAction } from 'storage/redux/actions/dashboard.actions'
import { DEFAULT_DASHBOARD_FILTERS } from 'storage/redux/reducer/main.reducer'
import MembersFiltersCheckList from './components/MembersFiltersCheckList/MembersFiltersCheckList'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 10,
	height: '60%',
	width: '60%'
}

const getFilterOptions = (data, filters, tasks, changeType) => {
	//Verifica a partir das tags selecionados quais membros serão mostrados no select
	let tasksFiltered = data.allTasks
	let membersOptions = data.members
	let groupsOptions = data.groups
	let tagsOptions = data.tags
	let lastFilter = null
	let teste = [
		{
			type: 'groups',
			canFilter: filters.groups.length > 0,
			functionFilter: (filters, tf) => filters.groups.some((fg) => fg.id === tf.group.id),
			functionOption: (tasksAfterFilter, thisGroupsOptions) => {
				const uniqueGroups = new Set()
				tasksAfterFilter.forEach((tf) => uniqueGroups.add(tf.group.id))
				const groupsOnTasksFiltered = Array.from(uniqueGroups)
				return thisGroupsOptions.filter((go) => groupsOnTasksFiltered.includes(go.id))
			}
		},
		{
			type: 'members',
			canFilter: filters.members.length > 0,
			functionFilter: (filters, tf) => filters.members.some((fm) => tf.allUsers.includes(fm.id)),
			functionOption: (tasksAfterFilter, thisMembersOptions) => {
				const uniqueMembers = new Set()
				tasksAfterFilter.forEach((tf) => tf.allUsers.forEach((user) => uniqueMembers.add(user)))
				const membersOnTasksFiltered = Array.from(uniqueMembers)
				return thisMembersOptions.filter((mo) => membersOnTasksFiltered.includes(mo.id))
			}
		},
		{
			type: 'tags',
			canFilter: filters.tags.length > 0,
			functionFilter: (filters, tf) => filters.tags.some((tag) => tf.tags.some((tft) => tft.id === tag.id)),
			functionOption: (tasksAfterFilter, thisTagsOptions) => {
				const uniqueTags = new Set()
				tasksAfterFilter.forEach((tf) => tf.tags.forEach((tft) => uniqueTags.add(tft.id)))
				const tagsOnTasksFiltered = Array.from(uniqueTags)
				return thisTagsOptions.filter((go) => tagsOnTasksFiltered.includes(go.id))
			}
		}
	]

	lastFilter = teste.find((item) => item.type === changeType)
	if (lastFilter) {
		teste.splice(teste.indexOf(lastFilter), 1)
	}

	tasksFiltered = tasksFiltered.filter((tf) => {
		const fau = teste.map((t) => {
			if (t.canFilter) {
				return t.functionFilter(filters, tf)
			} else {
				return true
			}
		})
		return fau.every((cond) => cond)
	})

	if (changeType === 'groups') {
		const keepSelectingOptions = lastFilter.functionOption(tasksFiltered, groupsOptions)
		groupsOptions = keepSelectingOptions
	} else if (changeType === 'members') {
		const keepSelectingOptions = lastFilter.functionOption(tasksFiltered, membersOptions)
		membersOptions = keepSelectingOptions
	} else if (changeType === 'tags') {
		const keepSelectingOptions = lastFilter.functionOption(tasksFiltered, tagsOptions)
		tagsOptions = keepSelectingOptions
	}

	tasksFiltered = tasksFiltered.filter((tf) => {
		let lastCond = true
		if (lastFilter.canFilter) {
			lastCond = lastFilter.functionFilter(filters, tf)
		}
		return lastCond
	})

	teste.forEach((t) => {
		if (t.type === 'groups') {
			const changedOptions = t.functionOption(tasksFiltered, groupsOptions)
			groupsOptions = changedOptions
		} else if (t.type === 'members') {
			const changedOptions = t.functionOption(tasksFiltered, membersOptions)
			membersOptions = changedOptions
		} else if (t.type === 'tags') {
			const changedOptions = t.functionOption(tasksFiltered, tagsOptions)
			tagsOptions = changedOptions
		}
	})

	// if (filters.showOnlySelectedData) {
	// 	tasksFiltered = tasksFiltered.map((fd) => {
	// 		return {
	// 			...fd,
	// 			accomplices: fd.accomplices.filter((a) => membersIdsInFilter.includes(a.id)),
	// 			auditors: fd.auditors.filter((au) => membersIdsInFilter.includes(au.id)),
	// 			closer: membersIdsInFilter.includes(fd.closer.id) ? fd.closer : [],
	// 			creator: membersIdsInFilter.includes(fd.creator.id) ? fd.creator : [],
	// 			responsible: membersIdsInFilter.includes(fd.responsible.id) ? fd.responsible : []
	// 		}
	// 	})
	// }

	const filterData = {
		tasks: tasksFiltered,
		options: {
			members: membersOptions,
			groups: groupsOptions,
			tags: tagsOptions
		}
	}
	return filterData
}

const FiltersDashboard = ({ filtersDependantRedux, addOnFiltersDispatch, resetFiltersDispatch, data }) => {
	const [filters, setFilters] = useState(filtersDependantRedux)
	const [filterOptions, setFilterOptions] = useState(data)
	const [filteredTasks, setFilteredTasks] = useState(data.allTasks)
	const [open, setOpen] = useState(false)

	useEffect(() => {
		applyFilters(DEFAULT_DASHBOARD_FILTERS)
		if (data) {
			setFilterOptions({ groups: data.groups, members: data.members, tags: data.tags })
		}
	}, [data])

	useEffect(() => {
		setFilters(filtersDependantRedux)
	}, [filtersDependantRedux])

	const onChangeGroups = (changedGroups) => {
		const newFilters = { ...filters, groups: changedGroups }
		setFilters(newFilters)
		handleChangeSelect(newFilters, 'groups')
	}

	const onChangeMembers = (changedMembers) => {
		const newFilters = { ...filters, members: changedMembers }
		setFilters(newFilters)
		handleChangeSelect(newFilters, 'members')
	}
	const onChangeTags = (changedTags) => {
		const newFilters = { ...filters, tags: changedTags }
		setFilters(newFilters)
		handleChangeSelect(newFilters, 'tags')
	}

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const applyFilters = (defaultFilters) => {
		addOnFiltersDispatch({ dependant: defaultFilters || filters })
		setOpen(false)
	}

	const resetFilters = () => {
		setFilters(DEFAULT_DASHBOARD_FILTERS)
		applyFilters(DEFAULT_DASHBOARD_FILTERS)
	}

	const handleChangeShowOnlySelectedData = (event) => {
		setFilters({ ...filters, showOnlySelectedData: event.target.checked })
	}

	const handleChangeSelect = (newFilters, filterType) => {
		const { options, tasks } = getFilterOptions(data, newFilters, filteredTasks, filterType)
		setFilteredTasks(tasks)
		setFilterOptions(options)
	}
	// const handleOnCloseMembers = () => {
	// 	const { options, tasks } = getFilterOptions(data, filters, filteredTasks, 'members')
	// 	setFilteredTasks(tasks)
	// 	setFilterOptions(options)
	// }
	// const handleOnCloseTags = () => {
	// 	const { options, tasks } = getFilterOptions(data, filters, filteredTasks, 'tags')
	// 	setFilteredTasks(tasks)
	// 	setFilterOptions(options)
	// }

	return (
		<>
			<Button onClick={handleOpen}>Filtros</Button>
			<Modal open={open} onClose={handleClose}>
				<Card sx={style}>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<SelectTag
								label='Grupos'
								options={filterOptions.groups}
								onChange={onChangeGroups}
								selected={filters.groups}
								// onClose={handleOnCloseGroups}
							/>
							<SelectTag
								label='Membros'
								options={filterOptions.members}
								onChange={onChangeMembers}
								selected={filters.members}
								// onClose={handleOnCloseMembers}
							/>
							<SelectTag
								label='Tags'
								options={filterOptions.tags}
								onChange={onChangeTags}
								selected={filters.tags}
								// onClose={handleOnCloseTags}
							/>
						</Grid>
						<Grid item xs={6}>
							<MembersFiltersCheckList data={filters.members} />
						</Grid>
						<Grid item xs={6}>
							<Checkbox
								onChange={handleChangeShowOnlySelectedData}
								checked={filters.showOnlySelectedData}
								disabled={filters.members.length === 0}
							/>{' '}
							Mostrar apenas dados da seleção
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
	filtersDependantRedux: store?.dashboard?.filters?.dependant
})

const mapDispatchToProps = (dispatch) => ({
	addOnFiltersDispatch: (filters) => dispatch(addOnFiltersAction(filters))
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(FiltersDashboard))
