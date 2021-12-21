class CalculatorController {
    constructor() {

        this._dateEl = document.querySelector('.date');
        this._hourEl = document.querySelector('.hour');
        this._displayEl = document.querySelector('.expression');
        this._expressionList = ['0'];
        this.initialize();
        this.initAddEventsButtons();
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
        this.attDisplay();
        
    }

    attDate() {
        let date = new Date();

        this._dateEl.innerHTML = date.toLocaleDateString('pt-BR');
        this._hourEl.innerHTML = date.toLocaleTimeString('pt-BR');
    }

    attDisplay(){
        this._displayEl.innerHTML = this._expressionList.join('');
        this._displayEl.scrollBy(100,0);
    }

    clear(){
        this._expressionList = ['0'];
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
        console.log(this._expressionList);
        this.attDisplay();
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
                        this.eraser();
                        break;
                    case '=':
                        break;
                    case '1/x':
                        this.inverse();
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
                        this.addExpressionValues(value);
                        break;
                }
            })
        });


    }
}