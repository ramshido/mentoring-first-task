import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import {MatTooltipModule} from '@angular/material/tooltip';
import { MyErrorStateMatcher } from "../../../../../shared/utils/error-state-matcher";
import { IUser } from "../../../interfaces/user.interface";

@Component({
	selector: 'app-edit-user-dialog',
	imports: [
		NgIf,
		ReactiveFormsModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatTooltipModule
	],
	standalone: true,
	templateUrl: './edit-user-dialog.component.html',
	styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent {
	matcher = new MyErrorStateMatcher();
	readonly data = inject<{ user: IUser }>(MAT_DIALOG_DATA);

	public readonly form = new FormGroup({
		id: new FormControl(this.data.user.id),
		name: new FormControl(this.data.user.name, [Validators.required, Validators.minLength(2)]),
		email: new FormControl(this.data.user.email, [Validators.required, Validators.email]),
		website: new FormControl(this.data.user.website, [Validators.required, Validators.minLength(3)]), // null и пустая строка '' одно и тоже
		company: new FormGroup({
			name: new FormControl(this.data.user.company.name, [Validators.required, Validators.minLength(2)]),
		}),
	});
	
	get userWithUpdatedFields() {	
		return {
			...this.form.value,
		}
	}
}