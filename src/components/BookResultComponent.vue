<template>
  <q-card class="book-card">
    <q-card-section horizontal>
      <q-card-section class="col-xs-7 col-md-8 q-pt-xs">
        <div class="text-overline">
          ISBN:
          {{
            book.identifiers && book.identifiers.isbn_13
              ? book.identifiers.isbn_13[0]
              : 'Unknown'
          }}
        </div>
        <div class="text-h5 q-mt-sm q-mb-md">{{ book.title }}</div>

        <q-list bordered separator>
          <q-item-label header v-if="book.excerpts">Excerpt</q-item-label>
          <q-item v-if="book.excerpts">
            <q-item-section>{{ book.excerpts[0].text }}</q-item-section>
          </q-item>

          <q-item-label header v-if="book.authors">Authors</q-item-label>
          <q-item :key="item.name" v-for="item in book.authors">
            <q-item-section avatar top>
              <q-avatar
                icon="perm_identity"
                color="orange"
                text-color="white"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label header v-if="book.publishPlaces">Authors</q-item-label>
          <q-item :key="item.name" v-for="item in book.publishPlaces">
            <q-item-section avatar top>
              <q-avatar icon="place" color="orange" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label header v-if="book.links">Links</q-item-label>
          <q-item :key="item.title" v-for="item in book.links">
            <q-item-section avatar top>
              <q-avatar icon="link" color="orange" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label header v-if="book.publishers">Publishers</q-item-label>
          <q-item :key="item.name" v-for="item in book.publishers">
            <q-item-section avatar top>
              <q-avatar icon="store" color="orange" text-color="white" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section class="col-xs-5 col-md-6 flex flex-center">
        <q-img
          v-if="book.cover"
          class="rounded-borders q-mb-md"
          :src="book.cover.large"
        />
        <q-chip
          dense
          :label="item.name.substring(0, 8)"
          :key="item.name"
          v-for="item in book.subjects"
        />
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions vertical>
      <q-btn flat round icon="event" />
      <q-btn flat> Published: {{ book.publishDate }} </q-btn>
      <q-btn flat round icon="description" />
      <q-btn flat> Pages: {{ book.numberPages }} </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IBookModel } from '../services/IBookModel';

export default defineComponent({
  name: 'BookResultComponent',
  props: {
    book: {
      type: Object as PropType<IBookModel>,
      required: true,
    },
  },
  setup(props) {
    if (props) {
    }
    return {
      test: props.book.title,
    };
  },
});
</script>

<style>
.searchInput {
  font-size: 20px;
}
</style>
