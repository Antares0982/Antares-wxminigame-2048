import Sprite from "../base/sprite.js"

const thinreclength = 5
const { windowWidth, windowHeight } = wx.getSystemInfoSync()
/*windowWidth *= window.devicePixelRatio
windowHeight *= window.devicePixelRatio*/
const gridWidth = (windowWidth - 25) / 4
const coordinateX = [thinreclength, 2 * thinreclength + gridWidth, 3 * thinreclength + 2 * gridWidth, 4 * thinreclength + 3 * gridWidth]
const coordinateY = [windowHeight / 2 - 12 - 2 * gridWidth, windowHeight / 2 - 7 - gridWidth, windowHeight / 2 - 2, windowHeight / 2 + 3 + gridWidth] 

function generateRand(n){
  return parseInt(n*Math.random())
}

export default class Main extends Sprite {
  constructor() {
    super()
    this.x = 0
    this.y = 0
    this._2048array = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    this._2048column = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    this._2048boolean = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    this._2048columnboolean = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    this._formalarray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    this._formalcolumn = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    this._formalboolean = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    this._formalcolumnboolean = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    this.x = 0
    this.y = 0
    this.ctx = canvas.getContext('2d')
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0,0,windowHeight, windowWidth)
    this.timer = requestAnimationFrame(function(){
      console.log(0);
  }); 
    // 初始化事件监听
    this.initEvent()
  }
  isGameOver(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(this._2048boolean[i][j] == 0) return false
      }
    }
    return true
  }

  drawTable() {
    this.ctx.clearRect(0, 0, windowWidth, windowHeight)
    this.ctx.fillRect(0,0, windowWidth, windowHeight)
    this.ctx.fillStyle = '#000000'
    for(var i = 0; i < 5; i++){
      this.ctx.fillRect(i * (gridWidth+thinreclength), coordinateY[0] - thinreclength, thinreclength, windowWidth)
    }
    for(var i = 0; i < 5; i++){
      this.ctx.fillRect(0, coordinateY[0] - thinreclength + i * (gridWidth+thinreclength), windowWidth, thinreclength)
    }
    this.ctx.fillStyle = '#ffffff'
  }

  drawcolumnlines(){
    this.ctx.fillStyle = '#000000'
    for(var i = 0; i < 5; i++){
      this.ctx.fillRect(i * (gridWidth + thinreclength), coordinateY[0] - thinreclength, thinreclength, windowWidth)
    }
    this.ctx.fillStyle = '#ffffff'
  }
  drawrowlines(){
    this.ctx.fillStyle = '#000000'
    for(var i = 0; i < 5; i++){
      this.ctx.fillRect(0, coordinateY[0] - thinreclength + i * (gridWidth+thinreclength), windowWidth, thinreclength)
    }
    this.ctx.fillStyle = '#ffffff'
  }
  savelastmove(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        this._formalarray[i][j]=this._2048array[i][j]
        this._formalboolean[i][j]=this._2048boolean[i][j]
        this._formalcolumn[i][j]=this._2048column[i][j]
        this._formalcolumnboolean[i][j]=this._2048columnboolean[i][j]
      }
    }
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

  drawNum(i, j, biasx, biasy, boolformal){
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle"//得写在font之前
    this.ctx.font = "bold 48px Arial";
    if(boolformal){
      this.ctx.fillText(this._formalarray[i][j], coordinateX[j] + gridWidth / 2 + biasx, coordinateY[i] + gridWidth / 2 + biasy)
    }
    else{
      this.ctx.fillText(this._2048array[i][j], coordinateX[j] + gridWidth / 2 + biasx, coordinateY[i] + gridWidth / 2 + biasy)
    }
    this.ctx.closePath();
    this.ctx.fillStyle = '#ffffff'
  }

  rewritecolumns(){//写入行后按照行的情况写入列
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        this._2048column[i][j]=this._2048array[j][i]
        this._2048columnboolean[i][j]=this._2048boolean[j][i]
      }
    }
  }

  rewriterows(){//写入列后按照行的情况写入行
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        this._2048array[i][j]=this._2048column[j][i]
        this._2048boolean[i][j]=this._2048columnboolean[j][i]
      }
    }
  }
  //moveright()经过测试可以使用
  moveright(){
    for(var i=0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        for(var k = 2; k >= 0; k--){
          if(!this._2048boolean[i][k+1] && this._2048boolean[i][k]){
            this._2048boolean[i][k+1]=1
            this._2048boolean[i][k]=0
            this._2048array[i][k+1]=this._2048array[i][k]
            this._2048array[i][k]=0
          }
        }
      }
      for(var j = 3; j > 0; j--){
        if(this._2048array[i][j] == this._2048array[i][j-1]  && this._2048boolean[i][j]){
          this._2048array[i][j] *= 2
          this._2048array[i][j-1] = 0
          this._2048boolean[i][j-1] = 0
          for(var k = j - 1; k > 0; k--){
            this._2048array[i][k] = this._2048array[i][k-1]
            this._2048boolean[i][k] = this._2048boolean[i][k-1]
          }
          this._2048array[i][0] = this._2048boolean[i][0]=0
        }
      }
    }
    this.rewritecolumns()
  }

  moveleft(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        for(var k = 1;k < 4; k++){
          if(!this._2048boolean[i][k-1] && this._2048boolean[i][k]){
            this._2048boolean[i][k-1]=1
            this._2048boolean[i][k]=0
            this._2048array[i][k-1]=this._2048array[i][k]
            this._2048array[i][k]=0
          }
        }
      }
      for(var j=0;j<3;j++){
        if(this._2048array[i][j] == this._2048array[i][j+1]  && this._2048boolean[i][j]){
          this._2048array[i][j] *= 2
          this._2048array[i][j+1] = 0
          this._2048boolean[i][j+1] = 0
          for(var k = j + 1; k < 3; k++){
            this._2048array[i][k] = this._2048array[i][k+1]
            this._2048boolean[i][k] = this._2048boolean[i][k+1]
          }
          this._2048array[i][3] = this._2048boolean[i][3] = 0
        }
      }
    }
    this.rewritecolumns()
  }
  
 
  moveup(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        for(var k = 1;k < 4; k++){
          if(!this._2048columnboolean[i][k-1] && this._2048columnboolean[i][k]){
            this._2048columnboolean[i][k-1]=1
            this._2048columnboolean[i][k]=0
            this._2048column[i][k-1]=this._2048column[i][k]
            this._2048column[i][k]=0
          }
        }
      }
      for(var j=0;j<3;j++){
        if(this._2048column[i][j] == this._2048column[i][j+1]  && this._2048columnboolean[i][j]){
          this._2048column[i][j] *= 2
          this._2048column[i][j+1] = 0
          this._2048columnboolean[i][j+1] = 0
          for(var k = j + 1; k < 3; k++){
            this._2048column[i][k] = this._2048column[i][k+1]
            this._2048columnboolean[i][k] = this._2048columnboolean[i][k+1]
          }
          this._2048column[i][3] = this._2048columnboolean[i][3] = 0
        }
      }
    }
    this.rewriterows()
  }
  movedown(){
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 3; j++){
        for(var k = 2; k >= 0; k--){
          if(!this._2048columnboolean[i][k+1] && this._2048columnboolean[i][k]){
            this._2048columnboolean[i][k+1]=1
            this._2048columnboolean[i][k]=0
            this._2048column[i][k+1]=this._2048column[i][k]
            this._2048column[i][k]=0
          }
        }
      }
      for(var j = 3; j > 0; j--){
        if(this._2048column[i][j] == this._2048column[i][j-1]  && this._2048columnboolean[i][j]){
          this._2048column[i][j] *= 2
          this._2048column[i][j-1] = 0
          this._2048columnboolean[i][j-1] = 0
          for(var k = j - 1; k > 0; k--){
            this._2048column[i][k] = this._2048column[i][k-1]
            this._2048columnboolean[i][k] = this._2048columnboolean[i][k-1]
          }
          this._2048column[i][0] = this._2048columnboolean[i][0]=0
        }
      }
    }
    this.rewriterows()
  }

  //drawrightmove()经过测试可以使用

  drawrightanimation(movesteps){
    var tt = 0//到目前为止不输出动画
    var interval = setInterval(() => {//开始做动画
      if(tt >= 32){
        clearInterval(interval)
        return
      }
      tt++
      if(tt==32){
        this.afteronestep()
        return 
      }
      else{
        this.drawTable()
        for(var i = 0; i < 4; i++){
          for(var j = 3; j >= 0; j--){
            if(this._formalboolean[i][j] == 1){
              this.fillRoundRect(this.ctx, coordinateX[j] + tt * movesteps[i][j] * (gridWidth + 5) / 31, coordinateY[i], gridWidth, gridWidth, windowWidth * 4 / 375, this.num_color(this._formalarray[i][j]))
              this.drawNum(i, j, tt * movesteps[i][j] * (gridWidth + 5) / 31, 0, true)
            }
          }
        }
      }
      return
    }, 7)
  }

  drawrightmove(){
    //要先找到哪些块往哪里移动，哪些块没有移动。用移动步数表示，没有移动的记为0.
    var movesteps = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    for(var i = 0; i < 4; i++){
      for(var endstep = 3, j = 3; this._2048boolean[i][endstep]; endstep--){
        while(!this._formalboolean[i][j] && j > 0){j--}
        if(this._formalarray[i][j] == this._2048array[i][endstep]){
          movesteps[i][j] = endstep - j
          j--
        }
        else if(this._formalarray[i][j] * 2 == this._2048array[i][endstep]){
          movesteps[i][j] = endstep - j
          j--
          while(!this._formalboolean[i][j] && j > 0){j--}
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


  drawleftmove(){
    //要先找到哪些块往哪里移动，哪些块没有移动。用移动步数表示，没有移动的记为0.
    var movesteps = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    for(var i = 0; i < 4; i++){
      for(var endstep = 0, j = 0; this._2048boolean[i][endstep]; endstep++){
        while(!this._formalboolean[i][j] && j < 3){j++}
        if(this._formalarray[i][j] == this._2048array[i][endstep]){
          movesteps[i][j] = j - endstep
          j++
        }
        else if(this._formalarray[i][j] * 2 == this._2048array[i][endstep]){
          movesteps[i][j] = j - endstep
          j++
          while(!this._formalboolean[i][j] && j < 3){j++}
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
      if(tt >= 32){
        clearInterval(interval)
        return
      }
      tt++
      if(tt==32){
        this.afteronestep()
        return 
      }
      else{
        this.drawTable()
        for(var i = 0; i < 4; i++){
          for(var j = 0; j < 4; j++){
            if(this._formalboolean[i][j] == 1){
              this.fillRoundRect(this.ctx, coordinateX[j] - tt * movesteps[i][j] * (gridWidth + 5) / 31, coordinateY[i], gridWidth, gridWidth, windowWidth * 4 / 375, this.num_color(this._formalarray[i][j]))
              this.drawNum(i, j, - tt * movesteps[i][j] * (gridWidth + 5) / 31, 0, true)
            }
          }
        }
      }
      return
    }, 10)
  }

  drawupmove(){
    //要先找到哪些块往哪里移动，哪些块没有移动。用移动步数表示，没有移动的记为0.
    var movesteps = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    for(var i = 0; i < 4; i++){
      for(var endstep = 0, j = 0; this._2048columnboolean[i][endstep]; endstep++){
        while(!this._formalcolumnboolean[i][j] && j < 3){j++}
        if(this._formalcolumn[i][j] == this._2048column[i][endstep]){
          movesteps[i][j] = j - endstep
          j++
        }
        else if(this._formalcolumn[i][j] * 2 == this._2048column[i][endstep]){
          movesteps[i][j] = j - endstep
          j++
          while(!this._formalcolumnboolean[i][j] && j < 3){j++}
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
      if(tt >= 32){
        clearInterval(interval)
        return
      }
      tt++
      if(tt == 32){
        this.afteronestep()
        return 
      }
      else{
        this.drawTable()
        for(var i = 0; i < 4; i++){
          for(var j = 0; j < 4; j++){
            if(this._formalcolumnboolean[i][j] == 1){

              this.fillRoundRect(this.ctx, coordinateX[i], coordinateY[j] - tt * movesteps[i][j] * (gridWidth + 5) / 31, gridWidth, gridWidth, windowWidth * 4 / 375, this.num_color(this._formalcolumn[i][j]))
              this.drawNum(j, i, 0, - tt * movesteps[i][j] * (gridWidth + 5) / 31, true)
            }
          }
        }
      }
      return
    }, 10)
  }

  drawdownmove(){
    //要先找到哪些块往哪里移动，哪些块没有移动。用移动步数表示，没有移动的记为0.
    var movesteps = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    for(var i = 0; i < 4; i++){
      for(var endstep = 3, j = 3; this._2048columnboolean[i][endstep]; endstep--){
        while(!this._formalcolumnboolean[i][j] && j > 0){j--}
        if(this._formalcolumn[i][j] == this._2048column[i][endstep]){
          movesteps[i][j] = endstep - j
          j--
        }
        else if(this._formalcolumn[i][j] * 2 == this._2048column[i][endstep]){
          movesteps[i][j] = endstep - j
          j--
          while(!this._formalcolumnboolean[i][j] && j > 0){j--}
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
      if(tt >= 32){
        clearInterval(interval)
        return
      }
      tt++
      if(tt==32){
        this.afteronestep()
        return 
      }
      else{
        this.drawTable()
        for(var i = 0; i < 4; i++){
          for(var j = 3; j >= 0; j--){
            if(this._formalcolumnboolean[i][j] == 1){
              this.fillRoundRect(this.ctx, coordinateX[i], coordinateY[j] + tt * movesteps[i][j] * (gridWidth + 5) / 31, gridWidth, gridWidth, windowWidth * 4 / 375, this.num_color(this._formalcolumn[i][j]))
              this.drawNum(j, i, 0, tt * movesteps[i][j] * (gridWidth + 5) / 31, true)
            }
          }
        }
      }
      return
    }, 10)
  }

  show2048matrix(){
    this.drawTable()
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 4; j++){
        if(this._2048boolean[i][j] == 1){
          this.fillRoundRect(this.ctx, coordinateX[j], coordinateY[i], gridWidth, gridWidth, windowWidth * 4 / 375, this.num_color(this._2048array[i][j]))
          this.drawNum(i, j, 0, 0, false)
        }
      }
    }
  }

  addrandnum(){
    while(true){
      var i = generateRand(4)
      var j = generateRand(4)
      var _rand = 2 * generateRand(2) + 2
      if(this._2048boolean[i][j]==0){
        this._2048boolean[i][j]=1
        this._2048array[i][j]=_rand
        this._2048columnboolean[j][i]=1
        this._2048column[j][i]=_rand
        break
      }
    }
    this.show2048matrix()
  }

  afteronestep(){
    if(this.isGameOver()){
      console.log('game over')
    }
    else{
      this.addrandnum()
      console.log('the matrix is :')
      console.log(this._2048array[0])
      console.log(this._2048array[1])
      console.log(this._2048array[2])
      console.log(this._2048array[3])
      console.log('this columns :')
      console.log(this._2048column[0])
      console.log(this._2048column[1])
      console.log(this._2048column[2])
      console.log(this._2048column[3])
    }
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
      if(Math.abs(xx-this.x)>Math.abs(yy-this.y)){
        biastox = true
      }
      if(xx - this.x > 50){
        toright = true
      }
      if(xx - this.x < -50){
        toleft = true
      }
      if(yy - this.y > 50){
        todown = true
      }
      if(yy - this.y < -50){
        toup = true
      }
      if(toright && biastox){
        console.log('right')
        this.savelastmove()
        this.moveright()//写入矩阵，不做图形上的变化
        this.drawrightmove()
      }
      if(toleft && biastox){
        console.log('left')
        this.savelastmove()
        this.moveleft()
        this.drawleftmove()
      }
      if(toup && !biastox){
        console.log('up')
        this.savelastmove()
        this.moveup()
        this.drawupmove()
      }
      if(todown && !biastox){
        console.log('down')
        this.savelastmove()
        this.movedown()
        this.drawdownmove()
      }
    })
  }
}
