import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { BackgroundColorDirective } from './directives/background-color.directive';

const getNavItem = (name: string) => name;
const navItem = getNavItem('О Компании');

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, RouterLink, NgIf, NgFor, DatePipe, BackgroundColorDirective],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})

export class AppComponent {
	title = 'mentoring-first-project';

	isShowCatalog = true;

	readonly headerItem1 = 'Главная';
	readonly headerItem2 = 'О компании';
	readonly headerItem3 = 'Каталог';

	readonly navigationitems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда']

	aboutCompany = navItem;

	today: number = Date.now(); // для DatePipe, чтобы работал

}
