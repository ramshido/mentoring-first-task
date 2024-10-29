import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'characterLimiter',
	pure: true,
	standalone: true
})
export class CharacterLimiterPipe implements PipeTransform{
	transform(text: string): string {
		return text.length > 20 ? text.slice(0, 20) + '...' : text;
	}

}