import React, { useState, useEffect, memo } from 'react'
import Overview from '../../modules/Overview/Overview'
import { connect } from 'react-redux'

const applyFilters = (data, filters) => {
	let newData = data
	if (data?.length > 1 && (filters.members.length > 0 || filters.groups.length > 0)) {
		const membersIdsInFilter = filters?.members?.map((m) => m.id)
		//filtra pelos membros e pelos grupos
		newData = data.filter((d) => {
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

const ApplyFiltersOnChildren = ({ filtersDependantRedux, selectedItem, data }) => {
	const [filteredData, setFilteredData] = useState([])

	useEffect(() => {
		setFilteredData(applyFilters(data, filtersDependantRedux))
	}, [data, filtersDependantRedux])

	return <>{selectedItem === 'overview' && <Overview data={filteredData} />}</>
}

const mapStateToProps = ({ store }) => ({
	filtersDependantRedux: store?.dashboard?.filters?.dependant
})

export default connect(mapStateToProps)(memo(ApplyFiltersOnChildren))
