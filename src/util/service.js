import HTTP from './http.js'

export const login = (data) => {
    return HTTP.post('auth/login', data)
}

export const signup = (data) => {
    return HTTP.post('auth/register', data)
}