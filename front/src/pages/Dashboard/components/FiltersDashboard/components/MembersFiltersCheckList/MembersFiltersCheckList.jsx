import React, { memo, useEffect, useState } from 'react'
import { Checkbox, Tooltip } from '@mui/material'
import {
	RemoveRedEyeOutlined,
	RemoveRedEye,
	BorderColor,
	BorderColorOutlined,
	Person,
	PersonOutlined,
	Cancel,
	CancelOutlined,
	LocalLibraryOutlined,
	LocalLibrary
} from '@mui/icons-material'
import { formatMembersToChecklist } from 'utils/dataFormatUtils/filtersDashboardUtils'

const MembersFiltersCheckList = ({ data, onChange, membersInfo }) => {
	useEffect(() => {
		onChange(formatMembersToChecklist(data, membersInfo), 'members')
	}, [data])

	const handleOnChangeCheck = (isChecked, userId, propertyName) => {
		const foundMemberIndex = membersInfo.findIndex((it) => it.id === userId)
		let newUsers = membersInfo.map((it) => (it.id === userId && { ...it, [propertyName]: { ...it[propertyName], checked: isChecked } }) || it)
		if (
			newUsers[foundMemberIndex].accomplice.checked ||
			newUsers[foundMemberIndex].auditor.checked ||
			newUsers[foundMemberIndex].closer.checked ||
			newUsers[foundMemberIndex].creator.checked ||
			newUsers[foundMemberIndex].responsible.checked
		) {
			onChange(newUsers, 'members')
		}
	}

	return (
		<>
			{membersInfo?.map((d) => (
				<div key={d.id}>
					<div>{d.name}</div>
					<Tooltip
						title={`Observador em ${d.accomplice.value.length} tarefa${
							(d.accomplice.value.length > 1 && 's') || ''
						} para os filtros escolhidos`}
					>
						<Checkbox
							icon={<RemoveRedEyeOutlined />}
							checkedIcon={<RemoveRedEye />}
							key={d.id + 'accomplice'}
							checked={d.accomplice.checked}
							disabled={d.accomplice.value.length === 0}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'accomplice')}
						/>
					</Tooltip>
					<Tooltip
						title={`Auditor em ${d.auditor.value.length} tarefa${(d.auditor.value.length > 1 && 's') || ''} para os filtros escolhidos`}
					>
						<Checkbox
							icon={<LocalLibraryOutlined />}
							checkedIcon={<LocalLibrary />}
							key={d.id + 'auditor'}
							checked={d.auditor.checked}
							disabled={d.auditor.value.length === 0}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'auditor')}
						>
							<div>{d.auditor.value.length}</div>
						</Checkbox>
					</Tooltip>
					<Tooltip
						title={`Criador em ${d.creator.value.length} tarefa${(d.creator.value.length > 1 && 's') || ''} para os filtros escolhidos`}
					>
						<Checkbox
							icon={<BorderColorOutlined />}
							checkedIcon={<BorderColor />}
							key={d.id + 'creator'}
							checked={d.creator.checked}
							disabled={d.creator.value.length === 0}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'creator')}
						>
							<div>{d.creator.value.length}</div>
						</Checkbox>
					</Tooltip>
					<Tooltip
						title={`Responsável em ${d.responsible.value.length} tarefa${
							(d.responsible.value.length > 1 && 's') || ''
						} para os filtros escolhidos`}
					>
						<Checkbox
							icon={<PersonOutlined />}
							checkedIcon={<Person />}
							key={d.id + 'responsible'}
							checked={d.responsible.checked}
							disabled={d.responsible.value.length === 0}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'responsible')}
						>
							<div>{d.responsible.value.length}</div>
						</Checkbox>
					</Tooltip>
					<Tooltip title={`Fechou ${d.closer.value.length} tarefa${(d.closer.value.length > 1 && 's') || ''} os filtros escolhidos`}>
						<Checkbox
							icon={<CancelOutlined />}
							checkedIcon={<Cancel />}
							key={d.id + 'closer'}
							checked={d.closer.checked}
							disabled={d.closer.value.length === 0}
							onChange={(e) => handleOnChangeCheck(e.target.checked, d.id, 'closer')}
						>
							<div>{d.closer.value.length}</div>
						</Checkbox>
					</Tooltip>
				</div>
			))}
		</>
	)
}

export default memo(MembersFiltersCheckList)
