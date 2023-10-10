import React, { memo } from 'react'
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

const MembersFiltersCheckList = ({ data }) => {
	return (
		<>
			{data?.map((d) => (
				<div key={d.id}>
					<div>{d.name}</div>
					<Tooltip
						title={`Observador em ${d.accomplice.length} tarefa${(d.accomplice.length > 1 && 's') || ''} para os filtros escolhidos`}
					>
						<Checkbox
							icon={<RemoveRedEyeOutlined />}
							checkedIcon={<RemoveRedEye />}
							key={d.id + 'accomplice'}
							checked={d.accomplice.length !== 0}
							disabled={d.accomplice.length === 0}
						/>
					</Tooltip>
					<Tooltip title={`Participante em ${d.auditor.length} tarefa${(d.auditor.length > 1 && 's') || ''} para os filtros escolhidos`}>
						<Checkbox
							icon={<LocalLibraryOutlined />}
							checkedIcon={<LocalLibrary />}
							key={d.id + 'auditor'}
							checked={d.auditor.length !== 0}
							disabled={d.auditor.length === 0}
						>
							<div>{d.auditor.length}</div>
						</Checkbox>
					</Tooltip>
					<Tooltip title={`Criador em ${d.creator.length} tarefa${(d.creator.length > 1 && 's') || ''} para os filtros escolhidos`}>
						<Checkbox
							icon={<BorderColorOutlined />}
							checkedIcon={<BorderColor />}
							key={d.id + 'creator'}
							checked={d.creator.length !== 0}
							disabled={d.creator.length === 0}
						>
							<div>{d.creator.length}</div>
						</Checkbox>
					</Tooltip>
					<Tooltip
						title={`Responsável em ${d.responsible.length} tarefa${(d.responsible.length > 1 && 's') || ''} para os filtros escolhidos`}
					>
						<Checkbox
							icon={<PersonOutlined />}
							checkedIcon={<Person />}
							key={d.id + 'responsible'}
							checked={d.responsible.length !== 0}
							disabled={d.responsible.length === 0}
						>
							<div>{d.responsible.length}</div>
						</Checkbox>
					</Tooltip>
					<Tooltip title={`Fechou ${d.closer.length} tarefa${(d.closer.length > 1 && 's') || ''} os filtros escolhidos`}>
						<Checkbox
							icon={<CancelOutlined />}
							checkedIcon={<Cancel />}
							key={d.id + 'closer'}
							checked={d.closer.length !== 0}
							disabled={d.closer.length === 0}
						>
							<div>{d.closer.length}</div>
						</Checkbox>
					</Tooltip>
				</div>
			))}
		</>
	)
}

export default memo(MembersFiltersCheckList)
