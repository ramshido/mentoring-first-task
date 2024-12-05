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
	],
	templateUrl: './contacts-details.component.html',
	styleUrl: './contacts-details.component.scss'
})
export class ContactsDetailsComponent {
	public user!: Observable<IUserData>;
	private readonly activatedRoute = inject(ActivatedRoute);

	ngOnInit() {
		this.user = this.activatedRoute.data.pipe(map((data) => {
			return data?.['user']
		}));
	}
}
