<script lang="jsx">
var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join('')
}

export default {
  render: function (createElement) {
    // 创建 kebab-case 风格的 ID
    var headingId = getChildrenTextContent(this.$slots.default)
      .toLowerCase()
      .replace(/\W+/g, '-')
      .replace(/(^-|-$)/g, '')

    return createElement(
      'h' + this.level,
      [
        createElement(
          'a',
          {
            attrs: {
              name: headingId,
              href: '#' + headingId
            }
          },
          this.$slots.default
        )
      ]
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}
</script>
