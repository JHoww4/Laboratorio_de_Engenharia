class Calculator {
    constructor() {
        this.display = document.createElement('div');
        this.display.classList.add('display');
        this.display.textContent = '0';

        this.buttonsDiv = document.createElement('div');
        this.buttonsDiv.classList.add('buttons');

        this.buttons = [
            'AC', '-/+', '%', '÷',
            '7','8','9', 'x',
            '4', '5', '6','-',
            '1', '2', '3','+',
            '0', ',', '=',
        ];

        this.buttons.forEach(button => {
            const buttonElement = document.createElement('button');
            buttonElement.textContent = button;
            buttonElement.classList.add('button');
            if (button === '0') {
                buttonElement.classList.add('button-zero');
            }
            buttonElement.addEventListener('click', () => this.handleClick(button));
            this.buttonsDiv.appendChild(buttonElement);
        });

        this.currentExpression = '';
    }

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id ${containerId} not found.`);
            return;
        }

        container.appendChild(this.display);
        container.appendChild(this.buttonsDiv);
    }

    handleClick(value) {
        if (value === '=') {
            try {
                this.currentExpression = eval(this.currentExpression);
                this.display.textContent = this.currentExpression;
            } catch (error) {
                this.display.textContent = 'Error';
                this.currentExpression = '';
            }
        } else if (value === 'AC') {
            this.display.textContent = '0';
            this.currentExpression = '';
        } else if (value === '-/+') {
            // Alterar o sinal do número atual
            if (this.currentExpression.startsWith('-')) {
                this.currentExpression = this.currentExpression.substring(1);
            } else {
                this.currentExpression = '-' + this.currentExpression;
            }
            this.display.textContent = this.currentExpression;
        } else if (value === '%') {
            // Calcular a porcentagem do número atual
            this.currentExpression = `${parseFloat(this.currentExpression) / 100}`;
            this.display.textContent = this.currentExpression;
        } else if (value === '÷') {
            this.currentExpression += '/';
            this.display.textContent = this.currentExpression;
        } else if (value === 'x') {
            this.currentExpression += '*';
            this.display.textContent = this.currentExpression;
        } else {
            this.currentExpression += value;
            this.display.textContent = this.currentExpression;
        }
    }
}
const calculator = new Calculator();
calculator.render('calculator');      
// 1-falhas da Calculadora que não comsegui ajustar quando colcar a virgula valor não sera " 0,numero"-> sera apenas a " , ".
// 2-quando realizar qual tipor de funçao a Calculadora ira aguar a numero tipo 2+2= 4 casso digite um outro numero ficara 41, mais
// ao pertar o botao AC ira resetar os numero.