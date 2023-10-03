import React, { useState, useEffect, memo } from 'react'
import Overview from '../../modules/Overview/Overview'

const applyFilters = (data, filters) => {
	let newData = [...data]
	if (data?.length > 1 && (filters.members.length > 0 || filters.groups.length > 0 || filters.tags.length > 0)) {
		const membersIdsInFilter = filters?.members?.map((m) => m.id)
		//filtra por tag primeiro
		newData = newData.filter((task) => {
			return task.tags.some((taskTags) => filters.tags.some((filterTag) => filterTag.id === taskTags.id))
		})
		//filtra pelos membros e pelos grupos
		newData = newData.filter((d) => {
			let cond1 = true
			let cond2 = true
			if (membersIdsInFilter.length > 0) {
				cond1 = d.allUsers.some((i) => membersIdsInFilter.includes(i))
			}
			if (filters.groups.length > 0) {
				cond2 = filters.groups.map((g) => g.id).includes(d.group.id)
			}

			return cond1 && cond2
		})
		//filtra pra mostrar somente dados dos itens selecionados nos filtros
		if (filters.showOnlySelectedData) {
			newData = newData.map((fd) => {
				return {
					...fd,
					accomplices: fd.accomplices.filter((a) => membersIdsInFilter.includes(a.id)),
					auditors: fd.auditors.filter((au) => membersIdsInFilter.includes(au.id)),
					closer: membersIdsInFilter.includes(fd.closer.id) ? fd.closer : [],
					creator: membersIdsInFilter.includes(fd.creator.id) ? fd.creator : [],
					responsible: membersIdsInFilter.includes(fd.responsible.id) ? fd.responsible : []
				}
			})
		}
	}
	return newData
}

const ApplyFiltersOnChildren = ({ filters, selectedMenuItem, data }) => {
	const [filteredData, setFilteredData] = useState([])

	useEffect(() => {
		const filteredFormattedData = applyFilters(data, filters)
		setFilteredData(filteredFormattedData)
	}, [data, filters])

	return (
		<>
			{selectedMenuItem === 'overview' && <Overview data={filteredData} />}
			{selectedMenuItem === 'log' && <>LOG METRICS</>}
		</>
	)
}

export default memo(ApplyFiltersOnChildren)
