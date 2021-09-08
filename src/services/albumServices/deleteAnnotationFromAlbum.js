'use strict'

const axios = require('axios')

const deleteAnnotationFromAlbum = function (albumId, annotation) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: 'http://localhost:3000/v1/albums/annotations',
            data: {
                albumId: albumId,
                annotation: annotation
            }
        }).then((response) => {
            resolve(response)
        });
    })
}

module.exports = deleteAnnotationFromAlbum;