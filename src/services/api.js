import axios from 'axios'
const config = require('../conf/config')

const api = axios.create({
    baseURL:`http://${config.server}:${config.portServer}`
})

export default api