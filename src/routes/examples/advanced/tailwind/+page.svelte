<script>
    import Select from 'svelte-select/no-styles/Select.svelte';

    /* 
        Tailwind support is very experimental (lib author does not use it) and in need of some PRs to improve
        import 'svelte-select/tailwind.css';
        For sveltekit support see: https://tailwindcss.com/docs/guides/sveltekit
    */

    let items = ['One', 'Two', 'Three'];
</script>

<Select {items} />
