import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../models/DataModel";
import { EmployeeState } from "../../models/StateModel";
import { RootState } from "../../app/store";
import { GenderEnum } from "../../models/EnumModel";

const initialCurrentEmployeeState:Employee = {
    name: "",
    gender:GenderEnum.MALE,
    salary: 0,
    dateOfBirth: new Date()
  }
const initialState:EmployeeState = {
    currentEmployee:initialCurrentEmployeeState,
    loading: false,
    error: ""
}

export const employeeSlice = createSlice({
    name:'employee',
    initialState,
    reducers:{
        setEmployee:(state, action:PayloadAction<Employee>)=>{
            state.currentEmployee = action.payload;
            return state
        }
    }
})

export const {setEmployee} = employeeSlice.actions;

export const selectCurrentEmployee  = (state: RootState) => state.employee.currentEmployee

export default employeeSlice.reducer
