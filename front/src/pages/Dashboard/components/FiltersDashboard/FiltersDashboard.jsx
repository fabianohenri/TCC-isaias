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

const FiltersDashboard = ({ filtersDependantRedux, addOnFiltersDispatch, resetFiltersDispatch, data, allTasks }) => {
	const [filters, setFilters] = useState(filtersDependantRedux)
	const [groups, setGroups] = useState([])
	const [members, setMembers] = useState([])
	const [tags, setTags] = useState([])
	const [open, setOpen] = useState(false)

	useEffect(() => {
		applyFilters(DEFAULT_DASHBOARD_FILTERS)
		if (data) {
			setGroups(data.groups.sort((a, b) => a.name.localeCompare(b.name)))
			setMembers(data.members.sort((a, b) => a.name.localeCompare(b.name)))
			let tagsData = []
			allTasks.forEach((tt) => {
				tt.tags.forEach((taskTag) => {
					const foundIndex = tagsData.findIndex((t) => t.id === taskTag.id)
					if (foundIndex === -1) {
						tagsData.push({ id: taskTag.id, name: taskTag.title, value: 1 })
					} else {
						tagsData[foundIndex].value += 1
					}
				})
			})
			tagsData = tagsData.map((ntd) => ({ ...ntd, name: `${ntd.name} (${ntd.value})` })).sort((a, b) => a.name.localeCompare(b.name))
			setTags(tagsData)
		}
	}, [data])

	useEffect(() => {
		setFilters(filtersDependantRedux)
	}, [filtersDependantRedux])

	const onChangeGroups = (changedGroups) => {
		//Verifica a partir dos grupos selecionados quais membros serão mostrados no select
		const groupsToFilter = changedGroups.length > 0 ? changedGroups : data.groups
		let membersOnGroup = new Set()
		groupsToFilter.forEach((cg) => cg.members.forEach((cgm) => membersOnGroup.add(cgm)))
		membersOnGroup = Array.from(membersOnGroup)
		const membersCanRender = data.members.filter((m) => membersOnGroup.find((mg) => mg == m.id))
		setMembers(membersCanRender)
		//A partir dos grupos selecionados, remove os membros que não pertencem a eles
		const membersToKeep = filters.members.filter((m) => membersOnGroup.find((mog) => mog === m.id))
		setFilters({ ...filters, groups: changedGroups, members: membersToKeep })
	}

	const onChangeMembers = (changedMembers) => {
		//Verifica a partir dos membros selecionados quais grupos serão mostrados no select
		const membersToFilter = changedMembers.length > 0 ? changedMembers : data.members
		let availableGroups = new Set()
		membersToFilter.forEach((cm) => cm.groups.forEach((cmg) => availableGroups.add(cmg)))
		availableGroups = Array.from(availableGroups)
		const groupsCanRender = data.groups.filter((g) => availableGroups.find((mg) => mg == g.id))
		setGroups(groupsCanRender)
		//A partir dos membros selecionados, remove os grupos que não pertencem a eles
		const groupsToKeep = filters.groups.filter((g) => availableGroups.find((gtk) => gtk === g.id))
		setFilters({ ...filters, members: changedMembers, groups: groupsToKeep })
	}
	const onChangeTags = (changedTags) => {
		//Verifica a partir dos membros selecionados quais grupos serão mostrados no select
		// const tagsToFilter = changedTags.length > 0 ? changedTags : allTags
		setFilters({ ...filters, tags: changedTags })
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

	return (
		<>
			<Button onClick={handleOpen}>Filtros</Button>
			<Modal open={open} onClose={handleClose}>
				<Card sx={style}>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<SelectTag label='Grupos' options={groups} onChange={onChangeGroups} selected={filters.groups} />
							<SelectTag label='Membros' options={members} onChange={onChangeMembers} selected={filters.members} />
							<SelectTag label='Tags' options={tags} onChange={onChangeTags} selected={filters.tags} />
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
