import { Component, inject } from '@angular/core';
import { ActivatedRoute, ResolveEnd, ResolveStart, Router, RouterLink } from '@angular/router';
import { filter, map, merge, Observable } from 'rxjs';
import { IUserData } from '../../user.interface';
import { AdminService } from '../../services/admin.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
	selector: 'app-contacts-details',
	standalone: true,
	imports: [
		NgIf,
		RouterLink,
		AsyncPipe,
		MatProgressBarModule
	],
	templateUrl: './contacts-details.component.html',
	styleUrl: './contacts-details.component.scss'
})
export class ContactsDetailsComponent {
	public user!: Observable<IUserData>;
	public id!: number;
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly adminService = inject(AdminService);
	private readonly router = inject(Router);

	private showLoader!: Observable<boolean>;
	private hideLoader!: Observable<boolean>;
	public isLoading!: Observable<boolean>;
	public persoanlList!: Observable<IUserData[]>;

	ngOnInit() {
		// this.activatedRoute.params.subscribe((params) => this.id = params?.['id']);
		// this.user = this.adminService.getPerson(this.id);

		// более правильный и короткий вариант
		this.user = this.activatedRoute.data.pipe(map((data) => {
			return data?.['user']
		})); 

		this.persoanlList = this.activatedRoute.data.pipe(map((data) => { 
			return data?.['users']
		})); 

		this.showLoader = this.router.events.pipe(
			filter((e) => e instanceof ResolveStart),
			map(() => true)
		); 

		this.hideLoader = this.router.events.pipe(
			filter((e) => e instanceof ResolveEnd),
			map(() => false)
		);

		this.isLoading = merge(this.hideLoader, this.showLoader);
	}
}
