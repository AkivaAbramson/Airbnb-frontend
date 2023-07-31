<template>
  <div className="upload-preview">
    <img v-if="imgUrl" :src="imgUrl" :style="{ maxWidth: '200px', float: 'right' }" />
    <label for="imgUpload" class="custom-file-button">{{uploadMsg}}</label>
    <input type="file" @change="uploadImg" accept="img/*" id="imgUpload" style="display: none"/>
  </div>
</template>

<script>
import { uploadService } from '../services/upload.service.js'

export default {
  data() {
    return {
      imgUrl: null,
      height: 500,
      width: 500,
      isUploading: false
    }
  },
  methods: {
    async uploadImg(ev) {
      this.isUploading = true
      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      this.isUploading = false
      this.imgUrl = secure_url
      this.height = height
      this.width = width
      this.$emit('uploaded', this.imgUrl)
    }
  },
  computed: {
    uploadMsg() {
      // if (this.imgUrl) return 'Upload Another?'
      return this.isUploading ? 'Uploading....' : 'Add Picture '
    }
  }
}
</script>

<style>
.custom-file-button {
  display: inline-block;
  padding: 8px 16px;
  background-color: rgb(244, 182, 66);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

/* When hovering the custom button, change its background color */
.custom-file-button:hover {
  background-color: orange}

.upload-preview{
  
}
</style>
