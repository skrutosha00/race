import { changeBalance, setBalanceField } from "./functions.js"

if (!localStorage.getItem('balance_race')) {
    localStorage.setItem('balance_race', 7500)
}

if (!localStorage.getItem('speed_race')) {
    localStorage.setItem('speed_race', 0)
}

if (!localStorage.getItem('freeze_race')) {
    localStorage.setItem('freeze_race', 0)
}

localStorage.setItem('chosen_race', 'beaver')

let betAmount = document.querySelector('.bet_amount')

setBalanceField()
let balance = document.querySelector('.balance')

if (localStorage.getItem('bet_race')) {
    if (Number(balance.innerHTML) <= Number(localStorage.getItem('bet_race'))) {
        betAmount.innerHTML = balance.innerHTML
    } else {
        betAmount.innerHTML = localStorage.getItem('bet_race')
    }
}

for (let animal of document.querySelectorAll('.back_animal')) {
    animal.onclick = () => {
        localStorage.setItem('chosen_race', animal.dataset.animal)
        for (let a of document.querySelectorAll('.back_animal')) {
            a.classList.remove('chosen')
        }
        animal.classList.add('chosen')
    }
}

document.querySelector('.minus').onclick = () => {
    if (!Number(betAmount.innerHTML)) { return }
    betAmount.innerHTML = Number(betAmount.innerHTML) - 50
}

document.querySelector('.plus').onclick = () => {
    if (Number(betAmount.innerHTML) + 50 > Number(balance.innerHTML)) { return }
    betAmount.innerHTML = Number(betAmount.innerHTML) + 50
}

document.querySelector('.min').onclick = () => {
    betAmount.innerHTML = 0
}

document.querySelector('.max').onclick = () => {
    betAmount.innerHTML = balance.innerHTML
}

document.querySelector('.play').onclick = () => {
    changeBalance(-Number(betAmount.innerHTML))
    localStorage.setItem('bet_race', betAmount.innerHTML)
}