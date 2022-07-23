import { Component, NgModule, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import {
  Country,
  Customer,
  CustomerSort,
  FilePath,
  sortColumn,
} from '../shared/types';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  customers!: Array<Customer>;
  countries!: Array<Country>;
  searchTerm!: string;
  searchFieldValue!: string;
  tableSort!: CustomerSort;
  showForm = false;
  showNotification = false;

  customerForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', {
      validators: Validators.required,
    }),
    country_id: new FormControl(0, {
      validators: Validators.required,
    }),
  });

  onSubmit() {
    if (!this.customerForm.valid) {
      return;
    }
    this.apiService.addCustomer(this.customerForm.value).subscribe({
      next: (data: Customer) => {
        this.getCustomers();
        this.showNotification = true;
      },
      error: (err) => console.error(err),
    });
  }

  notificationClosed(state: boolean) {
    this.showForm = false;
    this.customerForm.reset();
    this.showNotification = state;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCustomers();
    this.getCountries();
    this.tableSort = {
      column: 'name',
      dirAsc: true,
    };
  }
  getCustomers() {
    this.apiService.getCustomersList().subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => console.log(err),
      complete: () => console.log(`complete`),
    });
  }

  getCountries() {
    this.apiService.getCountries().subscribe({
      next: (data: Array<Country>) => {
        this.countries = data;
      },
      error: (err) => console.log(err),
    });
  }
  customersTotal(): number {
    return this.customers ? this.customers.length : 0;
  }
  exportCustomersData() {
    this.apiService.exportCustomers().subscribe({
      next: (data: FilePath) => {
        window.open(`${environment.serverUrl}/${data.name}`);
      },
      error: (err) => console.error(err),
    });
  }
  findCustomer(event: KeyboardEvent) {
    const value = this.searchFieldValue;

    if (event.key === 'Enter' && value.length >= 3) {
      this.apiService.findCustomer(value).subscribe({
        next: (data: Array<Customer>) => {
          this.customers = data;
        },
        error: (err) => console.error(err),
      });
    }
  }

  clearSearch() {
    this.searchFieldValue = '';
    this.getCustomers();
  }

  sortCustomers(column: sortColumn) {
    if (this.tableSort.column === column) {
      this.tableSort.dirAsc = !this.tableSort.dirAsc;
    } else {
      this.tableSort.column = column;
      this.tableSort.dirAsc = true;
    }
    const direction = this.tableSort.dirAsc ? 'ASC' : 'DESC';
    this.apiService.getSortedCustomers(column, direction).subscribe({
      next: (data: Array<Customer>) => {
        this.customers = data;
      },
      error: (err) => console.log(err),
    });
  }
  displaySort(column: sortColumn): string {
    if (this.tableSort.column === column) {
      return this.tableSort.dirAsc ? 'bi bi-chevron-up' : 'bi bi-chevron-down';
    }
    return 'bi bi-chevron-expand';
  }
}
