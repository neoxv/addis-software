import EmployeesDao from "../daos/employees.dao";
import { CreateEmployeeDto } from "../dto/create.employee.dto";
import { PutEmployeeDto } from "../dto/put.employee.dto";
import { PatchEmployeeDto } from "../dto/patch.employee.dto";
import { CRUD } from "../../common/crud.interface";

class EmployeesService implements CRUD{
    async create(resource: CreateEmployeeDto) {
        return EmployeesDao.addEmployee(resource);
    }

    async deleteById(id: string) {
        return EmployeesDao.removeEmployeeById(id);
    }

    async list(limit: number, page: number) {
        return EmployeesDao.getEmployees(limit, page);
    }

    async patchById(id: string, resource: PatchEmployeeDto) {
        return EmployeesDao.updateEmployee(id, resource);
    }

    async readById(id: string) {
        return EmployeesDao.getEmployeeById(id);
    }

    async putById(id: string, resource: PutEmployeeDto) {
        return EmployeesDao.updateEmployee(id, resource);
    }

    async getEmployeeByName(name: string) {
        return EmployeesDao.getEmployeeByName(name);
    }
    
}

export default new EmployeesService();