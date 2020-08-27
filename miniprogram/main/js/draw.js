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
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0, 0, windowHeight, windowWidth)
    }

    drawTable() {
        this.ctx.clearRect(0, 0, windowWidth, windowHeight)
        this.ctx.fillRect(0, 0, windowWidth, windowHeight)
        this.ctx.fillStyle = '#000000'
        for (var i = 0; i < 5; i++) {
            this.ctx.fillRect(i * (gridWidth + thinreclength), coordinateY[0] - thinreclength, thinreclength, windowWidth)
        }
        for (var i = 0; i < 5; i++) {
            this.ctx.fillRect(0, coordinateY[0] - thinreclength + i * (gridWidth + thinreclength), windowWidth, thinreclength)
        }
        this.ctx.fillStyle = '#ffffff'
    }

    drawcolumnlines() {
        this.ctx.fillStyle = '#000000'
        for (var i = 0; i < 5; i++) {
            this.ctx.fillRect(i * (gridWidth + thinreclength), coordinateY[0] - thinreclength, thinreclength, windowWidth)
        }
        this.ctx.fillStyle = '#ffffff'
    }
    drawrowlines() {
        this.ctx.fillStyle = '#000000'
        for (var i = 0; i < 5; i++) {
            this.ctx.fillRect(0, coordinateY[0] - thinreclength + i * (gridWidth + thinreclength), windowWidth, thinreclength)
        }
        this.ctx.fillStyle = '#ffffff'
    }
    
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

    gameoverpic(){
        this.ctx.clearRect(0, 0, windowWidth, windowHeight)
        this.ctx.beginPath();
        this.ctx.fillStyle = "#000000";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle"//得写在font之前
        this.ctx.font = "bold 60px Arial";
        this.ctx.fillText("game over!", coordinateX[j] + gridWidth / 2 + biasx, coordinateY[i] + gridWidth / 2 + biasy)
        this.ctx.closePath();
        this.ctx.fillStyle = "#ffffff"
    }
}