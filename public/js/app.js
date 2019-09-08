// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherform=document.querySelector('form')
const search= document.querySelector('#location')
const messageOne=document.querySelector('#messageOne')
const messageTwo=document.querySelector('#messageTwo')

messageOne.textContent=''
messageTwo.textContent=''

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault() //prevent the browser from refreshing
    const location=search.value
 
    messageOne.textContent='loading....'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
           if(data.error)
           {
            messageOne.textContent=data.error
            me
           }else
           {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
           }
       })
    })
})