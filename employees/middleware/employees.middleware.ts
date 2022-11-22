import express from 'express'
import employeesService from '../services/employees.service'
import debug from 'debug'

const log: debug.IDebugger = debug('app:employees-controllers')

class EmployeesMiddleware{
    async validateRequiredEmployeeFields(req:express.Request, res:express.Response, next: express.NextFunction){
        if(req.body && req.body.name && req.body.dateOfBirth && req.body.gender && req.body.salary){
            next()
        }else{
            res.status(400).send({error: 'Missing required fields.'})
        }
    }
    
    async validateEmployeeExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const employee = await employeesService.readById(req.params.id);
        console.log(employee)
        if (employee) {
            next();
        } else {
            res.status(404).send({
                error: `Employee ${req.params.id} not found`,
            });
        }
    }

    async extractEmployeeId(req:express.Request, res:express.Response, next:express.NextFunction){
        req.body.id = req.params.id
        next()
    }

    async createDateOfBirth(req:express.Request, res:express.Response, next:express.NextFunction){
        req.body.dateOfBirth = new Date(req.body.dateOfBirth)
        next();
    }


}
export default new EmployeesMiddleware();