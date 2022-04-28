const Name = prompt("Lütfen adınızı giriniz.")
document.querySelector("#myName").innerText = Name.toUpperCase()
let myClock = document.getElementById("myClock")
const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]

function showTime() {
    const date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    let day = days[date.getDay()]
    h = (h < 10) ? "0" + h : h
    m = (m < 10) ? "0" + m : m
    s = (s < 10) ? "0" + s : s
    const time = h + ":" + m + ":" + s + " " + day
    myClock.textContent = time
    setTimeout(showTime, 1000)

}
showTime()