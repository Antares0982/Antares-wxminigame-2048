import Animation from "/js/animation.js"

export default class Main extends Animation{
    constructor() {
        super()
        this.x = 0
        this.y = 0
        this.isProcessing = false
        this.isInterrupted = false
        this.initEvent()    //初始化事件监听
    }
    
    initEvent() {
        this.core.addrandnum()
        this.show2048matrix()

        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault()
            if(!this.core.lose){
                this.x = e.touches[0].clientX
                this.y = e.touches[0].clientY
                if(this.isProcessing){
                    this.isInterrupted = true
                }
                this.isProcessing = true
                return false
            }
        })

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault()
        })

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault()
            if(!this.core.lose){
                let toright = false
                let toleft = false
                let toup = false
                let todown = false
                let xx = e.changedTouches[0].clientX
                let yy = e.changedTouches[0].clientY
                var biastox = false
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
                if (toright && biastox && !this.isInterrupted) {
                    console.log('right')
                    this.core.savelastmove()
                    this.core.moveright()//写入矩阵，不做图形上的变化
                    this.drawrightmove()
                }
                else if (toleft && biastox && !this.isInterrupted) {
                    console.log('left')
                    this.core.savelastmove()
                    this.core.moveleft()
                    this.drawleftmove()
                }
                else if (toup && !biastox && !this.isInterrupted) {
                    console.log('up')
                    this.core.savelastmove()
                    this.core.moveup()
                    this.drawupmove()
                }
                else if (todown && !biastox && !this.isInterrupted) {
                    console.log('down')
                    this.core.savelastmove()
                    this.core.movedown()
                    this.drawdownmove()
                }
                this.isInterrupted = this.isProcessing = false
            }
            else{
                
                if(this.core.isGameOver()){
                    this.draw.gameoverpic()
                    this.core = new Core()
                }
            }
        })
    }
}
