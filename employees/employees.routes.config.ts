import {CommonRoutesConfig} from '../common/routes.config'
import express from 'express'
import EmployeesController from './controllers/employees.controllers';
import EmployeesMiddleware from './middleware/employees.middleware';
import BodyValidationMiddleware from '../common/body.validation.middleware';
import {body} from 'express-validator'

export class EmployeeRoutes extends CommonRoutesConfig{
    constructor(app: express.Application){
        super(app, 'EmployeeRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/employees')
            .get(EmployeesController.listEmployees)
            .post(
                body('name').isString().isLength({min:3}),
                body('dateOfBirth').isString(),
                body('gender').isString(),
                body('salary').isInt(),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                EmployeesMiddleware.createDateOfBirth,
                EmployeesController.createEmployee);

        this.app.param('id', EmployeesMiddleware.extractEmployeeId);
        this.app.route('/employees/:id')
            .all(EmployeesMiddleware.validateEmployeeExists)
            .get(EmployeesController.getEmployeeById)
            .patch(EmployeesController.patch)
            .delete(EmployeesController.removeEmployee)

        this.app.put('/employees/:id',[
            body('name').isString(),
            body('dateOfBirth').isString(),
            body('gender').isString(),
            body('salary').isInt(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            EmployeesMiddleware.createDateOfBirth,
            EmployeesController.put
        ])

        return this.app;
    }
}