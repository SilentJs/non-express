const socket = io('https://ContentCylindricalTheories.pathikritdas.repl.co');
const messages = document.getElementById('messages');
const msgForm = document.getElementById('msgForm');



socket.on('message', data => {
    console.log(data)
    appendMessages(data[0],data[1])
})
socket.on('output-messages', data => {
    console.log(data)
    if (data.length) {
        data.forEach(message => {
            appendMessages(message.username,message.msg)
        });
    }
})
msgForm.addEventListener('submit', e => {
    e.preventDefault()
    if(localStorage.getItem('Name')){
    var array=[localStorage.getItem('Name'),msgForm.msg.value]
    }else{
        var Number= Math.round(Math.random()*99999)
        localStorage.setItem('Name',`AnonymousUser${Number}`)
        var array=[localStorage.getItem('Name'),msgForm.msg.value]
        console.log('Anonymous username: ',`AnonymousUser${Number}`)
    }
    socket.emit('chatmessage', array)
    console.log('[CLIENT]Username: ', localStorage.getItem('Name')) 
    console.log('[CLIENT]Message: ', msgForm.msg.value)
    msgForm.msg.value = '';
    msgForm.name.value = '';


})

function appendMessages(name,message) {
    const html = `<div><li>${name}</li><br><li>${message}</li></div>`
    messages.innerHTML += html
}

