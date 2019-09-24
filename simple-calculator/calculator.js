function Calculator(){
    this.total = 0;

    this.SpecAdd = SpecAdd;
    this.subtract = subtract;
    this.multiply = multiply;
    this.divide = divide;
   

    function SpecAdd(number){
        return this.total += number;
    }
    function subtract(number){
        return this.total -= number;
    }
    function multiply(number){
        return this.total *= number;
    }
    function divide(number){
        if(number === 0){
            throw new Error('cannot divide by zero');
        }
        return this.total /= number;
    }
}

Object.defineProperty(Calculator.prototype, 'version',{
    get:function(){
        //return ' 0.1';
        return fetch('http://dev.cmoney.tw/verbnoun/json.json')
        .then(function(result){
            return result.json();
        })
        .then(function(json){
            return json.version;
        });
    },
    enumerable: true,
    configurable: true
})


// Calculator.prototype.add = function(number){
//    return this.total += number;
// }
// Calculator.prototype.subtract = function(number){
//     return this.total -= number;
// }
// Calculator.prototype.multiply = function(number){
//     return this.total *= number;
// }
// Calculator.prototype.divide = function(number){
//     if(number === 0){
//         throw new Error('cannot divide by zero');
//     }
//     return this.total /= number;
// }