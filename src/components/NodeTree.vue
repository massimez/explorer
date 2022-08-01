<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useFoldersStore } from "@/stores/folders.js";
import file from "../assets/file.svg?url";
import folder from "../assets/folder.svg?url";
import remove from "../assets/delete.svg?url";
import edit from "../assets/edit.svg?url";

const storeFolders = useFoldersStore();
const nodeInfoProps = defineProps({
  nodeInfo: {
    type: Object,
    required: true,
  },
});
const { nodeInfo } = toRefs(nodeInfoProps);
const text = ref(nodeInfo.value.label);
const isEditMode = ref(false);
const input = ref<HTMLInputElement>();
const classInput = computed(() => {
  if (isEditMode.value) {
    return "input-edit";
  }
  return "input";
});
const onEdit = () => {
  isEditMode.value = true;
  isEditMode.value &&
    onClickOutside(input, () => {
      isEditMode.value = false;
    });
  input.value && input.value.focus();
};
const onConfirmEdit = () => {
  if (confirm("Save?")) storeFolders.editNode(nodeInfo.value.id, text.value);
};
const onDelete = (id: number | string) => {
  if (confirm("Do you really want to delete?")) {
    storeFolders.deleteItem(id);
  }
};
</script>
<template>
  <li class="node-tree">
    <div class="item">
      <img
        :src="`${nodeInfo.type === 'file' ? file : folder}`"
        :alt="nodeInfo.type === 'file' ? file : folder"
      />
      <div>
        <input
          ref="input"
          :class="classInput"
          :value="nodeInfo.label"
          @input="(event: any) => (text = event.target.value)"
          :disabled="!isEditMode"
          class="label"
        />
        <button v-if="isEditMode" @click="onConfirmEdit">Ok</button>
      </div>

      <div class="btn-control">
        <button class="btn" @click="onEdit()">
          <img :src="edit" alt="button-edit" />
        </button>
        <button class="btn" @click="onDelete(nodeInfo.id)">
          <img :src="remove" alt="button-delete" />
        </button>
      </div>
    </div>

    <ul v-if="nodeInfo.children && nodeInfo.children.length">
      <NodeTree
        v-for="(child, n) in nodeInfo.children"
        :nodeInfo="child"
        :key="n"
      ></NodeTree>
    </ul>
  </li>
</template>

<style scoped>
.node-tree {
  list-style-type: none;
}

.item {
  display: flex;
  width: 100%;
  gap: 4px;
}
.item:hover {
  border: 1px solid #ccc;
}
.input {
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  font-weight: normal;
  color: #333;
  padding: 0;
}
.input-edit {
  width: 100%;
  border: 1px solid #ccc;
  background: #fff;
  outline: none;
  font-size: 14px;
  font-weight: normal;
  color: #333;
  padding: 3px;
}
.btn-control {
  width: 55px;
  display: flex;
  margin-left: auto;
  gap: 10px;
}
.btn {
  display: flex;
  width: 23px;
  height: 23px;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
}
.btn:hover {
  border: #ccc 1px solid;
}
.label {
  width: fit-content;
}
</style>
