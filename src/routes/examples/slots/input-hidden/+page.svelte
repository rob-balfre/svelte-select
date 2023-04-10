<script>
    import Select from '$lib/Select.svelte';

    export let form;

    let value;
    let items = ['pizza', 'crisps', 'ice-cream'];
</script>

<form method="POST" action="?/someaction">
    <Select {items} bind:value>
        <svelte:fragment slot="input-hidden" let:value>
            <input type="hidden" name="demo" {...value} />
        </svelte:fragment>
    </Select>

    <button>Send</button>
</form>

{#if form?.success}
    <p>Data: {form?.demo}</p>
{/if}
