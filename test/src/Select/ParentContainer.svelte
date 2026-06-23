<script>
    import Select from '../../../src/lib/Select.svelte';

    /** @type {{value: any, items: any}} */
    let { value = $bindable(), items } = $props();
</script>

<div class="container">
    <Select bind:value {items}></Select>

    <p class="result">{value.label}</p>
</div>
