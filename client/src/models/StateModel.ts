import {Employee} from './DataModel'
export interface EmployeesState{
    allEmployees: Employee[]
    loading:Boolean
    error: string
}

export interface EmployeeState{
    currentEmployee:Employee
    loading: Boolean,
    error: string
}


