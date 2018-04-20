'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server({ port: (process.env.PORT || 1337), host: '127.0.0.1'});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, h){
        return 'Hello World!';
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function(request, h){
        return 'Hello ' + encodeURIComponent(request.params.name) + '!';
    }
});

const init = async() => {
    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/welcome',
        handler: function(request, h) {
            return h.file('./public/welcome.html');
        }
    });

    await server.start();
    console.log(`server running at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();