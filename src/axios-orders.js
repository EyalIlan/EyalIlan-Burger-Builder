import Axios from 'axios'

const instance = Axios.create({
    baseURL:'https://react-burger-e8066.firebaseio.com/'
})

export default instance