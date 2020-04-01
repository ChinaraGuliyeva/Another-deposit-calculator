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
        let resultBox=document.getElementById('result');
        let table=document.getElementById('resultTable');
        let clientData = new Deposit(initialSum, monthlyRefill, depositTime, depositCurrency);

        clientData.check();
        console.log(clientData);
        let calc = new Calculator();
        let result = calc.getDataFromClient();
        console.log(result);        
        function drawTable(result){
            if(result[0]==undefined) {
                resultBox.innerHTML="<p>Нет подходящих вариантов</p>";
            }

            if(result[0]!= undefined){
                let rows = []; 
                result.forEach(element => rows.push("<tr><td>" + element.bankName + "</td><td>" + element.investName + "</td><td>" +
                element.incomeType + "</td><td>" + element.finalSum + "</td></tr>"))
                table.style.display = "block";   
                let fullRows = "";             
                for (let i=0; i<rows.length; i++) {
                    fullRows+=rows[i];
                }                
                table.innerHTML="<tr class='head'><th>Название банка</th><th>Вклад</th><th>Процент</th><th>Итоговая сумма</th></tr>" 
                + fullRows;s
            }
        }
        drawTable(result);
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

        function minMaxAmountFilter(initialSum, array) {
            let result = array.filter(element => element.sumMin <= initialSum);
            let result2 = [];
            result.forEach(element => {
                if (element.sumMax == null) {
                    result2.push(element);
                }
                else if (element.sumMax >= initialSum) {
                    result2.push(element);
                }
            }
            )
            return result2;
        }

        let thirdFiltered = minMaxAmountFilter(initialSum, secondFiltered);
        console.log(thirdFiltered);

        function minMaxTermFilter(depositTime, array) {
            let result = array.filter(element => element.termMin <= depositTime);
            return result;
        }

        let forthFiltered = minMaxTermFilter(depositTime, thirdFiltered);
        console.log(forthFiltered);
        
        function bestSuggestion(array, initialSum, depositTime) {            
            let result =array.map(element => {return {
                bankName: element.bankName,
                investName: element.investName,
                incomeType: element.incomeType,
                finalSum: Math.trunc(initialSum*(Math.pow((1+element.incomeType/100), depositTime/12)))}       
            });

            const newArr = [...result];
            newArr.sort((objectOne, objectTwo) => objectTwo.finalSum - objectOne.finalSum);
            let maximum=newArr[0];
            const equalToMaximum = newArr.filter(element => element.finalSum == maximum.finalSum);
            return equalToMaximum;
         
        }

        let finalSuggestion = bestSuggestion(forthFiltered, initialSum, depositTime);
        return finalSuggestion;
    }

}

let application = new Application();
