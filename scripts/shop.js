import { setBalanceField, animateOnce, changeBalance } from "./functions.js"

setBalanceField()
let balance = document.querySelector('.balance')

document.querySelector('.bonus.freeze span').innerHTML = localStorage.getItem('freeze_race')
document.querySelector('.bonus.speed span').innerHTML = localStorage.getItem('speed_race')

for (let button of document.querySelectorAll('.button')) {
    button.onclick = () => {
        if (Number(balance.innerHTML) < 5000) {
            animateOnce('.balance')
            return
        } else {
            changeBalance(-5000)
            localStorage.setItem(button.dataset.bonus + '_race', Number(localStorage.getItem(button.dataset.bonus + '_race')) + 1)
            document.querySelector('.bonus.' + button.dataset.bonus + ' span').innerHTML = localStorage.getItem(button.dataset.bonus + '_race')
        }
    }
}
