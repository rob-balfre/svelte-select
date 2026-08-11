<script>
    import Select from '$lib/Select.svelte';

    const items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<Select {items} required>
    {#snippet requiredIndicator()}
        <div class="required">REQUIRED</div>
    {/snippet}
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
