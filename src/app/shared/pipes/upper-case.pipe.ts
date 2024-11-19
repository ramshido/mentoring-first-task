import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'customUpperCase',
	pure: true,
	standalone: true
})
export class CustomUpperCasePipe implements PipeTransform {
	transform(text: string): string {
		return text.toUpperCase();
	}

}