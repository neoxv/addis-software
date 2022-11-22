import { addEmployee, deleteEmployee, fetchEmployees, updateEmployee,requestError } from '../../features/employee/employeesSlice'
import {getEmployeesAPI, updateEmployeeAPI,createEmployeeAPI,deleteEmployeeAPI} from '../../services/apis'
import { call, takeEvery, put } from 'redux-saga/effects'
import { ADD_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_REQUEST, FETCH_EMPLOYEES_REQUEST, UPDATE_EMPLOYEE_REQUEST } from './types'
import { Employee } from '../../models/DataModel'


export interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export function *fetchEmployeesSaga(){
    try {
        let employees:ResponseGenerator = yield call(getEmployeesAPI)
        yield put(fetchEmployees(employees.data))
    } catch (error) {
        yield put(requestError(getErrorMessage(error)))
    }
}


export function *createEmployeesSaga(action: {type:string, payload: Employee }){
    try {
        let response:ResponseGenerator = yield call(createEmployeeAPI,action.payload)
        let newEmployee:Employee = action.payload
        newEmployee = {...newEmployee,_id:response.data._id}
        yield put(addEmployee(newEmployee))
    } catch (error) {
        yield put(requestError(getErrorMessage(error)))
    }
}


export function *updateEmployeesSaga(action: {type:string, payload: Employee } ){
    try {
        yield call(updateEmployeeAPI, action.payload)
        yield put(updateEmployee(action.payload))
    } catch (error) {
        yield put(requestError(getErrorMessage(error))) 
    }
}


export function *deleteEmployeesSaga(action: {type:string, payload: string }){
    try {
        yield call(deleteEmployeeAPI,action.payload)
        yield put(deleteEmployee(action.payload))
    } catch (error) {
        yield put(requestError(getErrorMessage(error)))
    }
}


export default function* employeeSaga(){
    yield takeEvery(FETCH_EMPLOYEES_REQUEST, fetchEmployeesSaga)
    yield takeEvery(ADD_EMPLOYEE_REQUEST, createEmployeesSaga)
    yield takeEvery(UPDATE_EMPLOYEE_REQUEST, updateEmployeesSaga)
    yield takeEvery(DELETE_EMPLOYEE_REQUEST, deleteEmployeesSaga)
}