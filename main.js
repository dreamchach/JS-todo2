import { async } from "q"
import { json,seeListTodo,addId,addTitle,addCreatedAt,addUpdatedAt,createTodo,changeTodo,deleteTodo } from "./apis.js"

// 1. 목록조회가 가장 먼저 뜨게 함 
function makeItem (itemName, create, update, itemid, done=false){
    const itemEl = document.createElement("div")
    itemEl.classList.add("item")
    const checkEl = document.createElement("input")
    checkEl.setAttribute("type","checkbox")
    checkEl.classList.add("check")
    if(done === true){
        checkEl.setAttribute("checked", true)
        itemEl.classList.add("checked")
    }
    const nameEl = document.createElement("div")
    nameEl.classList.add("name")
    nameEl.classList.add(`${itemid}`)
    nameEl.append(checkEl)
    nameEl.append(`${itemName}`)
    const createEl = document.createElement("div")
    createEl.classList.add("create")
    const createListEl = document.createElement("span")
    createListEl.classList.add("createlist")
    createListEl.append(`${create}`)
    createEl.append("생성일 : ", createListEl)
    const updateEl = document.createElement("div")
    updateEl.classList.add("update")
    const updateListEl = document.createElement("span")
    updateListEl.classList.add("updatelist")
    updateListEl.append(`${update}`)
    updateEl.append("수정일 : ", updateListEl)
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete")
    deleteBtn.classList.add(`${itemid}`)
    itemEl.append(nameEl, createEl, updateEl, deleteBtn)
    mainEl.append(itemEl)
}
const mainEl=document.querySelector("main .inner")

//4. 목록 수정하기

function click (event){
    if(event.target.classList[0]!= "name"){return}
    else{
        event.target.setAttribute("contenteditable", true)
    }
}
async function blur(event){
    const a = event.target.classList[1]
    const b = event.target.textContent
    if(event.target.classList[0]!= "name"){return}
    else{
        await changeTodo(a,`${b}`,false)
        await location.reload()
    }
}


;(async ()=>{
    await seeListTodo()
    for(let i=0; i<=json.length-1; i+=1){
        seeListTodo(i)
        const a = json[i].createdAt.split("T")[0]
        const b = json[i].updatedAt.split("T")[0]
        await makeItem(json[i].title, a, b, json[i].id, json[i].done)
    }
    document.querySelector("main .inner").addEventListener("click", click)
    document.querySelector("main .inner").addEventListener("focusout", blur)
})()

// 2. input value를 목록에 추가함.
const addBtn = document.querySelector("button.add")
const inputEl = document.querySelector("input")
addBtn.addEventListener("click",async ()=>{
    await createTodo(inputEl.value)
    await makeItem(addTitle, addCreatedAt, addUpdatedAt, addId)
    await seeListTodo()
    location.reload()
})
inputEl.addEventListener("keyup", async function(key){
    if(key.key==="Enter"){
        await createTodo(inputEl.value)
        await makeItem(addTitle, addCreatedAt, addUpdatedAt, addId)
        await seeListTodo()
        location.reload()
    }
})

// // 3. item을 삭제하기
async function deleteEl(event){
    if(event.target.classList[0] !== "delete"){return}
    else{
        const del = event.target.classList[1]
       await deleteTodo(del)
       await location.reload()
    }
}
document.querySelector("main .inner").addEventListener("click", deleteEl)

// 5. 할 일 완료 체크!
function check(event){
    if(event.target.classList[0] != "check"){return}
    else if(event.target.checked === true){
        const a = event.target.closest(".name").classList[1]
        const b = event.target.closest(".name").textContent
        const c = true
        event.target.closest(".item").classList.add("checked")
        changeTodo(a,b,c)
    }
    else if(event.target.checked === false){
        event.target.removeAttribute("checked")
        const a = event.target.closest(".name").classList[1]
        const b = event.target.closest(".name").textContent
        const c = false
        event.target.closest(".item").classList.remove("checked")
        changeTodo(a,b,c)
    }
}
document.querySelector("main .inner").addEventListener("click",check)

