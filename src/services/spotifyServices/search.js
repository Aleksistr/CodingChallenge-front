'use strict'

const axios = require('axios')

const search = function (search) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/v1/spotify/search?search=' + search
        }).then((response) => {
            if (response.data.error && response.data.error === 'invalid_token') {
                window.open(response.data.redirect_uri,'_blank');
            } else {
                resolve(response.data)
            }
        })
    })
}

module.exports = search;