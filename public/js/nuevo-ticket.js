// Referencias HTML

const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;
});

socket.on('ultimo-ticket', (callback) =>{
    lblNuevoTicket.innerHTML = 'Ticket ' + callback
})

socket.on('disconnect', () => {
   btnCrear.disabled = true;
});



btnCrear.addEventListener( 'click', () => {
  
    console.log('click')
    socket.emit('siguiente-ticket', null, ( ticket ) => {
        console.log(ticket)
        lblNuevoTicket.innerHTML = ticket;
    });

});