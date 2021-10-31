<script>
    export let isActive = false;
    export let isFirst = false;
    export let isHover = false;
    export let item = undefined;

    let itemClasses = '';

    $: {
        const classes = [];
        if (isActive) {
            classes.push('active');
        }
        if (isFirst) {
            classes.push('first');
        }
        if (isHover) {
            classes.push('hover');
        }
        itemClasses = classes.join(' ');
    }
</script>

<div class="customItem {itemClasses}">
    <img src={item.image_url} alt={item.name} />
    <div class="customItem_title">
        <div class="customItem_name">{item.name}</div>
        <div class="customItem_tagline">{item.tagline}</div>
    </div>
</div>

<style>
    .customItem {
        display: flex;
        align-items: center;
        cursor: default;
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .customItem:active {
        background: #b9daff;
    }

    .customItem.active {
        background: #007aff;
        color: #fff;
    }

    .customItem.first {
        border-radius: 4px 4px 0 0;
    }

    .customItem.hover:not(.active) {
        background: #e7f2ff;
    }

    img {
        width: 5px;
        padding: 5px 0;
        margin: 0 10px;
    }

    .customItem_title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .customItem_name {
        display: inline-block;
        font-weight: 700;
        margin-right: 10px;
    }

    .customItem_tagline {
        display: inline-block;
    }
</style>
