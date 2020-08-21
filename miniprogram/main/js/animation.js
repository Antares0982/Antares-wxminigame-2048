import Draw from "draw.js"
import Core from "core.js"

const { windowWidth, windowHeight } = wx.getSystemInfoSync()

const gridWidth = (windowWidth - 25) / 4
const thinreclength = 5 //最好是5的倍数

const coordinateX = [thinreclength, 2 * thinreclength + gridWidth, 3 * thinreclength + 2 * gridWidth, 4 * thinreclength + 3 * gridWidth]
const coordinateY = [windowHeight / 2 - 12 * thinreclength / 5 - 2 * gridWidth, windowHeight / 2 - 7 * thinreclength / 5 - gridWidth, windowHeight / 2 - 2 * thinreclength / 5, windowHeight / 2 + 3 * thinreclength / 5 + gridWidth]

function generateRand(n) {
    return parseInt(n * Math.random())
}


export default class Animation{
    constructor(){
        this.core = new Core()
        this.draw = new Draw()
    }

    
    drawNum(i, j, biasx, biasy, boolformal) {
        this.draw.ctx.beginPath();
        this.draw.ctx.fillStyle = "#000000";
        this.draw.ctx.textAlign = "center";
        this.draw.ctx.textBaseline = "middle"//得写在font之前
        this.draw.ctx.font = "bold 48px Arial";
        if (boolformal) {//boolformal为true，则绘制formal的矩阵中的数字，此时biasx, biasy代表它如何移动。boolformal为false时，应有biasx = biasy = 0
            this.draw.ctx.fillText(this.core._formalarray[i][j], coordinateX[j] + gridWidth / 2 + biasx, coordinateY[i] + gridWidth / 2 + biasy)
        }
        else {
            this.draw.ctx.fillText(this.core._2048array[i][j], coordinateX[j] + gridWidth / 2 + biasx, coordinateY[i] + gridWidth / 2 + biasy)
        }
        this.draw.ctx.closePath();
        this.draw.ctx.fillStyle = '#ffffff'
    }
 
    //drawrightmove()经过测试可以使用

    drawrightanimation(movesteps) {
        var tt = 0
        var interval = setInterval(() => {//开始做动画
            if (tt >= 32) {
                clearInterval(interval)
                return
            }
            tt++
            if (tt == 32) {
                this.afteronestep()
                return
            }
            else {
                this.draw.drawTable()
                for (var i = 0; i < 4; i++) {
                    for (var j = 3; j >= 0; j--) {
                        if (this.core._formalboolean[i][j] == 1) {
                            this.draw.fillRoundRect(this.draw.ctx, coordinateX[j] + tt * movesteps[i][j] * (gridWidth + 5) / 31, coordinateY[i], gridWidth, gridWidth, windowWidth * 4 / 375, this.draw.num_color(this.core._formalarray[i][j]))
                            this.drawNum(i, j, tt * movesteps[i][j] * (gridWidth + 5) / 31, 0, true)
                        }
                    }
                }
            }
            return
        }, 7)
    }

    drawrightmove() {
        //要先找到哪些块往哪里移动，哪些块没有移动。用移动步数表示，没有移动的记为0.
        var movesteps = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (var i = 0; i < 4; i++) {
            for (var endstep = 3, j = 3; this.core._2048boolean[i][endstep]; endstep--) {
                while (!this.core._formalboolean[i][j] && j > 0) { j-- }
                if (this.core._formalarray[i][j] == this.core._2048array[i][endstep]) {
                    movesteps[i][j] = endstep - j
                    j--
                }
                else if (this.core._formalarray[i][j] * 2 == this.core._2048array[i][endstep]) {
                    movesteps[i][j] = endstep - j
                    j--
                    while (!this.core._formalboolean[i][j] && j > 0) { j-- }
                    movesteps[i][j] = endstep - j
                    j--
                }
            }
        }
        console.log('movestep is :')
        console.log(movesteps[0])
        console.log(movesteps[1])
        console.log(movesteps[2])
        console.log(movesteps[3])
        this.drawrightanimation(movesteps)
    }


    drawleftmove() {
        //要先找到哪些块往哪里移动，哪些块没有移动。用移动步数表示，没有移动的记为0.
        var movesteps = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (var i = 0; i < 4; i++) {
            for (var endstep = 0, j = 0; this.core._2048boolean[i][endstep]; endstep++) {
                while (!this.core._formalboolean[i][j] && j < 3) { j++ }
                if (this.core._formalarray[i][j] == this.core._2048array[i][endstep]) {
                    movesteps[i][j] = j - endstep
                    j++
                }
                else if (this.core._formalarray[i][j] * 2 == this.core._2048array[i][endstep]) {
                    movesteps[i][j] = j - endstep
                    j++
                    while (!this.core._formalboolean[i][j] && j < 3) { j++ }
                    movesteps[i][j] = j - endstep
                    j++
                }
            }
        }
        console.log('movestep is :')
        console.log(movesteps[0])
        console.log(movesteps[1])
        console.log(movesteps[2])
        console.log(movesteps[3])
        var tt = 0//到目前为止不输出动画
        var interval = setInterval(() => {//开始做动画
            if (tt >= 32) {
                clearInterval(interval)
                return
            }
            tt++
            if (tt == 32) {
                this.afteronestep()
                return
            }
            else {
                this.draw.drawTable()
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (this.core._formalboolean[i][j] == 1) {
                            this.draw.fillRoundRect(this.draw.ctx, coordinateX[j] - tt * movesteps[i][j] * (gridWidth + 5) / 31, coordinateY[i], gridWidth, gridWidth, windowWidth * 4 / 375, this.draw.num_color(this.core._formalarray[i][j]))
                            this.drawNum(i, j, - tt * movesteps[i][j] * (gridWidth + 5) / 31, 0, true)
                        }
                    }
                }
            }
            return
        }, 10)
    }

    drawupmove() {
        //要先找到哪些块往哪里移动，哪些块没有移动。用移动步数表示，没有移动的记为0.
        var movesteps = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (var i = 0; i < 4; i++) {
            for (var endstep = 0, j = 0; this.core._2048columnboolean[i][endstep]; endstep++) {
                while (!this.core._formalcolumnboolean[i][j] && j < 3) { j++ }
                if (this.core._formalcolumn[i][j] == this.core._2048column[i][endstep]) {
                    movesteps[i][j] = j - endstep
                    j++
                }
                else if (this.core._formalcolumn[i][j] * 2 == this.core._2048column[i][endstep]) {
                    movesteps[i][j] = j - endstep
                    j++
                    while (!this.core._formalcolumnboolean[i][j] && j < 3) { j++ }
                    movesteps[i][j] = j - endstep
                    j++
                }
            }
        }
        console.log('movestep is :')
        console.log(movesteps[0])
        console.log(movesteps[1])
        console.log(movesteps[2])
        console.log(movesteps[3])
        var tt = 0//到目前为止不输出动画
        var interval = setInterval(() => {//开始做动画
            if (tt >= 32) {
                clearInterval(interval)
                return
            }
            tt++
            if (tt == 32) {
                this.afteronestep()
                return
            }
            else {
                this.draw.drawTable()
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        if (this.core._formalcolumnboolean[i][j] == 1) {

                            this.draw.fillRoundRect(this.draw.ctx, coordinateX[i], coordinateY[j] - tt * movesteps[i][j] * (gridWidth + 5) / 31, gridWidth, gridWidth, windowWidth * 4 / 375, this.draw.num_color(this.core._formalcolumn[i][j]))
                            this.drawNum(j, i, 0, - tt * movesteps[i][j] * (gridWidth + 5) / 31, true)
                        }
                    }
                }
            }
            return
        }, 10)
    }

    drawdownmove() {
        //要先找到哪些块往哪里移动，哪些块没有移动。用移动步数表示，没有移动的记为0.
        var movesteps = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        for (var i = 0; i < 4; i++) {
            for (var endstep = 3, j = 3; this.core._2048columnboolean[i][endstep]; endstep--) {
                while (!this.core._formalcolumnboolean[i][j] && j > 0) { j-- }
                if (this.core._formalcolumn[i][j] == this.core._2048column[i][endstep]) {
                    movesteps[i][j] = endstep - j
                    j--
                }
                else if (this.core._formalcolumn[i][j] * 2 == this.core._2048column[i][endstep]) {
                    movesteps[i][j] = endstep - j
                    j--
                    while (!this.core._formalcolumnboolean[i][j] && j > 0) { j-- }
                    movesteps[i][j] = endstep - j
                    j--
                }
            }
        }
        console.log('movestep is :')
        console.log(movesteps[0])
        console.log(movesteps[1])
        console.log(movesteps[2])
        console.log(movesteps[3])
        var tt = 0//到目前为止不输出动画
        var interval = setInterval(() => {//开始做动画
            if (tt >= 32) {
                clearInterval(interval)
                return
            }
            tt++
            if (tt == 32) {
                this.afteronestep()
                return
            }
            else {
                this.draw.drawTable()
                for (var i = 0; i < 4; i++) {
                    for (var j = 3; j >= 0; j--) {
                        if (this.core._formalcolumnboolean[i][j] == 1) {
                            this.draw.fillRoundRect(this.draw.ctx, coordinateX[i], coordinateY[j] + tt * movesteps[i][j] * (gridWidth + 5) / 31, gridWidth, gridWidth, windowWidth * 4 / 375, this.draw.num_color(this.core._formalcolumn[i][j]))
                            this.drawNum(j, i, 0, tt * movesteps[i][j] * (gridWidth + 5) / 31, true)
                        }
                    }
                }
            }
            return
        }, 10)
    }

    show2048matrix() {
        this.draw.drawTable()
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (this.core._2048boolean[i][j] == 1) {
                    this.draw.fillRoundRect(this.draw.ctx, coordinateX[j], coordinateY[i], gridWidth, gridWidth, windowWidth * 4 / 375, this.draw.num_color(this.core._2048array[i][j]))
                    this.drawNum(i, j, 0, 0, false)
                }
            }
        }
    }

    
    afteronestep() {
        if (this.core.isGameOver()) {
            console.log('game over')
        }
        else {
            this.addrandnum()
            console.log('the matrix is :')
            console.log(this.core._2048array[0])
            console.log(this.core._2048array[1])
            console.log(this.core._2048array[2])
            console.log(this.core._2048array[3])
            console.log('this columns :')
            console.log(this.core._2048column[0])
            console.log(this.core._2048column[1])
            console.log(this.core._2048column[2])
            console.log(this.core._2048column[3])
        }
    }

    
    addrandnum() {
        while (true) {
            var i = generateRand(4)
            var j = generateRand(4)
            var _rand = 2 * generateRand(2) + 2
            if (this.core._2048boolean[i][j] == 0) {
                this.core._2048boolean[i][j] = 1
                this.core._2048array[i][j] = _rand
                this.core._2048columnboolean[j][i] = 1
                this.core._2048column[j][i] = _rand
                break
            }
        }
        this.show2048matrix()
    }

}