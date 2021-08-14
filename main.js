AOS.init();

let myApiUrl = 'https://61172e4230022f0017a05d4d.mockapi.io'

let prdSelectorEl = document.getElementById('product-selector')

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

renderProducts('leg-products')