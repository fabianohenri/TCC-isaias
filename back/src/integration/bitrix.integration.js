const axios = require('axios')

const url1 = 'https://domain_B24.bitrix24.com/rest/name_method.transport?parameters_method&auth=authorization_key'
// const oAuthUrl = 'https://oauth.bitrix.info' 

const clientId = 'local.632e2e33ca8e48.93525423'
const clientSecret = '7PK5jdpz1MhaXfD4ou0AXjmOr2IgbEoISskr072hCPnonVSToE'

const getAllTasks = 'https://b24-3e2lns.bitrix24.com.br/rest/1/0yail4kbumrkvgwi/task.item.list.json'
const getTaskItemById = 'https://b24-3e2lns.bitrix24.com.br/rest/1/0yail4kbumrkvgwi/task.item.getdata.json?TASKID=2'
const getTagsByTaskId = 'https://b24-3e2lns.bitrix24.com.br/rest/1/0yail4kbumrkvgwi/task.item.gettags.json?TASKID=2'
const getElapsedItems = 'https://b24-3e2lns.bitrix24.com.br/rest/1/0yail4kbumrkvgwi/task.elapseditem.getlist.json'

const urlAuth = `http://b24-3e2lns.bitrix24.com.br/oauth/authorize/?client_id=${clientId}&response_type=code&redirect_uri=http://test.com/bitrix/oauth/oauth_test.php`


// const getMetric = async () => {
//     return await axios.get('https://b24-3e2lns.bitrix24.com.br/rest/1/0yail4kbumrkvgwi/task.item.list.json')
//     .then(res => {
//         return res.data.result
//     })
//     .catch(e =>console.log(e))
    
// }
const getUrlAuth = async () => {
    return urlAuth
}

module.exports = {
    getUrlAuth
}