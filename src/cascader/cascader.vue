<template>
  <div class="cascader" v-click-out-side="close">
    <div @click="toggle" class="trigger">
      <!--      <slot></slot>-->
      {{result || '&nbsp;'}}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items :children="source" :height="height" :level="level" :load-data="loadData"
                      :loading-item="loadingItem" :selected="selected"
                      @update:selected="updateSelected" class="popover"></cascader-items>
    </div>
  </div>
</template>

<script>
  import cascaderItems from './cascader-items'
  import ClickOutSide from '../click-outside'

  let simplest = (children, id) => {
    return children.filter(item => item.id === id)[0]
  }
  let complex = (children, id) => {
    let noChildren = []
    let hasChildren = []
    children.forEach(item => {
      if (item.children) {
        hasChildren.push(item)
      } else {
        noChildren.push(item)
      }
    })
    let found = simplest(noChildren, id)
    if (found) {
      return found
    } else {
      found = simplest(hasChildren, id)
      if (found) { return found } else {
        for (let i = 0; i < hasChildren.length; i++) {
          found = complex(hasChildren[i].children, id)
          if (found) {
            return found
          }
        }
        return undefined
      }
    }
  }

  export default {
    name: 'cascader',
    props: {
      source: {
        type: Array,
      },
      height: {
        type: String
      },
      selected: {
        type: Array,
        default: () => []
      },
      level: {
        type: Number,
        default: 0
      },
      loadData: {
        type: Function
      },
    },
    directives: { ClickOutSide },
    components: {
      cascaderItems
    },
    data () {
      return {
        popoverVisible: false,
        loadingItem: {}
      }
    },
    computed: {
      result () {
        return this.selected.map(item => item.name).join('/')
      }
    },
    methods: {
      close () {
        this.popoverVisible = false
      },
      open () {
        this.popoverVisible = true
      },
      toggle () {
        if (this.popoverVisible) {
          this.close()
        } else {
          this.open()
        }
      },
      updateSelected (newSelected) {
        // 拿到当前的最后一个子节点
        let lastSelected = newSelected[newSelected.length - 1]

        let updateSource = (result) => {
          this.loadingItem = {}
          let copy = JSON.parse(JSON.stringify(this.source))
          let toUpdate = complex(copy, lastSelected.id)
          toUpdate.children = result
          this.$emit('update:source', copy)
        }
        if (!lastSelected.isLeaf) {
          if (this.loadData && (!lastSelected.children || lastSelected.children === 0)) {
            this.loadData(lastSelected.id, updateSource)
            this.loadingItem = lastSelected
          }
        }
        this.$emit('update:selected', newSelected)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../styles/var";
  .cascader {
    position: relative;
    height: $input-height;
    display: inline-block;
    .trigger {
      height: $input-height;
      display: inline-flex;
      align-items: center;
      padding: 0 1em;
      min-width: 10em;
      border: 1px solid $border-color;
      border-radius: $border-radius;
    }
    .popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
      background: white;
      display: flex;
      border-radius: 2px;
      margin-top: 8px;
      @extend .box-shadow;
    }
  }
</style>
