/*
-----------
Launch game
-----------
*/

const gameManager = new GameManager(element('#gameGridContainer'),element('.mainCharacter'),element('#endOfTheGame'))

const chooseCharacterSection = element('#chooseYourCharacter')
const playNowButton = element('#playNow')
const selector = element('.selector')
const characters = elements('.characters__character')

const changeCharacterButton = element('#changeCharacter')
const playAgain = element('#playAgain')

for (let i = 0; i < characters.length; i++) {
    characters[i].addEventListener(
        'click',
        function(){
            selector.style.left = 9 + ( i * 18)+"vh"
            let selectedElem = element(".characters__character.selected")
            characters[i].classList.add('selected')
            selectedElem.classList.remove('selected')
            gameManager.player.changeCharacter(characters[i].children[0].getAttribute("data-character"))
        }
    )
}

playNowButton.addEventListener('click',function (e) {
    e.preventDefault()
    gameManager.launchNewGame()
    chooseCharacterSection.style.top = "100%"
})
    
document.onkeypress = function (e) {
    console.log(e)
    if (gameManager.player.isAlive){
        keyPress(e.code)
    }
}

function keyPress(code){
    if (gameManager.player.isMoving){
        gameManager.waitingActions.push(code)
    } else {
        switch (code) {
            case "KeyW":
                hideHelp()
                gameManager.goTop()
                break
            case "KeyA":
                hideHelp()
                gameManager.goLeft()
                break
            case "KeyS":
                hideHelp()
                gameManager.goBottom()
                break
            case "KeyD":
                hideHelp()
                gameManager.goRight()
                break
        }
    }
}
function hideHelp(){
    element('#help').style.top = "-10vw"
}
let swipeDetector = new Swipe(element('#game'))
swipeDetector.onRight(gameManager.goRight)
swipeDetector.onDown(gameManager.goBottom)
swipeDetector.onLeft(gameManager.goLeft)
swipeDetector.onUp(gameManager.goTop)
swipeDetector.run()


changeCharacterButton.addEventListener('click',function (e) {
    e.preventDefault()
    gameManager.cleanGame()
    gameManager.mainTheme.pause()
    chooseCharacterSection.style.top = "0%"
})

playAgain.addEventListener('click',function (e) {
    e.preventDefault()
    gameManager.cleanGame()
    gameManager.launchNewGame()
})

setInterval(function () {
    gameManager.actualizeTimeBeforeDeath()
},250)