'use strict'

const axios = require('axios')

const addAnnotationToAlbums = function (albumsId, annotation) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'put',
            url: 'http://localhost:3000/v1/albums/annotations',
            data: {
                albumsIds: albumsId,
                annotation: annotation
            }
        }).then((response) => {
            resolve(response)
        });
    })
}

module.exports = addAnnotationToAlbums;