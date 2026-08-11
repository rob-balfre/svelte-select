<script>
    import Select from '../../src/lib/Select.svelte';

    let items = $state(['one', 'two']);
</script>

<Select bind:items listOpen --item-height="50px" />
