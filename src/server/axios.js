import axios from 'axios'
import store from '../store/index'

axios.defaults.withCredentials = true
const token = store.state.token
if(token) {
  axios.defaults.headers.common['Authorization'] = token
}
export default axios