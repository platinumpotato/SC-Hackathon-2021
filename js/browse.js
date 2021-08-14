AOS.init();

let myApiUrl = 'https://61172e4230022f0017a05d4d.mockapi.io'

let prdSelectorEl = document.getElementById('product-selector')
let retrievedBodyPart = localStorage.getItem('body-part')
let productType = retrievedBodyPart + '-products'
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

async function getData(field){
    const response = await fetch(myApiUrl + '/' + field)
    const data = await response.json()
    return data
}

async function renderProducts(field){
    const prdData = await getData(field)
    console.log(prdData);
    prdSelectorEl.innerHTML = ''
    for(let i = 0; i<prdData.length; i++){
        prdSelectorEl.innerHTML += `<div class="product">
        <h3 class="product-name txt-center">${prdData[i].name}</h3>
        <a href="${prdData[i].link}"><img class="product-img" src="${prdData[i].img}" alt="pr 1 img"></a>
        <p class="product-desc txt-center">${prdData[i].desc}</p></div>`
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    renderProducts(productType)
})