let counter = localStorage.getItem('counter') ? Number(localStorage.getItem('counter')) : 0
let counter_DOM = document.querySelector('#counter')
let increase_DOM = document.querySelector('#increase')
let decrease_DOM = document.querySelector('#decrease')

counter_DOM.innerHTML = counter

increase_DOM.addEventListener("click", clickEvent)
decrease_DOM.addEventListener("click", clickEvent)

function clickEvent() {
    this.id == "increase" ?  counter += 1 : counter -= 1
    localStorage.setItem('counter', counter)
    counter_DOM.innerHTML = counter
}