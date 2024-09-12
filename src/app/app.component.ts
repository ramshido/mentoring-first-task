import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

const getNavItem = (name: string) => name;
const navItem = getNavItem('О Компании');

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterLink, NgIf, NgFor],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})

export class AppComponent {
	title = 'mentoring-first-project';

	isShowCatalog = true; 

	readonly headerItem1 = 'Главная';
	readonly headerItem2 = 'О компании';
	readonly headerItem3 = 'Каталог';

	aboutCompany = navItem;

}
