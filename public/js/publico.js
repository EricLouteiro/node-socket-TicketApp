
// referencias html

const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();



socket.on('ultimos-4', (payload) =>{

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ticket1, ticket2, ticket3, ticket4] = payload;

    if (ticket1){
        lblTicket1.innerHTML = 'ticket ' + ticket1.numero;
        lblEscritorio1.innerHTML = 'escritorio ' + ticket1.escritorio;
    }
    
    if (ticket2){
        lblTicket2.innerHTML = 'ticket ' + ticket2.numero;
        lblEscritorio2.innerHTML = 'escritorio ' + ticket2.escritorio;
    }
    
    if (ticket3){
        lblTicket3.innerHTML = 'ticket ' + ticket3.numero;
        lblEscritorio3.innerHTML = 'escritorio ' + ticket3.escritorio;
    }
    
    if (ticket4){
        lblTicket4.innerHTML = 'ticket ' + ticket4.numero;
        lblEscritorio4.innerHTML = 'escritorio ' + ticket4.escritorio;
    }
    
});

