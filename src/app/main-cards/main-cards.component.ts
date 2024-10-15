import { Component } from "@angular/core";
import { NgFor, NgIf } from '@angular/common';

const itemCardsPagination = [1, 2, 3, 4, 5];
itemCardsPagination.reverse();

///////////////////////////////////

//--------------------------------------------- Ts

// ------------------------ Расширенные типы

// Дженерики позволяют делать что там по умолчанию, задавать и тд, но в данном случае мы делаем проверку
// Т.е. что у нас будет Дженериком
type TypeIsNumber<T> = T extends number ? 'yes' : 'no';

type Type1 = TypeIsNumber<number>// здес Type1 равен 'yes'
type Type2 = TypeIsNumber<string> // здес Type2 равен 'no'

// --- template для literala

type TypeBrand = 'bmw' | 'mclaren' | 'mercedes'
type TypePrice = '$100000' | '$400000' | '$50000'

type TypeCar = `${TypeBrand} ${TypePrice}`

// const car1: TypeCar = '' // нажми на кавычки (ctr + пробел) и увидишь что покажет подсказка
const car1: TypeCar = 'bmw $100000';

// const car2: TypeCar = '$100000 bmw'; // ошибка


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