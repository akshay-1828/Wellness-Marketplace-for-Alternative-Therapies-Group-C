import axios from "axios";

const API_URL = "http://localhost:8084/api/orders";

export const createOrder = (order) => {

    const token = localStorage.getItem("token");

    return axios.post(API_URL, order, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getOrders = () => {

    const token = localStorage.getItem("token");

    return axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};