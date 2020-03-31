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

class Application {
    constructor(){
        this.button = document.getElementById('button-choose');
        this.button.addEventListener('click', this.getData);    
    }      
    getData = () => {
        let initialSum= +document.getElementById('initial-sum-input').value;
        let monthlyRefill= +document.getElementById('monthly').value;
        let depositTime= +document.getElementById('time').value;
        let depositCurrency= +document.getElementById('currency').value;

        let clientData = new Deposit(initialSum, monthlyRefill, depositTime, depositCurrency);
        ///clientData.check();
        console.log(clientData);
    }
    
}

class Deposit {
    constructor(initial, monthly, time, currency){
        this.initial=initial; 
        this.monthly=monthly; 
        this.time=time;
        this.currency=currency;
    }
    check =() =>{
        if (this.initial>=0 && this.monthly>0 && Number.isInteger(+this.time) && this.time>0 &&(this.currency=='RUB' || this.currency=='USD')){                 
            console.log('ok')
        }
        else {
            alert('Ошибка!');
        }
    }
}

class BankProduct {
    getBankArray =()=> {
        let banks = [];
        for (let i=0; i<deposits.length; i++){
            banks.push(deposits[i]);
        }
        return banks;
    }
}

class Calculator{
    
    //initializes by BankProduct array (deposits array) and calculates the best deposit 
}

let iii= new Application;
iii.getData();
 