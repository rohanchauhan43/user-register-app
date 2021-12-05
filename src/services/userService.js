import axios from "axios";
import { API_BASE_URL } from "../constants";
const requestHeader = {
    'content-type': 'application/json'
};

export const addUser = async (user) => {

    return axios(`https://gorest.co.in/public-api/users`, {
        method: 'POST',
        headers: requestHeader,
        data: JSON.stringify(user)
    });
};

export const getAllUser = async (activePage=1) =>{
    return axios(`${API_BASE_URL}/public-api/users?page=${activePage}`, {
        method: 'GET',
        headers: requestHeader,
    });

};