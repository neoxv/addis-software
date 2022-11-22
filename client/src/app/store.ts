import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { applyMiddleware } from '@reduxjs/toolkit';
import employeesReducer from '../features/employee/employeesSlice'
import employeeReducer from '../features/employee/employeeSlice'
import createSagaMiddleware from 'redux-saga'
import {rootSaga} from './saga/index'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware({thunk: false,serializableCheck: false}).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

