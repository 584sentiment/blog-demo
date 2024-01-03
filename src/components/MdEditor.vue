<template>
    <div id="editorjs" class="editor"></div>
</template>
  
<script lang="ts" setup>
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

const editor = new EditorJS({
    tools: {
        header: Header,
        list: List
    },
    autofocus: true,
})
</script>
  
<style>
.editor {
    width: 500px;
    height: 650px;
    border: 1px solid #ccc;
    padding: 10px;
}
</style>