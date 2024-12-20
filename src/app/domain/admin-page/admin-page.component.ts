import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
  canExit = false;

  public onClick() {
    this.canExit = !this.canExit;
  }
}
