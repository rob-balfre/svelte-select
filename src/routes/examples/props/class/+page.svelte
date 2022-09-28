<script>
    import Select from '$lib/Select.svelte';

    let items = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' },
    ];
</script>

<Select {items} class="foo bar" />

<style>
    :global(.foo) {
        background: pink !important; 
    }
</style>
