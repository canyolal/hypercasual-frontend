import axios from 'axios'
const baseURL = '/v1/games'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

export default {getAll}