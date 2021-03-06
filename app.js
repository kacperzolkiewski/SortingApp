const width = document.getElementById("width")
const number = document.getElementById("number")
const container = document.getElementById('container')
const button = document.querySelector('.sort')
const ascending = document.getElementById('ascending')
const descending = document.getElementById('descending')

function createColumn(order){
    const div = document.createElement('div')
    div.classList = 'column'
    const height = Math.floor(Math.random() * 400) + 1
    div.setAttribute('data-value', height)
    div.style.height =  height + 'px'
    div.style.width = width.value + 'px'
    div.style.order = order
    return div
}

function deleteColumns(){
    const columns = document.querySelectorAll('.column')
    columns.forEach((item) => {
        item.remove()
    })
}

async function sortColumns(sort){
    for(let i =0; i < container.children.length; i++){
        await sleep(400)
        const columns = document.querySelectorAll('.column')
        let order = columns[i].style.order
        sort(columns, i, order)
    } 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sortDescending(columns, num, order){
    let obj = findMax(num, columns)
    changeColumnsIndex(obj, columns, num, order)
}

function sortAscending(columns, num, order){
    let obj = findMin(num, columns)
    changeColumnsIndex(obj, columns, num, order)
}

function findMax(num, columns){
    let max = columns[num]
    let index = 0
    for(let i = num; i < columns.length; i++){
        if(parseInt(max.dataset.value) <= parseInt(columns[i].dataset.value)){
            max = columns[i]
            index = i
        }
    }
    return {max: max, index: index}
}

function findMin(num, columns){
    let min = columns[num]
    let index = 0
    for(let i = num; i < columns.length; i++){
        if(parseInt(min.dataset.value) >= parseInt(columns[i].dataset.value)){
            min = columns[i]
            index = i
        }
    }
    return {max: min, index: index}
}


function changeColumnsIndex(obj, columns, num, order){
    changeColumnsPlace(obj, columns, num, order)
    setTimeout(() => {
        if(obj.max !== columns[num]){
            columns[num].style.backgroundColor = 'black'
        }else {
            columns[num].style.backgroundColor = '#ff605f'
        }
        container.insertBefore(obj.max, columns[num])
        container.insertBefore(columns[num], columns[obj.index + 1])
    }, 400)
}


function changeColumnsPlace(obj, columns, num, order){
    obj.max.style.backgroundColor = '#ff605f'
    columns[num].style.backgroundColor = '#96d100'
    columns[num].style.order = obj.max.style.order
    obj.max.style.order = order
}

ascending.addEventListener('click', () => { 
    if(descending.checked) {
        descending.checked = false
    }
})

descending.addEventListener('click', () => { 
    if(ascending.checked) {
        ascending.checked = false
    }
})

width.addEventListener('input', (e) => {
    const columns = document.querySelectorAll('.column')
    document.querySelector('.width-value').innerHTML = e.target.value
    columns.forEach((item) => {
        item.style.width = `${e.target.value}px`
    })
})

number.addEventListener('input', (e) => {
    deleteColumns()
    document.querySelector('.number-value').innerHTML = e.target.value
    for(let i = 0; i < e.target.value; i++){
        container.appendChild(createColumn(i))
    }
})

button.addEventListener('click', () => {
    if(ascending.checked){
        sortColumns(sortAscending)
    }else{
        sortColumns(sortDescending)
    }
})




