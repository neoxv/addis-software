import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Employee } from '../../models/DataModel'
import EmployeeForm from './components/EmployeeForm'
import EmployeeList from './components/EmployeeList'
import { fetchEmployeesRequest, selectEmployees } from './employeesSlice'

const EmployeePage = () => {

  return (
    <>
      <EmployeeForm/>
      <br />
      <EmployeeList />
    </>
  )
}

export default EmployeePage