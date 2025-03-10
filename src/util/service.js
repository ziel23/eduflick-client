import HTTP from './http.js'

export const login = (data) => {
    return HTTP.post('auth/login', data)
}

export const signup = (data) => {
    return HTTP.post('auth/register', data)
}

export const getCards = () => {
    return HTTP.get('cards')
}

export const getCardInfo = (id) => {
    return HTTP.get(`cards/${id}`)
}

export const postCheckAnswers = (data, id) => {
    return HTTP.post(`cards/test/${id}`, data)
}

export const getLeadersBoard = () => {
    return HTTP.get(`cards/leaders`)
}

export const postAddLeaderBoard = (sendData) => {
    return HTTP.post('cards/leaders', sendData)
}

export const getLeadersBoardByFlashcard = (id) => {
    return HTTP.get(`cards/leaders/${id}`)
}