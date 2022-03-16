import client from "./axios.config.js";

const event = '/event';

const get = (id) => {
    return client.get(`${event}/${id}`)
}

const create = (data) => {
    return client.post(`${event}`, data)
}

export { get, create }