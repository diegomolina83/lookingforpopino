window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        
        startGame();
    }
    function startGame() {

        popinoGame.init('canvas')
        }
};


const popinoGame={

    name:'Looking for a dog',
    authors:'Cynthia Gorosito / Diego Molina',
    version:'1.0.0',
    license:'',
    description:'The best game of the world',
    ctx:undefined,
    score:0,
    numberOfLifes:4,
    lifes:[],
    player:undefined,
    life:undefined,
    background:undefined,
    enemy:undefined,
    enemies:[],
    playerSpeedX:undefined,
    playerSpeedY:undefined,
    balcony0:undefined,
    balcony1:undefined,
    balcony2:undefined,
    randomPosition:undefined,
    fallOutObject:undefined,
    collisioned:false,
    framesCounter:0,
    intervalId:undefined,
    fallOutObjects:[],

    balconies:[
        
    ],
    fps:60,
    canvasSize:{
        w:1024,
        h:600
        //Cómo pasar los datos de la etiqueta canvas
         
    },
    init(id){
        this.setEventListeners()
        this.canvasId=id,
        this.ctx=document.getElementById(this.canvasId).getContext('2d')
        this.pushElements()
        this.drawBalconies()
        this.drawPlayer()
        this.drawBackground()
        this.drawDog()
        this.drawScore()
        this.drawEnemies()
        this.drawFallOutObjects()
        this.dead()
        this.drawLife(this.numberOfLifes)
        this.intervalId= setInterval(() => {
            if(this.framesCounter>5000){
          this.framesCounter=0  
                                        }
            this.framesCounter++
            this.drawGame()

        }, 1000/this.fps);
        
    },
    drawGame(){
        
        this.collision()
        this.randomizeNumbers()
        this.clearScreen()
        this.background.draw()
        this.player.draw()
        this.moveBackground()
        this.player.move()
        this.drawFallOutObjects()
        this.drawBalconies()
        this.drawEnemies()
        this.dog.draw(this.framesCounter)
        this.drawScore()
        this.dead()
        this.lifes.forEach(element => {
        element.draw()
            
        });
        this.balconies.forEach(element => {
            element.draw()
        });

        this.enemies.forEach(element => {
            element.draw()
            
        });
        this.fallOutObjects.forEach(element => {
            element.draw()
        });
        this.fallOutObjects.forEach(element => {
            element.fall()
        });
       
        
     
                 
    },
    randomizeNumbers(){
        
        this.randomPosition= Math.floor(Math.random()*(1024-0+0)+0)
        return this.randomPosition
    },

    pushElements(){
        
        //Dibujamos balcones
       

        this.balconies.push(new Balcony(this.ctx,30,30,57+1024,230,this.canvasSize,-0.3,'./img/window1.png'))
        this.balconies.push(new Balcony(this.ctx,31,31,290+1024,230,this.canvasSize,-0.3,'./img/window2.png'))
        this.balconies.push(new Balcony(this.ctx,32,32,626+1024,230,this.canvasSize,-0.3,'./img/window3.png'))
        this.balconies.push(new Balcony(this.ctx,33,33,875+1024,215,this.canvasSize,-0.3,'./img/window4.png'))

        // //Dibujamos objetos que caen de los balcones
        
        
        this.fallOutObjects.push(new FallOutObjects(this.ctx,40,40,57+1024,240,this.canvasSize,'img/caca.png',1))
        this.fallOutObjects.push(new FallOutObjects(this.ctx,60,60,290+1024,240,this.canvasSize,'img/virus.png',1))
        this.fallOutObjects.push(new FallOutObjects(this.ctx,50,50,626+1024,240,this.canvasSize,'img/papel.png',1))
        this.fallOutObjects.push(new FallOutObjects(this.ctx,50,50,875+1024,225,this.canvasSize,'img/sandia.png',1))


        
        //Dibujamos a los enemigos
        setTimeout(() => {
            this.enemies.push(new Enemies(this.ctx,100,100,this.randomizeNumbers()+2048,470,this.canvasSize,1,"./img/vecino2.png"))
       
        }, 20000);

        setTimeout(() => {
            this.enemies.push(new Enemies(this.ctx,100,100,this.randomizeNumbers()+2048,440,this.canvasSize,1,'./img/sanitario.png'))
            
        }, 40000);
        
        this.enemies.push(new Enemies(this.ctx,100,100,this.randomizeNumbers()+1024,440,this.canvasSize,1,"./img/vecino1.png"))
        this.enemies.push(new Enemies(this.ctx,100,100,this.randomizeNumbers()+1024,470,this.canvasSize,1,"./img/stop_vecino3.png"))

    },
    drawDog(){
        this.dog=new Dog(this.ctx, 25, 25, 150, 475, this.canvasSize,'dog.png')
    },

    drawPlayer(){
        playerSpeedX= 1
        this.player= new Players(this.ctx,100,100,75,400,this.canvasSize,3,1,100,'player.png')
        
    },
    drawBackground(){
        const img = new Image();
        const backgroundSpeed = playerSpeedX*(-1)
        img.src = './img/background_game.jpg'
        this.background= new Background(this.ctx,0,0,this.canvasSize.w,this.canvasSize.h,backgroundSpeed,img)
    },
    drawBalconies(){

if(this.balconies[0].balconyPosition.x<0) {
    this.balconies[0].balconyPosition.x +=1024
    this.balconies[0].draw()
    this.balconies.push (this.balconies.shift())}

        

    },
    drawFallOutObjects(){
        if(this.fallOutObjects[0].fallOutObjectPosition.x<0) {
            this.fallOutObjects[0].fallOutObjectPosition.x +=1024
            this.fallOutObjects[0].draw()
            this.fallOutObjects.push (this.fallOutObjects.shift())}
            
    },
    drawEnemies(){
            
        if(this.enemies[0].enemiesPosition.x<0) {
            this.enemies[0].enemiesPosition.x=this.randomizeNumbers()
            this.enemies[0].enemiesPosition.x +=1024
            this.enemies[0].draw()
            this.enemies.push (this.enemies.shift())
              
    }
    
},
    clearScreen(){
        this.ctx.clearRect(0,0,this.canvasSize.w,this.canvasSize.h)
    },
    moveBackground(direction){
        if(this.player.playersPosition.x<512-100) {
            this.player.move(direction)
            this.score-=0.25}

        else {this.player.playersPosition.x=512-100 
            this.score++
            if(direction!='right'){
            this.player.move(direction)}
            this.background.move(direction)
          
            this.balconies.forEach(element=>{
                element.move(direction)
            })

            this.enemies.forEach(element => {
                    element.move(direction)
    
                });
            this.fallOutObjects.forEach(element => {
                    element.move(direction)
                });
            
            

        }
        
        
    },

    drawScore(){
        this.ctx.fillStyle = "black"     
        this.ctx.font = "bold 20px sans-serif"
        this.ctx.textAlign= "center"
        this.ctx.fillText(`Score: ${Math.floor(this.score)}` , 512, 50);
      },

    drawLife(lifes){
        console.log(this.numberOfLifes)
        for(i=0;i<=lifes;i++){
        this.lifes.push(new Lifes(this.ctx,850 + (i*30),45,25,25,'./img/red_heart.png'))}
        

        // this.life = new Lifes(this.ctx,850,45,25,25,'./img/red_heart.png')
      },
    setEventListeners() {
        document.onkeydown = e => {
            e.keyCode === 37 ? this.moveBackground('left') : null
            e.keyCode === 17 ? this.moveBackground('jump'):null
            e.keyCode === 40 ? this.moveBackground('down'):null
            e.keyCode === 38 ? this.moveBackground('up'):null
            if(e.keyCode === 39) if(this.player.playersPosition.x<512-100)
             this.moveBackground('right') 
            
        }
       },


collision(){

   

    this.fallOutObjects.forEach(element => {

    
    //colision con los objetos que caen
        if (this.player.playersPosition.x+45 < element.fallOutObjectPosition.x + element.fallOutObjectSize.w &&
            this.player.playersPosition.x-65 + this.player.playersWidth.w > element.fallOutObjectPosition.x &&
            this.player.playersPosition.y+25 < element.fallOutObjectPosition.y + element.fallOutObjectSize.h &&
            this.player.playersWidth.h + this.player.playersPosition.y-55 > element.fallOutObjectPosition.y) {
                this.player.playersPosition.x -= 150
                this.collisioned=true
                this.removeLife(this.collisioned)
         }



        
    });

    //colision con los enemigos de la calzada superior ( y=440 )
    this.enemies.forEach(element => {
        if(this.player.playersPosition.y==440 && element.enemiesPosition.y==440){
        if (this.player.playersPosition.x+55 < element.enemiesPosition.x + element.enemiesWidth.w &&
            this.player.playersPosition.x-75 + this.player.playersWidth.w > element.enemiesPosition.x &&
            this.player.playersPosition.y+35 < element.enemiesPosition.y + element.enemiesWidth.h &&
            this.player.playersWidth.h + this.player.playersPosition.y-65 > element.enemiesPosition.y) {
                this.player.playersPosition.x -= 150
                
                this.collisioned=true
                this.removeLife(this.collisioned)
                console.log(this.numberOfLifes)
                
                // this.lifes.draw(this.numberOfLifes)
                
         }
        }

         
        
    })
    //colision con los enemigos de la calzada inferior ( y=470 )
    this.enemies.forEach(element => {
        if(this.player.playersPosition.y==470 && element.enemiesPosition.y==470){
        if (this.player.playersPosition.x+55 < element.enemiesPosition.x + element.enemiesWidth.w &&
            this.player.playersPosition.x-75 + this.player.playersWidth.w > element.enemiesPosition.x &&
            this.player.playersPosition.y+35 < element.enemiesPosition.y + element.enemiesWidth.h &&
            this.player.playersWidth.h + this.player.playersPosition.y-65 > element.enemiesPosition.y) {
                // alert("colision")
                this.player.playersPosition.x -= 150

                this.collisioned=true
                this.removeLife(this.collisioned)
                console.log(this.numberOfLifes)
                
                // this.lifes.draw(this.numberOfLifes)
         }
        }

         
        
    })

    
    
    
},
removeLife(collisioned){
    
    this.lifes.shift()
        if(collisioned){
            this.numberOfLifes--
        this.collisioned=false}
   
    
    
    // this.lifes.shift()
},
dead(){
    if(this.numberOfLifes<0){
        console.log("cosa",this.intervalId)
        clearInterval(this.intervalId)
    }

}

}
































