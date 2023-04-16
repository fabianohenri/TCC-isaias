import React, { useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
}

const getStyles = (name, personName, theme) => {
	return {
		fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
	}
}

const SelectTag = ({ label, options, onChange, selected }) => {
	const theme = useTheme()
	const [selectedOptions, setSelectedOptions] = useState([])

	const handleChange = (event) => {
		onChange(event.target.value)
		if (!selected) {
			setSelectedOptions(event.target.value)
		}
	}

	useEffect(() => {
		setSelectedOptions(selected)
	}, [selected])

	return (
		<FormControl sx={{ m: 1, width: '100%' }}>
			<InputLabel>{label}</InputLabel>
			<Select
				multiple
				value={selectedOptions}
				onChange={handleChange}
				input={<OutlinedInput label='Chip' />}
				renderValue={(selected) => (
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{selected.map((value) => (
							<Chip key={value.id + value.name} label={value.name} />
						))}
					</Box>
				)}
				MenuProps={MenuProps}
			>
				{options.map((obj) => (
					<MenuItem key={obj.id + obj.name} value={obj} style={getStyles(obj, selectedOptions, theme)} disabled={obj.disabled}>
						{obj.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default SelectTag
