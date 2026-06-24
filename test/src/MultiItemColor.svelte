<script>
    import Select from '../../src/lib/Select.svelte';

    let items = $state(['one', 'two']);
</script>

<Select multiple bind:items value="one" valueMode="id" listOpen --multi-item-color="red" />
