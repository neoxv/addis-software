import employeeSaga from "./employee"
import { all } from "redux-saga/effects"

export function* rootSaga(){
    yield all([
        employeeSaga()
    ])
}