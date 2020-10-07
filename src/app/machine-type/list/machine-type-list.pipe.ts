import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterMachineTypes'
})
export class MachineTypeListPipe implements  PipeTransform {
  transform(value: any, filterString: string, propertyName: string): any {

    if (value === undefined) {
      return value;
    }

    if (value.length === 0 || filterString === '') {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propertyName].toLowerCase().includes(filterString.toLowerCase())) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
