import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUserData } from '../../user.interface';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
		NgFor,
		NgIf,
		AsyncPipe,
		RouterLink,
	],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
	private readonly activatedRoute = inject(ActivatedRoute);
	public persoanlList!: Observable<IUserData[]>;

	ngOnInit() {
		this.persoanlList = this.activatedRoute.data.pipe(map((data) => { 
			return data?.['users']
		})); 
	}
}
