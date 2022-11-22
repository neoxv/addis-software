import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Table from '../../../components/Table'
import { Employee } from '../../../models/DataModel'
import { fetchEmployeesRequest, selectEmployees } from '../employeesSlice'

const EmployeeList = () => {
  const employees: Employee[] = useAppSelector(selectEmployees)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchEmployeesRequest())
  }, [])
  
  return (
    <>
      <h5 style={{ color: "#E6BBCE" }}>Employees List </h5>
      <Table data={employees} columns={["#", "Name", "Gender", "Salary", "Date of Birth", "Action"]} />
    </>
  )
}

export default EmployeeList