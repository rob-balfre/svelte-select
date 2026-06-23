import { mount, unmount, tick, flushSync } from 'svelte';

const EVENTS = ['input', 'change', 'select', 'clear', 'filter', 'hoverItem', 'focus', 'blur', 'error', 'loaded'];

/**
 * We always add these to props so changes on the inside of the component reflect on the outside
 * and we can check their updated values.
 */
const BINDABLE_DEFAULTS = {
    value: undefined,
    filterText: '',
    items: null,
    loading: false,
    listOpen: false,
    focused: false,
    hoverItemIndex: 0,
    justValue: undefined,
};

export function mountComponent(Component, target, initialProps = {}) {
    const handlers = {};
    const props = $state({ ...BINDABLE_DEFAULTS, ...initialProps });

    for (const event of EVENTS) {
        const prop = `on${event}`;
        if (!(prop in initialProps)) {
            props[prop] = (payload) => handlers[event]?.(payload);
        }
    }

    const instance = mount(Component, { target, props });
    flushSync();

    return {
        instance,
        props,
        handlers,
        on(event, callback) {
            handlers[event] = callback;
            return () => {
                delete handlers[event];
            };
        },
        async set(data) {
            Object.assign(props, data);
            await tick();
        },
        destroy() {
            unmount(instance);
        },
    };
}
