import axios from './api'
const AuthService = {
    async userRegister(user) {
        const response = await axios.post('/users', {user})
        return response.data
    },
    async userLogin(user) {
        const respones = await axios.post('users/login', {user})
        return respones
    },
    async getUser() {
        const response = await axios.get('/user')
    }
}

export default AuthService