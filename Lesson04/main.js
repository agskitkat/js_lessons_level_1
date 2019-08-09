'use strict';

/*
    1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/


/**
 * Преобразование числа от 0 до 999 в объект.
 *
 * @author AGS Oxibug
 * @constructor
 * @param {Number} num - Число для преобразования в объект
 * @return {Object} Новый объект Circle. {'единицы': 5, 'десятки': 4, 'сотни': 2}
 *
 */
function convertNumToObject(num) {
    /** @private */
    const arNameParam = ['единицы','десятки','сотни'];

    /** @private */
    const numObject = {};

    /** @private */
    const arNum = num.toString().split("").reverse();

    if(num > 999) {
        console.log("Не подходящее число. Введите число от 0 до 999.");
        return numObject;
    }

    for(let i = 0; arNameParam.length > i; i++) {
        if(!arNum[i]) {
            arNum[i] = 0;
        }
        numObject[arNameParam[i]] = parseInt(arNum[i]);
    }

    return numObject;
}

console.log(new convertNumToObject(prompt("Введите число от 0 до 999")));


/**
 * Игра из урока
 *
 * @author Ivan @inferal73 / mod. AGS Oxibug
 * @constructor
 * @this {gameObj}
 */
const gameObj = {
    /**
     * Состояние объекта, выбранный шаг
     * @private
     */
    step: 'first',
    /**
     * Метод иницализации первого шага
     * @param {String} step - Выбор шага first, second, third или end
     * @returns {gameObj}
     */
    setStep(step) {
        this.step = step;
        return this;
    },
    /**
     * Запуск цикла игры
     *
     */
    run() {
        console.log();
        while (true) {
            if (this.step === 'end') {
                console.log('конец');
                break;
            } else {
                this[this.step].nextStep();
            }
        }
    },
    /**
     * Отображает новый вопрос или сообщение о вариантах ответа
     *  @param {String} question - текст вопроса
     *  @param {String} firstBranch - Предыдущий вопрос (нет)
     *  @param {String} secondBranch - Следующий вопрос (да)
     */
    showQuestion(question, firstBranch, secondBranch) {
        const answer = prompt(question).toLowerCase();
        switch (answer) {
            case 'да':
                this.step = firstBranch;
                break;
            case 'нет':
                this.step = secondBranch;
                break;
            default:
                console.log('Нужно ответить "да" или "нет"');
        }
    },
    first: {
        question: 'Нужен ответ "да" или "нет"',
        nextStep() {
            gameObj.showQuestion(this.question, 'third', 'second');
        }
    },
    second: {
        question: 'Шаг номер 2, Нужен ответ "да" или "нет"',
        nextStep() {
            gameObj.showQuestion(this.question, 'third', 'end');
        }
    },
    third: {
        question: 'Шаг номер 3, Нужен ответ "да" или "нет"',
        nextStep() {
            this.step = null;
            gameObj.showQuestion(this.question, 'end', 'end');
        }
    },
};

gameObj.setStep('third').run();


// 3. *На базе игры, созданной на уроке, реализовать игру «Кто хочет стать миллионером?»
// Своя реализация «Кто хочет стать миллионером?»
/**
 * Формирование вопросов игры
 *
 * @author AGS Oxibug
 */
const quests = [
    {
        text:"Какие вызовы parseInt возвратят число?",
        answers:[
            "parseInt('1px')", "parseInt(null)", "parseInt(false)", "parseInt(true)"
        ],
        rightAnswer: 0,
        ischeckPointSumm: false,
        price: 1000
    },
    {
        text:"Что выведет код alert( '1'[0] );?",
        answers:[
            "0", "1", "2", "undefined"
        ],
        rightAnswer: 1,
        ischeckPointSumm: true,
        price: 2000
    },
    {
        text:"Какой результат будет у выражения: null + {0:1}[0] + [,[1],][1][0]",
        answers:[
            "0", "1", "2", "NaN"
        ],
        rightAnswer: 2,
        ischeckPointSumm: false,
        price: 3000
    },
    {
        text:"Чему равно 1 + b + 1, где let b = { toString() {return '1'} };",
        answers:[
            "11[object Object]", "2[object Object]", "111", "3"
        ],
        rightAnswer: 2,
        ischeckPointSumm: true,
        price: 5000
    }
    // Можно добавлять...
];


/**
 * Настройки игры, константы
 *
 * @author AGS Oxibug
 * @this {sittings}
 */
const sittings = {
    mainStyle:[
        "background: linear-gradient(to bottom, rgba(87,48,111,1) 0%, rgba(43,10,67,1) 43%, rgba(168,102,192,1) 77%, rgba(146,106,177,1) 100%);",
        "color: white;", "padding: 20px 90px;","font-size:20px;"
    ],
    greetingMsg: "Кто хочет стать миллионером ?",
    winMessage: "Ура вы победили !",
    exitCommand: "exit",
    commadMsg: '\r\nДля выхода введите: ',
    takeSummMsg: "\r\n Это несгораемая сумма !",
    letsPlayMsg: "Начать игру ?",
    winnerMessage: 'Это победа !'
}


/**
 * Отражает состояние игры (динамические переменные)
 *
 * @author AGS Oxibug
 * @this {state}
 */
const state = {
    command: 0,
    currentQuest: 0, // Какой сейчвс вопрос ?
    promptText: "",
    runGame: false,
    isWaitAnswer: false,
}

/* TODO сделать подсказки, 50\50, зал, звонок другу(имитация) */


/**
 * Класс игры
 *
 * @author AGS Oxibug
 * @namespace game
 * @this {game}
 */
const game = {
    sittings,
    state,
    quests,
    /**
     *  Запуск игры
     *
     * @author AGS Oxibug
     * @memberof game
     * @this {game}
     */
    start() {
        this.gretting();

        while(true) { // Цикл игры

            // Приветствие
            if(!this.state.runGame){
                this.state.command = confirm(this.state.promptText);

                // запуск игры
                if(!this.state.runGame && this.state.command) {
                    this.state.runGame = true;
                    continue;
                }
            }


            // Игра
            if(this.state.runGame) {

                this.renderQuest(); // Отрисовка вопроса

                this.state.command = prompt(this.state.promptText);

                // выход из игры
                if(this.state.command == sittings.exitCommand) {
                    break;
                }

                // Отвечаем на вопрос
                if(this.state.command >= 0 && this.state.command <= 4) {
                    let currentQuest = this.quests[state.currentQuest];

                    if(this.state.command == currentQuest.rightAnswer) {

                        if((state.currentQuest+1) === this.quests.length) {
                            this.renderResultWin();
                            break;
                        }

                        this.renderResult(); // Отрисовка результата ответа на вопрос
                        state.currentQuest++;
                    } else {
                        this.renderResultBad(); // Отрисовка результата ответа на вопрос не верно
                        break;
                    }
                }

            }
        }
    },


    /**
     * Очищает консоль
     *
     * @author AGS Oxibug
     * @memberof game
     * @this {game}
     */
    clearConsole() {
        this.state.promptText = "";
        console.clear();
    },


    /**
     * Вывод в консоль вопроса
     *
     * @author AGS Oxibug
     * @memberof game
     * @this {game}
     */
    renderQuest() {
        this.clearConsole();

        let currentQuest = this.quests[state.currentQuest];
        let currentQuestText = `${currentQuest.text}`;

        // Отображаем вопрос
        console.log('%c%s',
            this.sittings.mainStyle.join(''),
            currentQuestText
        );
        this.state.promptText = currentQuestText + "\r\n\r\n";

        // Отображаем варианты ответа
        for(let val in currentQuest.answers)  {
            this.state.promptText += `${val}: <${currentQuest.answers[val]}> \r\n`;
        }

        this.renderCommand();
    },


    /**
     * Вывод в консоль правильного ответа
     *
     * @author AGS Oxibug
     * @memberof game
     * @this {game}
     */
    renderResult() {
        this.clearConsole();

        let currentQuest = this.quests[state.currentQuest];

        this.state.promptText = `Правильно ! Вы заработали: ${currentQuest.price} рублей !`;

        if(currentQuest.ischeckPointSumm) {
            this.state.promptText += sittings.takeSummMsg;
        }

        confirm(this.state.promptText);

        this.renderCommand();
    },


    /**
     * Вывод в консоль неправильного ответа
     *
     * @author AGS Oxibug
     * @memberof game
     * @this {game}
     */
    renderResultBad(){
        this.clearConsole();

        let currentQuest = this.quests[state.currentQuest];
        let rightAnswer = currentQuest.answers[currentQuest.rightAnswer];

        alert(`Вы проиграли. Правильный ответ: ${rightAnswer}`);
    },


    /**
     * Вывод в консоль сообщения о победе
     *
     * @author AGS Oxibug
     * @memberof game
     * @this {game}
     */
    renderResultWin() {
        this.clearConsole();
        console.log('%c%s', this.sittings.mainStyle.join(''), this.sittings.winnerMessage);
        alert(this.sittings.winnerMessage);
    },


    /**
     * Вывод в консоль сообщения о функции выхода
     *
     * @author AGS Oxibug
     * @memberof game
     * @this {game}
     */
    renderCommand() {
        this.state.promptText += sittings.commadMsg + sittings.exitCommand;
    },


    /**
     * Вывод в консоль приветствия
     *
     * @author AGS Oxibug
     * @memberof game
     * @this {game}
     */
    gretting() {
        console.log('%c%s', this.sittings.mainStyle.join(''), this.sittings.greetingMsg);
        this.state.promptText = sittings.letsPlayMsg;
    }
};

game.start();