import React, { useState, useEffect } from 'react'
import api from 'service/service'
import DatePicker from './components/DatePicker/DatePicker'
const fromDate = '2022-06-01'
const toDate = '2023-02-12'

const FiltersDashboard = () => {
	const [groupsAndUsers, setGroupsAndUsers] = useState([])

	const load = async () => {
		const { data } = await api.get(`/dashboard/get-all-groups-and-members/${fromDate}/${toDate}`).catch((e) => console.error(e.response.data))
		setGroupsAndUsers(data)
	}

	useEffect(() => {
		load()
	}, [])

	return (
		<>
			<DatePicker />
		</>
	)
}

export default FiltersDashboard
