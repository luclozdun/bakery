import axios from 'axios'

export default axios.create({
    baseURL: 'http://keekooya-api.us-east-1.elasticbeanstalk.com',
    headers: {
        'Content-type': 'application/json'
    }
})