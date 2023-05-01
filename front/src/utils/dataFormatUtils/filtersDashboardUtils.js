const extractMembersFromData = (data) => {
	const uniqueMembers = []
	data.groups.forEach((it) =>
		it.members.forEach((m) => {
			const memberFoundIndex = uniqueMembers.findIndex((um) => um.id === m.id)
			if (memberFoundIndex === -1) {
				uniqueMembers.push(m)
			} else {
				uniqueMembers[memberFoundIndex].accomplice.push(m.accomplice)
				uniqueMembers[memberFoundIndex].auditor.push(m.auditor)
				uniqueMembers[memberFoundIndex].closer.push(m.closer)
				uniqueMembers[memberFoundIndex].creator.push(m.creator)
				uniqueMembers[memberFoundIndex].responsible.push(m.responsible)
			}
		})
	)

	return uniqueMembers
}

const formatMembersToChecklist = (members, membersInfo) =>
	members.map((it) => {
		const memberFound = membersInfo?.find((mi) => mi.id == it.id)
		return {
			...it,
			accomplice: { value: it.accomplice, checked: memberFound ? memberFound.accomplice.checked : it.accomplice.length > 0 },
			auditor: { value: it.auditor, checked: memberFound ? memberFound.auditor.checked : it.auditor.length > 0 },
			closer: { value: it.closer, checked: memberFound ? memberFound.closer.checked : it.closer.length > 0 },
			creator: { value: it.creator, checked: memberFound ? memberFound.creator.checked : it.creator.length > 0 },
			responsible: { value: it.responsible, checked: memberFound ? memberFound.responsible.checked : it.responsible.length > 0 }
		}
	})

export { extractMembersFromData, formatMembersToChecklist }
