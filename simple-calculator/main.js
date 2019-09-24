function calculate(inputValue){
    const expression = /\+|\-|\*|\//;
    const numbers = inputValue.split(expression);

    const numberA = parseInt(numbers[0]);
    const numberB = parseInt(numbers[1]);

    const operation = inputValue.match(expression);
    
    if(Number.isNaN(numberA) || Number.isNaN(numberB) || operation === null){
        updateResult('Expression not recognized.');
        return;
    }

    var calculator = new Calculator();
    calculator.SpecAdd(numberA);
    var result;
    switch(operation[0]){
        case'+':
        result = calculator.SpecAdd(numberB);
        break;
        case'-':
        result = calculator.subtract(numberB);
        break;
        case'*':
        result = calculator.multiply(numberB);
        break;
        case'/':
        result = calculator.divide(numberB);
        break;
    }
    updateResult(result);
}

function updateResult(result){
    var element = document.getElementById('result');
    if(element){
        element.innerText = result;
    }
}

function showVersion(){
    var calculator = new Calculator();
    var element = document.getElementById('version');
    //element.innerText = calculator.version;

    calculator.version
    .then(function(version){
        element.innerText = version;
    });
}