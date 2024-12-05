import { Component, inject } from '@angular/core';
import { ActivatedRoute, ResolveEnd, ResolveStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { filter, map, merge, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [
		RouterLink,
		RouterLinkActive,
		NgIf,
		AsyncPipe,
		MatProgressBarModule,
	],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	private readonly authService = inject(AuthService);

	private showLoader!: Observable<boolean>;
	private hideLoader!: Observable<boolean>;
	public isLoading!: Observable<boolean>;

	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly router = inject(Router);

	ngOnInit() {
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

	public logout() {
		this.authService.logout();
	}
}
