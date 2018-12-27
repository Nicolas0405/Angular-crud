import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  selectedEmployee : Employee;
  employees : Employee[];
  readonly URL_API = 'http://localhost:4000/api/employees';

  constructor(private http:HttpClient) { 
    this.selectedEmployee = new Employee();
  }

  getEmployees(){
    return this.http.get(this.URL_API);
  }
  
  postEmployeee(Employee: Employee){
    return this.http.post(this.URL_API, Employee);
  }

  putEmployee(employee : Employee){
    return this.http.put(this.URL_API + `/${employee._id}`, employee);
  }

  deleteEmploye(_id: String){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
