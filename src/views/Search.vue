<template>
    <div>
      <search-bar
        @search="applyFilter"
      ></search-bar>
      <list
        style="max-height: 80vh; overflow: auto"
        :items="items"
        :displayFav="false"
        :displayAction="true"
        :displayCheckbox="false"
        :displayAlbumInfo="true"
        :displayDeleteButton="false"
      ></list>
    </div>
</template>

<script>
import spotifyServices from '@/services/spotifyServices'
import searchBar from '@/components/shared/searchBar.vue'
import list from '@/components/albumList/list.vue'
export default {
  components: { searchBar, list },
    name: 'Search',
    data: () => ({
      items: []
    }),
    methods: {
      applyFilter ($event) {
        spotifyServices.search($event).then((response) => {
          this.items = response
        })
      }
    }
}
</script>