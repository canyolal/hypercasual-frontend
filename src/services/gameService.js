import axios from 'axios'

export default axios.create({
    baseURL : "http://localhost:4001/v1",
    headers : {
        "Content-type": "application/json"
    }
});