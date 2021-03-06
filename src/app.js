import Button from './button/button'
import ButtonGroup from './button/button-group'
import Col from './grid/col'
import Collapse from './collpase/collapse'
import CollapseItem from './collpase/collapse-item'
import Content from './layout/content'
import Footer from './layout/footer'
import Header from './layout/header'
import Icon from './icon'
import Input from './input'
import Layout from './layout/layout'
import plugin from './plugin'
import Popover from './popover'
import Row from './grid/row'
import Sider from './layout/sider'
import Tabs from './tabs/tabs'
import TabsBody from './tabs/tabs-body'
import TabsHead from './tabs/tabs-head'
import TabsItem from './tabs/tabs-item'
import TabsPane from './tabs/tabs-pane'
import Vue from 'vue'
import Cascader from './cascader/cascader'

Vue.component('collapse', Collapse)
Vue.component('collapse-item', CollapseItem)
Vue.component('icon', Icon)
Vue.component('my-button', Button)
Vue.component('my-button-group', ButtonGroup)
Vue.component('my-col', Col)
Vue.component('my-content', Content)
Vue.component('my-footer', Footer)
Vue.component('my-header', Header)
Vue.component('my-input', Input)
Vue.component('my-layout', Layout)
Vue.component('my-row', Row)
Vue.component('my-sider', Sider)
Vue.component('popover', Popover)
Vue.component('tabs', Tabs)
Vue.component('tabs-body', TabsBody)
Vue.component('tabs-head', TabsHead)
Vue.component('tabs-item', TabsItem)
Vue.component('tabs-pane', TabsPane)
Vue.component('cascader', Cascader)
Vue.use(plugin)

new Vue({
  el: '#app',
  data () {
    return {
      loading1: true,
      loading2: true,
      loading3: true,
      selectedTab: 'woman',
      selected: ['1', '2'],

    }
  },
  methods: {
    showToast (position) {
      this.$toast({
        message: `${Math.floor(+Math.random() * 100)}确定关闭吗？`,
        autoClose: false,
        enableHtml: true,
        closeButton: {
          text: '是的',
          callback () {
            console.log('关闭')
          }
        },
        position: position
      })
    }
  },
  created () {

  }
})
