let myApiUrl = 'https://61172e4230022f0017a05d4d.mockapi.io/posts'

let sectionEl = document.getElementById('section')
let titleInpEl = document.getElementById('title-inp')
let contentInpEl = document.getElementById('content-inp')
let postUserEl = document.getElementById('post-user')
let usernameTxtEl = document.getElementById('username-text')
let logOutBtnEl = document.getElementById('log-out-btn')
let signInBtnEl = document.getElementById('sign-in-btn')

let accountStatus = localStorage.getItem('account-status')

document.addEventListener('DOMContentLoaded', () => {
    if (accountStatus === 'signed in') {
        usernameTxtEl.style.display = 'inline'
        logOutBtnEl.style.display = 'inline'
        signInBtnEl.style.display = 'none'

        let retrievedAccount = localStorage.getItem('account')
        let accountData = JSON.parse(retrievedAccount)
        let username = accountData.username
        usernameTxtEl.innerText = 'User: ' + username

        logOutBtnEl.addEventListener('click', () => {
            localStorage.setItem('account-status', 'logged out')
            localStorage.removeItem('account')
            window.alert('logged out')
            location.reload()
        })
    } else {
        usernameTxtEl.style.display = 'none'
        logOutBtnEl.style.display = 'none'
        signInBtnEl.style.display = 'inline'
    }
})

async function getData() {
    const response = await fetch(myApiUrl)
    const data = await response.json()
    return data
}

async function postNewData(newData) {
    const response = await fetch(myApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    const data = await response.json()
}

async function updateData(id, newData) {
    const response = await fetch(myApiUrl + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    const data = await response.json()
}

async function renderPosts() {
    const postData = await getData()
    if (accountStatus == 'signed in') {
        let retrievedAccount = localStorage.getItem('account')
        let accountData = JSON.parse(retrievedAccount)
        let username = accountData.username

        sectionEl.innerHTML = `<button type="button" class="btn btn-dark" id="post-btn">Post</button>
        <div class="post" id="post-inp">
        <h3 class="post-title" id="title-inp" contenteditable="true">Write your title</h3>
        <h4 class="post-user" id="post-user">Posted by user ${username}</h4>
        <p class="post-content" id="content-inp" contenteditable="true">Write your post here!</p></div>`
        for (let i = postData.length -1; i >= 0; i--) {
            sectionEl.innerHTML += `
            <div class="post">
            <div class="vote-container">
            <img class="upvote-icon" src="/assets/up-arrow (1).png" alt="">
            <p class="vote-count">${postData[i].votes}</p>
            <img class="downvote-icon" src="/assets/down-arrow (1).png" alt=""></div>
            <h3 class="post-title">${postData[i].title}</h3>
            <h4 class="post-user">Posted by user ${postData[i].user}</h4>
            <p class="post-content">${postData[i].content}</p></div>`
        }
        let postBtnEl = document.getElementById('post-btn')
        postBtnEl.style.display = 'inline'
        postBtnEl.addEventListener('click', async () => {
            let contenteditables = document.querySelectorAll('[contenteditable]')
            let text1 = contenteditables[0].textContent
            let text2 = contenteditables[1].textContent
            await postNewData({
                id: postData.length,
                title: text1,
                content: text2,
                user: username
            })
            renderPosts()
        })
    } else {
        sectionEl.innerHTML = `<div class="post" id="post-inp">
        <h3 class="post-title" id="title-inp" contenteditable="false">Sign in first!</h3>
        <h4 class="post-user" id="post-user"></h4>
        <p class="post-content" id="content-inp">You must sign in to post and vote on other users' posts.</p></div>`
        for (let i = postData.length - 1; i >= 0; i--) {
            sectionEl.innerHTML += `<div class="post">
        <h3 class="post-title">${postData[i].title}</h3>
        <h4 class="post-user">Posted by user ${postData[i].user}</h4>
        <p class="post-content">${postData[i].content}</p></div>`
        }
    }
}

renderPosts()