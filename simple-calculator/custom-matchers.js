var customMatchers={
    toBeCalculator: function(){
        return {
            compare: function(actual){
                var result = {
                    pass: actual instanceof Calculator,//TODO:
                    message: ''
                };

                if(result.pass){
                    result.message = 'Expected ' + actual + ' not to be instance of Calculator';
                }
                else{
                    result.message = 'Expected '+ actual + 'to be instance of Calculator';
                }
                return result;
            }
        }

    }
};