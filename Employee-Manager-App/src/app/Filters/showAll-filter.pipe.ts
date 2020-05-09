import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'showAllFilter'
  })
  export class showAllFilterPipe implements PipeTransform {
  
    transform(list: any[], filterText: string): any {
      return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
    }
  
  }