import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // if no length defined, just return the input string
    if (args === undefined) {
      return value;
    }
    // check if input string is longer than input argument
    if (value.length > args) {
      // slice string and add ellipsis
      return value.substring(0, args) + "...";
    } else {
      // return input string without modifications
      return value;
    }
  }

}
