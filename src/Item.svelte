<div class="item {itemClasses}">
  {@html getOptionLabel(item)}
</div>

<style>
  .item {
    cursor: default;
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .item:active {
    background: #b9daff;
  }

  .item.active {
    background: #007aff;
    color: #fff;
  }

  .item.first {
    border-radius: 4px 4px 0 0;
  }

  .item.hover:not(.active) {
    background: #e7f2ff;
  }
</style>

<script>
  export default {
    data() {
      return {
        isActive: false,
        isFirst: false,
        isHover: false
      }
    },

    computed: {
      itemClasses({isActive, isFirst, isHover}) {
        const classes = [];
        if(isActive){classes.push('active');}
        if(isFirst){classes.push('first');}
        if(isHover){classes.push('hover');}
        return classes.join(' ');
      }
    }
  }
</script>
