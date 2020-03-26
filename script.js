//choose the most profitable deposit. if there are more than one they all shoukd be shown
//Maybe result of calculation should also draw a table? Or it should be ready but invisible?

/*Разработать проект-калькулятор для подбора наиболее выгодного вклада исходя из его параметров.
С помощью интерфейса пользователь может задать параметры вклада:
Начальная сумма (неотрицательное число)
Сумма ежемесячного пополнения (неотрицательное число)
Срок вклада (положительное целое число месяцев)
Валюта вклада (строка ‘RUB’/’USD’)
После нажатия на кнопку “Подобрать”, пользователь получает наиболее выгодное с точки зрения конечной суммы банковское предложение в формате:
Название банка, вклад, процент, итоговая сумма по истечении срока.
Если есть несколько оптимальных банковских продуктов, дающих одинаковую конечную сумму, то информация выводится по каждому из них.
Если ни одного подходящего варианта не найдено, пользователю выводится “Нет подходящих вариантов”
Если пользователь ввел некорректное значение, выводится alert с сообщением об ошибке.
Варианты банковских продуктов даны в таблице.

Мы предполагаем ежемесячную капитализацию по вкладу. Пополнение происходит после начисления процентов. Последнее пополнение по окончании срока не производится. 
При расчете конечной суммы можно использовать код функции из предыдущего проекта.*/


import {deposits} from './data.js';

let initialSum= document.getElementById('initial-sum-input');
let monthlyRefill= document.getElementById('monthly');
let depositTime= document.getElementById('time');
let depositCurrency= document.getElementById('currency');
let button = document.getElementById('button-choose');

console.log(initialSum.value);
console.log(monthlyRefill.value);
console.log(depositTime.value);
console.log(depositCurrency.value);

/* must be moved to class

button.addEventListener('click', check);

function check() { 
    }*/

//Maybe it should take arguments from inputs 
class Deposit {
    constructor(initial, monthly, time, currency){
        this.initial = initial;
        this.monthly = monthly;
        this.time = time;
        this.currency = currency;
    }
}

//Maybe it should be taken from deposits
class BankProduct {
    constructor(bank, invest, rate){
        this.bank = bank;
        this.invest = invest;
        this.rate = rate;
        total = 0;
        //add formula for total
    }
}

class Calculator{
    //initializes by BankProduct array (deposits array) and calculates the best deposit
    //maybe should take value from data.js and inputs
}

class Application {
    //hadles button onClick. Looks like the simplest task
}
