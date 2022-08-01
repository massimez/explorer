<script setup lang="ts">
import TreeRoot from "./components/TreeRoot.vue";
import { useFoldersStore } from "@/stores/folders.js";
import { computed, onMounted } from "vue";

const storeFolders = useFoldersStore();

onMounted(() => {
  storeFolders.fetchFoldersStructure();
});
const foldersStructure = computed(() => {
  return storeFolders.foldersStructure;
});
</script>

<template>
  <header></header>

  <main class="main">
    <template v-if="foldersStructure.length">
      <TreeRoot
        v-for="(dir, i) in foldersStructure"
        :tree-data="dir"
        :key="i"
      ></TreeRoot>
    </template>
    <h1 v-else>Empty directory</h1>
  </main>
</template>

<style scoped>
.main {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
