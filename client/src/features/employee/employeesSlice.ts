import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../models/DataModel";
import { EmployeesState } from "../../models/StateModel";
import { RootState } from "../../app/store";

const initialState:EmployeesState = {
    allEmployees: [],
    loading: false,
    error:""
}

export const employeesSlice = createSlice({
    name:'employees',
    initialState,
    reducers:{
        addEmployeeRequest:(state,action:PayloadAction<Employee>)=>{
            state.loading = true
            return state
        },
        addEmployee:(state,action:PayloadAction<Employee>)=>{
            state.allEmployees.push(action.payload)
            state.loading = false
            state.error = ""
            return state
        },
        updateEmployeeRequest:(state,action:PayloadAction<Employee>)=>{
            state.loading = true
            return state
        },
        updateEmployee:(state, action:PayloadAction<Employee>)=>{
            state.allEmployees = state.allEmployees.map((employee:Employee)=> employee._id === action.payload._id ? action.payload: employee)
            state.loading = false
            state.error = ""
            return state
        },
        deleteEmployeeRequest:(state,action:PayloadAction<string>)=>{
            state.loading = true
            return state
        },
        deleteEmployee:(state,action:PayloadAction<string>)=>{
            state.allEmployees = state.allEmployees.filter(((employee:Employee) => employee._id !== action.payload))
            state.loading = false
            state.error = ""
            return state
        },
        fetchEmployeesRequest:(state)=>{
            state.loading = true
            return state
        },
        fetchEmployees:(state, action:PayloadAction<Employee[]>)=>{
            state.allEmployees = action.payload
            state.loading = false
            state.error = ""
            return state
        },
        requestError:(state,action:PayloadAction<string>)=>{
            state.error = action.payload
            state.loading = false
            return state
        }
    }
})

export const {
    addEmployee,
    updateEmployee, 
    deleteEmployee, 
    fetchEmployees, 
    addEmployeeRequest, 
    updateEmployeeRequest, 
    deleteEmployeeRequest,
    fetchEmployeesRequest,
    requestError} = employeesSlice.actions;

export const selectEmployees  = (state: RootState) => state.employees.allEmployees

export default employeesSlice.reducer
