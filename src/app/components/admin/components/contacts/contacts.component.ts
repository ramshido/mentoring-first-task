import { Component, inject } from '@angular/core';
import { filter, map, merge, Observable } from 'rxjs';
import { IUserData } from '../../user.interface';
import { AdminService } from '../../services/admin.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, ResolveEnd, ResolveStart, Router, RouterLink } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
		NgFor,
		NgIf,
		AsyncPipe,
		RouterLink,
		MatProgressBarModule
	],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
	private showLoader!: Observable<boolean>;
	private hideLoader!: Observable<boolean>;

	public isLoading!: Observable<boolean>;

	// private readonly adminService = inject(AdminService);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly router = inject(Router);
	public persoanlList!: Observable<IUserData[]>;

	ngOnInit() {
		// this.persoanlList = this.adminService.getPersonalList(); // старый вариант, просили у сервиса

		this.persoanlList = this.activatedRoute.data.pipe(map((data) => { // новый вариант, просим у резолвера
			return data?.['users']
		})); 

		// У резолвера есть событие - resolveStart и resolveEnd, мы запрашиваем через event-pipe-filter-событие (e)
		// и говорим, если событие e instanceof ResolveEnd(резолвер закончен, событие о конеце резолвера), тогда приводим любое значение
		// из этого события в булевому, через mapTo() и возвращаем его:
		this.showLoader = this.router.events.pipe(
			filter((e) => e instanceof ResolveStart),
			map(() => true)
		); // резолв начался

		this.hideLoader = this.router.events.pipe(
			filter((e) => e instanceof ResolveEnd),
			map(() => false)
		); // резолв закончился

		this.isLoading = merge(this.hideLoader, this.showLoader);
	}
}
