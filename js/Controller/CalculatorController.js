class CalculatorController {
    constructor() {
        this._dateEl = document.querySelector('.date');
        this._hourEl = document.querySelector('.hour');
        this._displayEl = document.querySelector('.expression');
        this._prevEl = document.querySelector('.preview');
        this._expressionList = ['0'];
        this._prev = 0;
        this.initialize();
        this.initAddEventsButtons();
        this.initAddEventsKeyboardy();
        this._ifResult = false;
    }

    initialize() {
        this.attDate();
        setInterval(() => {
            this.attDate();
        }, 1000)
    }

    inverse(){
        if(this.ferifyOperator(this.returnLast())){
            this._expressionList.pop();
        }
        if(this.returnLast()=='0'){
            return;
        }
        this._expressionList[this._expressionList.length-1] = (1/this.returnLast()).toString();
        this._ifResult =true;
        this.attDisplay();
        
    }

    attDate() {
        let date = new Date();
        this._dateEl.innerHTML = date.toLocaleDateString('pt-BR');
        this._hourEl.innerHTML = date.toLocaleTimeString('pt-BR');
    }

    attDisplay(){
        this._displayEl.innerHTML = this._expressionList.join('');
        this._prevEl.innerHTML = this._prev;
        this._displayEl.scrollBy(100,0);
    }

    clear(){
        this._expressionList = ['0'];
        this._prev = '0';
        this.attDisplay();
    }

    eraser(){
        this._expressionList[this._expressionList.length-1] = this.returnLast().slice(0,-1);
        if(this.returnLast() == ''){
            if(this._expressionList.length == 1){
                this._expressionList = ['0']
            }else{
                this._expressionList.pop();
            }
        }
        this.attDisplay();
    }

    error(){
        this._displayEl.innerHTML = 'ERROR';
        this._prevEl.innerHTML = '';
        this._ifResult = true;
    }

    returnLast(){
        return this._expressionList[this._expressionList.length-1];
    }

    ferifyOperator(val){
        return ['×','÷','+','-'].indexOf(val)>-1;
    }

    addExpressionValues(val){
        if(this.ferifyOperator(val)){
            if(this.ferifyOperator(this.returnLast())){
                this._expressionList[this._expressionList.length-1] = val;
            }else{
                this._expressionList.push(val);
            }            
        }else{
            if(this.ferifyOperator(this.returnLast())){
                this._expressionList.push(val);
            }else{
                if(this.returnLast() == '0' && val.toString() != '.'){
                   this._expressionList[this._expressionList.length-1] = ''; 
                }
                if(this.returnLast().indexOf('.')>-1 && val.toString() == '.'){
                    return;
                }
                this._expressionList[this._expressionList.length-1] += val.toString();
            }
            
        }
        this.attDisplay();
    }

    multIndexOf(arrMain,arr){
        for(let i = 0; i < arrMain.length; i++){
            let v = arrMain[i];
            for(let i2 = 0; i2 < arr.length; i2++){
                let v2 = arr[i2];
                if(v==v2){
                    return [i,v2];
                }
            }
        }
        return [-1,'']
    }

    calculate(arr){
        for(let i = 0; i < arr.length; i+=2){
            arr[i] = parseFloat(arr[i]);
        }
        
        while(this.multIndexOf(arr,['×','÷'])[0]>-1 ){
            let operation = this.multIndexOf(arr,['×','÷']); // [index, 'el']
            let result;
            switch(operation[1]){
                case '÷':
                    result = arr[operation[0]-1]/arr[operation[0]+1];
                    break;
                case '×':
                    result = arr[operation[0]-1]*arr[operation[0]+1];
                    break;
            }
            arr.splice(operation[0]-1,3,result);
            
        }

        while(this.multIndexOf(arr,['+','-'])[0]>-1 ){
            let operation = this.multIndexOf(arr,['+','-']); // [index, 'el']
            let result;
            switch(operation[1]){
                case '+':
                    result = arr[operation[0]-1]+arr[operation[0]+1];
                    break;
                case '-':
                    result = arr[operation[0]-1]-arr[operation[0]+1];
                    break;
            }
            arr.splice(operation[0]-1,3,result);
            
        }
        this._ifResult = true;
        arr[0] = arr[0].toString();
        this.attDisplay();
    }

    calcPrev() {
        let lisrPrev = [];
        this._expressionList.forEach((v)=>{
            lisrPrev.push(v);
        })
        this.calculate(lisrPrev);
        this._ifResult = false;
        if(isNaN(lisrPrev[0]))
            return;
        this._prev = lisrPrev.join('');
        this.attDisplay();
    }

    initAddEventsKeyboardy(){
        document.addEventListener('keyup',(e)=>{
            switch (e.key) {
                case 'c':  //AC
                    this.clear();
                    break;
                case 'Backspace': //backspace
                    if(this._ifResult == true){
                        this.clear();
                    }
                    this.eraser();
                    this.calcPrev();
                    break;
                case 'Enter':   //=
                    if(this._ifResult == true){
                        return;
                    }
                    this._prev = '';
                    this.calculate(this._expressionList);
                    break;                
                case '+':
                case '-':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                case '0':
                case '.':
                    
                    if(this._ifResult == true){
                        this.clear();
                        this._ifResult = false;
                    }
                    
                    this.addExpressionValues(e.key);
                    this.calcPrev();
                    break;
                case '/':  //÷
                    if(this._ifResult == true){
                        this.clear();
                        this._ifResult = false;
                    }
                    
                    this.addExpressionValues('÷');
                    this.calcPrev();
                    break;
                case '*':  //×
                    if(this._ifResult == true){
                        this.clear();
                        this._ifResult = false;
                    }
                    
                    this.addExpressionValues('×');
                    this.calcPrev();
                    break;
                    
            }


        })
    }

    initAddEventsButtons() {
        let buttons = document.querySelectorAll('table.buttons td');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                let value = button.innerHTML;

                switch (value) {
                    case 'AC':
                        this.clear();
                        break;
                    case 'backspace':
                        if(this._ifResult == true){
                            this.clear();
                        }
                        this.eraser();
                        this.calcPrev();
                        break;
                    case '=':
                        if(this._ifResult == true){
                            return;
                        }
                        this._prev = '';
                        this.calculate(this._expressionList);
                        break;
                    case '1/x':
                        this.inverse();
                        this.calcPrev();
                        break;
                    case '+':
                    case '-':
                    case '÷':
                    case '×':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                    case '0':
                    case '.':
                        
                        if(this._ifResult == true){
                            this.clear();
                            this._ifResult = false;
                        }
                        
                        this.addExpressionValues(value);
                        this.calcPrev();
                        break;
                }
                
                if(isNaN(this._expressionList[0])){
                    this.error();
                }
            })
        });
    }
}