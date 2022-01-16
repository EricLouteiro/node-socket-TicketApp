// referencias html

const lblEscritorio =  document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const serchParams = new URLSearchParams( window.location.search)

if ( !serchParams.has('escritorio')){

    window.location = 'index.html';
    throw new Error('el escritorio es obligatorio')
}

const escritorio = serchParams.get('escritorio');
lblEscritorio.innerHTML = 'Escritorio ' + escritorio;

divAlerta.style.display = 'none';

const socket = io();


socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;
});

socket.on('tickets-pendientes', (cantidad) =>{

    lblPendientes.innerHTML = cantidad

});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});


btnAtender.addEventListener( 'click', () => {
  
    socket.emit('atender-ticket', { escritorio }, ( { ok, ticketAtender } ) => {

        if( !ok ){
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';
        }

        // console.log(ticketAtender)
        lblTicket.innerText = 'Ticket ' + ticketAtender.numero;
        
    });

});