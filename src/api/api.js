import axios from "axios"

const api = {
    getmission: async function() {
        const data = await axios.get(`${process.env.REACT_APP_API_URL}mission`)
        return data
    },
    postmission: async function(mis) {
        await axios.post(`${process.env.REACT_APP_API_URL}mission`, mis)
    },
    patchmission: async function(miss, id) {
        const datar = await axios.patch(`${process.env.REACT_APP_API_URL}mission/${id}`, miss)
        return datar
    },
    deletemission: async function(id) {
        const datar = await axios.delete(`${process.env.REACT_APP_API_URL}mission/${id}`)
        return datar
    }
}

export default api