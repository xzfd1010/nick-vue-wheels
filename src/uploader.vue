<template>
  <div class="my-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>
    <div ref="temp" style="width:0;height: 0;overflow: hidden;"></div>
    <img :src="url"> <!--为什么是about:blank-->
  </div>
</template>

<script>
  export default {
    name: 'uploader',
    props: {
      name: {
        type: String,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      method: {
        type: String,
        default: 'POST'
      },
      parseResponse: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        url: 'about:blank',
      }
    },
    methods: {
      onClickUpload () {
        let input = this.createInput()
        input.addEventListener('change', () => {
          let file = input.files[0]
          this.uploadFile(file)
          input.remove()
        })
        input.click()
      },
      createInput () {
        let input = document.createElement('input')
        input.type = 'file'
        this.$refs.temp.appendChild(input)
        return input
      },
      uploadFile (file) {
        let formData = new FormData()
        formData.append(this.name, file)
        this.doUploadFile(formData, (response) => {
          this.url = this.parseResponse(response)
        })
      },
      doUploadFile (formData, success) {
        let xhr = new XMLHttpRequest()
        xhr.open(this.method, this.action)
        xhr.onload = () => {
          success(xhr.response)
        }
        xhr.send(formData)
      }
    }
  }
</script>

<style scoped lang="scss">
  .my-uploader {
  }
</style>