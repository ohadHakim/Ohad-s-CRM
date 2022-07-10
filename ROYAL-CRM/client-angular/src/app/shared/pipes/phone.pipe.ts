import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    const number = value.split('-');

    return `(${number[0]}) ${number[1]}`;
  }
}
