let myapiUrl = "https://61172e4230022f0017a05d4d.mockapi.io/users"

let usernameInpEl = document.getElementById('username-inp')
let passwordInpEl = document.getElementById('password-inp')
let signInBtn = document.getElementById('sign-in-btn')
let signUpChangeEL = document.getElementById('sign-up-changer')
let signInChangeEl = document.getElementById('sign-in-changer')
let confirmPassInpEl = document.getElementById('confirm-pass-inp')
let titleEl = document.getElementById('title')
let signUpInTextEl = document.getElementById('sign-up-in-text')

let webStatus = 'signIn'

signInChangeEl.style.display = 'none'

async function getData() {
    const response = await fetch(myapiUrl)
    const data = response.json()
    return data
}

async function postData(newData) {
    const response = await fetch(myapiUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    const data = await response.json()
}

signInBtn.addEventListener('click', async () => {
    const accountData = await getData()
    if (webStatus == 'signIn') {
        for (let i = 0; i < accountData.length; i++) {
            if (usernameInpEl.value == accountData[i].username && passwordInpEl.value == accountData[i].password) {
                window.alert('login success')
                localStorage.setItem('account', JSON.stringify(accountData[i]))
                localStorage.setItem('account-status', 'signed in')
                history.back()
                break
            } else {
                window.alert('unsuccessul')
            }
        }
    } else if (webStatus == 'signUp') {
        if (usernameInpEl.value != '' && passwordInpEl.value != ''){
            for (let i=0; i < accountData.length; i++){
                if(usernameInpEl.value === accountData[i].username){
                    window.alert("username already exists")
                } 
            }
            if(passwordInpEl.value === confirmPassInpEl.value){
                postData({
                    id: accountData.length,
                    username: usernameInpEl.value,
                    password: passwordInpEl.value
                })
                window.alert('account created')
                changeIntoSignIn()
            }
            else{
                window.alert('pls enter same passwords')
            }
        }
    }
})

signUpChangeEL.addEventListener('click', () => {
    confirmPassInpEl.style.display = 'block'
    titleEl.innerText = 'Sign up'
    signInBtn.innerText = 'Sign up'
    webStatus = 'signUp'
    signInChangeEl.style.display = 'inline'
    signUpChangeEL.style.display = 'none'
    signInChangeEl.addEventListener('click', changeIntoSignIn)
})

function changeIntoSignIn() {
    confirmPassInpEl.style.display = 'none'
    titleEl.innerText = 'Sign in'
    signInBtn.innerText = 'Sign in'
    webStatus = 'signIn'
    signInChangeEl.style.display = 'none'
    signUpChangeEL.style.display = 'inline'
}