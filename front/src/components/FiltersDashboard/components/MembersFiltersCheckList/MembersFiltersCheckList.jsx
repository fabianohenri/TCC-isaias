import React, { memo, useEffect, useState } from 'react'
import { Checkbox, Tooltip } from '@mui/material'
import {
	RemoveRedEyeOutlined,
	RemoveRedEye,
	BorderColor,
	BorderColorOutlined,
	Person,
	PersonOutlined,
	// Cancel,
	// CancelOutlined,
	LocalLibraryOutlined,
	LocalLibrary
} from '@mui/icons-material'

const MembersFiltersCheckList = ({ data, onChange }) => {
	const [thisData, setThisData] = useState(data)

	useEffect(() => {
		setThisData(data)
	}, [data])

	const handleOnChangeCheck = (isChecked, userId, propertyName) => {
		const foundMemberIndex = thisData.findIndex((it) => it.id === userId)
		let newUsers = thisData.map((it) => (it.id === userId && { ...it, [propertyName]: { ...it[propertyName], checked: isChecked } }) || it)
		if (
			newUsers[foundMemberIndex].accomplice.checked ||
			newUsers[foundMemberIndex].auditor.checked ||
			// newUsers[foundMemberIndex].closer.checked ||
			newUsers[foundMemberIndex].creator.checked ||
			newUsers[foundMemberIndex].responsible.checked
		) {
			onChange(newUsers, 'members')
		}
	}

	return (
		<>
			{thisData?.map((d) => (
				<div key={d.id}>
					<div>{d.name}</div>
					<Tooltip
						title={`Observador em ${d.accomplice.value} tarefa${
							(d.accomplice.value > 1 && 's') || ''
						} para o intervalo de tempo escolhido`}
					>
						<Checkbox
							icon={<RemoveRedEyeOutlined />}
							checkedIcon={<RemoveRedEye />}
							key={d.id + 'accomplice'}
							checked={d.accomplice.checked}
							disabled={d.accomplice.disabled}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'accomplice')}
						/>
					</Tooltip>
					<Tooltip title={`Auditor em ${d.auditor.value} tarefa${(d.auditor.value > 1 && 's') || ''} para o intervalo de tempo escolhido`}>
						<Checkbox
							icon={<LocalLibraryOutlined />}
							checkedIcon={<LocalLibrary />}
							key={d.id + 'auditor'}
							checked={d.auditor.checked}
							disabled={d.auditor.disabled}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'auditor')}
						>
							<div>{d.auditor.value}</div>
						</Checkbox>
					</Tooltip>
					<Tooltip title={`Criador em ${d.creator.value} tarefa${(d.creator.value > 1 && 's') || ''} para o intervalo de tempo escolhido`}>
						<Checkbox
							icon={<BorderColorOutlined />}
							checkedIcon={<BorderColor />}
							key={d.id + 'creator'}
							checked={d.creator.checked}
							disabled={d.creator.disabled}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'creator')}
						>
							<div>{d.creator.value}</div>
						</Checkbox>
					</Tooltip>
					<Tooltip
						title={`Responsável em ${d.responsible.value} tarefa${
							(d.responsible.value > 1 && 's') || ''
						} para o intervalo de tempo escolhido`}
					>
						<Checkbox
							icon={<PersonOutlined />}
							checkedIcon={<Person />}
							key={d.id + 'responsible'}
							checked={d.responsible.checked}
							disabled={d.responsible.disabled}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'responsible')}
						>
							<div>{d.responsible.value}</div>
						</Checkbox>
					</Tooltip>
					{/* <Tooltip title={`Fechou ${d.closer.value} tarefa${(d.closer.value > 1 && 's') || ''} no intervalo de tempo escolhido`}>
						<Checkbox
							icon={<CancelOutlined />}
							checkedIcon={<Cancel />}
							key={d.id + 'closer'}
							checked={d.closer.checked}
							disabled={d.closer.disabled}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'closer')}
						>
							<div>{d.closer.value}</div>
						</Checkbox>
					</Tooltip> */}
					{/* não tem o filtro de closed by na api */}
				</div>
			))}
		</>
	)
}

export default memo(MembersFiltersCheckList)
