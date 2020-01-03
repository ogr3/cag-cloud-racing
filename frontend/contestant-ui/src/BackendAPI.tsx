import axios from 'axios';

//const env = "//x7acufjsp7.execute-api.eu-central-1.amazonaws.com/ccgaoz"
const env = "https://ng1hczsqgf.execute-api.eu-central-1.amazonaws.com/ccjogab"

const API = {
    signUp: (body: any) => axios.post(`${env}/registered-user`, body),
    signIn: (body: any) => axios.post(`${env}/user-login`, body),

    addMeInQueue: (body: any) => axios.post(`${env}/race-queue`, body),
    getQueue: () => axios.get(`${env}/race-queue`),
    bailOutFromQueue: (body: any) => axios.delete(`${env}/race-queue`, { data: body }),

    getLeaderboard: () => axios.get(`${env}/leader-board`)
}

export default API
