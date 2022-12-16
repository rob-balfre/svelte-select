<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>


<Select {items} required>
    <div class="required" slot="required">
        REQUIRED
    </div>
</Select>

<style>
    .required {
        color: red;
        position: absolute;
        height: 40px;
        line-height: 40px;
        right: 0;
        border: 1px solid;
        padding: 0 15px;
        background: #fff;
    }
</style>