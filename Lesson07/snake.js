(() => {
    let vars = {
        snakeFieldSelector: '#snake-field',
        fieldSize: 20,
        rowClass: 'row',
        cellClass: 'col',
        snakeHeadClass: 'snake-head', // Snake head class
        snakeBodyClass: 'snake-body', // Snake body class
        snakeFoodClass: 'snake-food',  // Snake eat class
        snakeTrapClass: 'snake-trap', // Snake trap class
        snakeStartLength: 2,
        snakeSpeed: 200,
        snakeTraps: 1,
        snakeTrapsBlock: 3
    };

    let snakeJS = {
        vars,
        score: 0,
        snakeState:{
            parts : [],
            direction: null
        },
        fieldState: [], // Array [x_y] = <Element> Cell
        trapState: [],
        foodState: [],
        snakeField: null,
        interval: null,
        init() {
            this.scoreContainer = document.querySelector("#score");
            console.log(this.scoreContainer);
            this.snakeField = document.querySelector(this.vars.snakeFieldSelector);
            for (let i = 0; i < vars.fieldSize; i++) {
                this.snakeField.appendChild(this.getRow(i));
            }
            this.updateScore();
            this.initSnake();

            this.foodState = this.spawnFood();
            this.spawnTraps();

            console.log( this.trapState);

            document.addEventListener('keydown',(event) =>  { this.changeDirection(event) });

            this.interval = setInterval(() =>  { this.motion() }, this.vars.snakeSpeed);
        },
        changeDirection(event) {
            //up
            if (event.code === 'ArrowUp') {
                if (this.snakeState.direction === 'left' || this.snakeState.direction === 'right') {
                    this.snakeState.direction = 'top';
                }
            }
            // down
            if (event.code === 'ArrowDown') {
                if (this.snakeState.direction === 'left' || this.snakeState.direction === 'right') {
                    this.snakeState.direction = 'bottom';
                }
            }
            // left
            if (event.code === 'ArrowLeft') {
                if (this.snakeState.direction === 'top' || this.snakeState.direction === 'bottom') {
                    this.snakeState.direction = 'left';
                }
            }
            // right
            if (event.code === 'ArrowRight') {
                if (this.snakeState.direction === 'top' ||this.snakeState.direction === 'bottom') {
                    this.snakeState.direction = 'right';
                }
            }
        },
        getCell(x, y) {
           let cell = document.createElement("div");
           cell.classList.add(this.vars.cellClass);
           this.fieldState[`${x}_${y}`] = cell;
           return cell;
        },
        getRow(y) {
            const row = document.createElement('div');
            row.classList.add(this.vars.rowClass);
            for (let i = 0; i < this.vars.fieldSize; i++) {
                row.appendChild(this.getCell(i ,y));
            }
            return row;
        },
        initSnake() {
            let snakeHeadX = this.getRandom(0, (this.vars.fieldSize - this.vars.snakeStartLength));
            let snakeHeadY = this.getRandom(0, (this.vars.fieldSize - this.vars.snakeStartLength));

            let direction = "top";
            if(snakeHeadX < snakeHeadY) {
                direction = "left";
            }

            for (let i = 0; i < this.vars.snakeStartLength; i++) {
                let x = 0;
                let y = 0;

                if(direction === 'top') {
                    x = snakeHeadX;
                    y = snakeHeadY+i;
                } else {
                    x = snakeHeadX+i;
                    y = snakeHeadY;
                }
                let snakePath = 'snake-body';
                if(i < 1) {
                    snakePath = 'snake-head';
                }
                this.snakeState.parts.push({x:x, y:y});
            }
            this.snakeState.direction = direction;
            console.log(this.snakeState);
        },
        getNextPointSnakeHead() {
            let x = 0, y = 0;

            if(this.snakeState.direction === 'top') {
                y = this.snakeState.parts[0].y - 1;
                x = this.snakeState.parts[0].x;
            }
            if(this.snakeState.direction === 'left') {
                y = this.snakeState.parts[0].y;
                x = this.snakeState.parts[0].x - 1;
            }
            if(this.snakeState.direction === 'right') {
                y = this.snakeState.parts[0].y;
                x = this.snakeState.parts[0].x + 1;
            }
            if(this.snakeState.direction === 'bottom') {
                y = this.snakeState.parts[0].y + 1;
                x = this.snakeState.parts[0].x;
            }

            if(x > this.vars.fieldSize - 1) {
                x = 0;
            }
            if(y > this.vars.fieldSize - 1) {
                y = 0;
            }
            if(x < 0) {
                x = this.vars.fieldSize -1;
            }
            if(y < 0) {
                y = this.vars.fieldSize -1;
            }

            return {x:x, y:y};
        },
        spawnFood() {
            let food = {x:0, y:0};
            do {
                 food.x = this.getRandom(0, this.vars.fieldSize-1);
                 food.y = this.getRandom(0, this.vars.fieldSize-1);
            } while(
                this.snakeState.parts.some(elem => elem.x === food.x && elem.y === food.y)
                ||
                this.trapState.some(elem => elem.x === food.x && elem.y === food.y)
                ||
                this.foodState.some(elem => elem.x === food.x && elem.y === food.y)
                );

            let addr = `${food.x}_${food.y}`;
            let lastElemet = this.fieldState[addr];
            lastElemet.classList.add(this.vars.snakeFoodClass);
            return [food, lastElemet];
        },
        spawnTraps() {
            if(this.trapState[0]) {
                let addr = `${this.trapState[0].x}_${this.trapState[0].y}`;
                console.log(addr);
                let lastElemet = this.fieldState[addr];
                lastElemet.classList.remove(this.vars.snakeTrapClass);
            }
            let trap = {x:0, y:0};
            do {
                trap.x = this.getRandom(0, this.vars.fieldSize-1);
                trap.y = this.getRandom(0, this.vars.fieldSize-1);
            } while(
                this.snakeState.parts.some(elem => elem.x === trap.x && elem.y === trap.y)
                ||
                this.trapState.some(elem => elem.x === trap.x && elem.y === trap.y)
                ||
                this.foodState.some(elem => elem.x === trap.x && elem.y === trap.y)
                );

            let addr = `${trap.x}_${trap.y}`;
            let lastElemet = this.fieldState[addr];
            lastElemet.classList.add(this.vars.snakeTrapClass);
            console.log(trap,lastElemet);
            this.trapState = [trap];
        },
        drawSnake(newHead) {

            let len = this.snakeState.parts.length;
            let x = this.snakeState.parts.x;
            let y = this.snakeState.parts.y;

            // Удаляем последний элемент змейки
            let lastPart = this.snakeState.parts[len-1];
            let addr = `${lastPart.x}_${lastPart.y}`;
            let lastElemet = this.fieldState[addr];
            lastElemet.classList.remove(this.vars.snakeBodyClass);
            this.snakeState.parts.pop();
            this.snakeState.parts.unshift(newHead);

            // Меняем класс первого элемента
            let secondPart = this.snakeState.parts[1];
            let secondElemet = this.fieldState[`${secondPart.x}_${secondPart.y}`];
            secondElemet.classList.remove(this.vars.snakeHeadClass);
            secondElemet.classList.add(this.vars.snakeBodyClass);

            // Подрисовываем голову
            let headPart = this.snakeState.parts[0];
            let headElemet = this.fieldState[`${headPart.x}_${headPart.y}`];
            headElemet.classList.add(this.vars.snakeHeadClass);

        },
        updateScore() {
            this.scoreContainer.innerText = this.score;
        },
        motion() {
            let newHead = this.getNextPointSnakeHead();

            if(this.snakeState.parts.some(elem => elem.x === newHead.x && elem.y === newHead.y )) {
                alert('You loose (');
            }

            if(this.trapState.some(elem => elem.x === newHead.x && elem.y === newHead.y )) {
                alert('You loose (');
            }

            if(this.foodState.some(elem => elem.x === newHead.x && elem.y === newHead.y )) {
                this.score++;
                this.updateScore();
                let addr = `${this.foodState[0].x}_${this.foodState[0].y}`;
                let lastElemet = this.fieldState[addr];
                lastElemet.classList.remove(this.vars.snakeFoodClass);

                this.snakeState.parts[ this.snakeState.parts.length ] = this.snakeState.parts[this.snakeState.parts.length-1]

                this.foodState = this.spawnFood();
                this.spawnTraps();
            }

            this.drawSnake(newHead);
        },
        getRandom(min, max) {
            return Math.floor( (Math.random() * (max - min + 1)) + min );
        }
    };
    return snakeJS.init();
})();