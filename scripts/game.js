import { setBalanceField, animateOnce, changeBalance, randInt } from "./functions.js"

setBalanceField()
let balance = document.querySelector('.balance')
let main = document.querySelector('.animal.a_main')
let top = document.querySelector('.animal.a_top')
let bottom = document.querySelector('.animal.a_bottom')
let gameOverCont = document.querySelector('.game_over')

let animal = localStorage.getItem('chosen_race')
let bet = Number(localStorage.getItem('bet_race'))

let animalList = ['bird', 'hog', 'beaver']
animalList.splice(animalList.indexOf(animal), 1)

let winner
let freeze = false
let speed = false

document.querySelector('.freeze span').innerHTML = localStorage.getItem('freeze_race')
document.querySelector('.speed span').innerHTML = localStorage.getItem('speed_race')

document.querySelector('.game_over .bet img').src = document.querySelector('.control .bet img').src = '../png/' + animal + '.png'
main.src = '../png/' + animal + '.png'
main.dataset.animal = animal
top.src = '../png/' + animalList[0] + '.png'
top.dataset.animal = animalList[0]
bottom.src = '../png/' + animalList[1] + '.png'
bottom.dataset.animal = animalList[1]

for (let racer of [main, top, bottom]) {
    racer.style.right = '90%'
}

document.querySelector('.bonus.freeze span').innerHTML = localStorage.getItem('freeze_race')
document.querySelector('.bonus.speed span').innerHTML = localStorage.getItem('speed_race')

let mainRace = setInterval(() => {
    let step = speed ? randInt(15, 20) : randInt(5, 10)
    if (speed) { speed = false }

    if (Number(main.style.right.replace('%', '')) - step < 1) {
        main.style.right = '1%'
        if (!winner) {
            winner = main.dataset.animal
            console.log(winner)
        }
        clearInterval(mainRace)
    } else {
        main.style.right = Number(main.style.right.replace('%', '')) - step + '%'
    }
}, 1000);

for (let sideRacer of [top, bottom]) {
    let sideRace = setInterval(() => {
        let step = randInt(5, 10)

        if (Number(sideRacer.style.right.replace('%', '')) - step < 1) {
            sideRacer.style.right = '1%'
            if (!winner) {
                winner = sideRacer.dataset.animal
                console.log(winner)
            }
            clearInterval(sideRace)
        } else {
            if (!freeze) {
                sideRacer.style.right = Number(sideRacer.style.right.replace('%', '')) - step + '%'
            } else {
                setTimeout(() => {
                    freeze = false
                }, 50);
            }
        }
    }, 1000);
}

let checkWinner = setInterval(() => {

    if (winner) {
        gameOverCont.querySelector('.button').innerHTML = winner == animal ? '+' + bet * 2 : '-' + bet
        if (winner == animal) {
            changeBalance(bet * 2)
            animateOnce('.balance')
        }
        gameOverCont.querySelector('.back_animal img').src = '../png/' + winner + '.png'
        gameOverCont.style.left = '50%'

        clearInterval(checkWinner)
    }

}, 1500);

document.querySelector('.freeze').onclick = () => {
    if (document.querySelector('.freeze span').innerHTML == 0) { return }

    freeze = true
    localStorage.setItem('freeze_race', Number(localStorage.getItem('freeze_race')) - 1)
    document.querySelector('.freeze span').innerHTML = localStorage.getItem('freeze_race')
}

document.querySelector('.speed').onclick = () => {
    if (document.querySelector('.speed span').innerHTML == 0) { return }

    speed = true
    localStorage.setItem('speed_race', Number(localStorage.getItem('speed_race')) - 1)
    document.querySelector('.speed span').innerHTML = localStorage.getItem('speed_race')
}