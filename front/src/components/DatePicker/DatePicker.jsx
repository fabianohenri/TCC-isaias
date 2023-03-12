import React, { useState } from 'react'
import { DateRangePicker, defaultStaticRanges, defaultInputRanges } from 'react-date-range'
import { pt } from 'date-fns/locale'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { Button } from '@mui/material'

const defaultSelection = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection'
}

const DatePicker = ({ onChange, selectionValue }) => {
	const [selectionRange, setSelectionRange] = useState(selectionValue || defaultSelection)
	//Traduzindo pra pt
	const [staticRanges] = useState(
		['Hoje', 'Ontem', 'Semana atual', 'Semana passada', 'Mês atual', 'Mês passado'].map((it, idx) => ({
			...defaultStaticRanges[idx],
			label: it
		}))
	)
	//Traduzindo pra pt
	const [inputRanges] = useState(
		['dias até hoje', 'dias a partir de hoje'].map((it, idx) => ({
			...defaultInputRanges[idx],
			label: it
		}))
	)

	const handleSelect = ({ selection }) => {
		setSelectionRange(selection)
	}
	const onApply = () => {
		onChange(selectionRange.startDate, selectionRange.endDate)
	}

	return (
		<>
			<DateRangePicker ranges={[selectionRange]} onChange={handleSelect} locale={pt} staticRanges={staticRanges} inputRanges={inputRanges} />{' '}
			<Button onClick={onApply}>Aplicar</Button>
		</>
	)
}

export default DatePicker
