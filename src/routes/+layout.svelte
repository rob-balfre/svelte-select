<script>
    import { page } from '$app/stores';

    import { Highlight } from 'svelte-highlight';
    import typescript from 'svelte-highlight/languages/typescript';
    import highlightStyles from 'svelte-highlight/styles/atom-one-dark';

    const _props = import.meta.glob('./examples/props/*/*.svelte', { as: 'raw' });
    const _slots = import.meta.glob('./examples/slots/*/*.svelte', { as: 'raw' });
    const _events = import.meta.glob('./examples/events/*/*.svelte', { as: 'raw' });
    const _advanced = import.meta.glob('./examples/advanced/*/*.svelte', { as: 'raw' });

    $: setup = {
        props: buildLinks(_props),
        slots: buildLinks(_slots),
        events: buildLinks(_events),
        advanced: buildLinks(_advanced),
    };

    function buildLinks(obj) {
        return Object.keys(obj).map((key) => {
            const sp = key.split('/');
            const name = sp[3].split('.')[0];
            return {
                href: `${sp[1]}/${sp[2]}/` + name,
                name: name.replace(/-./g, (x) => x[1].toUpperCase()),
                source: obj[key],
            };
        });
    }

    $: handleExampleCode($page);

    let source;
    async function handleExampleCode(newPage) {
        if (!newPage?.routeId) return;

        if (newPage.routeId.includes('examples/')) {
            const s = newPage.routeId.split('/');
            const file = setup[s[1]].find((i) => i.href.includes(s[2]));
            const raw = await file.source();
            source = raw.replace('$lib/Select.svelte', 'svelte-select');
        } else {
            source = null;
        }
    }

</script>

<svelte:head>
    {@html highlightStyles}
</svelte:head>

<div class="container">
    <nav>
        <ul>
            <li><a <a class:active={$page.routeId === 'examples'} href="/">Home</a></li>
        </ul>
        
        <h2>Props</h2>
        <ul>
            {#each setup.props as { href, name }}
                <li><a class:active={$page.routeId === href} href={`/${href}`}>{name}</a></li>
            {/each}
        </ul>

        <h2>Slots</h2>
        <ul>
            {#each setup.slots as { href, name }}
                <li><a class:active={$page.routeId === href} href={`/${href}`}>{name}</a></li>
            {/each}
        </ul>

        <h2>Events</h2>
        <ul>
            {#each setup.events as { href, name }}
                <li><a class:active={$page.routeId === href} href={`/${href}`}>{name}</a></li>
            {/each}
        </ul>

        <h2>Advanced</h2>
        <ul>
            {#each setup.advanced as { href, name }}
                <li><a class:active={$page.routeId === href} href={`/${href}`}>{name}</a></li>
            {/each}
        </ul>
    </nav>

    <div class="content">
        <slot />

        {#if source}
            <Highlight language={typescript} code={source} />
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        gap: 30px;
    }

    h2 {
        margin: 0;
        font-size: 16px;
        padding: 10px;
        border-bottom: 1px solid #f3f1fd;
    }

    nav {
        width: 250px;
        border-right: 1px solid #f3f1fd;
        overflow-y: scroll;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
    }

    .content {
        position: fixed;
        left: 250px;
        right: 0;
        top: 0;
        bottom: 0;
        overflow-y: auto;
        padding: 30px;
        flex-grow: 1;
    }

    ul {
        padding: 0;
        margin: 0 0 10px;
        list-style: none;
    }

    li {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #f3f1fd;
    }

    a {
        color: #696d75;
        padding: 10px;
        text-decoration: none;
        font-size: 16px;
    }

    a.active {
        background: #f3f1fd;
        color: black;
        font-weight: bold;
    }
</style>
