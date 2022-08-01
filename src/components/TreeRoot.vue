<script setup lang="ts">
import NodeTree from "./NodeTree.vue";

defineProps({
  treeData: {
    type: Object,
    default: () => ({}),
  },
});
</script>
<template>
  <div class="tree">
    <ul class="tree-list">
      <NodeTree :node-info="treeData"></NodeTree>
    </ul>
  </div>
</template>

<style>
.tree {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
.tree-list ul {
  list-style-type: none;
  padding-left: 30px;
  margin: 6px 0;
}
ul.tree-list {
  width: 100%;
  padding-left: 0;
}
</style>
