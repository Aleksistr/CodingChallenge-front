<template>
    <v-list-item v-bind:class="{'unpairRow': isUnpair}">
        <!-- Display Album checkbox -->
        <v-checkbox
            v-if="displayCheckbox"
            v-model="selected"
            :value="album._id"
            @click="select"
        ></v-checkbox>

        <!-- Display Album image -->
        <v-list-item-avatar>
            <v-img
                :src="album.img"
                width="64"
            ></v-img>
        </v-list-item-avatar>

        <!-- Display album name and informations -->
        <v-list-item-content>
            <v-list-item>{{album.name}}</v-list-item>
            <v-list-item-subtitle v-if="displayAlbumInfo" style="text-align: center">
                <span>{{ album.date | formatDate(album.date_precision) }} - {{album.duration | duration }}</span>
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="displayNote">
                <v-chip
                    v-for="(annotation, key) in album.annotations"
                    :key="key"
                    color="blue-grey"
                    style="color: white"
                    close
                    @click:close="removeTag(annotation)"
                >
                    {{ annotation }}
                </v-chip>
            </v-list-item-subtitle>
        </v-list-item-content>

        <!-- Item action to add album to library -->
        <v-list-item-action v-if="displayAction">
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        icon
                    >
                        <v-icon>
                            mdi-dots-vertical
                        </v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title
                            @click="addToLibrary"
                        >{{$t('home_page.actions.add_to_library')}}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-list-item-action>

        <!-- Display Album Fav information and delete button -->
        <v-list-item-action 
            v-if="displayFav || displayDeleteButton"
        >
            <div class="row">
                <!-- Fav information -->
                <v-btn
                    v-if="displayFav"
                    color="pink accent-2"
                    icon
                    @click="changeFavStatus()"
                >
                    <v-icon>
                        {{album.isFav ? 'mdi-heart' : 'mdi-heart-outline'}}
                    </v-icon>
                </v-btn>
                <!-- Delete Button -->
                <v-btn
                    v-if="displayDeleteButton"
                    color="red accent-4"
                    icon
                    @click="deleteAlbumFromPlaylist()"
                >
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </div>
        </v-list-item-action>

    </v-list-item>
</template>
<script>
import i18n from '@/i18n' 
import libraryServices from '@/services/libraryServices'
import albumServices from '@/services/albumServices'
import moment from 'moment'
export default {
    data: () => ({
      selected: []
    }), 
    name: 'albumItem',
    props: ['album', 'number', 'displayFav', 'displayAction', 'displayCheckbox', 'displayNote', 'displayAlbumInfo', 'displayDeleteButton'],
    filters: {
        // Function toi filter date format
        formatDate: function (date, precision, format) {
            if (date) {
                if (precision === 'day') {
                    if (format) {
                        return moment(String(date)).format(format)
                    } else {
                        return moment(String(date)).format('DD/MM/YYYY')
                    }
                } else {
                    return date
                }
            }
        }
    },
    computed: {
        isUnpair () {
            return this.number % 2 !== 0
        }
    },
    mounted () {
        this.selected = this.$store.state.selectedAlbums
    },
    methods: {
        addToLibrary () {
            libraryServices.addAlbumToLibrary(this.album).then((response) => {
                if (response.data.error) {
                    this.$notify({
                        group: 'notify',
                        title: i18n.t(response.data.error),
                        type: 'warn',
                        duration: 1500
                    });
                } else if (response.data.message) {
                    this.$notify({
                        group: 'notify',
                        title: i18n.t(response.data.message),
                        type: 'success',
                        duration: 1500
                    });
                }
            })
        },
        changeFavStatus () {
            albumServices.changeFavStatus(this.album).then(() => {
                this.reloadLibrary()
            })
        },
        reloadLibrary () {
            libraryServices.getLibrary().then((response) => {
                this.$store.commit('setLibrary', response.data.library)
            })
        },
        select () {
            this.$store.commit('updateSelectedAlbums', this.album._id)
            this.selected = this.$store.state.selectedAlbums
        },
        deleteAlbumFromPlaylist () {
            libraryServices.removeAlbumFromLibrary(this.album).then(() => {
                this.reloadLibrary()
            })
        },
        removeTag (tag) {
            albumServices.deleteAnnotationFromAlbum(this.album._id, tag).then(() => {
                this.reloadLibrary()
            })
        }
    }
}
</script>
<style>
.unpairRow {
    background-color: #D9D9D9;
}
</style>