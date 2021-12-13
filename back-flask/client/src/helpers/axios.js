import axios from 'axios'

export const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  console.log('TOKEN')
  console.log(token)

  if(token) {
    config.headers.Authorization = token;
  }
  
  return config;
});