import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'https://order-pizza-api.herokuapp.com',
});

export default clienteAxios;