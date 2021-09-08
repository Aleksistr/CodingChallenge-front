'use strict'

const axios = require('axios')

const changeFavStatus = function (album) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'put',
            url: 'http://localhost:3000/v1/albums/' + album._id + '/fav-status',
        }).then((response) => {
            resolve(response)
        });
    })
}

module.exports = changeFavStatus;