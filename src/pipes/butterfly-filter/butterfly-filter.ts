import { Pipe, PipeTransform } from '@angular/core';
import { Creature } from '../../objects/creature';

/**
 * Generated class for the ButterflyFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'butterflyFilter',
  pure: false
})
export class ButterflyFilterPipe implements PipeTransform {
  transform(items: Creature[], filter: Creature): Creature[] {
    if (!items || !filter) {
      return items;
    }

    return items.filter((item: Creature) => this.applyFilter(item, filter));
  }

  applyFilter(creature: Creature, filter: Creature): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (creature[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (creature[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
