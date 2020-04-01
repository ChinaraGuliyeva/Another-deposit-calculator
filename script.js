/*Описание
Разработать проект-калькулятор для подбора наиболее выгодного вклада исходя из его параметров.
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
При расчете конечной суммы можно использовать код функции из предыдущего проекта.

Требования к архитектуре

Приложение нужно реализовать с использованием нескольких классов:

Класс Deposit, реализующий свойства и функциональность вклада, который хотел бы открыть клиент. 

Класс BankProduct, реализующий свойства и функциональность банковского предложения по вкладу

Класс Calculator, инициализирующийся массивом продуктов BankProduct и вычисляющий наиболее выгодный вариант.

Класс Application, реализующий обработку нажатия на кнопку, получение введенных данных и отображение результатов.

*/


import { deposits } from './data.js';

class Application {
    constructor() {
        this.button = document.getElementById('button-choose');
        this.button.addEventListener('click', this.getData);
    }
    getData = () => {
        let initialSum = +document.getElementById('initial-sum-input').value;
        let monthlyRefill = +document.getElementById('monthly').value;
        let depositTime = +document.getElementById('time').value;
        let depositCurrency = document.getElementById('currency').value;
        let clientData = new Deposit(initialSum, monthlyRefill, depositTime, depositCurrency);

        clientData.check();
        console.log(clientData);

        let calc = new Calculator();
        calc.getDataFromClient();
    }

}

class Deposit {
    constructor(initial, monthly, time, currency) {
        this.initial = initial;
        this.monthly = monthly;
        this.time = time;
        this.currency = currency;
    }
    check = () => {
        if (this.initial >= 0 && this.monthly >= 0 && Number.isInteger(+this.time) && this.time > 0 && (this.currency == 'RUB' || this.currency == 'USD')) {
            //new calculator?
            console.log('ok')
        }
        else {
            alert('Ошибка!');
        }
    }
}

class BankProduct {
    constructor(initial, monthly, time, currency) {
        this.initial = initial;
        this.monthly = monthly;
        this.time = time;
        this.currency = currency;
    }
    getBankArray = () => {
        let banks = [];
        for (let i = 0; i < deposits.length; i++) {
            banks.push(deposits[i]);
        }
        return banks;
    }

}

class Calculator {
    getDataFromClient = (initialSum, monthlyRefill, depositTime, depositCurrency) => {
        initialSum = +document.getElementById('initial-sum-input').value;
        monthlyRefill = +document.getElementById('monthly').value;
        depositTime = +document.getElementById('time').value;
        depositCurrency = document.getElementById('currency').value;

        let bankProduct = new BankProduct();
        let newArray = bankProduct.getBankArray().concat();
        console.log(depositCurrency);

        function currencyFilter(depositCurrency, newArray) {
            let currencyArray = [];
            newArray.forEach(element => {
                //console.log(element.currency);
                //console.log(depositCurrency);
                if (element.currency == depositCurrency) {
                    currencyArray.push(element);
                }
            }
            );
            console.log(currencyArray);
            return currencyArray;
        }

        let firstFiltered = currencyFilter(depositCurrency, newArray);
        console.log(firstFiltered);

        function canRefill(monthlyRefill, array) {
            let resultArray = [];

            for (let i = 0; i < array.length; i++) {
                if (monthlyRefill == 0 && array[i].canDeposit == false) {
                    resultArray.push(array[i]);
                }
                else if (monthlyRefill > 0 && array[i].canDeposit == true) {
                    resultArray.push(array[i]);
                }
            }
            return resultArray;
        }
        let secondFiltered = canRefill(monthlyRefill, firstFiltered);
        console.log(secondFiltered);
    }
}

let application = new Application();
