<template>
    <v-row
        class="ma-4"
    >
        <v-col
            offset-lg="3"
            offset-md="3"
            lg="6"
            md="6"
            sm="11"
        >
            <v-text-field
                v-model="query"
                append-icon="mdi-magnify"
                filled
                :label="$t('home_page.labels.search')"
                type="text"
                @click:append="search"
                v-on:keyup.enter="search"
            ></v-text-field>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'SearchBar',
    data: () => ({
      query: ''
    }),
    methods: {
      search () {
          this.$emit('search', this.query)
      }
    }
}
</script>