<template>
  <q-page class="row justify-evenly">
    <div class="col-sm-12 col-md-8">
      <search-component></search-component>
    </div>
  </q-page>
</template>

<script lang="ts">
import SearchComponent from 'components/SearchComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageSearch',
  components: { SearchComponent },
  setup() {
    return {};
  },
});
</script>
