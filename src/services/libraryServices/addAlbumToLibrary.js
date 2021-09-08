'use strict'

const axios = require('axios');

const addAlbumToLibrary = function (album) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/v1/library/addAlbum',
            data: {
                album: album
            }
        }).then((response) => {
            resolve(response)
        });
    })
}

module.exports = addAlbumToLibrary;