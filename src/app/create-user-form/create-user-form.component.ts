import { NgIf } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
	selector: 'app-create-user-form',
	standalone: true,
	imports: [ReactiveFormsModule, NgIf],
	templateUrl: './create-user-form.component.html',
	styleUrl: './create-user-form.component.scss',
})
export class CreateUserForm {
	@Output()
	public createUser = new EventEmitter()

	public readonly form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(2)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		website: new FormControl('', [Validators.required, Validators.minLength(3)]), // null и пустая строка '' одно и тоже
		companyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
	})

	public submitForm(): void {
		// показ всего
		// console.log({
		// 	name: this.form.get('name')?.value,
		// 	email: this.form.get('email')?.value,
		// 	website: this.form.get('website')?.value,
		// 	companyName: this.form.get('companyName')?.value,
		// 	form: this.form.value,
		// });
		this.createUser.emit(this.form.value);
		this.form.reset(); // очистка формы после нажатия
	}

	//constructor() {
		// this.form.valueChanges.subscribe() при загрузке этого компонента, мы подписываемся на форму как на поток и остлеживаем каждое изменение в инпуте (даже когда пишем в нем)!
		// еще можно выявлять определенные ошибки, к примеру у нас валидация на мин знаков в поле, мы пишем:
		// this.form.get('name')?.errors; // и нам покажет ошибку minlength если мы введин до этого min значения установленного нами же, и по этому мы можем писать разные
		// условия, если такая ошибка, тогда окно с словами: вы мало написали, и тд.
	//}
}