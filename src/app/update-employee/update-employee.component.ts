import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  updateEmployeeForm: FormGroup;
  // employeeId: number | null = null;
  employeeId!: number;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialize the form group with validators
    this.updateEmployeeForm = this.fb.group({
      first_Name: ['', Validators.required],
      last_Name: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEmployee();
  }
  // loadEmployee(): void {
  //   // Fetch the employee details from the service and populate the form
  //   this.productService.getEmployeeById(this.employeeId).subscribe(employee => {
  //     this.updateEmployeeForm.patchValue(employee);
  //   });
  // }

  loadEmployee(): void {
    this.productService.getEmployeeById(this.employeeId).subscribe({
      next: (employee: Employee) => {
        this.updateEmployeeForm.patchValue(employee); // Populate the form with employee data
      },
      error: (err) => {
        console.error('Error loading employee:', err);
        alert('Could not load employee details');
      }
    });
  }

  
  


  // updateEmployee(): void {
  //   if (this.updateEmployeeForm.valid) {
  //     this.productService.updateEmployee(this.employeeId, this.updateEmployeeForm.value).subscribe(() => {
  //       alert('Employee updated successfully!');
  //       this.router.navigate(['/main']);
  //     });
  //   }
  // }
  // updateEmployee(): void {
  //   if (this.updateEmployeeForm.valid) {
  //     this.productService.updateEmployee(this.employeeId, this.updateEmployeeForm.value).subscribe({
  //       next: () => {
  //         alert('Employee updated successfully!');
  //         this.router.navigate(['/main']); // Navigate back to the main page after successful update
  //       },
  //       error: (err) => {
  //         console.error('Error updating employee:', err);
  //         alert('Failed to update employee. Please try again.');
  //       }
  //     });
  //   } else {
  //     alert('Please fill in all required fields');
  //   }
  
  // }


  updateEmployee(): void {
    if (this.updateEmployeeForm.valid) {
      const updatedEmployee = {
        ...this.updateEmployeeForm.value,
        id: this.employeeId // Ensure the ID is part of the update payload
      };
  
      this.productService.updateEmployee(this.employeeId, updatedEmployee).subscribe({
        next: () => {
          alert('Employee updated successfully!');
          this.router.navigate(['/main']); // Navigate back to the main page after successful update
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          alert('Failed to update employee. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields');
    }
  }

}

