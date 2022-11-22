import axios from 'axios';
import { Employee } from '../models/DataModel';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.common['Content-Type'] = "application/json";

export const getEmployeesAPI = async () => axios.get('/employees')
export const getEmployeeIdAPI = async (id:string) => axios.get(`/employees/${id}`)
export const createEmployeeAPI = async (employee:Employee) => axios.post('/employees',employee)
export const updateEmployeeAPI = async (employee:Employee) => axios.put(`/employees/${employee._id}`,employee)
export const deleteEmployeeAPI = async (id:string) => axios.delete(`/employees/${id}`)

