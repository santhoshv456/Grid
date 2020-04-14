import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rowfilter'
  })

  export class Rowfilter implements PipeTransform {

    transform(item: any, XLfilters: any, field: any): any {
        console.log(field);
        console.log(XLfilters);
        const visible = true;
        for (let cat, i = 0, l = XLfilters.list.length; i < l ; i++) {
          cat = XLfilters.list[i];
          if (!cat.dict[item[cat.field]].checked) { return false; }
          if (cat.searchText.length) {
            if (!item[cat.field].match(new RegExp(cat.searchText , 'i'))) { return false; }
          }
        }
        return true;
    }
  }
