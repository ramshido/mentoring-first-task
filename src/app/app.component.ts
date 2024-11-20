import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { BackgroundColorDirective } from './shared/directives/background-color.directive';
import { CheckAdminOrUser } from './domain/admin-page/services/user.service';
import { map } from 'rxjs';
import { IUserOrAdmin } from './domain/admin-page/interfaces/user-admin.interface';
import { MatDialog } from '@angular/material/dialog';
import { AdminOrUserComponent } from './domain/admin-page/components/admin-or-user/admin-or-user.component';

const getNavItem = (name: string) => name;
const navItem = getNavItem('О Компании');

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterLink,
		NgIf,
		NgFor,
		DatePipe,
		BackgroundColorDirective,
		AsyncPipe,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})

export class AppComponent {
	title = 'mentoring-first-project';
	isShowCatalog = true;
	readonly headerItem1 = 'Главная';
	readonly headerItem2 = 'О компании';
	readonly headerItem3 = 'Каталог';
	readonly navigationitems = ['Каталог', 'Стройматериалы', 'Инструменты', 'Электрика', 'Интерьер и одежда'];
	aboutCompany = navItem;

	today: number = Date.now(); // для DatePipe, чтобы работал
	public readonly userService = inject(CheckAdminOrUser);
	private readonly router = inject(Router);
  public status: string = '';
  public isShowAdminBtn: boolean = false;
	private readonly dialog = inject(MatDialog);

	public userRole$ = this.userService.userOrAdmin$.pipe(
    map((data: IUserOrAdmin | null) => {
      // for (let key in data) {
      // 	if (key === 'user') {
      // 		this.status = 'Войти';
      // 		return true;
      // 	}
      // }
      // this.status = 'Выйти';
      // return false;

      // или:

      if (data === null) {
        this.status = 'Войти';
        this.isShowAdminBtn = false;
        return true;
      } else {
        this.status = 'Выйти';
        this.isShowAdminBtn = true;
        return false;
      }
    }),
  );

	public openDialog(): void {
    if (this.status === 'Войти') {
      this.dialog
        .open(AdminOrUserComponent, {
          width: '600px',
        })
        .afterClosed()
        .subscribe((result: any) => {
          if (result === true) {
            this.userService.loginAsAdmin();
          } else if (result === false) {
            this.userService.loginAsUser();
          }
        });
    } else if (this.status === 'Выйти') {
      confirm('Вы точно хотите выйти?')
        ? (this.userService.logout(), this.router.navigate(['']))
        : null;
    }
  }
}
