const regOrderEmail = document.getElementById('regOrderEmail')
const regOrderItem = document.getElementById('regOrderItem')
const smallOrderButton = document.getElementById('smallOrderButton')
const mediumOrderButton = document.getElementById('mediumOrderButton')
const largeOrderButton = document.getElementById('largeOrderButton')
const orderPriceDisplay = document.getElementById('orderPriceDisplay')
const submitButton = document.getElementById('submitButton')
const listSearchText = document.getElementById('listSearchText')
const listSearchButton = document.getElementById('listSearchButton')
const searchResultsList = document.getElementById('searchResultsList')
const siteURL = 'https://troubled-peaceful-hell.glitch.me/orders/'

let newOrderStats = {'email': '', 'type': '', 'size': '', 'price': 1}


function getRequest (searchEmail) {
    let request = new XMLHttpRequest()
    request.open('GET', `${siteURL}${searchEmail}`)
    request.addEventListener ('load', function () {
        let searchResults = JSON.parse(this.responseText)
        let listElements = ''
        if (Array.isArray(searchResults))
        {
            listElements = searchResults.map(function(result) {
                return `<div class="resultItem">
                <h3 class="resultEmail">${result.email}</h3>
                <h4>${result.type}</h4>
                <h5>${result.size} order</h5>
                <h5>${result.price}</h5>
                <button class="deleteButton">Delete order</button>
            </div>`  
            })
            searchResultsList.innerHTML = listElements.join('')
        }
        else {
            listElements =`<div class="resultItem">
            <h3 class="resultEmail">${searchResults.email}</h3>
            <h4>${searchResults.type}</h4>
            <h5>${searchResults.size} order</h5>
            <h5>${searchResults.price}</h5>
            <button class="deleteButton">Delete order</button>
        </div>` 
        searchResultsList.innerHTML = listElements
        }
        


        
        let resultList = searchResultsList.getElementsByClassName('deleteButton')
        for (let index = 0; index < resultList.length; index++) {
            const element = resultList[index];
            element.addEventListener('click', function() {
                let request = new XMLHttpRequest()
                request.open('DELETE', `${siteURL}${element.parentElement.getElementsByClassName('resultEmail')[0].innerHTML}`)
                request.send()
                getRequest('')
            })
            
        }  
    })
    request.send()
    
}

function postRequest(inputInfo) {
    let request = new XMLHttpRequest()
    request.open('POST', siteURL)
    request.setRequestHeader('Content-Type', 'application/json')
    request.addEventListener ('load', function () {
        console.log(this.responseText)
    })
    request.send(inputInfo)
}

smallOrderButton.addEventListener('click', function() {
    newOrderStats.size = 'Small'
    newOrderStats.price = 1.00
    orderPriceDisplay.innerHTML = `$ ${newOrderStats.price}`
})

mediumOrderButton.addEventListener('click', function () {
    newOrderStats.size = 'Medium'
    newOrderStats.price = 2.00
    orderPriceDisplay.innerHTML = `$ ${newOrderStats.price}`
})

largeOrderButton.addEventListener('click', function () {
    newOrderStats.size = 'Large'
    newOrderStats.price = 4.00
    orderPriceDisplay.innerHTML = `$ ${newOrderStats.price}`
})

submitButton.addEventListener('click', function () {
    newOrderStats.email = regOrderEmail.value
    newOrderStats.type = regOrderItem.value
    console.log(JSON.stringify(newOrderStats))
    postRequest(JSON.stringify(newOrderStats))
})

listSearchButton.addEventListener('click', function() {
    getRequest(listSearchText.value)
})

getRequest('')