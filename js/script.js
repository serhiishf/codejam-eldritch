import ancientsData from "../data/ancients.js";
import difficulties from "../data/difficulties.js";
import blueCardsArr from "../data/mythicCards/blue/index.js";
import brownCardsArr from "../data/mythicCards/brown/index.js";
import greenCardsArr from "../data/mythicCards/green/index.js";

const ancientsDoc = document.querySelectorAll('.characters__item');
const startGameDoc = document.querySelector('.control__btn');
const deskDoc = document.querySelector('.game__deck');

let ancientActive = '';
let difficultiesActive = '';
let firstStage, secondStage, thirdStage; 
let allStage = {};

const arrMythicGreenPriority = [];
const arrMythicBrownPriority = [];
const arrMythicBluePriority = [];
const arrMythicGreenRegular = [];
const arrMythicBrownRegular = [];
const arrMythicBlueRegular = [];

let arrsForGame = {
}

const arrStage1 = [];
const arrStage2 = [];
const arrStage3 = [];



//----Set ancient
ancientsDoc.forEach((item) => {
    item.addEventListener('click', (event) => {
        disableInvisibleElem();
        ancientsDoc.forEach((elem) => {elem.classList.remove('characters__item_active')})
        item.classList.add('characters__item_active');
        if(item === document.querySelector('.characters__azathoth')){
            ancientActive = 'azathoth';
            console.log(1)
        }
        else if(item === document.querySelector('.characters__cthulhu')){
            ancientActive = 'cthulhu';
        }
        else if(item === document.querySelector('.characters__iogSothoth')){
            ancientActive = 'iogSothoth';
        }
        else if(item === document.querySelector('.characters__shubNiggurath')){
            ancientActive = 'shubNiggurath';
        }
        console.log(ancientActive + 'AncientActive')
        showStartBtn();
        getAllColor();
    })
})

//----Set dificulties

const difButtonsDoc = document.querySelectorAll('.difficulties__btn');

difButtonsDoc.forEach((item) => {
    item.addEventListener('click', ()=>{
        disableInvisibleElem();
        difButtonsDoc.forEach((elem) => {
            elem.classList.remove('btn_active');
        })
        item.classList.add('btn_active');
        
        if(item === document.querySelector('.difficulties__easiest')){
            difficultiesActive = 'easiest';
        }
        else if(item === document.querySelector('.difficulties__easy')){
            difficultiesActive = 'easy';
        }
        else if(item === document.querySelector('.difficulties__normal')){
            difficultiesActive = 'normal';
        }
        else if(item === document.querySelector('.difficulties__hard')){
            difficultiesActive = 'hard';
        }
        else if(item === document.querySelector('.difficulties__hardcore')){
            difficultiesActive = 'hardcore';
        }
        //setMythicForDificult();
        //console.log(difficultiesActive)
        showStartBtn();
        
    })
})

//----Start game

startGameDoc.addEventListener('click', ()=>{
    if(ancientActive != '' && difficultiesActive != ''){
        setMythicForDificult();
        setFinishZero();
        setArrsForGame(arrMythicBlueRegular, arrMythicBluePriority, arrsForGame.blue, allStage.blueCards);
        setArrsForGame(arrMythicBrownRegular, arrMythicBrownPriority, arrsForGame.brown, allStage.brownCards);
        setArrsForGame(arrMythicGreenRegular, arrMythicGreenPriority, arrsForGame.green, allStage.greenCards);
        console.log(arrsForGame);

        setArrsForStage(arrsForGame, firstStage, arrStage1);
        setArrsForStage(arrsForGame, secondStage, arrStage2);
        setArrsForStage(arrsForGame, thirdStage, arrStage3);

        showInvisibleElem();
        startGameDoc.classList.add('control__btn_hidden');
        console.log(arrStage1);
        console.log(arrStage2);
        console.log(arrStage3);
    }
})


function showStartBtn(){
    if(ancientActive != '' && difficultiesActive != ''){
        startGameDoc.classList.remove('control__btn_hidden');
    }
    
}


//----Get All colour

function getAllColor(){
    ancientsData.forEach((item) => {
        if(item.id === ancientActive){
            firstStage = item.firstStage;
            secondStage = item.secondStage;
            thirdStage = item.thirdStage;


            allStage.greenCards = firstStage.greenCards + secondStage.greenCards + thirdStage.greenCards;
            allStage.blueCards = firstStage.blueCards + secondStage.blueCards + thirdStage.blueCards;
            allStage.brownCards = firstStage.brownCards + secondStage.brownCards + thirdStage.brownCards;

            console.log(allStage);
        }
    })
}


/*----Array with mythic cards ------------------------------ */


function setMythicForDificult(){  
    
    let priority = false; 
    let regular = 'normal';
    let additional = 'easy';
    let additional2 = 'hard';
    setArrZero();
    if(difficultiesActive === 'easiest'){
        priority = 'easy';
        separateCards(blueCardsArr, priority, regular);
        separateCards(brownCardsArr, priority, regular);
        separateCards(greenCardsArr, priority, regular);
    }
    else if(difficultiesActive === 'easy'){
        additional2 = false;
        separateCards(blueCardsArr, priority, regular, additional);
        separateCards(brownCardsArr, priority, regular, additional);
        separateCards(greenCardsArr, priority, regular, additional);
    }
    else if(difficultiesActive === 'normal'){
        separateCards(blueCardsArr, priority, regular, additional, additional2);
        separateCards(brownCardsArr, priority, regular, additional, additional2);
        separateCards(greenCardsArr, priority, regular, additional, additional2);
    }
    else if(difficultiesActive === 'hard'){
        additional = false;
        separateCards(blueCardsArr, priority, regular, additional, additional2);
        separateCards(brownCardsArr, priority, regular, additional, additional2);
        separateCards(greenCardsArr, priority, regular, additional, additional2);
    }
    else if(difficultiesActive === 'hardcore') {
        priority = 'hard';
        separateCards(blueCardsArr, priority, regular);
        separateCards(brownCardsArr, priority, regular);
        separateCards(greenCardsArr, priority, regular);
    }

    console.log(arrMythicGreenPriority);
    console.log(arrMythicGreenRegular);
    console.log(arrMythicBrownPriority);
    console.log(arrMythicBrownRegular);
    console.log(arrMythicBluePriority);
    console.log(arrMythicBlueRegular);
}

function separateCards(rawArr, priority, regular, additional, additional2) {

    
    rawArr.forEach((item) => {
        if(item.color === 'green'){
            if(item.difficulty === priority){
                arrMythicGreenPriority.push(item);
            }
            else if(item.difficulty === regular || item.difficulty === additional || item.difficulty === additional2){
                arrMythicGreenRegular.push(item);
            }
        }
        else if(item.color === 'brown'){
            if(item.difficulty === priority){
                arrMythicBrownPriority.push(item);
            }
            else if(item.difficulty === regular || item.difficulty === additional || item.difficulty === additional2){
                arrMythicBrownPriority.push(item);
            }
        }
        else if(item.color === 'blue'){
            if(item.difficulty === priority){
                arrMythicBluePriority.push(item);
            }
            else if(item.difficulty === regular || item.difficulty === additional || item.difficulty === additional2){
                arrMythicBlueRegular.push(item);
            }
        }
    })
    

}

function setArrZero(){
    arrMythicGreenPriority.length = 0;
    arrMythicBrownPriority.length = 0;
    arrMythicBluePriority.length = 0;
    arrMythicGreenRegular.length = 0;
    arrMythicBrownRegular.length = 0;
    arrMythicBlueRegular.length = 0; 
    setFinishZero();
}

function setFinishZero(){
    arrsForGame = {
        brown: [],
        blue: [],
        green: [],
    }
    arrStage1.length = 0;
    arrStage2.length = 0;
    arrStage3.length = 0;
}

console.log(ancientsData);


//---- Arrays for game

function setArrsForGame(reg, prt, arrFinish, maxCounty){
    let i = 0;
    shuffle(reg);
    shuffle(prt);

    while(prt.length != 0 && i < maxCounty){
        arrFinish.push(prt.pop());
        i++;
    }
    while(reg.length != 0 && i < maxCounty){
        arrFinish.push(reg.pop());
        i++;
    }
    


    
}

function setArrsForStage(arrFinish, stageInfo, arrStage) {
    for(let i = 0; i < stageInfo.greenCards; i++){
        arrStage.push(arrFinish.green.pop());
    }
    for(let i = 0; i < stageInfo.brownCards; i++){
        arrStage.push(arrFinish.brown.pop());
    }
    for(let i = 0; i < stageInfo.blueCards; i++){
        arrStage.push(arrFinish.blue.pop());
    }
    shuffle(arrStage);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    //console.log(arr);
}



/**----Show cards------------------------------------ */
deskDoc.addEventListener('click', showCards)

function showInvisibleElem(){
    document.querySelector('.game__deck').classList.remove('game__deck_off');
    document.querySelector('.game__visible-deck').classList.remove('game__visible-deck_off');
    document.querySelector('.game__counter').classList.remove('game__counter_off');
}
function disableInvisibleElem(){
    document.querySelector('.game__deck').classList.add('game__deck_off');
    document.querySelector('.game__visible-deck').classList.add('game__visible-deck_off');
    document.querySelector('.game__counter').classList.add('game__counter_off');
    document.querySelector('.game__visible-deck').innerHTML = ``;
    document.querySelector('.chapter__block1').innerHTML = '';
    document.querySelector('.chapter__block2').innerHTML = '';
    document.querySelector('.chapter__block3').innerHTML = '';
}

function showCards(){
    let temp;
    let div = document.createElement('div');
    if(arrStage1.length > 0){
        temp = arrStage1.pop();
        insertRouteHtml(temp);
        div.className = `chapter__${temp.color} chapter__sub-counter`;
        document.querySelector('.chapter__block1').append(div);
    }
    else if(arrStage2.length > 0){
        temp = arrStage2.pop();
        insertRouteHtml(temp);
        div.className = `chapter__${temp.color} chapter__sub-counter`;
        document.querySelector('.chapter__block2').append(div);
    }
    else if(arrStage3.length > 0){
        temp = arrStage3.pop();
        insertRouteHtml(temp);
        div.className = `chapter__${temp.color} chapter__sub-counter`;
        document.querySelector('.chapter__block3').append(div);
        if(arrStage3.length === 0){
            document.querySelector('.game__deck').classList.add('game__deck_off');
        }
    }
}


function insertRouteHtml(item){
    
    document.querySelector('.game__visible-deck').innerHTML = `<img class="game__img" src="assets/MythicCards/${item.color}/${item.cardFace}" alt="">`;
}