import { NgModule } from '@angular/core';
import { SortCreaturesPipe } from './sort-creatures/sort-creatures';
import { SafePipe } from './safe/safe';
import { ButterflyFilterPipe } from './butterfly-filter/butterfly-filter';
@NgModule({
	declarations: [SortCreaturesPipe,
    SafePipe,
    ButterflyFilterPipe],
	imports: [],
	exports: [SortCreaturesPipe,
    SafePipe,
    ButterflyFilterPipe]
})
export class PipesModule {}
