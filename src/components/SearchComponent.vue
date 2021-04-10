<template>
  <q-form autofocus @submit="callSearch">
    <div class="row justify-center q-mt-lg">
      <div class="col-xs-8 col-md-4 items-end">
        <q-input
          color="purple-12"
          filled
          bottom-slots
          v-model="searchISBN"
          label="ISBN"
          mask="###-#-#####-###-#"
          fill-mask
          unmasked-value
          :error="!isISBNValid"
          :loading="isLoading"
          input-class="searchInput"
        >
          <template v-slot:prepend>
            <q-icon name="book" />
          </template>

          <template v-if="searchISBN" v-slot:append>
            <q-icon
              name="close"
              @click.stop="
                searchISBN = null;
                isISBNValid = true;
              "
              class="cursor-pointer"
            />
          </template>

          <template v-slot:error> Invalid ISBN number </template>
          <template v-slot:hint> What book are you looking for? </template>
        </q-input>
      </div>
      <div class="col-1 q-pl-md q-pt-sm">
        <q-btn round type="submit" color="primary" icon="search" />
      </div>
    </div>
  </q-form>

  <div v-if="searchValid" class="row q-mt-xl">
    <div class="col-sm-10 col-md-10 q-ma-xs">
      <div class="text-subtitle2 q-ma-sm">Search result</div>

      <book-result-component :book="searchResult"></book-result-component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { BackendService } from '../services/BackendService';
import { Notify } from 'quasar';
import BookResultComponent from 'components/BookResultComponent.vue';

import { IBookModel } from 'src/services/IBookModel';

export default defineComponent({
  name: 'SearchComponent',
  components: { BookResultComponent },

  setup() {
    const searchISBN = ref('9780140374513');
    const isISBNValid = ref(true);
    const searchResult = ref({});
    const searchError = ref('');
    const isLoading = ref(false);

    const result = ref(<IBookModel>{ valid: false });

    const callSearch = async () => {
      const backend = new BackendService();
      isISBNValid.value = backend.validateISBN(searchISBN.value);

      if (isISBNValid.value) {
        isLoading.value = true;
        // Clear old result
        //searchResult.value = {};
        result.value = await backend.search(searchISBN.value);
        isLoading.value = false;
        if (result.value.valid) {
          searchResult.value = result.value;
        } else {
          // Show error
          Notify.create({
            type: 'negative',
            icon: 'thumb_down',
            message: 'Sorry, Nothing found',
            position: 'top',
          });
        }
      }
    };

    return {
      searchISBN,
      isISBNValid,
      searchValid: computed(() => searchISBN.value && result.value.valid),
      searchResult,
      searchError,
      isLoading,
      callSearch,
    };
  },
});
</script>

<style>
.searchInput {
  font-size: 20x;
}
</style>
