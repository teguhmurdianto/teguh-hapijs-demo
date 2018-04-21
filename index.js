'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server({ port: (process.env.PORT || 3000), host: '0.0.0.0' });

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
    console.log('register inert starting...');
    await server.register(require('inert'));
    console.log('register inert started...');

    server.route({
        method: 'GET',
        path: '/welcome',
        handler: function(request, h) {
            return h.file('./public/welcome.html');
        }
    });

    console.log('server starting...');
    await server.start();
    console.log('server started...');
    console.log(`server running at ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

init();