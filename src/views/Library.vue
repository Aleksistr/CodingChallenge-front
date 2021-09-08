<template>
    <div>
        <list
            style="max-height: 80vh; overflow: auto"
            :items="$store.state.library.albums"
            :displayFav="true"
            :displayAction="false"
            :displayCheckbox="true"
            :displayAlbumInfo="false"
            :displayDeleteButton="true"
            :displayNote="true"
        ></list>
        <div class="buttons">
            <!-- Button to add albums to library -->
            <v-btn
                small
                color="primary"
                @click="addAlbums"
            >
                {{$t('home_page.actions.add')}}
            </v-btn>
            <!-- Button to annotate albums from library -->
            <v-btn
                :disabled="$store.state.selectedAlbums.length === 0"
                small
                color="secondary"
                @click="dialog = true"
            >
                {{$t('home_page.actions.annotate')}}
            </v-btn>
        </div>
        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
        >
            <v-card>
                <v-card-title class="text-h5">
                    {{$t('home_page.annotate.title')}}
                </v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="tag"
                        filled
                        :label="$t('home_page.labels.type_tag')"
                        type="text"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="addAnnotationToAlbums"
                    :disabled="tag === ''"
                >
                    {{$t('home_page.actions.validate')}}
                </v-btn>
                <v-btn
                    color="red darken-1"
                    text
                    @click="dialog = false"
                >
                    {{$t('home_page.actions.cancel')}}
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import list from '@/components/albumList/list.vue'
import libraryServices from '@/services/libraryServices'
import albumServices from '@/services/albumServices'
export default {
    data: () => ({
        dialog: false,
        tag: ''
    }),
    mounted () {
        this.getLibrary()
    },
    methods: {
        getLibrary () {
            libraryServices.getLibrary().then((response) => {
                this.$store.commit('setLibrary', response.data.library)
            })
        },
        addAlbums () {
            this.$router.push({name: 'Search'})
        },
        addAnnotationToAlbums () {
            albumServices.addAnnotationToAlbums(this.$store.state.selectedAlbums, this.tag).then((response) => {
                this.tag = ''
                this.dialog = false
                this.getLibrary()

            })
        }
    },
    components: {
        list
    }
}
</script>
<style>
.buttons {
    margin-top: 2vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>