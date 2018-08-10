const {io} = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketcontrol = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback)=>{
        let siguiente = ticketcontrol.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });
    client.emit('estadoActual',{
        actual: ticketcontrol.getUltimoTicket(),
        ultimo4: ticketcontrol.getUltimo4()
    });
    client.on('atenderTicket',(data, callback)=>{
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario!'
            })
        }
        let atenderTicket = ticketcontrol.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimo4',{
            ultimo4: ticketcontrol.getUltimo4()
        });
    });
});