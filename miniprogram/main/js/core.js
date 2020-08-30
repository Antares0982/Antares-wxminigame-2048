function generateRand(n) {
    return parseInt(n * Math.random())
}

function matrix(m) {
    var result = []
    for(var i = 0; i < m; i++) {
        result.push(new Array(m).fill(0))
    }
    return result
}

export default class Core{
    
    constructor(dim, highestscore){
        this._2048dimension = dim
        this._2048array = matrix(this._2048dimension)
        this._2048column = matrix(this._2048dimension)
        this._2048boolean = matrix(this._2048dimension)
        this._2048columnboolean = matrix(this._2048dimension)
        this._formalarray = matrix(this._2048dimension)
        this._formalcolumn = matrix(this._2048dimension)
        this._formalboolean = matrix(this._2048dimension)
        this._formalcolumnboolean = matrix(this._2048dimension)
        this.highestscore = highestscore
        this.score = 0
        this.holdgame = false
    }
    
    savelastmove() {
        for (var i = 0; i < this._2048dimension; i++) {
            for (var j = 0; j < this._2048dimension; j++) {
                this._formalarray[i][j] = this._2048array[i][j]
                this._formalboolean[i][j] = this._2048boolean[i][j]
                this._formalcolumn[i][j] = this._2048column[i][j]
                this._formalcolumnboolean[i][j] = this._2048columnboolean[i][j]
            }
        }
    }

    isFull() {//与游戏结束的逻辑有关，要结合isCantMove()来判断游戏是否结束
        for (var i = 0; i < this._2048dimension; i++) {
            for (var j = 0; j < this._2048dimension; j++) {
                if (!this._2048boolean[i][j]) return false
            }
        }
        return true
    }

    isCantMove(movesteps) {//这个函数不仅判断是否能进行下一步添加随机数，同时还判断矩阵满了的情况下游戏是否结束
        for(var i = 0; i < this._2048dimension; i++){
            for(var j = 0; j < this._2048dimension; j++){
                if(movesteps[i][j]) return false
            }
        }
        return true
    }

    rewritecolumns() {//写入行后按照行的情况写入列
        for (var i = 0; i < this._2048dimension; i++) {
            for (var j = 0; j < this._2048dimension; j++) {
                this._2048column[i][j] = this._2048array[j][i]
                this._2048columnboolean[i][j] = this._2048boolean[j][i]
            }
        }
    }

    rewriterows() {//写入列后按照行的情况写入行
        for (var i = 0; i < this._2048dimension; i++) {
            for (var j = 0; j < this._2048dimension; j++) {
                this._2048array[i][j] = this._2048column[j][i]
                this._2048boolean[i][j] = this._2048columnboolean[j][i]
            }
        }
    }

    moveright() {
        for (var i = 0; i < this._2048dimension; i++) {
            for (var j = 0; j < this._2048dimension - 1; j++) {
                for (var k = this._2048dimension - 2; k >= 0; k--) {
                    if (!this._2048boolean[i][k + 1] && this._2048boolean[i][k]) {
                        this._2048boolean[i][k + 1] = 1
                        this._2048boolean[i][k] = 0
                        this._2048array[i][k + 1] = this._2048array[i][k]
                        this._2048array[i][k] = 0
                    }
                }
            }
            for (var j = this._2048dimension - 1; j > 0; j--) {
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
        for (var i = 0; i < this._2048dimension; i++) {
            for (var j = 0; j < this._2048dimension - 1; j++) {
                for (var k = 1; k < this._2048dimension; k++) {
                    if (!this._2048boolean[i][k - 1] && this._2048boolean[i][k]) {
                        this._2048boolean[i][k - 1] = 1
                        this._2048boolean[i][k] = 0
                        this._2048array[i][k - 1] = this._2048array[i][k]
                        this._2048array[i][k] = 0
                    }
                }
            }
            for (var j = 0; j < this._2048dimension - 1; j++) {
                if (this._2048array[i][j] == this._2048array[i][j + 1] && this._2048boolean[i][j]) {
                    this._2048array[i][j] *= 2
                    this._2048array[i][j + 1] = 0
                    this._2048boolean[i][j + 1] = 0
                    for (var k = j + 1; k < this._2048dimension - 1; k++) {
                        this._2048array[i][k] = this._2048array[i][k + 1]
                        this._2048boolean[i][k] = this._2048boolean[i][k + 1]
                    }
                    this._2048array[i][this._2048dimension - 1] = this._2048boolean[i][this._2048dimension - 1] = 0
                }
            }
        }
        this.rewritecolumns()
    }


    moveup() {
        for (var i = 0; i < this._2048dimension; i++) {
            for (var j = 0; j < this._2048dimension - 1; j++) {
                for (var k = 1; k < this._2048dimension; k++) {
                    if (!this._2048columnboolean[i][k - 1] && this._2048columnboolean[i][k]) {
                        this._2048columnboolean[i][k - 1] = 1
                        this._2048columnboolean[i][k] = 0
                        this._2048column[i][k - 1] = this._2048column[i][k]
                        this._2048column[i][k] = 0
                    }
                }
            }
            for (var j = 0; j < this._2048dimension - 1; j++) {
                if (this._2048column[i][j] == this._2048column[i][j + 1] && this._2048columnboolean[i][j]) {
                    this._2048column[i][j] *= 2
                    this._2048column[i][j + 1] = 0
                    this._2048columnboolean[i][j + 1] = 0
                    for (var k = j + 1; k < this._2048dimension - 1; k++) {
                        this._2048column[i][k] = this._2048column[i][k + 1]
                        this._2048columnboolean[i][k] = this._2048columnboolean[i][k + 1]
                    }
                    this._2048column[i][this._2048dimension - 1] = this._2048columnboolean[i][this._2048dimension - 1] = 0
                }
            }
        }
        this.rewriterows()
    }
    
    movedown() {
        for (var i = 0; i < this._2048dimension; i++) {
            for (var j = 0; j < this._2048dimension - 1; j++) {
                for (var k = this._2048dimension - 2; k >= 0; k--) {
                    if (!this._2048columnboolean[i][k + 1] && this._2048columnboolean[i][k]) {
                        this._2048columnboolean[i][k + 1] = 1
                        this._2048columnboolean[i][k] = 0
                        this._2048column[i][k + 1] = this._2048column[i][k]
                        this._2048column[i][k] = 0
                    }
                }
            }
            for (var j = this._2048dimension - 1; j > 0; j--) {
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
            let i = generateRand(this._2048dimension)
            let j = generateRand(this._2048dimension)
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