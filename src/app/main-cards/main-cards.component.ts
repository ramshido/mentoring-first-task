import { Component } from "@angular/core";
import { NgFor, NgIf } from '@angular/common';

const itemCardsPagination = [1, 2, 3, 4, 5];
itemCardsPagination.reverse();

///////////////////////////////////

//--------------------------------------------- Ts

// ------------------------ Generic - Дженерики

// Это примерно, грубо говоря, как аргументы в функциях,
// Это то, что можно передать, только передаю определенный тип, который можно в дальнейшем использовать
// Это можно передать в функцию, в класс, в интерфейс тип, и этот тип где-то прописываем, 
// к примеру есть у нас некий name, мы не знаем что он будет содержать, string или number, вот дженерик поможет в каком-то случае так, а в другом случае так
// т.е. или str будет name, или он будет равен number

// Пример дженерика на функции:
/*

function(args) {
	return args;
}
	
*/
// и мы не знаем какие аргументы приходят, т.е. в одном случае они могут быть number, или str и т.д.
// как нам прокинуть это дело из вне?

function entity<T>(args: T): T { // Дженерик указывается в угловатых скобках, затем в типе параметра, затем в возвращеемом знач., для имени Дженерика указывают букву, обычно большую T,
	return args;
}
// Для дженерика нужно еще именовать функцию

// entity() // когда ничего не указываем, тип становится uknown - неизвестный
// entity(1) // когда указали число 1, он подставляется вместо имени дженерика, т.е. буквы Т в объявлении функции, но так неправильно

entity<number>(1); // когда указали дженерик number, он подставляется вместо имени дженерика, т.е. буквы Т в объявлении функции
entity<string>('1'); // так дженерик берет тип str

// На примере стрелочной функции

const entity2 = <T>(args: T): T => {
	return args;
}

entity2<number>(1); 
entity2<string>('1');

// На примере классов

class Channel<T> {
	private nameChannel: T

	constructor(name: T) {
		this.nameChannel = name
	}

	getName(): T {
		return this.nameChannel
	}
}

new Channel<string>('RED Group')
new Channel<number>(1)

// На примере интерфейсов

interface IPair<K, V> {
	key: K
	value: V
}

const pair1: IPair<number, string> = { // в type также можно принимать generic
	key: 1,
	value: 'id'
}

const pair2: IPair<string, string> = { // в type также можно принимать generic
	key: 'dsdfdsdfd',
	value: 'id'
}

// Тип джинерика по умолчанию, чтоб был доступ к определенным свойствам, методам и тд
/*

function getNameLength(entity) {
	return entity. // и здесь когда смотрим на предлагаемые варианты vs кодом, нет подсказок, а хотим вернуть length а он есть как длина строки так и длина массива
}

*/

// создаем для этого или тип, или интерфейс

type TypeLength = {
	length: number
}

function getNameLength<T extends TypeLength>(entity: T): number { // Расширяем дженерик на основе этого типа с помощью extends
	return entity.length
}

getNameLength('sdfdsdfdsdf');
getNameLength([0, 1, 2]);

function getElem(obj: object): void {
	console.log(obj);
	
}
// getElem('sdfds')
////////////////////////////////////////
@Component({
	selector: 'app-main-cards',
	standalone: true,
	imports: [NgIf, NgFor],
	templateUrl: './main-cards.component.html',
	styleUrl: './main-cards.component.scss',
})

export class MainCardsComponent {
	
	isShowBigImg = true;
	readonly paginations = itemCardsPagination;

}