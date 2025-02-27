import HTTP from './http.js'

export const login = (data) => {
    return HTTP.post('login', data)
}

export const signup = (data) => {
    return HTTP.post('signup', data)
}