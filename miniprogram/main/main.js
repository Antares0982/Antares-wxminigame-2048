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
        this.isProcessing2 = false
        this.initEvent()    //初始化事件监听
    }
    
    initEvent() {
        this.core.addrandnum()
        this.show2048matrix()

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
            if(!this.core.lose && !this.core.holdgame && !this.isProcessing){
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
            if(!this.isProcessing2){
                this.isProcessing2 = true
                setTimeout(()=>{
                    this.isProcessing2 = false
                }, 300)
                setTimeout(()=>{
                    if((this.core.isGameOver() || this.core.holdgame)){
                        if(this.core.isGameOver()){
                            if(this.core.confirmDead){
                                this.draw.gameoverpic()
                            this.draw.drawbutton(false)
                            this.redefineCore()
                            }
                            else{
                                this.core.confirmDead = true
                            }
                            
                        }
                        else if(this.core.holdgame){
                            if(windowWidth / 2 - gridWidth < xx && xx < windowWidth / 2 + gridWidth && 3 * windowHeight / 4 - gridWidth / 2 < yy && yy < 3 * windowHeight / 4 + gridWidth / 2){
                                console.log(windowWidth / 2 - gridWidth)
                                console.log("xx=", xx)
                                console.log(windowWidth / 2 + gridWidth)
                                console.log(3 * windowHeight / 4 - gridWidth / 2)
                                console.log(3 * windowHeight / 4 + gridWidth / 2)
                                console.log("yy=", yy)
                                this.core.holdgame = false
                                this.core.addrandnum()
                                console.log("restarting, showing new matrix now.")
                                this.show2048matrix()
                            }
                        }
                    }
                },500)
            }
        })
    }
}
