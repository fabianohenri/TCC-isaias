import React, { useState } from 'react'
import { DateRangePicker, defaultStaticRanges, defaultInputRanges } from 'react-date-range'
import { pt } from 'date-fns/locale'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { Button } from '@mui/material'
import moment from 'moment-timezone'

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
		const isValidEndDate = moment().isAfter(selection.endDate)
		if (!isValidEndDate) {
			selection.endDate = moment().toDate()
		}
		setSelectionRange(selection)
	}
	const onApply = () => {
		onChange(selectionRange.startDate, selectionRange.endDate)
	}

	return (
		<>
			<div style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', width: 'fit-content', marginBottom: '2em' }}>
				<DateRangePicker
					maxDate={moment().tz('America/Sao_Paulo').toDate()}
					minDate={moment.tz('2015-01-01', 'America/Sao_Paulo').toDate()}
					ranges={[selectionRange]}
					onChange={handleSelect}
					locale={pt}
					staticRanges={staticRanges}
					inputRanges={inputRanges}
				/>
			</div>
			<Button onClick={onApply} variant='contained' fullWidth>
				Aplicar data
			</Button>
		</>
	)
}

export default DatePicker
