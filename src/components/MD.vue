<template>
    <button @click="isEditing = !isEditing">{{ isEditing ? '保存' : '编辑' }}</button>
    <div class="editor" :contenteditable="isEditing" v-html="html" @keyup="handleInput">
    </div>
    <button @click="pri"></button>
</template>
  
<script lang="ts" setup>
import { computed, ref } from 'vue';
import {marked} from 'marked';
import { txtKeyCodes } from '@/constant/keyCode';

const isEditing = ref(false);
const markdown = ref('');
type keyObj = {
    key:string,
    code: string,
    keyCode: number
}
const keys = ref<keyObj[]>([]);
const handleInput = (e: KeyboardEvent) => {
    e.preventDefault();
    console.log(e)
    if(txtKeyCodes.map(to => to.keyCode).includes(e.keyCode)) {
        markdown.value += e.key;
    }else if (e.keyCode === 8) {
        markdown.value = markdown.value.slice(0, markdown.value.length - 1);
    }
    console.log(e.keyCode, e.key)
}

const html = computed(() => {
    return marked.parse(markdown.value);
})

const pri = () => {
    console.log(keys.value)
}

</script>
  
<style>
.editor {
    width: 500px;
    height: 650px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
}
</style>