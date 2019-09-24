/**從callThrough,  callFake 後面開始就沒有在寫在上面  因為發現與平常寫的架構不符*/

describe('main.js', function(){
    describe('calculate()', function(){
        it('validates expression when first number is invalid', function(){
            //因為updateResult是global方法 在window裡的物件'
            //已下這句code是指don't return anything don't recall anything 就只是追蹤這個方法
            spyOn(window, 'updateResult').and.stub();
            calculate('a+3');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized.');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });
        it('validates expression when second number is invalid', function(){
            spyOn(window, 'updateResult');//and.stub() is the default, can be omitted
            calculate('3+a');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized.');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });
        it('validates expression when operation is invalid', function(){
            spyOn(window, 'updateResult');
            calculate('3_4');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized.');
            expect(window.updateResult).toHaveBeenCalledTimes(1);
        });

        it('calls add', function(){
            //spyOn(calculate, 'add'); //要選的是類別 用名稱會找不到, 
            /**
             * 課程範例
             * Calculator{this.total=0;}
             * 
             * Calculator.prototype
             * {add:f, subtract:f, multiply; f, divide:f, constructor: f}
             */

            /**
             * const spy = spyOn(Calculator.prototype, 'add');
             * calculate('3+4);
             * 
             * expect(spy).toHaveBeenCalled();
             * expect(Calculator.prototype.add).toHaveBeenCalledWith(3);
             */

            //嘗試失敗
            //因為即使在這邊new了一個物件，但是在執行方法時，它會再另外new一個物件
            //這會讓電腦判斷 他們為不同物件，所以無法監控
            //var item = new Calculator();
            //const spy = spyOn(item, 'SpecAdd');
            //calculate('3+4');
            //expect(item.SpecAdd).toHaveBeenCalledTimes(2);
            // expect()
            
        

        });
        xit('calls subtract');
        xit('calls multiply');
        xit('calls divide');
        xit('validates operation');
        it('calls updateResult (example using and.callThrough)', function(){
            spyOn(window, 'updateResult');
            var item = new Calculator();
            spyOn(item, 'multiply')//.and.callThrough();
            calculate('5*5');
            expect(window.updateResult).toHaveBeenCalled();
            expect(window.updateResult).toHaveBeenCalledWith(25);
        });
    });
    describe('updateResult()', function(){
        //let element;//第一種宣告方式
        /*Note: 如果使用suiet方式 ()=> 取代function 要小心 
        每次會是重new一個function，所以this.element 會被判定是不同的元件喔*/
        beforeAll(function(){
            //Executed ONCE before all specs are executed.
            const element = document.createElement('div');
            element.setAttribute('id', 'result');
            document.body.appendChild(element);

            this.element = element;//第二種宣告方式
        });

        afterAll(function(){
            //Executed ONCE after all specs are executed.
            //element = document.getElementById('result');//搭配第一中宣告
            document.body.removeChild(/**搭配第二種宣告方式 */this.element);
        });

        it('adds result to DOM element', function(){
            updateResult('5');
            expect(/**搭配第二種宣告方式 */this.element.innerText).toBe('5');
        });
    });
    describe('showVersion()', function(){
        it('calls calculator.version', function(){
            spyOn(document, 'getElementById').and.returnValue({
                innerText: null
            });
            //如果直接這樣使用  Calculator.prototype.version 會是undefinded
            //為什麼呢@@ 目前還不太理解
            // spyOnProperty(Calculator.prototype, 'version','get');
            // showVersion();
            // expect(/**spy */ Calculator.prototype.version).toHaveBeenCalled();

            /**.and後面&Promise.resolve() 這些是後來才加的 */
            var spy = spyOnProperty(Calculator.prototype, 'version','get').and.returnValue(
                Promise.resolve()
            );
            

            showVersion();
            expect(/**Object.getOwnPropertyDescriptor(Calculator.prototype, 'version').get*/spy).toHaveBeenCalled();
        });
    })

});