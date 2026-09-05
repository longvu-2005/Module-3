import axios from 'axios';


export const inventoryClient = axios.create({
  baseURL: 'http://localhost:3000/api/inventory', 
  timeout: 3000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});