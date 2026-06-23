<script>
    import Select from '../../src/lib/Select.svelte';

    let items = $state(['one', 'two']);
</script>

<Select {items} required>
    {#snippet requiredIndicator()}
        <div class="custom-required">REQUIRED</div>
    {/snippet}
</Select>
