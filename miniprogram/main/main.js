import Animation from "/js/animation.js"



export default class Main extends Animation{
    constructor() {
        super()
        this.x = 0
        this.y = 0
        // 初始化事件监听
        this.initEvent()
    }
    

    initEvent() {
        this.addrandnum()
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.x = e.touches[0].clientX;
            this.y = e.touches[0].clientY;
            return false;
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault()
        })

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault()
            var toright = false
            var toleft = false
            var toup = false
            var todown = false
            let xx = e.changedTouches[0].clientX
            let yy = e.changedTouches[0].clientY
            var biastox = false;
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
            if (toleft && biastox) {
                console.log('left')
                this.core.savelastmove()
                this.core.moveleft()
                this.drawleftmove()
            }
            if (toup && !biastox) {
                console.log('up')
                this.core.savelastmove()
                this.core.moveup()
                this.drawupmove()
            }
            if (todown && !biastox) {
                console.log('down')
                this.core.savelastmove()
                this.core.movedown()
                this.drawdownmove()
            }
        })
    }
}
