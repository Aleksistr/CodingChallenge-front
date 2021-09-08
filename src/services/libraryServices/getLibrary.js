'use strict'

const axios = require('axios')

const getLibrary = function () {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/v1/library',
        }).then((response) => {
            resolve(response)
        });
    })
}

module.exports = getLibrary;