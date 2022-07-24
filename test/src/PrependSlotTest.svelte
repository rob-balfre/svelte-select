<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];
    let value;
</script>

<Select bind:items bind:value>
    <div class="before" slot="prepend">
        Before it all
    </div>
</Select>
