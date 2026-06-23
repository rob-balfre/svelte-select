<script>
    import Select from '../../src/lib/Select.svelte';

    let items = ['one', 'two'];

    let floatingConfig = {
        strategy: 'fixed',
    };
</script>

<Select {items} listOpen {floatingConfig} --list-position="fixed" />
