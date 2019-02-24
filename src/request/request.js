import axios from 'axios'
import qs from 'qs'

const GlobalUrl = (process.env.NODE_ENV === 'development' ? '/api' : 'http://jtjxbk.ydcycloud.com')

const Req_protocol = function() {
    return axios.get(`${GlobalUrl}/record/protocol`)
}

const Req_timeList = function() {
    return axios.get(`${GlobalUrl}/record/timeList`)
}

const Req_verification = function(data) {
    return axios.post(`${GlobalUrl}/record/verification`,qs.stringify(data))
}

const Req_add = function(data) {
    return axios.post(`${GlobalUrl}/record/add`,qs.stringify(data))
}

const Req_banner = function(data) {
  return axios.get(`${GlobalUrl}/record/index`)
}

const Req_getRecord = function(data) {
    console.log(data)
    return axios.post(`${GlobalUrl}/record/check`,qs.stringify(data))
}

export {
    Req_protocol,
    Req_timeList,
    Req_verification,
    Req_banner,
    Req_add,
    Req_getRecord
}
