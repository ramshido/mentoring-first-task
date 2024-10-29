import { Directive, ElementRef, HostBinding, HostListener, inject } from "@angular/core";

@Directive({
	selector: '[red]',
	standalone: true
})
export class RedDirective {
	private color = 'red';
	private textTransform = '';

	@HostBinding('style.backgroundColor') // на кого повешен '[red]' как атрибут, на того и юзает
	// backgroundColor = this.color; // чтобы работало это дело по умолчанию, делаем так, а если хотим менять эти знач., в других HostListener
	// делаем так:
	get backgroundColor() {
		return this.color;
	}

	// private readonly elementRef = inject(ElementRef); // если используем HostBinding, тогда inject(ElementRef); не нужен, конструктор тож удаляем
	// HostBinding это что-то вроде nativeElement, как в конструкторе

	@HostBinding('style.textTransform')
	get textTransformGetter() {
		return this.textTransform;
	}

	@HostListener('click') // кликнешь на те элементы, в которых есть это директива и произойдет событие
	click() {
		console.log('Directive host listener');
		this.color = 'purple';
	}

	@HostListener('mouseenter') // наведешь на те элементы, в которых есть это директива и произойдет событие
	enter() {
		console.log('Directive host mouseenter');
		this.color = 'yellow';
		this.textTransform = 'uppercase';
	}

	@HostListener('mouseleave') // наведешь потом уберешь на те элементы, в которых есть это директива и произойдет событие
	leave() {
		console.log('Directive host mouseleave');
		this.color = 'white';
		this.textTransform = 'lowercase';
	}

	// constructor() {
	// 	this.elementRef.nativeElement.style.backgroundColor = 'red';
	// }
}