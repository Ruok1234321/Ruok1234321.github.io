let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
let currentLang = "en";

const languageBtn = document.querySelector("#languageBtn");
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
];
const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
]
const locations = [
    {
        name: "townSquare",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "killMonster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. &#x2620;"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    },
    {
        name: "easterEgg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [pickTwo, pickEight, easterEgg],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

let currentlocation = locations[0];


const translations = {
    en: {
        ui: {
            xp: "XP",
            health: "Health",
            gold: "Gold",
            monsterName: "Monster Name"
        },
        monsters: {
            slime: "slime",
            "fanged beast": "fanged beast",
            dragon: "dragon"
        },
        locations: {
            townSquare: {
                text: 'You are in the town square. You see a sign that says \"Store\".',
                buttons: ["Go to store", "Go to cave", "Fight dragon"]
            },
            store: {
                text: "You enter the store.",
                buttons: ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"]
            },
            cave: {
                text: "You enter the cave. You see some monsters.",
                buttons: ["Fight slime", "Fight fanged beast", "Go to town square"]
            },
            fight: {
                text: "You are fighting a monster.",
                buttons: ["Attack", "Dodge", "Run"]
            },
            killMonster: { 
                text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
                buttons: ["Go to town square", "Go to town square", "Go to town square"]
            },
            lose: {
                text: "You die. &#x2620;",
                buttons: ["REPLAY?", "REPLAY?", "REPLAY?"]
            },
            win: { 
                text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
                buttons: ["REPLAY?", "REPLAY?", "REPLAY?"]
            },
            easterEgg: {
                text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
                buttons: ["2", "8", "Go to town square?"],
            },
        },
        battle: {
            attack: "You attack it with your {weapon}.",
            miss: " You miss.",
            dodge: "You dodge the attack from the {monster}",
            weaponBreak: "Your {weapon} breaks.",
            monsterAttack: "The {monster} attacks."
        },
        store: {
            noGoldHealth: "You do not have enough gold to buy health.",
            noGoldWeapon: "You do not have enough gold to buy a weapon.",
            maxWeapon: "You already have the most powerful weapon!",
            dontSellLast: "Don't sell your only weapon!",
            sellWeapon:"Sell weapon for 15 gold",
            newWeapon:"You now have a {newWeapon}.",
            inventoryStat:" In your inventory you have: {inventory}",
            currentWeapon:"You sold a {currentWeapon}.",
        },
        welcome: {
            text:"Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Where do you want to go? Use the buttons above."
        },
        guess:{
            pick:"You picked {guess}. Here are the random numbers:\n",
            right:"Right! You win 20 gold!",
            wrong:"Wrong! You lose 10 health.",
        }
    },
    zh: {
        ui: {
            xp: "经验值",
            health: "生命值",
            gold: "金币",
            monsterName: "怪兽名字"
        },
        monsters: {
            slime: "史莱姆",
            "fanged beast": "牙牙兽", 
            dragon: "巨龙"
        },
        locations: {
            townSquare: {
                text: '你在城镇广场。你看到一个写着“商店”的标志。',
                buttons: ["去商店", "去洞穴", "打败巨龙"]
            },
            store: {
                text: "你进入商店。",
                buttons: ["购买10点生命值（10金币）", "购买武器（30金币）", "去城镇广场"]
            },
            cave: {
                text: "你进入洞穴。你看到一些怪物。",
                buttons: ["打败史莱姆", "打败牙牙", "去城镇广场"]
            },
            fight: {
                text: "你正在战斗一个怪物。",
                buttons: ["攻击", "闪避", "逃跑"]
            },
            killMonster: {
                text: '怪物叫道“啊啊啊”它死了。你获得了经验值和金币。',
                buttons: ["去城镇广场", "去城镇广场", "去城镇广场"]
            },
            lose: {
                text: "你死了。 &#x2620;",
                buttons: ["重新开始？", "重新开始？", "重新开始？"]
            },
            win: {
                text: "你打败了巨龙！你赢了游戏！ &#x1F389;",
                buttons: ["重新开始？", "重新开始？", "重新开始？"]
            },
            easterEgg: {
                text: "你发现了一个秘密游戏。在游戏上方输入一个数字。十个数字将会在0到10之间随机生成。如果你选择的数字和随机生成的数字相同，你就获胜了！",
                buttons: ["2", "8", "去城镇广场？"],
            },
        },
        battle: {
            attack: "你用你的{weapon}攻击它。",
            miss: "你闪避了攻击。",
            dodge: "你闪避了{monster}的攻击。",
            weaponBreak: "你的{weapon}坏掉了。",
            monsterAttack: "{monster}攻击你。"
        },
        store: {
            noGoldHealth: "你没有足够的金币来买生命值。",
            noGoldWeapon: "你没有足够的金币来买武器。",
            maxWeapon: "你已经拥有了最好的武器！",
            dontSellLast: "别卖你的唯一武器！",
            sellWeapon:"卖武器（15金币）",
            newWeapon:"你现在拥有了{newWeapon}。",
            inventoryStat:" 你拥有：{inventory}",
            currentWeapon:"你卖了{currentWeapon}。",
        },
        welcome: {
            text:"欢迎来到《龙之驱逐者》。你必须击败阻挡人们离开城镇的恶龙。你现在身处城镇广场。你想去哪里？请使用上方的按钮进行选择。"
        },
        guess:{
            pick:"你选择了{guess}。以下是随机数：\n",
            right:"正确！你获得了20金币！",
            wrong:"错误！你损失了10点生命值。",
        }
    },
}

let lang = translations[currentLang];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
languageBtn.onclick = changeLanguage;
// 添加初始语言设置
document.querySelector('#text').innerHTML = translations[currentLang].welcome.text;
languageBtn.innerText = "中"; // 初始显示中文按钮

function changeLanguage() {
    currentLang = currentLang === "en" ? "zh" : "en";
    // 更新所有动态文本
    lang = translations[currentLang]
    update(locations.find(loc => loc === currentlocation)); // 强制刷新当前场景
    // 更新欢迎文本
    document.querySelector('#text').innerHTML = translations[currentLang].welcome.text;
    // 更新按钮状态
    languageBtn.innerText = currentLang === "en" ? "中" : "EN";
}

function update(location) {
    monsterStats.style.display = "none";
    const locKey = location.name;
    console.log(lang);
    button1.innerText = lang.locations[locKey].buttons[0];
    button2.innerText = lang.locations[locKey].buttons[1];
    button3.innerText = lang.locations[locKey].buttons[2];
    console.log(button1.innerText);
    console.log(button2.innerText);
    console.log(button3.innerText);
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerHTML = lang.locations[locKey].text;
    document.querySelectorAll('.stat').forEach(state => {
        const statKey = state.dataset.stat;
        let value;
        if (statKey === "xp") value = xp;
        else if (statKey === "health") value = health;
        else if (statKey === "gold") value = gold;
        if (statKey === "monsterName") value = null;
        else return; // 跳过不需要处理的statKey
    
        // 更新标签翻译
        const label = state.querySelector('.stat-label');
        if (label) {
            label.innerText = lang.ui[statKey] + ":";
        }
    
        // 更新数值部分
        if (value !== null) {
            const valueElement = state.querySelector('strong span');
            if (valueElement) {
                valueElement.innerText = value;
            }
        }
    });

}

function goTown() {
    update(locations[0]);
    currentlocation = locations[0];
}

function goStore() {
    update(locations[1]);
    currentlocation = locations[1];
}

function goCave() {
    update(locations[2]);
    currentlocation = locations[2];
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        update(currentlocation);
    } else {
        text.innerText = lang.store.noGoldHealth;
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            update(currentlocation);
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = lang.store.newWeapon.replace("{newWeapon}", newWeapon);
            inventory.push(newWeapon);
            text.innerText += lang.store.inventoryStat.replace("{inventory}", inventory);
        } else {
            text.innerText = lang.store.noGoldWeapon;
        }
    } else {
        text.innerText = lang.store.maxWeapon;
        button2.innerText = lang.store.sellWeapon;
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = lang.store.currentWeapon.replace("{currentWeapon}", currentWeapon);
        text.innerText += lang.store.inventoryStat.replace("{inventory}", inventory);
        update(currentlocation);
    } else {
        text.innerText = lang.store.dontSellLast;
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight() {
    update(locations[3]);
    currentlocation = locations[3];
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block"; 
    // 使用本地化后的怪物名称
    document.getElementById('monsterName').innerHTML = lang.monsters[monsters[fighting].name];
    // 绑定动态血量显示
    monsterHealthText.innerText = monsterHealth;
    console.log("当前语言:", currentLang);
    console.log("怪物key:", monsters[fighting].name);
    console.log("翻译结果:", lang.monsters[monsters[fighting].name]);    console.log("当前语言:", currentLang);
}

function attack() {
    text.innerText = lang.battle.monsterAttack.replace("{monster}",monsters[fighting].name);
    text.innerText += lang.battle.attack.replace("{weapon}",weapons[currentWeapon].name);
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    } else {
        text.innerText += lang.battle.miss;
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
        } else {
            defeatMonster();
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += lang.battle.weaponBreak.replace("{weapon}",inventory.pop());
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = lang.battle.dodge.replace("{monster}",monsters[fighting].name);
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
    currentlocation = locations[4];
    update(currentlocation);
}

function lose() {
    update(locations[5]);
    currentlocation = locations[5];
}

function winGame() {
    update(locations[6]);
    currentlocation = locations[6];
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg() {
    update(locations[7]);
    currentlocation = locations[7];
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = lang.guess.pick.replace({guess},guess);
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
        text.innerText += lang.guess.right;
        gold += 20;
        goldText.innerText = gold;
        update(currentlocation);
    } else {
        text.innerText += lang.guess.wrong;
        health -= 10;
        healthText.innerText = health;
        update(currentlocation);
        if (health <= 0) {
            lose();
        }
    }
}