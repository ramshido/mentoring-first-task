import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

const navItem = 'О Компании';

const itemCardsPagination = [1,2,3,4,5];
itemCardsPagination.reverse();

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NgIf, NgFor, RouterLink],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'mentoring-first-project';

	public isShowCatalog = true;
	public isShowBigImg = true;
	public isUpperCase = true;

	public readonly headerItem1 = 'Главная';
	public readonly headerItem2 = 'О компании';
	public readonly headerItem3 = 'Каталог';

	readonly paginations = itemCardsPagination;

	public aboutCompany = navItem;



}
