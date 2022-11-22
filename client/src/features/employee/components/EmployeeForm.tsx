import React, { useState } from 'react'
import styled, {ThemeProvider} from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Employee } from '../../../models/DataModel';
import { GenderEnum } from '../../../models/EnumModel';
import { selectCurrentEmployee, setEmployee } from '../employeeSlice';
import { addEmployee, addEmployeeRequest, updateEmployee, updateEmployeeRequest } from '../employeesSlice';

const EmployeeForm = () => {
  const dispatch = useAppDispatch()
  const currentEmployee = useAppSelector(selectCurrentEmployee)
  const [errorStatus, setErrorStatus] = useState(false)
  const [error, setError] = useState("")

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setErrorStatus(false)
    const elementName = event.currentTarget.name
    if(elementName === "dateOfBirth"){
      dispatch(setEmployee({ ...currentEmployee, [elementName]: new Date(event.currentTarget.value) }))
    }else{
      dispatch(setEmployee({ ...currentEmployee, [elementName]: event.currentTarget.value }))
    }
  }

  const handleSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    setErrorStatus(false)
    const elementName = event.currentTarget.name
    dispatch(setEmployee({...currentEmployee,[elementName]: event.currentTarget.value}))
  }


  // const handleInput = () => { }
  const handleSubmit = (isSubmit:Boolean, e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(isSubmit && checkFields()){
      console.log("calling server")
      if (currentEmployee._id === undefined) {
        console.log(currentEmployee)
        dispatch(addEmployeeRequest(currentEmployee))
      }else{
        dispatch(updateEmployeeRequest(currentEmployee))
      }
      dispatch(setEmployee({
        _id: undefined,
        name: "",
        gender: GenderEnum.MALE,
        salary: 0,
        dateOfBirth: new Date()
      }))
    }else{
      dispatch(setEmployee({
        _id: undefined,
        name: "",
        gender: GenderEnum.MALE,
        salary: 0,
        dateOfBirth: new Date()
      }))
    }
  }

  const checkFields=()=>{
    if(currentEmployee.name != "" && currentEmployee.salary != 0 && currentEmployee.dateOfBirth != undefined){
      return true
    }else{
      dispatch(setEmployee({
        _id: undefined,
        name: "",
        gender: GenderEnum.MALE,
        salary: 0,
        dateOfBirth: new Date()
      }))
      setError("Invalid Employee Details!")
      setErrorStatus(true)
    }
    return false
  }
  

  return (
    <>
      <h4 style={{ color:"#E6BBCE"}}>Add Employee Information</h4>
      <InputContainer type="text" name="name" placeholder="Name" onChange={handleInput} value={currentEmployee.name} required />
      <InputContainer type="number" name="salary" placeholder="Salary" onChange={handleInput} value={currentEmployee.salary === 0 ? "" : currentEmployee.salary}  required />
      
      <label style={{ color: "#B79CB2" }}>Gender</label>
      <SelectContainer onChange={handleSelect} required name='gender' value={currentEmployee.gender === GenderEnum.FEMALE ?GenderEnum.FEMALE:GenderEnum.MALE}>
        <option defaultValue='true' disabled>
          Select Gender
        </option>
        <option value={GenderEnum.MALE}>Male</option>
        <option value={GenderEnum.FEMALE}>Female</option>
      </SelectContainer>

      <label style={{ color: "#B79CB2" }}>Date Of Birth</label>
      <InputContainer type="date" name="dateOfBirth" onChange={handleInput} value={new Date(currentEmployee.dateOfBirth).toISOString().substring(0,10)} required />
      {errorStatus ? (<StyledParagraph>{error}</StyledParagraph>):null}

      <ButtonContainer>
        <ThemeProvider theme={secondary}>
          <Btn onClick={(e)=>{handleSubmit(false,e)}} > CANCEL</Btn>
        </ThemeProvider>
        <ThemeProvider theme={primary}>
          <Btn onClick={(e)=>{handleSubmit(true,e)}} > SAVE</Btn>
        </ThemeProvider>
      </ButtonContainer>
    </>
  )
}

export default EmployeeForm

const StyledParagraph = styled.p`
  color: red;
`

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

const InputContainer = styled.input`
	padding: 0.5em;
	color: ${props => props.type === 'date' ? '#E6BBCE' :'#40454F'};
	background-color: #40454F;
	background: #40454F;
    &:hover {
       border: 2px solid #E6BBCE;
    }
    border: 2px solid #8A7E93;
	border-radius: 3px;
	width: 25em;
	margin: 0.5em;
`;

const SelectContainer = styled.select`
	padding: 0.5em;
	color: #E6BBCE;
	background-color: #40454F;
	background: #40454F;
    &:hover {
       border: 2px solid #E6BBCE;
    }
    border: 2px solid #8A7E93;
	border-radius: 3px;
	width: 25em;
	margin: 0.5em;
`;