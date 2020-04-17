import axios from 'axios'
const config = require('../conf/config')

const api = axios.create({
    baseURL:`${config.backendProtocol}://${config.backendHost}:${config.backendPort}`
})

export default api