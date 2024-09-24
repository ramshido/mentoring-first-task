import { Component } from "@angular/core";
import { NgFor, NgIf } from '@angular/common';


const itemCardsPagination = [1, 2, 3, 4, 5];
itemCardsPagination.reverse();

///////////////////////////////////

//--------------------------------------------- Ts



////////////////////////////////////////
@Component({
	selector: 'app-main-cards',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './main-cards.component.html',
	styleUrl: './main-cards.component.scss',
})

export class MainCardsComponent {
	isShowBigImg = true;

	readonly paginations = itemCardsPagination;
}