import http from '../http-common'

class OwnerService{
    authenticate(request)
    {
        return http.post('/authentications/owner', request).then((res) => {
            localStorage.setItem('token', res.data)
            return res.data
        })
    }
}

export default new OwnerService