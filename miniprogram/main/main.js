import Animation from "/js/animation.js"

const { windowWidth, windowHeight } = wx.getSystemInfoSync()

const gridWidth = (windowWidth - 25) / 4

export default class Main extends Animation{
    constructor() {
        super()
        this.x = 0
        this.y = 0
        this.restartButtonPushed = false
        this.isProcessing = false
        this.initEvent()    //初始化事件监听
    }
    
    initEvent() {
        this.core.addrandnum()
        setTimeout(() => {
            this.show2048matrix()
        }, 1000)

        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault()
            this.x = e.touches[0].clientX
            this.y = e.touches[0].clientY
            if(this.core.holdgame && windowWidth / 2 - gridWidth < this.x && this.x < windowWidth / 2 + gridWidth && 3 * windowHeight / 4 - gridWidth / 2 < this.y && this.y < 3 * windowHeight / 4 + gridWidth / 2){
                this.restartButtonPushed = true
                this.draw.drawbutton(true)
            }
        })

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault()
        })

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault()
            let xx = e.changedTouches[0].clientX
            let yy = e.changedTouches[0].clientY
            if(!this.core.holdgame && !this.isProcessing){
                this.isProcessing = true
                setTimeout(()=>{
                    this.isProcessing = false
                }, 300)
                let toright = false
                let toleft = false
                let toup = false
                let todown = false
                var biastox = false //判断是否更倾向于横向移动
                if (Math.abs(xx - this.x) > Math.abs(yy - this.y)) {
                    biastox = true
                }
                if (xx - this.x > 50) {
                    toright = true
                }
                if (xx - this.x < -50) {
                    toleft = true
                }
                if (yy - this.y > 50) {
                    todown = true
                }
                if (yy - this.y < -50) {
                    toup = true
                }
                if (toright && biastox) {
                    console.log('right')
                    this.core.savelastmove()
                    this.core.moveright()//写入矩阵，不做图形上的变化
                    this.drawrightmove()
                }
                else if (toleft && biastox) {
                    console.log('left')
                    this.core.savelastmove()
                    this.core.moveleft()
                    this.drawleftmove()
                }
                else if (toup && !biastox) {
                    console.log('up')
                    this.core.savelastmove()
                    this.core.moveup()
                    this.drawupmove()
                }
                else if (todown && !biastox) {
                    console.log('down')
                    this.core.savelastmove()
                    this.core.movedown()
                    this.drawdownmove()
                }
            }
            else if(!this.isProcessing){
                this.isProcessing = true
                setTimeout(()=>{
                    this.isProcessing = false
                }, 300)
                if(windowWidth / 2 - gridWidth < xx && xx < windowWidth / 2 + gridWidth && 3 * windowHeight / 4 - gridWidth / 2 < yy && yy < 3 * windowHeight / 4 + gridWidth / 2){
                    this.core.holdgame = false
                    this.redefineCore()
                    console.log("restarting, showing new matrix now.")
                    this.show2048matrix()
                }
                else{
                    this.draw.drawbutton(false)
                }
            }
        })
    }
}
