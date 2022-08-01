import { defineStore } from "pinia";
import { ref } from "vue";
import { data } from "../utils/treeFolders";

interface INodeData {
  id: string;
  label: string;
  type?: string;
  children?: INodeData[];
}
export const useFoldersStore = defineStore("folders", () => {
  const foldersStructure = ref([{}]);

  const fetchFoldersStructure = () => {
    foldersStructure.value = data;
  };
  const deleteItem = (id: number | string, trees = foldersStructure.value) => {
    trees.length &&
      trees.forEach((tree: Record<string, any>, index: number) => {
        if (tree.id == id) {
          trees.splice(index, 1);
          return;
        }
        tree.children &&
          tree.children.length &&
          tree.children.forEach((node: INodeData, index: number) => {
            if (node.id == id) {
              tree.children && tree.children.splice(index, 1);
              return;
            }
            node.children &&
              node.children.length &&
              deleteItem(id, node.children);
          });
      });
  };
  const editNode = (
    id: number | string,
    value: string,
    trees = foldersStructure.value
  ) => {
    trees.length &&
      trees.forEach((tree: Record<string, any>) => {
        if (tree.id == id) {
          tree.label = value;
          return;
        }
        tree.children &&
          tree.children.length &&
          tree.children.forEach((node: INodeData) => {
            if (node.id == id) {
              node.label = value;
              return;
            }
            node.children &&
              node.children.length &&
              editNode(id, value, node.children);
          });
      });
  };
  return { foldersStructure, fetchFoldersStructure, editNode, deleteItem };
});
