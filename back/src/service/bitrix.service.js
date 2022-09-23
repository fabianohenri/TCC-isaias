const BitrixIntegration = require('../integration/bitrix.integration')

const getUrlAuth = async () => {
    return await BitrixIntegration.getUrlAuth()
}

module.exports = {
    getUrlAuth
}