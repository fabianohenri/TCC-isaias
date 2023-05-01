const BitrixService = require('./bitrix.service')
const UserAccountService = require('./userAccount.service')
const { formatSimpleUser } = require('../utils/utils')

const getAllTasksAndGroupsWithMembers = async (userId, fromDate, toDate) => {
	const [bitrixAccessInfo] = await UserAccountService.getUsersByIds(userId)
	let bitrixAccess = {
		fullDomain: bitrixAccessInfo.domain_bitrix,
		accessToken: bitrixAccessInfo.access_token_bitrix,
		refreshToken: bitrixAccessInfo.refresh_token_bitrix
	}
	let allTasks = await BitrixService.getAllTasksWithFilters(bitrixAccess, fromDate, toDate)
	if (allTasks.status === 401) {
		bitrixAccess = allTasks.newAccess
		allTasks = await BitrixService.getAllTasksWithFilters(bitrixAccess, fromDate, toDate)
	}

	let groups = [] //tem os usuários dentro dele
	allTasks.forEach((task) => {
		//Grupo (projeto)
		const groupFoundIndex = groups.findIndex((g) => g.id === task.group.id)
		let groupIndex = groupFoundIndex
		if (groupFoundIndex === -1) {
			groups.push({ ...task.group, members: [] })
			groupIndex = groups.length - 1
		}
		//Usuários dentro do grupo
		const taskAuditors = task.auditors.map((it) => ({ id: it, auditor: [task.id] }))
		const taskCreator = { id: task.createdBy, creator: [task.id] }
		const taskResponsible = { id: task.responsibleId, responsible: [task.id] }
		const taskClosedBy = { id: task.createdBy, closer: [task.id] }
		const taskAccomplices = task.accomplices.map((it) => ({ id: it, accomplice: [task.id] }))
		const allTaskUsers = [...taskAuditors, taskCreator, taskResponsible, taskClosedBy, ...taskAccomplices]
		let formattedAllTaskUsers = []
		allTaskUsers.forEach((atu) => {
			const foundIndex = formattedAllTaskUsers.findIndex((fatu) => fatu.id === atu.id)
			if (foundIndex === -1) {
				formattedAllTaskUsers.push({ auditor: [], creator: [], responsible: [], closer: [], accomplice: [], ...atu })
			} else {
				atu.auditor && formattedAllTaskUsers[foundIndex].auditor.push(...atu.auditor)
				atu.creator && formattedAllTaskUsers[foundIndex].creator.push(...atu.creator)
				atu.responsible && formattedAllTaskUsers[foundIndex].responsible.push(...atu.responsible)
				atu.closer && formattedAllTaskUsers[foundIndex].closer.push(...atu.closer)
				atu.accomplice && formattedAllTaskUsers[foundIndex].accomplice.push(...atu.accomplice)
			}
		})
		formattedAllTaskUsers.forEach((ftuser) => {
			const memberIndexFound = groups[groupIndex].members.findIndex((member) => member.id === ftuser.id)
			if (memberIndexFound === -1) {
				groups[groupIndex].members.push(ftuser)
			} else {
				groups[groupIndex].members[memberIndexFound].auditor.push(...ftuser.auditor)
				groups[groupIndex].members[memberIndexFound].creator.push(...ftuser.creator)
				groups[groupIndex].members[memberIndexFound].responsible.push(...ftuser.responsible)
				groups[groupIndex].members[memberIndexFound].closer.push(...ftuser.closer)
				groups[groupIndex].members[memberIndexFound].accomplice.push(...ftuser.accomplice)
			}
		})
	})

	for (let group of groups) {
		const users = await BitrixService.getBitrixUsersByIds(
			bitrixAccess,
			group.members.map((it) => it.id)
		)
		group.members = group.members.map((gm) => ({ ...gm, ...formatSimpleUser(users.find((u) => u.ID === gm.id)) }))
	}
	return { groups, allTasks }
}

module.exports = {
	getAllTasksAndGroupsWithMembers
}
