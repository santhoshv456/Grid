import { Component, HostListener, HostBinding  } from '@angular/core';
import { Rowfilter } from './Row-filter';

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
  XLfilters = { list: [], dict: {}, results: [] };

  employees = [{
    Name: 'Manirul Monir',
    City: 'Sylhet',
    Country: 'Bangladesh'
  }, {
    Name: 'Arup',
    City: 'Sylhet',
    Country: 'Bangladesh'
  }, {
    Name: 'Person 1',
    City: 'Dhaka',
    Country: 'Bangladesh'
  }, {
    Name: 'Person 2',
    City: 'Dhaka',
    Country: 'Bangladesh'
  }, {
    Name: 'Munim Munna',
    City: 'Narshingdi',
    Country: 'Bangladesh'
  }, {
    Name: 'Mahfuz Ahmed',
    City: 'Narshingdi',
    Country: 'Bangladesh'
  }, {
    Name: 'Tawkir Ahmed',
    City: 'Gazipur',
    Country: 'Bangladesh'
  }, {
    Name: 'Alfreds 2',
    City: 'Berlin',
    Country: 'Germany'
  }, {
    Name: 'Alfreds Futterkiste',
    City: 'Berlin',
    Country: 'Germany'
  }, {
    Name: 'Blauer See Delikatessen',
    City: 'Mannheim',
    Country: 'Germany'
  }, {
    Name: 'Blondel père et fils',
    City: 'Strasbourg',
    Country: 'France'
  }, {
    Name: 'Bon app\'',
    City: 'Marseille',
    Country: 'France'
  }, {
    Name: 'Centro comercial Moctezuma',
    City: 'México D.F.',
    Country: 'France'
  }];

  constructor() {
    this.createXLfilter(this.employees, ['Country', 'City']);
  }

    markAll(field, b) {
      this.XLfilters.dict[field].list.forEach((x) => {x.checked = b; });
    }

    clearAll(field) {
      this.XLfilters.dict[field].searchText = '';
      this.XLfilters.dict[field].list.forEach((x) => {x.checked = true; });
    }

    categorize(arr, field) {
      const o = {};
      const  r = [];
      const l = arr.length;
      for (let i = 0; i < l; i += 1) {
        if (o[arr[i][field]]) { continue; }
        const oo = {name: arr[i][field], checked: true};
        o[arr[i][field]] = oo;
        r.push(oo);
      }
      return {
        list: r,
        dict: o
      };
    }

    itemFilter(field) {
      const xfilter = this.XLfilters.dict[field];
      console.log(xfilter);
      if (xfilter.searchText.length === 0) { return xfilter.list; }
      const rxp = new RegExp(xfilter.searchText, 'i');
      return xfilter.list.filter( (item) => {
        return item.name.match(rxp);
      });
    }

    rowFilter(item) {
      const visible = true;
      for (let cat, i = 0, l = this.XLfilters.list.length; i < l ; i++) {
        cat = this.XLfilters.list[i];
        if (!cat.dict[item[cat.field]].checked) { return false; }
        if (cat.searchText.length) {
          if (!item[cat.field].match(new RegExp(cat.searchText , 'i'))) { return false; }
        }
      }
      return true;
    }

    createXLfilter(arr, fields) {
      for (let j = 0; j < fields.length; j++) { this.XLfilters.list.push(this.XLfilters.dict[fields[j]] = {list: [], dict: {}, field: fields[j], searchText:'', active: false, options: []}); }
      for (let i = 0, z; i < arr.length; i++) {
      for (let j = 0; j < fields.length; j++) {
      z = this.XLfilters.dict[fields[j]];
      z.dict[arr[i][fields[j]]] || z.list.push(z.dict[arr[i][fields[j]]] = {name: arr[i][fields[j]], checked: true, visible: false, match: false});
      }
      }
    }
}
