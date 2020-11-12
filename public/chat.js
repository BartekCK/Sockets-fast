const socket = io.connect('http://localhost:4000/');

// Query DOM
const message = document.getElementById('message');
const btn = document.getElementById('send');
const handle = document.getElementById('handle');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Listen for events
btn.addEventListener('click', function () {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
})

message.addEventListener('keypress', function () {
    socket.emit('typing', handle.value);
})

socket.on('chat', function (data) {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}</strong> ${data.message}</p>`
})

socket.on('typing', function (data) {
    feedback.innerHTML = `<p><em>${data}</em> is typing a message ...</p>`
})
