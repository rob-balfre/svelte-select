<script>
    import Select from '$lib/Select.svelte';

    let collection = [
        {
            value: 'one',
            label: 'One one one one one one one one one One one one one one one one one one One one one one one one one one one One one one one one one one one one',
        },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<div class="container">
    <Select items={collection} --item-height="auto" --item-line-height="auto">
        <div slot="item" class="item" let:item>
            {item.label}
        </div>
    </Select>
</div>

<style>
    .container {
        width: 500px;
    }

    .item {
        min-height: 16px;
        padding: 10px 0;
        line-height: 16px;
        display: flex;
        line-break: auto;
        white-space: pre-wrap;
        align-items: center;
    }
</style>
