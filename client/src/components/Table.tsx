import React from 'react'
import styled,{ThemeProvider} from 'styled-components'
import { idText } from 'typescript'
import { useAppDispatch } from '../app/hooks'
import { setEmployee } from '../features/employee/employeeSlice'
import { deleteEmployee, deleteEmployeeRequest } from '../features/employee/employeesSlice'
import { Employee } from '../models/DataModel'
import { TableProp } from '../models/PropsModels'
import Button from './Button'

const Table = (props:TableProp) => {
    const dispatch = useAppDispatch()
    const actionHandler = (employeeId:string, action:string)=>{
        const employee = props.data.filter((employee:Employee)=> employee._id === employeeId)
        if(action === "EDIT" && employee){
            dispatch(setEmployee(employee[0]))
        }else if(action === "DELETE" && employee){
            dispatch(deleteEmployeeRequest(employee[0]._id??""))
        }else{
            //set error
        }
    }
  
  return (
    <StyledTable>
        <thead>
            <tr>
              {props.columns.map((col: string, index:number) => {
                    return <th key={index} >{col}</th>
              })}
            </tr>
        </thead>
        <tbody>
            {props.data.length > 0 ?props.data.map((employee:Employee, index:number)=>{
                return (
                    <tr key={employee._id}>
                        <td>{index +1}</td>
                        <td>{employee.name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.salary}</td>
                        <td>{new Date(employee.dateOfBirth).toISOString().substring(0, 10)}</td>
                        
                        <td><ButtonContainer>
                            <ThemeProvider theme={secondary}>
                                <Btn onClick={(e) => { actionHandler(employee._id??"", "DELETE") }} > DELETE</Btn>
                            </ThemeProvider>
                            <ThemeProvider theme={primary}>
                                <Btn onClick={(e) => { actionHandler(employee._id ?? "", "EDIT") }} > EDIT</Btn>
                            </ThemeProvider>
                        </ButtonContainer></td>
                    </tr>

                )
            }):null}
        </tbody>

    </StyledTable>
  )
}

export default Table

const StyledTable = styled.table`
    caption-side: top;
    border: none;
    border-collapse: collapse;

    caption-side: bottom;
    th{
        color: #E6BBCE;
    }
    td, th {
        border: none;
    }
    th{
        text-align: center;
    }

    td {
        padding: 5px 10px;
    }

    tbody tr {
        background-color: #efefef;
        :hover {
        background-color: lightpink;
        }
    }
    thead > tr {
        background-color: #c2c2c2;
    }
    caption {
        font-size: 0.9em;
        padding: 5px;
        font-weight: bold;
    }
`

const Btn = styled.button`
    font-size: 1em;
    margin: 1em;
    border-radius: 3px;
    &:hover {
        background-color: ${(props) => props.theme.main};
        color:#40454F;
    }
    color: ${props => props.theme.main};
    border: 2px solid ${props => props.theme.main};
`;

const primary = {
    main: "#E6BBCE"
}

const secondary = {
    main: "#8A7E93"
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`