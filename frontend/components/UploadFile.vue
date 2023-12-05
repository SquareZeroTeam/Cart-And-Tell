<script setup lang="ts">
import { useFileDialog } from '@vueuse/core'

const { files, open, reset, onChange } = useFileDialog()
onChange((files) => {
    //unsay buhaton ani
})
</script>

<template >
    <template v-if="files" class="flex justify-center items-center">
        <p>You have selected: <b>{{ `${files.length} ${files.length === 1 ? 'file' : 'files'}` }}</b></p>
        <li v-for="file of files" :key="file.name">
        {{ file.name }}
        </li>
    </template>
    <div class="">
        <button type="button" @click="open()" class="p-1 bg-blue-500 text-white rounded-sm mr-4 m-1">
        Upload
        </button>
        <button type="button" :disabled="!files" @click="reset()" class="p-1 mt-4 bg-blue-500 text-white rounded-sm">
            Reset
        </button>
    </div>
    
    
</template>