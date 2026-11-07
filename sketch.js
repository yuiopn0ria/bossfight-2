var lobbyTheme = new Audio("bossfightlobby.mp3");
var bossTheme = new Audio("bossfight.mp3");
var bossThemephase2 = new Audio("bossThemephase2.mp3")
var bossMusicPlaying = false;
var lobbyMusicPlaying = false;
var fightbutton, fightbutton_image;
var bosshealth = 500;
var restartbutton,restartbutton_image;
var healing, healing_image;
var obstacle;
var gamestate = "wait";
var invisible_floor;
var floor;
var hp = 100;
var score = 0;
var player, player_image,player_lost;
var boss, boss_images, bosstired_image, bossdefeated_image,bosstart_images,bossphase2;
var warning, warning_image
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8, obstacle9;
var playbutton,playbutton_image;
var creditbutton, creditbutton_image;
var backbutton, backbutton_image;
var settingbutton, settingbutton_image;
var debugbutton, debugbutton_image;
var turndebugoff,turndebugoff_image;



function preload(){
    
player_image = loadImage("player.png",);
player_lost = loadImage("playerlost.png");
boss_images = loadAnimation("boss1.png","boss2.png");
bosstired_image = loadImage("bosstired.png");
bosstart_images = loadAnimation("bosstart1.png","bosstart2.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
obstacle7 = loadImage("obstacle7.png");
obstacle8 = loadImage("obstacle8.png");
obstacle9 = loadImage("obstacle9.png");
restartbutton_image = loadImage("restartbutton.png");
healing_image = loadImage("healing.png");
bg = loadImage("bg.png");
fightbutton_image = loadImage("fightbutton.png");
bossdefeated_image = loadImage("bossdefeated.png");
playbutton_image = loadImage("playbutton.png");
creditbutton_image = loadImage("credits.png");
backbutton_image = loadImage("backbutton.png");
settingbutton_image = loadImage("settingbutton.png");
debugbutton_image = loadImage("debugbutton.png");
turndebugoff_image = loadImage("turndebugoffbutton.png");
warning_image = loadImage("warning.png")
bossphase2 = loadAnimation("bossphase2_1.png","bossphase2_2.png","bossphase2_3.png","bossphase2_4.png");


}


function setup(){
createCanvas(1600,720);
player = createSprite(800,500);
player.addImage("normal",player_image);
player.addImage("lost",player_lost);
player.scale = 0.5;
invisible_floor = createSprite(800,730,1600,10);
invisible_floor.visible = false;
floor = createSprite(800,700,1600,40);
floor.shapeColor = "orange";
restartbutton = createSprite(600,600);
restartbutton.addImage("restart",restartbutton_image);
restartbutton.scale = 0.5;
restartbutton.visible = false;


debugbutton = createSprite(500,480);
 debugbutton.addImage("debug",debugbutton_image);
  debugbutton.scale = 0.5
  debugbutton.visible = false;



settingbutton = createSprite(810, 480);
settingbutton.addImage("setting",settingbutton_image);
settingbutton.scale = 0.5;
settingbutton.visible = false;

turndebugoff = createSprite(500, 550);
turndebugoff.addImage("turndebugoff",turndebugoff_image);
turndebugoff.scale = 0.5;
turndebugoff.visible = false;

fightbutton = createSprite(600,500);
fightbutton.addImage("fight",fightbutton_image);
fightbutton.scale = 0.5;
fightbutton.visible = false;

playbutton = createSprite(800,400);
playbutton.addImage("play",playbutton_image);
playbutton.scale = 0.5; 
playbutton.visible = false;

backbutton = createSprite(600,650);
backbutton.addImage("back",backbutton_image);
backbutton.scale = 0.5;
backbutton.visible = false;

creditbutton = createSprite(800, 550);
creditbutton.addImage("credit",creditbutton_image);
creditbutton.scale = 0.5;
creditbutton.visible = false;

boss = createSprite(850,200);
boss.addAnimation("lockedin",boss_images);
boss.scale = 1.5;
boss.addImage("tired",bosstired_image);
boss.addImage("defeated",bossdefeated_image);
boss.addAnimation("waiting",bosstart_images);
boss.addAnimation("phase2",bossphase2);
obstacles = new Group();
healing = new Group();
warnings = new Group();



}








function draw(){
background(bg);
console.log("PHASE 2 HP:", bosshealth);
bossHP();
boss.depth = player.depth - 1;
if(mousePressedOver(debugbutton) && debugbutton.visible == true){
        obstacles.forEach(o => o.debug = true)

     boss.debug = true;
     player.debug = true;
     playbutton.debug = true;
     creditbutton.debug = true;
     backbutton.debug = true;
     settingbutton.debug = true;
     debugbutton.debug = true;
     restartbutton.debug = true;
     fightbutton.debug = true;
     debugbutton.debug = true;
        turndebugoff.debug = true;


    }

    if(mousePressedOver(turndebugoff) && turndebugoff.visible == true){
        obstacles.forEach(o => o.debug = false)

        boss.debug = false;
        player.debug = false;
        playbutton.debug = false;
        creditbutton.debug = false;
        backbutton.debug = false;
        settingbutton.debug = false;
        debugbutton.debug = false;
        restartbutton.debug = false;
        fightbutton.debug = false;
        debugbutton.debug = false;
        turndebugoff.debug = false;
    }


// settings state
if(gamestate == "settings"){
    boss.visible = false;
    debugbutton.visible = true;
    turndebugoff.visible = true;
    if(mouseIsOver(turndebugoff)){
        turndebugoff.scale = 0.6;
    }
    else{
        turndebugoff.scale = 0.5;
    }

     if(mouseIsOver(debugbutton)){
        debugbutton.scale = 0.6;
    } else{
        debugbutton.scale = 0.5;
    }
    
    textSize(40);
    fill("purple");
    text("settings",750,100);
    playbutton.visible = false;
    creditbutton.visible = false;
    settingbutton.visible = false;
    textSize(30);
    fill("green");
    text("what do you want to adjust?",600,400);
    text("more options coming soon!",600,450);
    backbutton.visible = true;

    if(mousePressedOver(backbutton)){
        gamestate = "wait";
        backbutton.visible = false;
        boss.visible = true;
    }
    if(mouseIsOver(backbutton)){
        backbutton.scale = 0.6;
    }
        else{
            backbutton.scale = 0.5;
            
        }
    


    }







// credit state
if(gamestate == "credit"){
    textSize(30);
    fill("blue");
    text("game created by: yousef, aka yousafz.123",600,400);
    text("lobby song made by EpicBattle J aka Peri Tune and battle(Boss) by boxcat games,",500,350);
    text("art created by: yousef, aka yousafz.123,yep me again",600,450);
    text("thank you for playing my game!!!",600,500);
    text("and thanks to p5.js for making this possible",600,550);
    creditbutton.visible = false;
    playbutton.visible = false;
    boss.visible = false;
    backbutton.visible = true;
    settingbutton.visible = false;
    debugbutton.visible = false;
    turndebugoff.visible = false;
    if(mouseIsOver(backbutton)){
        backbutton.scale = 0.6;
    }
    else{
        backbutton.scale = 0.5;
    }
    if(mousePressedOver(backbutton)){
        gamestate = "wait";
        backbutton.visible = false;
        boss.visible = true;
    }
    
}







// wait state
if(gamestate == "wait"){




      if(bossMusicPlaying){
        bossTheme.pause();
        bossTheme.currentTime = 0;
        bossMusicPlaying = false;
    }

    // play lobby music
    if(!lobbyMusicPlaying){
        lobbyTheme.play();
        lobbyMusicPlaying = true;
    }





    restartbutton.visible = false;
    settingbutton.visible = true;
        debugbutton.visible = false;
        turndebugoff.visible = false;
    boss.changeImage("lockedin",boss_images);
    textSize(40);
    fill("purple");
    text("the void boss fight game",600,650);
    score = 0;
    hp = 100;
    bosshealth = 500;
    boss.changeAnimation("waiting",bosstart_images);
    boss.scale = 1
    boss.y = 150
    player.changeImage("normal",player_image);

textSize(30);
fill("orange");
text("wait for perfect moment to strike and survive if you even can", 450,350);

textSize(20)
fill("white")

text("IF YOU FIND ANY BUGS PLEASE",25,500)
text("DO NOT HESITATE TO CONTACT MY DISCORD: bartsimpsongamer",25,550)

player.visible = false;
playbutton.visible = true;
creditbutton.visible = true;
if(mouseIsOver(creditbutton)){
    creditbutton.scale = 0.6;
} else{
    creditbutton.scale = 0.5;
}
if(mousePressedOver(creditbutton)){
    gamestate = "credit";
    creditbutton.visible = false;
}

if(mouseIsOver(playbutton)){
    playbutton.scale = 0.6;
} else{
    playbutton.scale = 0.5;

}
if(mousePressedOver(playbutton)){
    gamestate = "play";
    playbutton.visible = false;
    player.visible = true;
    player.x = 800;
    player.y = 500;

}

if(mousePressedOver(settingbutton)){
    gamestate = "settings";
    settingbutton.visible = false;


}


if(mouseIsOver(settingbutton)){
    settingbutton.scale = 0.6;
} else {
    settingbutton.scale = 0.5;

}

}

// phase2 state
if(gamestate == "phase2"){

    // spawning obstacles and shi
    spawn_healing_item();
    if(score > 9000 && score < 10000){
    spawn_obstacle6();
    }

    if(score > 10000){
        spawn_obstacle9()
    }

    if(score > 10500){
        spawn_obstacle8()

    }

    if(score > 9150){
    bossThemephase2.play()
    bossThemephase2.loop = true
    bossTheme.volume = 0.5

        if(hp == 0 || hp < 0){
            gamestate = "lost"
            bossThemephase2.pause()
        }

    }
    if(score > 9300 && score < 9500){
        fill("purple")
        textSize(30)
        text("PREPARE FOR THE ULTIMATE DOOM YOU WILL SEE YOU FUCKING BITCH",300,300)
    }
    if(score > 9300 ){
        spawn_obstacle7()
    }
if(keyDown("RIGHT_ARROW") && player.x < 1550){
    player.x += 25;
}
if(keyDown("LEFT_ARROW") && player.x > 50){
    player.x -= 25;
}
if(keyDown("SPACE") && player.y >= 400){
    player.velocityY = -20;
}
    player.velocityY += 0.8;
    backbutton.visible = false;
    score+= 1;
    boss.changeAnimation("phase2",bossphase2);
    boss.scale = 1.5;
    // bosshealth = 500;

    // for speaking
    if(score > 9000 && score < 9150){
    textSize(30);
    fill("purple");
    text("boss: you may have defeated me once...",600,400);
    }
    if(score > 9150 && score < 9300){
    textSize(30);
    fill("purple");
    text("boss: but this time, you will not be so lucky...",600,400);
    }
    if(bossMusicPlaying){
        bossTheme.pause();
        bossTheme.currentTime = 0; // reset to start
        bossMusicPlaying = false;
    }

        if(score > 10550 && score < 10650){
            textSize(30)
            fill("purple")
            text("boss: i am just getting started fellow",600,400)
            
        }



    // for fighting

        if(score > 10000 && score < 10500){
            spawn_obstacle7()
        }

    if(score === 10000){
        fightbossphase2();
        gamestate = "fight2"
    textSize(30);
    fill("purple");
    text("this is now your doom",600,400);
    fightbutton.visible = true;
    obstacles.destroyEach();
    healing.destroyEach();
    player.x = 800 
    player.y = 500;
    // if(mousePressedOver(fightbutton)){
    //     bosshealth -= 50;
    //     fightbutton.visible = false;
    //     gamestate = "phase2";
    // }
}
    if(score === 10500){
        fightbossphase2();
        gamestate = "fight2"
        fightbutton.visible = true
        obstacles.destroyEach()
        healing.destroyEach()
        player.x = 800
        player.y = 500
    }

    

}


// never mind cancel phase2 state or actually lets do this boys

if(gamestate == "play"){
boss.changeAnimation("lockedin",boss_images);
    textSize(25);
    fill("white");
    text("press space to jump and use arrow keys to move left or right", 400,600);
    backbutton.visible = false
    score+= 1;
    player.velocityY += 0.8;
    creditbutton.visible = false;

    // if boss loses all health
   if(bosshealth <= 0){
    bosshealth = 500;
    gamestate = "phase2";
}
settingbutton.visible = false;

if(score > 500 && score < 650){
    textSize(30);
    fill("red");
    text("boss: alright kid your actually pretty good...",600,500);
}
if(score > 1000 && score < 1150){
    textSize(30);
    fill("red");
    text("boss: you think you can defeat me that easily?",600,500);
}

 if(lobbyMusicPlaying){
        lobbyTheme.pause();
        lobbyTheme.currentTime = 0;
        lobbyMusicPlaying = false;
    }

if(!bossMusicPlaying){
    bossTheme.loop = true;   // 🔹 loop music
    bossTheme.volume = 0.3;  // 🔹 set volume
    bossTheme.play();         // 🔹 play
    bossMusicPlaying = true;  // 🔹 flag so it doesn’t restart
}





 if(score > 1500 && score < 1650){
    textSize(30);
    fill("red");
    text("boss: alright your getting in my nerves now...",600,500);

    // spawn your funcions here 
    


 }
if(score === 500){
    gamestate = "fight";
}
 if(score === 1000){
    gamestate = "fight";
 }
 if(score === 2000){
    gamestate = "fight";
 }
 if(score === 3000){
    gamestate = "fight";
 }

 if(score === 4000){
    gamestate = "fight";
 }

 if(score === 5000){
    gamestate = "fight";
 }

    if(score === 6000){
    gamestate = "fight";
 }
    if(score === 7000){
    gamestate = "fight";
 }
    if(score === 8000){
    gamestate = "fight";
 }
    if(score === 9000){
    gamestate = "fight";
 }



if(hp == 0){
    gamestate = "lost";
    player.changeImage("lost",player_lost);
}



 if(score > 2300 && score < 2450){
    textSize(30);
    fill("red");
    text("boss: I will defeat you once and for all!",600,500);
 }

if(score > 4500 && score < 4560){
    textSize(30);
    fill("red");
    text("i feel tired.....",600,500);
}


// if(score > 9700  && score < 9850){
//     textSize(30);
//     fill("red");
//     text("boss: nooo! how could a mere human defeat me...",600,500);
// }

 if(score > 2300){
    spawn_obstacle5();
 }
    if(score > 1000){
        spawn_obstacle4();
    }



 if(score > 1650){
    spawn_obstacle3();
 } 
 
if(keyDown("RIGHT_ARROW") && player.x < 1550){
    player.x += 15;
}
if(keyDown("LEFT_ARROW") && player.x > 50){
    player.x -= 15;
}

if(keyDown("SPACE") && player.y >= 600){
    player.velocityY = -20;
}

spawn_obstacle1();
spawn_obstacle2();
if(score > 675){
    spawn_healing_item();
}
 maxHP();

}



player.setCollider("rectangle",0,0,200,175);




// player colliding with floor
player.collide(invisible_floor);


textSize(20);
fill("red");
text("player HP: " + hp, 50,50);
text("Score: " + score, 1400,50);

player.overlap(obstacles, function(player,obstacle1_attack){
    hp -= 5;
    obstacle1_attack.remove();

})
player.overlap(healing, function(player,healing_item){
    
    hp += 10;
    healing_item.remove();
});

// lost state

if(gamestate == "lost"){

 if(bossMusicPlaying){
        bossTheme.pause();
        bossTheme.currentTime = 0; // reset to start
        bossMusicPlaying = false;
    }

    obstacles.destroyEach();
    healing.destroyEach();
    player.x = 800 
    player.y = 500;
    textSize(50);
    fill("black");
    text("you lost the game!!!, restart?",600,400);
    restartbutton.visible = true;
    if(mousePressedOver(restartbutton)){
        gamestate = "play";
        hp = 100;
        bosshealth = 500;
        score = 0;
        player.x = 800;
        player.y = 500;
        player.changeImage("normal",player_image);
        restartbutton.visible = false;
        
    }
    if(mouseIsOver(restartbutton)){
    restartbutton.scale = 0.6;
}
    else{
    restartbutton.scale = 0.5;
    }


    if(mouseIsOver(backbutton)){
        backbutton.scale = 0.6;
    }   else{
        backbutton.scale = 0.5;

    }


    backbutton.visible = true;
    if(mousePressedOver(backbutton)){
        gamestate = "wait"
        backbutton.visible = false;
        boss.visible = true;
    }
    if(backbutton.visible == true &&  gamestate == "lost"){
        backbutton.x = 1000;
        backbutton.y = 600;
    }
    maxHP();
}   




// fight state

if(gamestate == "fight"){
    fightboss();
    obstacles.destroyEach();
    healing.destroyEach();
    
    boss.changeImage("tired");
    player.x = 800 
    player.y = 500;

    if(mouseIsOver(fightbutton)){
    fightbutton.scale = 0.6;
} else{
    fightbutton.scale = 0.5;
}



}

if(gamestate == "fight2"){
    fightbossphase2();
    obstacles.destroyEach();
    healing.destroyEach();
    
    boss.changeImage("phase2");
    player.x = 800 
    player.y = 500;

    if(mouseIsOver(fightbutton)){
    fightbutton.scale = 0.6;
} else{
    fightbutton.scale = 0.5;
}




}







// victory state

if(gamestate == "victory"){
     if(lobbyMusicPlaying){
        lobbyTheme.pause();
        lobbyTheme.currentTime = 0;
        lobbyMusicPlaying = false;
    }

 if(bossMusicPlaying){
        bossTheme.pause();
        bossTheme.currentTime = 0; // reset to start
        bossMusicPlaying = false;
    }

    textSize(50);
    fill("black");
    text("you defeated the boss!!!",600,400);
    player.x = 800 
    player.y = 500;
    restartbutton.visible = true;
    boss.changeImage("defeated");
    if(mousePressedOver(restartbutton)){
        gamestate = "play";
        hp = 100;
        bosshealth = 500;
        player.x = 800;
        player.y = 500;

        score = 0;
        restartbutton.visible = false;
    }
    if(mouseIsOver(restartbutton)){
    restartbutton.scale = 0.6;
} else{
    restartbutton.scale = 0.5;
}

backbutton.visible = true;
if(mousePressedOver(backbutton)){ 
    gamestate = "wait";
    backbutton.visible = false;
    boss.visible = true;
    boss.changeAnimation("normal",boss_images);

}
if(backbutton.visible == true &&  gamestate == "victory"){
    backbutton.x = 1000;
    backbutton.y = 600;
}
if(mouseIsOver(backbutton)){
    backbutton.scale = 0.6;
} else{
    backbutton.scale = 0.5;
}

}




















drawSprites();

















}








function spawn_obstacle1(){
remainder = frameCount % 15;
if(remainder == 0){
    var obstacle1_attack = createSprite(random(50,1550), -50);
    obstacle1_attack.velocityY = 15;
    obstacle1_attack.addImage("obstacle1",obstacle1);
    obstacle1_attack.scale = 0.3;
    obstacle1_attack.lifetime = 200;
    obstacles.add(obstacle1_attack);
    if(mousePressedOver(debugbutton)){
        obstacle1_attack.debug = true;
    }
        
      else  if(mousePressedOver(turndebugoff)){
            obstacle1_attack.debug = false;
        }
        obstacle1_attack.setCollider("rectangle",0,0,50,50);
    }
    
    
}







function spawn_obstacle2(){
    remainder = frameCount % 100;
    if(remainder == 0){
        var obstacle2_attack = createSprite(1700,600);
        obstacle2_attack.velocityX = -random(10,20);
        obstacle2_attack.addImage("obstacle2",obstacle2);
        obstacle2_attack.scale = 0.7;
        obstacle2_attack.lifetime = 200;
        obstacles.add(obstacle2_attack);
        if(mousePressedOver(debugbutton)){
            obstacle2_attack.debug = true;
        }
        else if(mousePressedOver(turndebugoff)){
            obstacle2_attack.debug = false;
        }
        
        obstacle2_attack.setCollider("rectangle",0,0,150,150);

    }






}


function spawn_obstacle3(){
  remainder = frameCount % 150;
  if(remainder == 0){

    // choose X ONCE so warning + lightning match
    let spawnX = random(50,1550);

    // WARNING SIGN
    let warning = createSprite(spawnX, 200);
    warning.addImage(warning_image);
    warning.scale = 0.35;
    warning.lifetime = 40; // ~0.65 sec
    warnings.add(warning);

    // LIGHTNING STRIKE (delayed)
    setTimeout(() => {
      let obstacle3_attack = createSprite(spawnX, 50);
      obstacle3_attack.velocityY = 10;
      obstacle3_attack.addImage(obstacle3);
      obstacle3_attack.scale = 2;
      obstacle3_attack.lifetime = 200;
      obstacle3_attack.setCollider("rectangle",0,0,100,400);
      obstacles.add(obstacle3_attack);
    }, 650);
  }
}




function spawn_obstacle4(){
  remainder = frameCount % 65;
  if(remainder == 0){

    // pick spawn X ONCE
    let spawnX = random(50,1550);

    // WARNING SIGN
    let warning = createSprite(spawnX, 750);
    warning.addImage(warning_image);
    warning.scale = 0.3;
    warning.lifetime = 30; // ~0.5 sec
    warnings.add(warning);

    // ACTUAL OBSTACLE (delayed)
    setTimeout(() => {
      let obstacle4_attack = createSprite(spawnX, 800);
      obstacle4_attack.velocityY = -12;
      obstacle4_attack.addImage(obstacle4);
      obstacle4_attack.scale = 0.2;
      obstacle4_attack.lifetime = 200;
      obstacle4_attack.setCollider("rectangle",0,0,100,100);
      obstacles.add(obstacle4_attack);
    }, 500); // delay in ms
  }
}


function spawn_obstacle5(){
    remainder = frameCount % 75;
    if(remainder == 0){
        var obstacle5_attack = createSprite(-100,600);
        obstacle5_attack.velocityX = random(10,20);
        obstacle5_attack.addImage("obstacle5",obstacle5);
        obstacle5_attack.scale = 0.7
        obstacle5_attack.lifetime = 200;
        obstacles.add(obstacle5_attack);
        if(mousePressedOver(debugbutton)){
            obstacle5_attack.debug = true;
        }
        else if(mousePressedOver(turndebugoff)){
            obstacle5_attack.debug = false;
        }
        
        obstacle5_attack.setCollider("rectangle",0,0,200,150);
    }

}


function spawn_healing_item(){
    remainder = frameCount % 390;
    if(remainder == 0){
        var healing_item = createSprite(random(50,1550), -50);
        healing_item.velocityY = 10;
        healing_item.addImage("healing",healing_image);
        healing_item.scale = 0.3;
        healing_item.lifetime = 200;
        healing.add(healing_item);
        healing_item.setCollider("rectangle",0,0,50,50);
        
    }
}

function maxHP(){
    if(hp > 100){
        hp = 100;
    }
    if(hp < 0){
        hp = 0;
    }
}



function bossHP(){
    rect(500,20,500,20);
    fill("red");
    rect(500,20,bosshealth,20);
    
    

}

function fightboss(){
    textSize(30);
    fill("purple");
    text("fight the boss here!",600,400);
    fightbutton.visible = true;
    if(mousePressedOver(fightbutton)){
        bosshealth -= 50;
        fightbutton.visible = false;
        gamestate = "play";


    }
  if(bosshealth <= 0){
    bosshealth = 500;
    score = 9000;
    gamestate = "phase2";
}
    
}
function fightbossphase2(){
    textSize(30);
    fill("purple");
    text("fight the boss here!",600,400);
    fightbutton.visible = true;


    if(mouseIsOver(fightbutton)){
            fightbutton.scale = 0.6
        } else {

            fightbutton.scale = 0.5
        }
        

    if(mousePressedOver(fightbutton)){
        console.log("HP BEFORE HIT:", bosshealth);
        bosshealth -= 50;
        console.log("HP AFTER HIT:", bosshealth);
        fightbutton.visible = false;
        gamestate = "phase2";


    }
  
}

function spawn_obstacle6() {
    let remainder = frameCount % 50;

    // Step 1: Show the warning a few frames before the obstacle
    if (remainder == 30) { // 20 frames before
        let spawnX = random(50, 1550); // pick X once
        let warningSprite = createSprite(spawnX, 400); // warning position
        warningSprite.addImage(warning_image);
        warningSprite.scale = 1.0;
        warningSprite.lifetime = 20; // lasts until obstacle drops
        warnings.add(warningSprite);

        // Step 2: Delay the obstacle spawn so it appears exactly below the warning
        setTimeout(() => {
            let obstacle6_attack = createSprite(spawnX, 450);
            // obstacle6_attack.velocityY = 20;
            obstacle6_attack.addImage(obstacle6);
            obstacle6_attack.scale = 1.0;
            obstacle6_attack.lifetime = 40;
            obstacles.add(obstacle6_attack);
            obstacle6_attack = true
        }, 330); // ~20 frames at 60 FPS = 333ms
    }
}

function spawn_obstacle7() {
    let remainder = frameCount % 20;

        if(remainder == 0){

            let obstacle7_attack = createSprite(random(50,1550), -50)
            obstacle7_attack.addImage(obstacle7)
            obstacle7_attack.velocityY = 35
            obstacle7_attack.scale = 0.4
            obstacle7_attack.lifetime = 100;
            obstacles.add(obstacle7_attack)
            obstacle7_attack.debug = true
        }


}
function spawn_obstacle8() {
    let remainder = frameCount % 120;

    if (remainder == 30) {
        let spawnY = random(250, 550);

        // Warning
        let warningSprite = createSprite(0, spawnY);
        warningSprite.addImage(warning_image);
        warningSprite.rotation = 0;
        warningSprite.lifetime = 20;
        warnings.add(warningSprite);

        // Actual attack
        setTimeout(() => {
            let obstacle8_attack = createSprite(0, spawnY);

            obstacle8_attack.addImage(obstacle8);
            obstacle8_attack.scale = 1.0;
            obstacle8_attack.velocityX = 35;
            obstacle8_attack.lifetime = 60;

            obstacles.add(obstacle8_attack);
        }, 330);
    }
}
function spawn_obstacle9(){
    let remainder = frameCount % 50

    if(remainder == 0){

        obstacle9_attack = createSprite(-50,500)
        obstacle9_attack.addImage(obstacle9)
        
        obstacle9_attack.velocityX = 30
        obstacle9_attack.lifetime = 100
        obstacle9_attack.debug = true
        obstacle9_attack.setCollider("rectangle",0,0,100,300)
        obstacles.add(obstacle9_attack)
        
    }
}
