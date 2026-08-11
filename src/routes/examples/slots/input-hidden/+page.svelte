<script>
    import Select from '$lib/Select.svelte';

    /** @type {{form: any}} */
    let { form } = $props();

    let value = $state();
    const items = ['pizza', 'crisps', 'ice-cream'];
</script>

<form method="POST" action="?/someaction">
    <Select {items} bind:value>
        {#snippet inputHidden({ value })}
            <input type="hidden" name="demo" {...value} />
        {/snippet}
    </Select>

    <button>Send</button>
</form>

{#if form?.success}
    <p>Data: {form?.demo}</p>
{/if}
