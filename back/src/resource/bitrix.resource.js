const BitrixService = require('../service/bitrix.service')

const getUrlAuth = async (req, res) => {
    try {
        const teste = await BitrixService.getUrlAuth()
        return res.status(200).send(teste)
    } catch (e) {
        console.error(e)
        return res.status(500).send('Erro ao buscar url de autenticação')
    }
   
}

module.exports = {
    getUrlAuth
}