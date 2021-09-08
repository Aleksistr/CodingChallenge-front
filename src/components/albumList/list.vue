<template>
    <div>
        <v-list>
            <album-item
                v-for="(album, key) in items"
                :key="key"
                :album="album"
                :number="key"
                :displayFav="displayFav"
                :displayNote="displayNote"
                :displayAction="displayAction"
                :displayCheckbox="displayCheckbox"
                :displayAlbumInfo="displayAlbumInfo"
                :displayDeleteButton="displayDeleteButton"
            ></album-item>
        </v-list>
    </div>
</template>
<script>
import albumItem from './albumItem.vue'
export default {
    components: { albumItem },
    name: 'list',
    props: ['items', 'displayFav', 'displayAction', 'displayCheckbox', 'displayNote', 'displayAlbumInfo', 'displayDeleteButton']
}
</script>