import Sprite from "../base/sprite.js"

const { windowWidth, windowHeight } = wx.getSystemInfoSync()

const gridWidth = (windowWidth - 25) / 4
const thinreclength = 5 //最好是5的倍数

const coordinateX = [thinreclength, 2 * thinreclength + gridWidth, 3 * thinreclength + 2 * gridWidth, 4 * thinreclength + 3 * gridWidth]
const coordinateY = [windowHeight / 2 - 12 * thinreclength / 5 - 2 * gridWidth, windowHeight / 2 - 7 * thinreclength / 5 - gridWidth, windowHeight / 2 - 2 * thinreclength / 5, windowHeight / 2 + 3 * thinreclength / 5 + gridWidth]

export default class Drawer extends Sprite {
    
    constructor(){
        super()
        this.ctx = canvas.getContext('2d')
        this.defaultFillStyle = '#000000'   //这个参数是字符、边框等的颜色参数，默认黑色。
        this.defaultBackgroundStyle = '#ffffff' //这个参数是背景的颜色参数，默认是白色。
        this.ctx.fillStyle = this.defaultFillStyle
        this.ctx.fillRect(0, 0, windowHeight, windowWidth)
    }

    drawTable() {//会清除当前画布
        this.ctx.fillStyle = this.defaultBackgroundStyle
        this.ctx.clearRect(0, 0, windowWidth, windowHeight)
        this.ctx.fillRect(0, 0, windowWidth, windowHeight)
        this.ctx.fillStyle = this.defaultFillStyle
        for (var i = 0; i < 5; i++) {
            this.ctx.fillRect(i * (gridWidth + thinreclength), coordinateY[0] - thinreclength, thinreclength, windowWidth)
        }
        for (var i = 0; i < 5; i++) {
            this.ctx.fillRect(0, coordinateY[0] - thinreclength + i * (gridWidth + thinreclength), windowWidth, thinreclength)
        }
    }
/*
    drawcolumnlines() {
        this.ctx.fillStyle = this.defaultBackgroundStyle
        for (var i = 0; i < 5; i++) {
            this.ctx.fillRect(i * (gridWidth + thinreclength), coordinateY[0] - thinreclength, thinreclength, windowWidth)
        }
        this.ctx.fillStyle = this.defaultFillStyle
    }

    drawrowlines() {
        this.ctx.fillStyle = this.defaultBackgroundStyle
        for (var i = 0; i < 5; i++) {
            this.ctx.fillRect(0, coordinateY[0] - thinreclength + i * (gridWidth + thinreclength), windowWidth, thinreclength)
        }
        this.ctx.fillStyle = this.defaultFillStyle
    }
*/
    num_color(n) {
        var color = "rgba(238, 228, 218, 0.35)";
        switch (n) {
            case 0:
                color = "#c0c7cd";
                break;
            case 2:
                color = "#eee4da";
                break;
            case 4:
                color = "#fde9c6";
                break;
            case 8:
                color = "#ffbc6f";
                break;
            case 16:
                color = "#db7b34";
                break;
            case 32:
                color = "#db5a34";
                break;
            case 64:
                color = "#d14c2d";
                break;
            case 128:
                color = "#c22e2e";
                break;
            case 256:
                color = "#ecc400";
                break;
            case 512:
                color = "#ecc400";
                break;
            case 1024:
                color = "#ecc400";
                break;
            case 2048:
                color = "#ecc400";
                break;
            case 4096:
                color = "#ecc400";
                break
            default:
                color = "#ecc400";
                break;
        }
        return color;
    }

    drawbutton(pushed){
        if(pushed){
            this.ctx.fillStyle = '#00aa00'
        }
        else{
            this.ctx.fillStyle = '#ecc400'
        }
        this.ctx.fillRect(windowWidth / 2 - gridWidth, 3 * windowHeight / 4 - gridWidth / 2, 2 * gridWidth, gridWidth)
        this.ctx.beginPath()
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"//得写在font之前
        this.ctx.font = "bold 24px Arial"
        this.ctx.fillStyle = '#000000'
        this.ctx.fillText("restart", windowWidth / 2, 3 * windowHeight / 4)
        this.ctx.closePath()
        this.ctx.fillStyle = this.defaultFillStyle
    }

    gameoverpic(){
        this.ctx.clearRect(0, 0, windowWidth, windowHeight)
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0, 0, windowWidth, windowHeight)
        this.ctx.beginPath()
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"//得写在font之前
        this.ctx.font = "bold 48px Arial"
        this.ctx.fillStyle = '#000000'
        this.ctx.fillText("game over!", windowWidth / 2, windowHeight / 2)
        this.ctx.closePath()
    }
}