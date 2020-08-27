function generateRand(n) {
    return parseInt(n * Math.random())
}

export default class Core{
    
    constructor(isholdgame, highestscore){
        this._2048array = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this._2048column = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this._2048boolean = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this._2048columnboolean = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this._formalarray = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this._formalcolumn = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this._formalboolean = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this._formalcolumnboolean = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        this.lose = false
        this.highestscore = highestscore
        this.score = 0
        this.holdgame = isholdgame
        this.confirmDead = false
    }
    
    savelastmove() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this._formalarray[i][j] = this._2048array[i][j]
                this._formalboolean[i][j] = this._2048boolean[i][j]
                this._formalcolumn[i][j] = this._2048column[i][j]
                this._formalcolumnboolean[i][j] = this._2048columnboolean[i][j]
            }
        }
    }

    isFull() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                if (!this._2048boolean[i][j]) return false
            }
        }
        return true
    }

    isGameOver() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                if (this._2048array[i][j] == this._2048array[i][j+1]) return false
                if (this._2048column[i][j] == this._2048column[i][j+1]) return false
            }
        }
        return true
    }

    rewritecolumns() {//写入行后按照行的情况写入列
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this._2048column[i][j] = this._2048array[j][i]
                this._2048columnboolean[i][j] = this._2048boolean[j][i]
            }
        }
    }

    rewriterows() {//写入列后按照行的情况写入行
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this._2048array[i][j] = this._2048column[j][i]
                this._2048boolean[i][j] = this._2048columnboolean[j][i]
            }
        }
    }

    moveright() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 2; k >= 0; k--) {
                    if (!this._2048boolean[i][k + 1] && this._2048boolean[i][k]) {
                        this._2048boolean[i][k + 1] = 1
                        this._2048boolean[i][k] = 0
                        this._2048array[i][k + 1] = this._2048array[i][k]
                        this._2048array[i][k] = 0
                    }
                }
            }
            for (var j = 3; j > 0; j--) {
                if (this._2048array[i][j] == this._2048array[i][j - 1] && this._2048boolean[i][j]) {
                    this._2048array[i][j] *= 2
                    this._2048array[i][j - 1] = 0
                    this._2048boolean[i][j - 1] = 0
                    for (var k = j - 1; k > 0; k--) {
                        this._2048array[i][k] = this._2048array[i][k - 1]
                        this._2048boolean[i][k] = this._2048boolean[i][k - 1]
                    }
                    this._2048array[i][0] = this._2048boolean[i][0] = 0
                }
            }
        }
        this.rewritecolumns()
    }

    moveleft() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 1; k < 4; k++) {
                    if (!this._2048boolean[i][k - 1] && this._2048boolean[i][k]) {
                        this._2048boolean[i][k - 1] = 1
                        this._2048boolean[i][k] = 0
                        this._2048array[i][k - 1] = this._2048array[i][k]
                        this._2048array[i][k] = 0
                    }
                }
            }
            for (var j = 0; j < 3; j++) {
                if (this._2048array[i][j] == this._2048array[i][j + 1] && this._2048boolean[i][j]) {
                    this._2048array[i][j] *= 2
                    this._2048array[i][j + 1] = 0
                    this._2048boolean[i][j + 1] = 0
                    for (var k = j + 1; k < 3; k++) {
                        this._2048array[i][k] = this._2048array[i][k + 1]
                        this._2048boolean[i][k] = this._2048boolean[i][k + 1]
                    }
                    this._2048array[i][3] = this._2048boolean[i][3] = 0
                }
            }
        }
        this.rewritecolumns()
    }


    moveup() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 1; k < 4; k++) {
                    if (!this._2048columnboolean[i][k - 1] && this._2048columnboolean[i][k]) {
                        this._2048columnboolean[i][k - 1] = 1
                        this._2048columnboolean[i][k] = 0
                        this._2048column[i][k - 1] = this._2048column[i][k]
                        this._2048column[i][k] = 0
                    }
                }
            }
            for (var j = 0; j < 3; j++) {
                if (this._2048column[i][j] == this._2048column[i][j + 1] && this._2048columnboolean[i][j]) {
                    this._2048column[i][j] *= 2
                    this._2048column[i][j + 1] = 0
                    this._2048columnboolean[i][j + 1] = 0
                    for (var k = j + 1; k < 3; k++) {
                        this._2048column[i][k] = this._2048column[i][k + 1]
                        this._2048columnboolean[i][k] = this._2048columnboolean[i][k + 1]
                    }
                    this._2048column[i][3] = this._2048columnboolean[i][3] = 0
                }
            }
        }
        this.rewriterows()
    }
    
    movedown() {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 2; k >= 0; k--) {
                    if (!this._2048columnboolean[i][k + 1] && this._2048columnboolean[i][k]) {
                        this._2048columnboolean[i][k + 1] = 1
                        this._2048columnboolean[i][k] = 0
                        this._2048column[i][k + 1] = this._2048column[i][k]
                        this._2048column[i][k] = 0
                    }
                }
            }
            for (var j = 3; j > 0; j--) {
                if (this._2048column[i][j] == this._2048column[i][j - 1] && this._2048columnboolean[i][j]) {
                    this._2048column[i][j] *= 2
                    this._2048column[i][j - 1] = 0
                    this._2048columnboolean[i][j - 1] = 0
                    for (var k = j - 1; k > 0; k--) {
                        this._2048column[i][k] = this._2048column[i][k - 1]
                        this._2048columnboolean[i][k] = this._2048columnboolean[i][k - 1]
                    }
                    this._2048column[i][0] = this._2048columnboolean[i][0] = 0
                }
            }
        }
        this.rewriterows()
    }

    addrandnum() {//向游戏矩阵添加一个新的数字
        while (true) {
            let i = generateRand(4)
            let j = generateRand(4)
            if (!this._2048boolean[i][j]) {
                let _rand = 2 * generateRand(2) + 2
                this._2048boolean[i][j] = 1
                this._2048array[i][j] = _rand
                this._2048columnboolean[j][i] = 1
                this._2048column[j][i] = _rand
                this.score += _rand
                if(this.score > this.highestscore){
                    this.highestscore = this.score
                }
                break
            }
        }
    }
}