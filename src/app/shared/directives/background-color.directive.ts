import { Directive, HostBinding, HostListener, Input } from "@angular/core";

@Directive({
	selector: '[backgroundColor]',
	standalone: true
})
export class BackgroundColorDirective {
	@Input('backgroundColor') 
	set backgroundColor(value: string) {
		this.defaultColor = value;
		this.color = '';
	}

	private defaultColor: string = '';

	@HostBinding('style.backgroundColor') color:string = '';

	@HostListener('mouseenter')
	enter() {
		this.color = this.defaultColor;
	}

	@HostListener('mouseleave')
	leave() {
		this.color = 'transparent';
	}
}