import React, { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

const DatePicker = () => {
	const [selectionRange, setSelectionRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: 'selection'
	})

	const handleSelect = ({ selection }) => {
		setSelectionRange(selection)
	}

	return <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
}

export default DatePicker
