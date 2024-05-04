console.log('game js')

//Object of images link which will show the player.
let cards = {
    0: './resources/Cards Images/0.png',
    1: './resources/Cards Images/1.png',
    2: './resources/Cards Images/2.png',
    3: './resources/Cards Images/3.png',
    4: './resources/Cards Images/4.png',
    5: './resources/Cards Images/5.png',
    6: './resources/Cards Images/6.png',
    7: './resources/Cards Images/7.png',
    8: './resources/Cards Images/8.png',
    9: './resources/Cards Images/9.png',
    10: './resources/Cards Images/10.png',
    11: './resources/Cards Images/11.png',
}

//A blank array
let shuffledArr = [];

//Create for-loop for adding element of 2 pair numbers in random index.
for (let i = 0; i < 6; i++) {
    shuffledArr.splice(Math.floor(Math.random() * 6), 0, i) //Pushing 0 to 5 numbers in specific index.
    shuffledArr.splice(Math.floor(Math.random() * 6), 0, i)//Repeated for make the 2 pairs of same numbers.
}




//Selected the element which will display the images.
let gridItems = document.getElementsByClassName('gridItems')
let clickCount = 0;
let matchPair1 = 0;
let matchPair2 = 0;
let win = 0;
let loose = 0;
let idArr = []
let imgElementArr = [];
let elementArr = []
let moves = 0;
let misses = 0;
let matched = 0;
let movesElem = document.getElementById('moves')
let missElem = document.getElementById('misses')
let matchedElem = document.getElementById('matched')
let mainDisplay = document.getElementById('gridContainer')
let retryGame = document.getElementById('retryGame')
let retryGameBtn = document.getElementById('retryGameBtn')



//Function for display images.
let displayCards = () => {


    //Looping the selected element where will push the image tag.
    Array.from(gridItems).forEach((element, index) => {
        element.lastElementChild.innerHTML = `<img src="${cards[shuffledArr[index]]}"  alt="" id="${shuffledArr[index]}">`;




        element.addEventListener('click', () => { //Click Event listener in each  card div element.
            Array.from(gridItems).forEach((e) => { // Return looping to remove pointer events in card div element for player can click the elelment.
           
                e.classList.remove('pointer-events-none')
            })
            element.classList.add('pointer-events-none') //Added pointer events none in clicked element for player can't click on clicked element.
           
            clickCount++; // Increasing click count 
            let imgElement = element.lastElementChild.firstElementChild; // Taking image element from card div.
            let id = Number.parseInt(imgElement.id); //Storing id of image element which is selected.
            let firstElement = element.firstElementChild //Storing the first child element of card div.
            let lastElement = element.lastElementChild //Storing the last element child of card div.
            firstElement.classList.add('hidden') //Adding hidden class for flip the card and show the images element for pairing.
            lastElement.classList.remove('hidden') //Removing hidden class from image element.

            if (matchPair1 === 0 && clickCount === 1) { //Condition for first click.
                imgElementArr.push(imgElement) //Pushing first clikc image element in new imageElement Array.
                matchPair1 = id; //Storing first image id for match the pair.

            } else if (matchPair2 === 0 && clickCount === 2) { //Condition for Second click.
                imgElementArr.push(imgElement) //Pushing Second click image element in new imageElement Array.
                matchPair2 = id //Storing second image id for math the pair.
                if (matchPair1 === matchPair2) {  // Condition for check if card is pair or not.
                    setTimeout(() => {      //Settime our for hide the paired card.
                        for (let i = 0; i < imgElementArr.length; i++) {  //Loop for hide the paired card.
                            imgElementArr[i].parentNode.parentNode.classList.add('invisible') 
                        }
                        matched++; //Mathced score increase.
                        matchedElem.innerText = `Matched:${matched}` //Displaying the matched score.
                        imgElementArr = [] //reset imgElement Arr;
                        matchPair1 = 0; //Reset id 1
                        matchPair2 = 0; //Reset id 2
                        clickCount = 0  //Reset click count
                        retryGameFunc() //Retry game func called.
                    }, 500);
             
                } else {
                    setTimeout(() => {
                        for (let i = 0; i < imgElementArr.length; i++) {
                            imgElementArr[i].parentNode.classList.add('hidden')
                            imgElementArr[i].parentNode.parentNode.firstElementChild.classList.remove('hidden')
                            element.classList.remove('pointer-events-none')

                        }

                        matchPair1 = 0;
                        matchPair2 = 0;
                        imgElementArr=[]
                        clickCount=0
                        misses++
                        missElem.innerText = `Misses:${misses}`
                    }, 600);

                }
                moves++;
                movesElem.innerText=`Moves:${moves}`
              
            }
        
          






        })
    
    })



}
let retryGameFunc = ()=>{
    if(matched===6){
        mainDisplay.classList.add('hidden')
        retryGame.classList.remove('hidden')

    }else{
        console.log('Return game func called')
    }
}


retryGameBtn.addEventListener('click',()=>{
location.reload()
})



displayCards()