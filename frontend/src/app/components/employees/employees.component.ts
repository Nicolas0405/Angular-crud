import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { NgForm, Form } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.putEmployee(form.value)
        .subscribe(res=>{
          this.resetForm(form);
        M.toast({html: 'Actualizado exitosamente'});  
        this,this.getEmployees(); 
        })
    }else{
      this.employeeService.postEmployeee(form.value)
      .subscribe(res =>{
        this.resetForm(form);
        M.toast({html: 'Guardado exitosamente'});  
        this,this.getEmployees();     
      });
    }
  }
  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

  getEmployees(){
    this.employeeService.getEmployees()
    .subscribe(res =>{
      this.employeeService.employees = res as Employee[];
      console.log(res);
    })
  }

  editEmployee(employee : Employee){
    this.employeeService.selectedEmployee =employee;
  }

  deleteEmployee(_id : string){
    if(confirm('Estas seguro de querer eliminarlo')){
      this.employeeService.deleteEmploye(_id)
      .subscribe(res =>{
        this.getEmployees();
        M.toast({html:'Eliminado satisfactoriamente'})
      });
    }
  }
}
