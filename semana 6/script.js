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
                buttonElement.classList.add('button_zero');
            }
            buttonElement.addEventListener('click', () => this.handleClick(button));
            this.buttonsDiv.appendChild(buttonElement);
        });

        this.currentExpression = '';
        this.lastResult = ''; // Armazenar o último resultado
        this.resetExpression = false; // Flag para reiniciar a expressão após um cálculo
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
        if (this.resetExpression) {
            this.currentExpression = '';
            this.resetExpression = false;
        }

        if (value === '=') {
            try {
                const result = new Function('return ' + this.currentExpression)();
                this.currentExpression = result.toString(); // Convertendo o resultado em string
                // Adicionar um zero à esquerda se o resultado começar com "0."
                if (this.currentExpression.startsWith('0.')) {
                    this.currentExpression = '0' + this.currentExpression;
                }
                this.lastResult = this.currentExpression;
                this.display.textContent = this.currentExpression;
                this.resetExpression = true; // Configurar para redefinir a expressão na próxima entrada
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
            // Adicionar uma vírgula se ainda não houver uma no número atual
            if (value === ',' && !this.currentExpression.includes(',')) {
                // Verificar se o display exibe "0" e substituí-lo por "0,"
                if (this.display.textContent === '0') {
                    this.currentExpression = '0,';
                } else {
                    this.currentExpression += value;
                }
            }
            // Adicionar um zero à esquerda da vírgula, se necessário
            else if (value === ',' && !this.currentExpression) {
                this.currentExpression += '0' + value;
            }
            else {
                this.currentExpression += value;
            }
            this.display.textContent = this.currentExpression;
        }
    }
}
class ZeroButton {
    constructor(calculator) {
        this.calculator = calculator;
    }

    handleClick() {
        if (this.calculator.currentExpression === '' || this.calculator.currentExpression === '0') {
            this.calculator.currentExpression = '0';
        } else {
            this.calculator.currentExpression += '0';
        }
        this.calculator.display.textContent = this.calculator.currentExpression;
    }
}
const calculator = new Calculator();
calculator.render('calculator');
