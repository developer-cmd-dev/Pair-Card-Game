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
let arr = [];

//Create for-loop for adding element of 2 pair numbers in random index.
for (let i = 0; i < 6; i++) {
    arr.splice(Math.floor(Math.random() * 6), 0, i) //Pushing 0 to 5 numbers in specific index.
    arr.splice(Math.floor(Math.random() * 6), 0, i)//Repeated for make the 2 pairs of same numbers.
}




//Selected the element which will display the images.
let gridItems = document.getElementsByClassName('gridItems')


let clickCount = 0;
let matchPair1=0;
let matchPair2=0;
let win = 0;
let loose = 0;
let idArr = []
let imgElementArr = [];

//Function for display images.
let displayCards = () => {

    //Looping the selected element where will push the image tag.
    Array.from(gridItems).forEach((element, index) => {
        element.lastElementChild.innerHTML = `<img src="${cards[arr[index]]}"  alt="" id="${arr[index]}">`;
        element.firstElementChild.classList.add('hidden')
        element.lastElementChild.classList.remove('hidden')

        element.addEventListener('click', (e) => {
            clickCount++;
            let imgElement = element.lastElementChild.firstElementChild;
         
            let id = Number.parseInt( imgElement.id);
            let firstElement = element.firstElementChild
            let lastElement = element.lastElementChild
            // firstElement.classList.remove('hidden')
            // lastElement.classList.add('hidden')
            
            if(matchPair1 === 0 && clickCount === 1){
                imgElementArr.push(imgElement)
                matchPair1= id;
            }else if(matchPair2 === 0 && clickCount === 2){
                imgElementArr.push(imgElement)
                matchPair2 = id
                if(matchPair1 === matchPair2 ){
                    console.log('player win')
                    for(let i=0;i<imgElementArr.length;i++){
                        console.log(imgElementArr)
                        imgElementArr[i].parentNode.parentNode.classList.add('hidden')
                    }
                    imgElementArr=[]
                    matchPair1=0;
                    matchPair2=0;
                    console.log(matchPair1,matchPair2)
                    clickCount=0
                }
                
            } else if(clickCount === 3){
                for(let i=0;i<imgElementArr.length;i++){
                    imgElementArr[i].parentNode.classList.add('hidden')
                    imgElementArr[i].parentNode.parentNode.firstElementChild.classList.remove('hidden')
                    console.log("Clicked 3 times")
                   
                }
                matchPair1=0;
                matchPair2 = 0;
                matchPair1 = id
                imgElementArr=[]
                console.log(imgElementArr,"reset ing arr")
                imgElementArr.push(imgElement)
                clickCount = 0; 
                clickCount++
                
                console.log(matchPair1,matchPair2,imgElementArr,"updated img arr") 
            }
            console.log("new match pair" , matchPair1,matchPair2)
            





            })








     

    })
}

displayCards()