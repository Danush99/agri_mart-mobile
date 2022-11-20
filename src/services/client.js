import axios from 'axios';
//192.168.43.113 - phone
//192.168.1.6 - homeFiber
//192.168.25.19 - amma
export default axios.create({ baseURL: 'http://192.168.1.6:5000'});
export const baseUrl='http://192.168.1.6:5000'

