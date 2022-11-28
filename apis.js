// 목록 조회에서 얻을 수 있는 응답
let json=[]

//목록 조회
async function seeListTodo() {
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202209',
      'username': 'KDT3_KimJiYeong'
    },
  })
  json = await res.json()
  return json
}

// 항목 추가에서 얻을 수 있는 응답
let addId=""
let addTitle=""
let addCreatedAt=""
let addUpdatedAt=""

//항목 추가
async function createTodo(a,b) {
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202209',
      'username': 'KDT3_KimJiYeong'
    },
    body: JSON.stringify({
      title: a,
        order:b
    })
  })
  const json = await res.json()
  console.log(json)
  addId = json.id
  addTitle = json.title
  addCreatedAt = json.createdAt
  addUpdatedAt = json.updatedAt
  // return json
  return addTitle, addCreatedAt, addUpdatedAt, addId
}

// 항목 수정
async function changeTodo(a,b,c,d) {
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${a}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202209',
      'username': 'KDT3_KimJiYeong'
    },
    body: JSON.stringify({
      title : b,
        done : c,
        order:d
    })
  })
  const json = await res.json()
  console.log(json)
  return json
}

//항목 삭제
async function deleteTodo(a) {
  const res = await fetch(`https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${a}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202209',
      'username': 'KDT3_KimJiYeong'
    }
  })
  const json = await res.json()
  console.log(json)
  return json
}

export { seeListTodo,addId,addTitle,addCreatedAt,addUpdatedAt,createTodo,changeTodo,deleteTodo,json }