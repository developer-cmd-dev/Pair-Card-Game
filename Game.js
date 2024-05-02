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




        element.addEventListener('click', () => {
            Array.from(gridItems).forEach((e) => {
           
                e.classList.remove('pointer-events-none')
                e.classList.remove('cursor-not-allowed')
            })
            element.classList.add('pointer-events-none')
            element.classList.add('cursor-not-allowed')
           
            clickCount++;
            let imgElement = element.lastElementChild.firstElementChild;
            let id = Number.parseInt(imgElement.id);
            let firstElement = element.firstElementChild
            let lastElement = element.lastElementChild
            firstElement.classList.add('hidden')
            lastElement.classList.remove('hidden')

            if (matchPair1 === 0 && clickCount === 1) {
                imgElementArr.push(imgElement)
                matchPair1 = id;

            } else if (matchPair2 === 0 && clickCount === 2) {
                imgElementArr.push(imgElement)
                matchPair2 = id
                if (matchPair1 === matchPair2) {
                    console.log('player win')
                    setTimeout(() => {
                        for (let i = 0; i < imgElementArr.length; i++) {
                            imgElementArr[i].parentNode.parentNode.classList.add('invisible')
                        }
                        matched++;
                        matchedElem.innerText = `Matched:${matched}`
                        imgElementArr = []
                        matchPair1 = 0;
                        matchPair2 = 0; 
                        clickCount = 0
                        retryGameFunc()
                        console.log(matched,"This is mathced score")
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