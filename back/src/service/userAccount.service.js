const UserAccountRepository = require('../repository/userAccount.repository')

const getUsersByIds = async (userIds) => {
	userIds = userIds.toString()
	const users = await UserAccountRepository.getUsersByIds(userIds)
	return users
}

module.exports = {
	getUsersByIds
}
