import { CreateEmployeeDto } from "../dto/create.employee.dto";
import { PutEmployeeDto } from "../dto/put.employee.dto";
import { PatchEmployeeDto } from "../dto/patch.employee.dto";
import mongooseService from "../../common/services/mongoose.service";
import debug from "debug";

const log: debug.IDebugger = debug('app:in-memory-dao')

class EmployeesDao{
    Schema = mongooseService.getMongoose().Schema;
    employeeSchema = new this.Schema({
        name: String,
        dateOfBirth: Date,
        gender: String,
        salary: Number
    },{id: false})

    Employee = mongooseService.getMongoose().model('Employees', this.employeeSchema)

    constructor(){
        log('Created new instance of EmployeesDao')
    }

    async addEmployee(employeeFields: CreateEmployeeDto){
        const employee = new this.Employee(employeeFields)
        await employee.save()
        return employee._id
    }

    async getEmployeeByName(name: string){
        return await this.Employee.findOne({name: name});
    }

    async getEmployeeById(id:string ){
        return await this.Employee.findById(id);
    }

    async getEmployees(limit = 10, page = 0){
        return this.Employee.find().limit(limit).skip(limit * page);
    }

    async updateEmployee(employeeId: string, employeeFields: PatchEmployeeDto | PutEmployeeDto){
        const existingEmployee = await this.Employee.findOneAndUpdate(
            {_id: employeeId},
            {$set: employeeFields},
            {new: true}            
        );
        return existingEmployee;
    }

    async removeEmployeeById(employeeId: string){
        return this.Employee.deleteOne({_id: employeeId}).exec();
    }

}

export default new EmployeesDao();
