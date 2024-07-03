import axios from 'axios'

// 示例接口
const API_BASE_URL = 'http://localhost:8080'

export const getRecentSubmissions = () => axios.get(`${API_BASE_URL}/recentSubmissions`)
export const getIntelligentTraining = () => axios.get(`${API_BASE_URL}/intelligentTraining`)
export const getPastContests = () => axios.get(`${API_BASE_URL}/pastContests`)
export const getUpcomingContests = () => axios.get(`${API_BASE_URL}/upcomingContests`)
export const getCFData = () => axios.get(`${API_BASE_URL}/cfData`)
export const getUserData = () => axios.get(`${API_BASE_URL}/userData`)
export const getProblems = () => axios.get(`${API_BASE_URL}/problems`)
export const getContests = () => axios.get(`${API_BASE_URL}/contests`)
export const getUserRankings = () => axios.get(`${API_BASE_URL}/userRankings`)
export const getRecommendations = () => axios.get(`${API_BASE_URL}/recommendations`)
