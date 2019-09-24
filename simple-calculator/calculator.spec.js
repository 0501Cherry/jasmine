describe('calculator.js', function(){
    

    describe('Calculator', function(){

        //因為在beforeEach做了new 的動作，所以it中不需要在重覆寫
        var calculator;
        var calculator2;
    
        beforeEach(function(){
            //Anything inside this block executes before
            //each spec (it) inside this describe
            calculator = new Calculator();
            calculator2 = new Calculator();
        });

        afterEach(function(){
            //Anything inside this block executes after
            //each spec (it) inside this describe
            
        });




        it('should initialize the total', function(){
            expect(calculator.total).toBe(0);
            expect(calculator.total).toBeFalsy();
    
        });
    
        xit('has constructor', function(){
            /**這邊主要是要說: 
             * toEqual 是用 == 來判斷(寬鬆) 
             * toBe 是用 === 來判斷(嚴格) */
    
            /**但在我原本習慣的寫法中  toEqual 還是無法 將 這邊的兩個物件判斷為相等的。
             * 我的判斷是: 因為我的function 是包在 主function中，因此，既然主function 已經重new 那就會是另一物件。
             * 內部元素可能因記憶體位置 或 其它關係，而被判斷為不同物件
             */
            expect(calculator).toEqual(calculator2);
        });

        it('instantiates unique object', function(){
    
            expect(calculator).not.toBe(calculator2);
        });
    
        it('has common operations', function(){

            expect(calculator.SpecAdd).toBeDefined();//.not.toBeUndefined();
            expect(calculator.subtract).toBeDefined();//.not.toBeUndefined();
            expect(calculator.multiply).toBeDefined();//.not.toBeUndefined();
            expect(calculator.divide).toBeDefined();//.not.toBeUndefined();
        });
    
        it('can overwrite total', function(){

            calculator.total = null;
            expect(calculator.total).toBeNull();
        });
        it('returns total', function(){

            calculator.total = 50;
            expect(calculator.SpecAdd(20)).toBe(70);
            expect(calculator.total).toMatch(/-?\d+/);
            expect(typeof calculator.total).toMatch('number');
    
            //asymmetric matchers!
            //not equal in each side!
    
            expect(calculator.total).toEqual(jasmine.anything());
            expect(function(){}).toEqual(jasmine.anything());
            //expect(null).toEqual(jasmine.anything());
            //expect(undefined).toEqual(jasmine.anything());
        });
        
        describe('add()', function(){
            it('should add numbers to total', function(){
                //Expectations

                calculator.SpecAdd(5);
        
                // expect total to be 5
                expect(calculator.total/**actual value */).toBe(5/**expected value */);
            });

            it('can be instantiated', function(){
                jasmine.addMatchers(customMatchers);//Custom!!!
        
                expect(calculator).toBeCalculator();//Custom!!!
                //expect(2).toBeCalculator();//Custom!!!
        
                expect(calculator).toBeTruthy();
                expect(calculator2).toBeTruthy();
        
                expect(calculator.constructor.name/**Calculator */).toContain('Cal');
            });
        });

        describe('subtract()', function(){
            it('should subtract numbers from total', function(){
                //Expectations
                calculator.total = 30;
                calculator.subtract(5);
                expect(calculator.total).toBe(25);
            });

        });
        
        describe('multiply()', function(){
            it('should multiply numbers by total', function(){
                //Expectations
                calculator.total = 100;
                calculator.multiply(2);
                expect(calculator.total).toBe(200);
            });
            it('does not handle NaN', function(){
                calculator.total = 20;
                calculator.multiply('a');
                expect(calculator.total).toBeNaN();
            });
        });
        describe('divide()', function(){
            it('should divide numbers by total', function(){
                //Expectations
                calculator.total = 100;
                calculator.divide(2);
                expect(calculator.total).toBe(50);
                //expect(calculator.total).toBeNumber();
            });
            it('handles divide by zero',function(){
                expect(function(){calculator.divide(0)}).toThrow();
                expect(function(){calculator.divide(0)}).toThrowError(Error);
                expect(function(){calculator.divide(0)}).toThrowError(Error, 'cannot divide by zero');
            });
        });

        describe('get version', function(){
            /**done 是一開始為了確保程式等fetch拿到後 才結束，不然會有時候正確有時候沒有拿到資料
             * 但是有了spyOn後  就不需要了
             */
            it('fetches version from external source', async function(done){
                //spyOn 這是第二部後才加的
                spyOn(window, 'fetch').and.returnValue(Promise.resolve( 
                    new Response('{"version":"0.1"}')
                ));
                
                /*calculator.version.then(function(version){
                    expect(version).toBe('0.1');
                    //done();
                });*/
                var version = await calculator.version;
                expect(version).toBe('0.1');
                done();
            });
        });
    
    });
    
});
