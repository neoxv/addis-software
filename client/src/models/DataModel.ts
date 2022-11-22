import { GenderEnum } from "./EnumModel";

export interface  Employee {
    _id?: string;
    name: string;
    gender: GenderEnum;
    dateOfBirth: Date;
    salary: number;
}