'use strict'

const axios = require('axios')

const changeFavStatus = function (album) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: 'http://localhost:3000/v1/library/album/' + album._id,
        }).then((response) => {
            resolve(response)
        })
    })
}

module.exports = changeFavStatus;