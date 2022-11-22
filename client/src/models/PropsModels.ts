import { Employee } from "./DataModel"

export interface HeaderProp {
    title: string
    to?: string
    logo?: string
}

export interface ButtonProp{
    title: string
    handler: Function
    key?:string
}

export interface InputProp{
    inputType: string,
    name: string,
    value: string | number 
    handleInput: Function
    placeHolder?: string
}

export interface SelectProp{
    options: {key:string, value:string}[]
    handler: Function
    subject: string
    value: string
}

export interface TableProp{
    columns:string[]
    data: Employee[]
    handler?: Function
}

export interface EmployeeListProp{
}