const TicketControl = require("../models/ticketControl");

const ticket = new TicketControl()

const socketController = (socket) => {
    // cuando un cliente se conecta
    socket.emit('ultimo-ticket', ticket.ultimo)
    socket.emit('ultimos-4', ticket.ultimos4)
    socket.emit('tickets-pendientes', ticket.tickets.length)

    socket.on('siguiente-ticket', ( payload, callback ) => {
        

        // console.log('nuevaconexion')
        const siguiente = ticket.siguiente();

        callback( siguiente );

        // todo:: nuevo ticket pendiente a asignar
        socket.broadcast.emit('tickets-pendientes', ticket.tickets.length);

    });

    socket.on('atender-ticket', ({escritorio}, callback) => {
        
        if( !escritorio ){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticketAtender = ticket.atenderTicket(escritorio);
        console.log(ticketAtender)

        if(!ticketAtender){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }
        else {
            socket.broadcast.emit('ultimos-4', ticket.ultimos4);
            socket.emit('tickets-pendientes', ticket.tickets.length);
            socket.broadcast.emit('tickets-pendientes', ticket.tickets.length);
            callback({
                ok: true,
                ticketAtender
            });
        }

    })

}


module.exports = {
    socketController
}

