import React, { useState, useEffect, memo } from 'react'
import Overview from '../../modules/Overview/Overview'
import { connect } from 'react-redux'

const applyFilters = (data, filters) => {
	let newData = data
	if (data?.length > 1 && (filters.members.length > 0 || filters.groups.length > 0)) {
		newData = data.filter((d) => {
			let cond1 = true
			let cond2 = true
			if (filters.members.length > 0) {
				const membersInFilter = filters.members.map((m) => m.id)
				cond1 = d.allUsers.some((i) => membersInFilter.includes(i))
			}
			if (filters.groups.length > 0) {
				cond2 = filters.groups.map((g) => g.id).includes(d.group.id)
			}
			return cond1 && cond2
		})
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
