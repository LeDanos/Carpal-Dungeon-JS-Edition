const enemy = document.getElementById("enemy");
const playerHP = document.getElementById("playerHP");
const enemyHP = document.getElementById("enemyHP");
const enemyIDInput = document.getElementById("enemyIDInput");
const spawnEnemy = document.getElementById("spawnEnemy");
const enemyIDSend = document.getElementById("enemyIDSend");
const dodge = document.getElementById("dodge");
const warning = document.getElementById("warning");
const dodgeIndicator = document.getElementById("dodgeIndicator");
const weapon = document.getElementById("weapon");
const weaponIDInput = document.getElementById("weaponIDInput");
const weaponIDSend = document.getElementById("weaponIDSend");
const play = document.getElementById("play");
const mainMenu = document.getElementById("mainMenu");
const battleMenu = document.getElementById("battleMenu");
const debug = document.getElementById("debug");
const selectWeapon = document.getElementById("selectWeapon");
const selectWeapon1 = document.getElementById("selectWeapon1");
const selectWeapon2 = document.getElementById("selectWeapon2");
const weaponDisDmg = document.getElementById("weaponDisDmg");
const weaponDisCps = document.getElementById("weaponDisCps");
const weaponDis = document.getElementById("weaponDis");
const playerDmg = document.getElementById("playerDmg");
const playerCps = document.getElementById("playerCps");
const selectWeaponConfirm = document.getElementById("selectWeaponConfirm");
const levelUp = document.getElementById("levelUp");
const hpLevelUp = document.getElementById("hpLevelUp");
const dmgLevelUp = document.getElementById("dmgLevelUp");
const speedLevelUp = document.getElementById("speedLevelUp");
const confirmLevelUp = document.getElementById("confirmLevelUp");
const playerGold = document.getElementById("playerGold");
const playerExp = document.getElementById("playerExp");
const playerHPLvl = document.getElementById("playerHPLvl");
const playerDmgLvl = document.getElementById("playerDmgLvl");
const playerSpeedLvl = document.getElementById("playerSpeedLvl");
const loot = document.getElementById("loot");
const lootInfo = document.getElementById("lootInfo");
const lootImg = document.getElementById("lootImg");
const selectLoot = document.getElementById("selectLoot");
const currentLoot = document.getElementById("currentLoot");
const selectLoot1 = document.getElementById("selectLoot1");
const selectLoot2 = document.getElementById("selectLoot2");
const selectLootConfirm = document.getElementById("selectLootConfirm");
const enemyLevel = document.getElementById("enemyLevel");
const dungeonFloor = document.getElementById("dungeonFloor");
const dungeonChamber = document.getElementById("dungeonChamber");
const enemyDiv = document.getElementById("enemyDiv");
const hit = document.getElementById("hit");
const miss = document.getElementById("miss");
const openSponzors = document.getElementById("openSponzors");
const sponzors = document.getElementById("sponzors");
const sponzor1 = document.getElementById("sponzor1");
const sponzor2 = document.getElementById("sponzor2");
const sponzor3 = document.getElementById("sponzor3");
const sponzor4 = document.getElementById("sponzor4");
const sponzor5 = document.getElementById("sponzor5");
const sponzor6 = document.getElementById("sponzor6");

//Beta v1.0.0

//variables
let gamemode=0;
let random=0;
let defeatedEnemyID=0;
let heal=0;
let floor=1;
let chamber=1;

//enemy variables
let enemyID = 0;
let enemyMaxHP = 0;
let enemyCurrentHP = 0;
let enemyMeleeDamage = 0;
let enemyLvl=1;
const setEnemyHP=()=>{
    enemyHP.innerHTML = `HP: ${enemyCurrentHP} / ${enemyMaxHP}`
}
setEnemyHP();

//player variables
let hpLvl = 0;
let dmgLvl = 0;
let speedLvl = 0;
const setPlayerStats=()=>{
    playerHP.innerHTML = `HP: ${playerCurrentHP} / ${playerMaxHP}`
    playerDmg.innerHTML=`Dmg: ${playerDamage}`
    playerCps.innerHTML=`Clicks per second: ${cps}`
}
let playerDamage = 0.1+(dmgLvl/4);
let baseDamage=0.1
let playerMaxHP = 10+(2*hpLvl);
let baseMaxHP=10
let dodgeValue = 0;
let playerCurrentHP = playerMaxHP;
let cps = 2+(speedLvl/100);
let baseCps=2
let cpsLimiter = 0;
let weaponID = 0;
let subweaponID = 0;
let gold = 0;
let exp = 0;
let neededExp = 10;
setPlayerStats();

//enemy spawner
const enemySpawner=()=>{
    if (enemyID==0){
        enemyMeleeDamage=0;
        enemyMaxHP=0;
        setEnemyHP();
        spawnEnemy.style.display="block"
        enemy.style.display="none"
    }else if (enemyID<=1){
        enemySpawnID();
        enemyMovement()
        spawnEnemy.style.display="none";
        enemy.style.display="block";
    }
}

enemyIDSend.onclick=()=>{
    enemyID=enemyIDInput.value;
    enemyCurrentHP = enemyMaxHP;
    enemySpawner();
}
weaponIDSend.onclick=()=>{
    weaponID=weaponIDInput.value;
    weaponSpawnID();
}

//enemies
const enemySpawnID=()=>{
    if(enemyID==1){
        enemy.src="./res/img/enemies/1.gif"
        enemyMaxHP=Math.ceil(19+(enemyLvl));
        enemyCurrentHP=enemyMaxHP;
        setEnemyHP();
        enemyMeleeDamage=Math.ceil(4+(enemyLvl/2));
    }
}

//enemy movement
function movementFunction(functionNumber){
    if(functionNumber==1){
        movementInterval1=setInterval(()=>{
            enemy.style.transition="1s"
            enemy.style.left="70%"
            setTimeout(()=>{
                enemy.style.left="10%"
            },1000)
        },2000)
    }
}

const enemyMovement=()=>{
    if(enemyID==1){
        enemy.style.left="10%"
        enemy.style.top="25%"
        movementFunction(1);
    }
}

//enemy rewards
const enemyRewards=()=>{
    enemyMeleeDamage=0;
    enemyMaxHP=0;
    setEnemyHP();
    enemy.style.display="none"
    if(defeatedEnemyID==1){
        random=Math.random()
        if(random<1/3){
            gold++
        }else if(random<2/3){
            gold+=2
        }else{
            gold+=3
        }
        playerGold.innerHTML=`Gold: ${gold}`
        exp+=10
        playerExp.innerHTML=`Exp: ${exp}`
        if(exp>=neededExp){
            exp-=neededExp
            playerExp.innerHTML=`Exp: ${exp}`
            neededExp*=2
            levelUp.style.display="block"
        }
        else{
            getLoot()
        }
    }
}

//weapons
const weaponSpawnID=()=>{
    if(weaponID==1){
        weapon.src="./res/img/weapons/1.png"
        playerDamage=2+(dmgLvl/4)
        baseDamage=2
        cps=1+(speedLvl/100)
        baseCps=1
        clearInterval(cpsInterval)
        cpsFunction(1000/cps)
    }else if(weaponID==2){
        weapon.src="./res/img/weapons/2.png"
        playerDamage=0.5+(dmgLvl/4)
        baseDamage=0.5
        cps=4+(speedLvl/100)
        baseCps=4
        clearInterval(cpsInterval)
        cpsFunction(1000/cps)
    }else if(weaponID==3){
        weapon.src="./res/img/weapons/3.png"
        playerDamage=6+(dmgLvl/4)
        baseDamage=6
        cps=0.5+(speedLvl/100)
        baseCps=0.5
        clearInterval(cpsInterval)
        cpsFunction(1000/cps)
    }
    setPlayerStats();
}

//damage
enemy.onclick = () => {
    if (cpsLimiter==0){
        if (enemyCurrentHP >= 0){
            if (playerDamage >= enemyCurrentHP){
                enemyCurrentHP=0;
                setEnemyHP();
                defeatedEnemyID=enemyID
                enemyID=0;
                warning.style.display="none";
                clearInterval(movementInterval1)
                if(gamemode==0){
                    enemySpawner();
                }else if(gamemode==1){
                    enemyRewards()
                }
            }else{
                cpsLimiter=1;
                weapon.style.filter="brightness(50%)"
                showHit()
                enemyCurrentHP-=playerDamage;
                setEnemyHP()
            }
        }else{
            defeatedEnemyID=enemyID
            enemyID=0;
            warning.style.display="none"
            clearInterval(movementInterval)
            if(gamemode==0){
                enemySpawner();
            }else if(gamemode==1){
                enemyRewards()
            }
        }
    }
}
enemyDiv.onclick=()=>{
    if (cpsLimiter==0){
        if(enemy.style.display=="block"){
            cpsLimiter=1
            weapon.style.filter="brightness(50%)"
            showMiss()
        }
    }
}

//dodge
dodge.onclick=()=>{
    if (dodgeValue<=12){
        dodgeValue++;
        dodgeColor();
    }
}
const dodgeColor=()=>{
    if(dodgeValue==0){
        dodge.style.backgroundColor="rgb(149, 0, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if(dodgeValue==1){
        dodge.style.backgroundColor="rgb(148, 15, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if (dodgeValue==2){
        dodge.style.backgroundColor="rgb(148, 32, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if (dodgeValue==3){
        dodge.style.backgroundColor="rgb(148, 47, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if (dodgeValue==4){
        dodge.style.backgroundColor="rgb(148, 64, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if (dodgeValue==5){
        dodge.style.backgroundColor="rgb(148, 79, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if (dodgeValue==6){
        dodge.style.backgroundColor="rgb(148, 96, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if (dodgeValue==7){
        dodge.style.backgroundColor="rgb(148, 111, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if (dodgeValue==8){
        dodge.style.backgroundColor="rgb(148, 128, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if (dodgeValue==9){
        dodge.style.backgroundColor="rgb(148, 143, 0)"
        dodgeIndicator.innerHTML="not charged"
    }else if (dodgeValue<=12){
        dodge.style.backgroundColor="rgb(65, 186, 0)"
        dodgeIndicator.innerHTML="charged!"
    }
}
setInterval(()=>{
    if(dodgeValue>0){
        dodgeValue--
        dodgeColor();
    }
},1000);

//death
const death=()=>{
    if(playerCurrentHP<=0){
        window.location.reload()
    }
}

//melee attack
const meleeAttack=setInterval(()=>{
    if(enemyMeleeDamage>0){
        warning.style.display="block"
        setTimeout(()=>{
            if(enemyMeleeDamage>0){
                if(dodgeValue<10){
                    warning.style.display="none"
                    playerCurrentHP-=enemyMeleeDamage
                    setPlayerStats();
                    death();
                }else{
                    warning.style.display="none"
                }
            }else{
                warning.style.display="none"
            }
        },2500)
    }
},10000)

//cps limit
function cpsFunction(cpsLimit){
    cpsInterval=setInterval(()=>{
        cpsLimiter=0;
        weapon.style.filter="brightness(100%)"
    },cpsLimit)
}
cpsFunction(2000)

//play
play.onclick=()=>{
    gamemode=1
    battleMenu.style.display="block"
    mainMenu.style.display="none"
    selectWeapon.style.display="block"
}
debug.onclick=()=>{
    gamemode=0
    battleMenu.style.display="block"
    mainMenu.style.display="none"
    enemySpawner()
}

//weapon select
let weapon1=0
let weapon2=0
let selectedWeapon=0
random=Math.random()
if(random<(1/3)){
    selectWeapon1.src="./res/img/weapons/1.png"
    weapon1=1;
}else if(random<(2/3)){
    selectWeapon1.src="./res/img/weapons/2.png"
    weapon1=2;
}else{
    selectWeapon1.src="./res/img/weapons/3.png"
    weapon1=3;
}
random=Math.random()
if(random<(1/3)){
    if(weapon1==1){
        selectWeapon2.src="./res/img/weapons/2.png"
        weapon2=2;
    }else{
        selectWeapon2.src="./res/img/weapons/1.png"
        weapon2=1;
    }
}else if(random<(2/3)){
    if(weapon1==2){
        selectWeapon2.src="./res/img/weapons/3.png"
        weapon2=3;
    }else{
        selectWeapon2.src="./res/img/weapons/2.png"
        weapon2=2;
    }
}else{
    if(weapon1==3){
        selectWeapon2.src="./res/img/weapons/1.png"
        weapon2=1;
    }else{
        selectWeapon2.src="./res/img/weapons/3.png"
        weapon2=3;
    }
}
selectWeapon1.onclick=()=>{
    selectedWeapon=weapon1
    if(selectedWeapon==1){
        weaponDisDmg.innerHTML="Dmg: 2"
        weaponDisCps.innerHTML="Clicks per second: 1"
        weaponDis.innerHTML="A basic sword with descent damage and speed."
    }else if(selectWeapon==2){
        weaponDisDmg.innerHTML="Dmg: 0.5"
        weaponDisCps.innerHTML="Clicks per second: 4"
        weaponDis.innerHTML="Two basic daggers, weak but missing isn't as punished."
    }else{
        weaponDisDmg.innerHTML="Dmg: 6"
        weaponDisCps.innerHTML="Clicks per second: 0.5"
        weaponDis.innerHTML="A basic claymore. A big guy needs a big sword. Strong but be careful not to miss."
    }
    selectWeaponConfirm.style.display="block"
}
selectWeapon2.onclick=()=>{
    selectedWeapon=weapon2
    if(selectedWeapon==1){
        weaponDisDmg.innerHTML="Dmg: 2"
        weaponDisCps.innerHTML="Clicks per second: 1"
        weaponDis.innerHTML="A basic sword with descent damage and speed."
    }else if(selectedWeapon==2){
        weaponDisDmg.innerHTML="Dmg: 0.5"
        weaponDisCps.innerHTML="Clicks per second: 4"
        weaponDis.innerHTML="Two basic daggers, weak but missing isn't as punished."
    }else{
        weaponDisDmg.innerHTML="Dmg: 6"
        weaponDisCps.innerHTML="Clicks per second: 0.5"
        weaponDis.innerHTML="A basic claymore. A big guy needs a big sword. Strong but be careful not to miss."
    }
    selectWeaponConfirm.style.display="block"
}
selectWeaponConfirm.onclick=()=>{
    weaponID=selectedWeapon
    selectWeapon.style.display="none"
    weaponSpawnID()
    randomEnemy()
}

//random enemy
const randomEnemy=()=>{
    random=Math.random()
    if(random<1/6){
        enemyLvl=Math.ceil(floor*1)
        enemyLevel.innerHTML=`Level: ${enemyLvl}`
    }else if(random<2/6){
        enemyLvl=Math.ceil(floor*1.2)
        enemyLevel.innerHTML=`Level: ${enemyLvl}`
    }else if(random<3/6){
        enemyLvl=Math.ceil(floor*1.4)
        enemyLevel.innerHTML=`Level: ${enemyLvl}`
    }else if(random<4/6){
        enemyLvl=Math.ceil(floor*1.6)
        enemyLevel.innerHTML=`Level: ${enemyLvl}`
    }else if(random<5/6){
        enemyLvl=Math.ceil(floor*1.8)
        enemyLevel.innerHTML=`Level: ${enemyLvl}`
    }else{
        enemyLvl=Math.ceil(floor*2)
        enemyLevel.innerHTML=`Level: ${enemyLvl}`
    }
    random=Math.random()
    if(random<1){
        enemyID=1
        enemySpawner()
    }
}

//level up
let selectedLevelUp=0
hpLevelUp.onclick=()=>{
    selectedLevelUp=1
    confirmLevelUp.style.display="block"
}
dmgLevelUp.onclick=()=>{
    selectedLevelUp=2
    confirmLevelUp.style.display="block"
}
speedLevelUp.onclick=()=>{
    selectedLevelUp=3
    confirmLevelUp.style.display="block"
}
confirmLevelUp.onclick=()=>{
    if(selectedLevelUp==1){
        hpLvl++
        playerHPLvl.innerHTML=`HP Level: ${hpLvl}`
        playerMaxHP=baseMaxHP+(2*hpLvl)
        playerCurrentHP+=2
        setPlayerStats()
    }
    else if(selectedLevelUp==2){
        dmgLvl++
        playerDmgLvl.innerHTML=`Damage Level: ${dmgLvl}`
        playerDamage=baseDamage+(dmgLvl/4)
        setPlayerStats()
    }
    else{
        speedLvl++
        playerSpeedLvl.innerHTML=`Speed Level: ${speedLvl}`
        cps=baseCps+(speedLvl/50)
        clearInterval(cpsInterval)
        cpsFunction((1000/cps))
        setPlayerStats()
    }
    confirmLevelUp.style.display="none"
    levelUp.style.display="none"
    getLoot()
}

//loot
const getLoot=()=>{
    let loot1=0;
    let loot2=0;
    let lootType=0;
    let selectedLoot=0;
    loot.style.display="block"
    random=Math.random();
    if(random<0.5/10){
        lootType=1
        loot1=weaponID;
        lootInfo.innerHTML=`You got a new weapon! Keep it?`
        selectLoot.style.display="block"
        selectLoot1.src=weapon.src
        currentLoot.style.display="block"
        random=Math.random()
        if(random<(1/3)){
            if(loot1==1){
                selectLoot2.src="./res/img/weapons/2.png"
                loot2=2;
            }else{
                selectLoot2.src="./res/img/weapons/1.png"
                loot2=1;
            }
        }else if(random<(2/3)){
            if(loot1==2){
                selectLoot2.src="./res/img/weapons/3.png"
                loot2=3;
            }else{
                selectLoot2.src="./res/img/weapons/2.png"
                loot2=2;
            }
        }else{
            if(loot1==3){
                selectLoot2.src="./res/img/weapons/1.png"
                loot2=1;
            }else{
                selectLoot2.src="./res/img/weapons/3.png"
                loot2=3;
            }
        }
        selectLoot1.onclick=()=>{
            selectedLoot=loot1
            selectLootConfirm.style.display="block"
        }
        selectLoot2.onclick=()=>{
            selectedLoot=loot2
            selectLootConfirm.style.display="block"
        }
    }
    else if(random<3.5/10){
        lootType=2
        random=Math.random()
        if(random<1/10){
            heal=Math.ceil((playerMaxHP/100)*80)
            lootInfo.innerHTML=`You got a healing potion! You healed ${heal} HP!`
            if(heal>playerMaxHP-playerCurrentHP){
                playerCurrentHP=playerMaxHP
            }else{
                playerCurrentHP+=heal
            }
            setPlayerStats()
            selectLootConfirm.style.display="block"
        }
        else if(random<3/10){
            heal=Math.ceil((playerMaxHP/100)*50)
            lootInfo.innerHTML=`You got a bandage! You healed ${heal} HP!`
            if(heal>playerMaxHP-playerCurrentHP){
                playerCurrentHP=playerMaxHP
            }else{
                playerCurrentHP+=heal
            }
            setPlayerStats()
            selectLootConfirm.style.display="block"
        }
        else if(random<6/10){
            heal=Math.ceil((playerMaxHP/100)*20)
            lootInfo.innerHTML=`You got a big ol' apple! You healed ${heal} HP! Tasty!`
            if(heal>playerMaxHP-playerCurrentHP){
                playerCurrentHP=playerMaxHP
            }else{
                playerCurrentHP+=heal
            }
            setPlayerStats()
            selectLootConfirm.style.display="block"
        }
        else{
            heal=Math.ceil((playerMaxHP/100)*5)
            lootInfo.innerHTML=`You got a piece of paper with a compliment. You feel a little better. You healed ${heal} HP.`
            if(heal>playerMaxHP-playerCurrentHP){
                playerCurrentHP=playerMaxHP
            }else{
                playerCurrentHP+=heal
            }
            setPlayerStats()
            selectLootConfirm.style.display="block"
        }
    }else{
        lootType=0
        lootInfo.innerHTML="You got nothing. :c"
        selectLootConfirm.style.display="block"
    }
    selectLootConfirm.onclick=()=>{
        if(lootType==1){
            selectLoot.style.display="none"
            currentLoot.style.display="none"
            weaponID=selectedLoot
            weaponSpawnID()
        }
        selectLootConfirm.style.display="none"
        loot.style.display="none"
        if(chamber>=5){
            chamber=1
            floor++
            dungeonChamber.innerHTML=`Chamber: ${chamber}`
            dungeonFloor.innerHTML=`Floor: ${floor}`
        }else{
            chamber++
            dungeonChamber.innerHTML=`Chamber: ${chamber}`
        }
        randomEnemy()
    }
}

//hit / miss
const showHit=()=>{
    hit.style.left=`${enemy.style.left}`
    hit.style.top=`${enemy.style.top}`
    hit.style.display="block"
    setTimeout(()=>{
        hit.style.display="none"
    },500)
}
const showMiss=()=>{
    miss.style.left=`${enemy.style.left}`
    miss.style.top=`${enemy.style.top}`
    miss.style.display="block"
    setTimeout(()=>{
        miss.style.display="none"
    },500)
}

//sponzors
openSponzors.onclick=()=>{
    if(sponzors.style.display=="none"){
        sponzors.style.display="block"
    }else{
        sponzors.style.display="none"
    }
}