import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const getNavItem = (name: string) => name;
const navItem = getNavItem('О Компании');

const itemCardsPagination = [1,2,3,4,5];
itemCardsPagination.reverse();


@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NgIf, NgFor],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'mentoring-first-project';

	isShowCatalog = true;
	isShowBigImg = true;
	isUpperCase = true;

	readonly headerItem1 = 'Главная';
	readonly headerItem2 = 'О компании';
	readonly headerItem3 = 'Каталог';

	readonly paginations = itemCardsPagination;

	aboutCompany = navItem;



}
