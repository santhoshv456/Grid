import { Component, HostListener, HostBinding  } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';

import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form: FormGroup;
  form1: FormGroup;

  showResults: any[];

  uniqueEmp: any[];
  uniqueEmp1: any[];

  employees: any[] = [
    { Name: 'Alfreds Futterkiste', City: 'Berlin', Country: 'Germany' },
    { Name: 'Berglunds snabbköp', City: 'Luleå', Country: 'Sweden' },
    { Name: 'Blauer See Delikatessen', City: 'Mannheim', Country: 'Germany' },
    { Name: 'Blondel père et fils', City: 'Strasbourg', Country: 'France' },
    { Name: 'Bólido Comidas preparadas', City: 'Madrid', Country: 'Spain' },
    { Name: 'Bon app', City: 'Marseille', Country: 'France' },
    { Name: 'Bottom-Dollar Marketse', City: 'Tsawassen', Country: 'Canada' },
    { Name: 'Cactus Comidas para llevar', City: 'Buenos Aires', Country: 'Argentina' },
    { Name: 'Centro comercial Moctezuma', City: 'México D.F.', Country: 'France' },
    { Name: 'Chop-suey Chinese', City: 'Bern', Country: 'Switzerland' },
    { Name: 'Comércio Mineiro', City: 'São Paulo', Country: 'Canada' }];


  checkBoxValue: any = false;

  term: any;

  countrySet: any[];

  constructor(private formBuilder: FormBuilder) {
    this.showResults = this.employees;
    this.form = this.formBuilder.group({
      orders: new FormArray([], this.minSelectedCheckboxes(1))
    });

    this.form1 = this.formBuilder.group({
      orders1: new FormArray([], this.minSelectedCheckboxes1(1))
    });

    this.addCheckboxes();
    this.addCheckboxes1();
  }


  private addCheckboxes() {
    this.uniqueEmp = this.getUnique(this.showResults, 'Country');
    this.uniqueEmp.forEach((o, i) => {
      const control = new FormControl();
      control.setValue(true);
      (this.form.controls.orders as FormArray).push(control);
    });
  }

  private addCheckboxes1() {
    this.uniqueEmp1 = this.getUnique(this.showResults, 'City');
    this.uniqueEmp1.forEach((o, i) => {
      const control = new FormControl();
      control.setValue(true);
      (this.form1.controls.orders1 as FormArray).push(control);
    });
  }


  getUnique(value: any, args?: any): any {
    const o: any = {};
    const l = value.length;
    const r = [];
    for (let i = 0; i < l; i += 1) {
      o[value[i][args]] = value[i];
    }
    // tslint:disable-next-line: forin
    for (const i in o) {
      r.push(o[i]);
    }
    return r;
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => (v ? this.uniqueEmp[i].Country : null))
      .filter(v => v !== null);
    this.showResults = this.employees.filter((v, idx) => {
      return selectedOrderIds.includes(v.Country);
    });
  }

  submit1() {
    const selectedOrderIds = this.form1.value.orders1
      .map((v, i) => (v ? this.uniqueEmp1[i].City : null))
      .filter(v => v !== null);
    this.showResults = this.employees.filter((v, idx) => {
      return selectedOrderIds.includes(v.City);
    });
  }


  selectAll() {
    // tslint:disable-next-line: no-string-literal
    this.form.get('orders')['controls'].map(control => {
      control.setValue(true);
    });
  }

  selectAll1() {
    // tslint:disable-next-line: no-string-literal
    this.form1.get('orders1')['controls'].map(control => {
      control.setValue(true);
    });
  }

  clear() {
    // tslint:disable-next-line: no-string-literal
    this.form.get('orders')['controls'].map(control => {
      control.setValue(false);
    });
  }

  clear1() {
    // tslint:disable-next-line: no-string-literal
    this.form1.get('orders1')['controls'].map(control => {
      control.setValue(false);
    });
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  minSelectedCheckboxes1(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

}
