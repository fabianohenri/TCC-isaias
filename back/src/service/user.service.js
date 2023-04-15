const axios = require('axios')
const BitrixIntegration = require('../integration/bitrix.integration')

const getAllUsers = async (userIds) => {
	const restUrl = BitrixIntegration.getRestUrlUser()
	const formattedUserIdsParams = userIds
		.map((uId) => '&ID[]=' + uId)
		.toString()
		.replaceAll(',', '')
	let res = await axios.get(restUrl + formattedUserIdsParams)
	return res.data.result
}

module.exports = {
	getAllUsers
}
