import express from 'express'
import employeesService from '../services/employees.service'
import debug from 'debug'

const log: debug.IDebugger = debug('app:employees-controller');

class EmployeesController{
    async listEmployees(req: express.Request, res: express.Response) {
        const employees = await employeesService.list(100, 0);
        res.status(200).send(employees);
    }

    async getEmployeeById(req: express.Request, res: express.Response) {
        const employee = await employeesService.readById(req.body.id);
        res.status(200).send(employee);
    }

    async createEmployee(req: express.Request, res: express.Response) {
        const employeeId = await employeesService.create(req.body);
        res.status(201).send({ _id: employeeId });
    }

    async patch(req: express.Request, res: express.Response) {
        log(await employeesService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        log(await employeesService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeEmployee(req: express.Request, res: express.Response) {
        log(await employeesService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new EmployeesController();