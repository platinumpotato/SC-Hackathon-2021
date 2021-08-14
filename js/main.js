AOS.init();

let myApiUrl = 'https://61172e4230022f0017a05d4d.mockapi.io'

let armsEl = document.getElementById('arms')
let legsEl = document.getElementById('legs')
let headEl = document.getElementById('head')
let othersEl = document.getElementById('other-body')
let usernameTxtEl = document.getElementById('username-text')
let logOutBtnEl = document.getElementById('log-out-btn')
let signInBtnEl = document.getElementById('sign-in-btn')

let accountStatus = localStorage.getItem('account-status')

document.addEventListener('DOMContentLoaded', () => {
    console.log('i run');
    if (accountStatus === 'signed in') {
        console.log('signed');
        usernameTxtEl.style.display = 'inline'
        logOutBtnEl.style.display = 'inline'
        signInBtnEl.style.display = 'none'

        let retrievedAccount = localStorage.getItem('account')
        let accountData = JSON.parse(retrievedAccount)
        let username = accountData.username
        usernameTxtEl.innerText = 'User: ' + username

        logOutBtnEl.addEventListener('click', ()=>{
            localStorage.setItem('account-status', 'logged out')
            localStorage.removeItem('account')
            window.alert('logged out')
            location.reload()
        })
    } else{
        usernameTxtEl.style.display = 'none'
        logOutBtnEl.style.display = 'none'
        signInBtnEl.style.display = 'inline'
    }
})

legsEl.addEventListener('click', () => {
    localStorage.setItem('body-part', 'leg')
    location.href = 'browse.html'
})