'use strict'

function errorHandler(error) {
    console.error(error);
    throw new Error('Fallo en el servidor');
}

module.exports = errorHandler;