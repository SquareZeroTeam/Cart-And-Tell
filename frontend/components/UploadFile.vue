<script setup lang="ts">
const filesData = ref<{ name: string; size: number; type: string; lastModified: number }[]>([]);
const pdfFileUrl = ref<string | null>(null); 
const dropZoneRef = ref<HTMLElement>();

const onDrop = (files: File[] | null) => {
  filesData.value = [];
  if (files && files.length > 0) {
    const pdfFile = files[0];
    
    pdfFileUrl.value = URL.createObjectURL(pdfFile);

    // file details
    filesData.value = [{
      name: pdfFile.name,
      size: pdfFile.size,
      type: pdfFile.type,
      lastModified: pdfFile.lastModified,
    }];
  }
};

const openFileDialog = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'application/pdf';
  fileInput.multiple = false;

  fileInput.addEventListener('change', (event) => {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      onDrop(Array.from(files));
    }
  });

  fileInput.click();
};

const resetFiles = () => {
  filesData.value = [];
  pdfFileUrl.value = null;
};
</script>

<template>
    <div class="flex flex-col sm:flex-row justify-center items-center">
        <div class="flex flex-col m-4">
        <!-- File upload section -->
        <div class="w-full sm:w-96 h-56 relative border-dashed border-2 border-gray-300">
        <div
            ref="dropZoneRef"
            class="flex flex-col w-full min-h-200px h-auto justify-center items-center mt-6 rounded cursor-pointer"
        >
            <div>
            <div class="flex flex-wrap justify-center items-center m-4">
                <div
                v-for="(file, index) in filesData"
                :key="index"
                class="w-200px bg-black-200/10 ma-2 pa-6 flex flex-col justify-center text-center"
                >
                <p>{{ file.name }}</p>
                </div>
            </div>
            <button
                type="button"
                @click="openFileDialog"
                class="w-full h-full cursor-pointer mt-10 text-bold text-gray-500"
            >
                Drag or Click to Upload PDF
            </button>
            </div>
        </div>
        </div>

        <!-- Reset Files button -->
        <button
        type="button"
        @click="resetFiles"
        class="p-2 m-4 bg-[#282F7A] text-white rounded-sm"
        >
        Reset Files
        </button>

        <!-- Responsive PDF display -->
        
    </div>
    <div class="m-4 flex justify-center items-center">
            <object
            v-if="pdfFileUrl"
            :data="pdfFileUrl"
            type="application/pdf"
            class="w-full max-w-[210mm] lg:h-[297mm] lg:w-[210mm]"
            >
            <p>
                Your browser does not support PDFs. <a :href="pdfFileUrl" target="_blank" class="text-[#282F7A]">Download the PDF</a> instead.
            </p>
            </object>
    </div>
    </div>
    
</template>


    <!-- <div class="">
        <object v-if="pdfFileUrl" :data="pdfFileUrl" type="application/pdf" class="h-[297mm] w-[210mm]">
            <p>Your browser does not support PDFs. <a :href="pdfFileUrl" target="_blank">Download the PDF</a> instead.</p>
        </object>
    </div>
    
</template> -->
