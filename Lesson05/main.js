'use strict';
/**
 *
 * @type {{arColumnArray: number[], arFigureArray: *[], arRowsNames: *[]}}
 */
const cheese = {
    /** @private */
    arRowsNames : ["A", "B", "C", "D", "E", "F", "G", "H"],
    /** @private */
    arColumnArray : [1,2,3,4,5,6,7,8],
    /** @private */
    arFigureSet : ['ladya','horse','fers','queen','king','fers','horse','ladya'],
    /** @private */
    elCheeseContainer: null,
    buildTable() {
        this.elCheeseContainer = document.querySelector("#cheese");
        /**  Create rows  */
        let isBlack = false;
        for(let i = 0; i < 10; i++) {
            let row = document.createElement("div");
            row.setAttribute("class", "cheese__row");
            this.elCheeseContainer.appendChild(row);

            isBlack = !isBlack;

            /**  Create cells  */
            for(let j = 0; j < 10; j++) {
                let classOfColl = 'cheese__col';

                // Black or not
                if(i !== 0 && i !== 9 && j !== 0 && j !== 9) {
                    classOfColl += isBlack?' cheese__col_black':'';
                    isBlack = !isBlack;
                }

                let col = document.createElement("div");
                col.setAttribute("class", classOfColl);
                let content = this.getSymbol(i,j);

                if(content.type === 'char') {
                    col.innerText = content.result;
                }

                if(content.type === 'figure') {
                    classOfColl += ' cheese__figure cheese__figure_' + content.result;
                    if(content.color) {
                        classOfColl += `_${content.color}`;
                    }
                    col.setAttribute("class", classOfColl + ' cheese__figure cheese__figure_' + content.result);
                }

                row.appendChild(col);
            }


        }
    },
    getSymbol(i,j) {
        let result = null;
        let type = 'empty';
        let color = null;

        //  Верх и низ
        if((i === 0 || i === 9) && j >= 1 && j < 9) {
            result = this.arRowsNames[(j-1)];
            type = 'char';
        }
        //  Лево и право
        if((j === 0 || j === 9) && i >= 1 && i < 9) {
            result = this.arColumnArray[this.arColumnArray.length-(i)];
            type = 'char';
        }

        // Фигуры
        if(i === 1 && j > 0 && j < 9) {
            type = 'figure';
            color = 'b';
            result = this.arFigureSet[j-1];
        }
        // Фигуры
        if(i === 8 && j > 0 && j < 9) {
            type = 'figure';
            color = '';
            result = this.arFigureSet[j-1];
        }
        // Фигуры
        if(i === 2 && j > 0 && j < 9) {
            type = 'figure';
            color = 'b';
            result = 'peshka';
        }
        // Фигуры
        if(i === 7 && j > 0 && j < 9) {
            type = 'figure';
            color = '';
            result = 'peshka';
        }

        return {
            result: result,
            type: type,
            color: color
        };
    },

};
cheese.buildTable();