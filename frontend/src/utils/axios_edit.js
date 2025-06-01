import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080'
})
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    try {
        const token = localStorage.getItem('token');
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    } catch (error) {
        console.error('Error in request interceptor:', error);
        // You can handle the error here, e.g., redirect to login or show a message
        return config; // or throw error if you want to stop the request
    }

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response && response.data) return response.data;
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
// Add a request interceptor
export default instance