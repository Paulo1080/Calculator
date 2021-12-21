class CalculatorController {
    constructor() {

        this.dateEl = document.querySelector('.date');
        this.hourEl = document.querySelector('.hour');
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

    attDate() {
        let date = new Date();

        this.dateEl.innerHTML = date.toLocaleDateString('pt-BR');
        this.hourEl.innerHTML = date.toLocaleTimeString('pt-BR');
    }

    initAddEventsButtons() {
        let buttons = document.querySelectorAll('table.buttons td');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                let value = button.innerHTML;

                switch (value) {
                    case 'AC':
                        break;
                    case 'backspace':
                        break;
                    case '=':
                        break;
                    case '1/x':
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
                        break;
                }
            })
        });


    }
}