import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
		RouterLink,
		RouterLinkActive
	],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
	private readonly authService = inject(AuthService);

	public logout() {
		this.authService.logout();
	}
}
