'use strict';

const server = require('./app.js');

// server.listen(3000, () => {
//     console.log('Server is running');
// });

const PORT = process.env.PORT || 3000;

server.start(PORT);