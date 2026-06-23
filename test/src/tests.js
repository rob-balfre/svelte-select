import Select from '../../src/lib/Select.svelte';
import ParentContainer from './Select/ParentContainer.svelte';
import { expect, test } from 'vitest';
import SelectionSlotTest from './SelectionSlotTest.svelte';
import SelectionSlotMultipleTest from './SelectionSlotMultipleTest.svelte';
import ChevronSlotTest from './ChevronSlotTest.svelte';
import PrependSlotTest from './PrependSlotTest.svelte';
import ClearIconSlotTest from './ClearIconSlotTest.svelte';
import ListSlotTest from './ListSlotTest.svelte';
import InputHiddenSlotTest from './InputHiddenSlotTest.svelte';
import ItemSlotTest from './ItemSlotTest.svelte';
import OuterListTest from './OuterListTest.svelte';
import ItemHeightTest from './ItemHeightTest.svelte';
import MultiItemColor from './MultiItemColor.svelte';
import GroupHeaderNotSelectable from './GroupHeaderNotSelectable.svelte';
import HoverItemIndexTest from './HoverItemIndexTest.svelte';
import LoadOptionsGroup from './LoadOptionsGroup.svelte';
import EmptySlotTest from './EmptySlotTest.svelte';
import LoadingIconSlotTest from './LoadingIconSlotTest.svelte';
import MultiClearIconSlotTest from './MultiClearIconSlotTest.svelte';
import RequiredSlotTest from './RequiredSlotTest.svelte';
import ListPositionFixedTest from './ListPositionFixedTest.svelte';
import CreateItemTest from './CreateItemTest.svelte';
import { mount, unmount } from 'svelte';

function querySelectorClick(selector) {
    if (selector === '.svelte-select') {
        const event = new PointerEvent('pointerup');
        document.querySelector(selector).dispatchEvent(event);
    } else {
        document.querySelector(selector).click();
    }
}

function handleKeyboard(key) {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: key }));
    return new Promise((f) => setTimeout(f, 0));
}

function handleSet(component, data) {
    component.$set(data);
    return new Promise((f) => setTimeout(f, 0));
}

function getPosts(filterText) {
    const filter_text = filterText ? filterText.replace(' ', '_').toLowerCase() : '';

    if (filter_text.length < 2) {
        return Promise.resolve([]);
    }

    const mock_posts = [
        { id: 1, name: 'Juniper Wheat Beer' },
        { id: 2, name: 'Cheese Pizza Lager' },
        { id: 3, name: 'Loaded Fries Ale' },
        { id: 4, name: 'Savory Stout' },
    ];

    const filtered_posts = mock_posts
        .filter((post) => post.name.toLowerCase().replace(' ', '_').includes(filter_text))
        .sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
        })
        .map((post) => ({ value: post.id, label: post.name }));

    return Promise.resolve(filtered_posts);
}

function resolvePromise() {
    return new Promise((resolve, reject) => {
        resolve(['a', 'b', 'c']);
    });
}

function rejectPromise() {
    return new Promise((resolve, reject) => {
        reject('error 123');
    });
}

// setup
const target = document.createElement('main');
document.body.appendChild(target);

const testTarget = document.createElement('div');
testTarget.id = 'testTemplate';
document.body.appendChild(testTarget);

const extraTarget = document.createElement('div');
extraTarget.id = 'extra';
document.body.appendChild(extraTarget);

const items = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'pizza', label: 'Pizza' },
    { value: 'cake', label: 'Cake' },
    { value: 'chips', label: 'Chips' },
    { value: 'ice-cream', label: 'Ice Cream' },
];

const itemsWithGroup = [
    { value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
    { value: 'pizza', label: 'Pizza', group: 'Savory' },
    { value: 'cake', label: 'Cake', group: 'Sweet' },
    { value: 'chips', label: 'Chips', group: 'Savory' },
    { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
];

const itemsWithGroupAndSelectable = [
    { value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
    { value: 'pizza', label: 'Pizza', group: 'Savory' },
    { value: 'cake', label: 'Cake', group: 'Sweet', selectable: false },
    { value: 'chips', label: 'Chips', group: 'Savory', selectable: false },
    { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
];

const itemsWithIndex = [
    { value: 'chocolate', label: 'Chocolate', index: 0 },
    { value: 'pizza', label: 'Pizza', index: 1 },
    { value: 'cake', label: 'Cake', index: 2 },
    { value: 'chips', label: 'Chips', index: 3 },
    { value: 'ice-cream', label: 'Ice Cream', index: 4 },
];

const collection = [
    { _id: 0, label: 'Chocolate' },
    { _id: 1, label: 'Pizza' },
    { _id: 2, label: 'Cake' },
    { _id: 3, label: 'Chips' },
    { _id: 4, label: 'Ice Cream' },
];

const itemsWithSelectable = [
    { value: 'notSelectable1', label: 'NotSelectable1', selectable: false },
    { value: 'selectableDefault', label: 'SelectableDefault' },
    { value: 'selectableTrue', label: 'SelectableTrue', selectable: true },
    { value: 'notSelectable2', label: 'NotSelectable2', selectable: false },
];

function itemsPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(JSON.stringify(items)));
        });
    });
}

function wait(ms) {
    return new Promise((f) => setTimeout(f, ms));
}

function ok(value) {
    expect(value).toBeTruthy();
}

function equal(actual, expected) {
    expect(actual).toBe(expected);
}

test('when focused true container adds focused class', async () => {
    const select = mount(Select, {
        target,
        props: {
            focused: true,
        },
    });

    ok(target.querySelector('.focused'));

    unmount(select);
});

test('when focused changes to true input should focus', async () => {
    const select = mount(Select, {
        target,
    });

    select.$set({ focused: true });

    const hasFocused = target.querySelector('.svelte-select input');
    ok(hasFocused);
    unmount(select);
});

test('default empty list', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
        },
    });

    ok(document.querySelector('.empty'));

    unmount(select);
});

test('default list with five items', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithIndex,
        },
    });

    ok(document.getElementsByClassName('list-item').length);

    unmount(select);
});

test('should highlight active list item', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithIndex,
            value: { value: 'pizza', label: 'Pizza', index: 1 },
        },
    });

    ok(document.querySelector('.list-item .active').innerHTML === 'Pizza');

    unmount(select);
});

test('list scrolls to active item', async () => {
    const extras = [
        { value: 'chicken', label: 'Chicken', index: 5 },
        { value: 'fried-chicken', label: 'Fried Chicken', index: 6 },
        { value: 'sunday-roast', label: 'Sunday Roast', index: 7 },
    ];

    const select = mount(Select, {
        target,
        props: {
            items: itemsWithIndex.concat(extras),
            value: { value: 'sunday-roast', label: 'Sunday Roast' },
        },
    });

    select.listOpen = true;
    let offsetBounding;
    const container = document.querySelector('.svelte-select-list');
    const focusedElemBounding = container.querySelector('.list-item .active');
    if (focusedElemBounding) {
        offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
    }

    equal(offsetBounding, 0);
    unmount(select);
});

test('list scrolls to hovered item when navigating with keys', async () => {
    const extras = [
        { value: 'chicken', label: 'Chicken', index: 5 },
        { value: 'fried-chicken', label: 'Fried Chicken', index: 6 },
        { value: 'sunday-roast', label: 'Sunday Roast', index: 7 },
    ];

    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithIndex.concat(extras),
        },
    });

    const container = document.querySelector('.svelte-select-list');

    const totalListItems = container.querySelectorAll('.list-item').length;
    let selectedItemsAreWithinBounds = true;
    let loopCount = 1;

    do {
        await handleKeyboard('ArrowDown');

        const hoveredItem = container.querySelector('.list-item .hover');
        const isInViewport = container.getBoundingClientRect().bottom - hoveredItem.getBoundingClientRect().bottom >= 0;

        selectedItemsAreWithinBounds = selectedItemsAreWithinBounds && isInViewport;

        loopCount += 1;
    } while (loopCount < totalListItems);

    ok(selectedItemsAreWithinBounds);
    unmount(select);
});

test('hover item updates on keyUp or keyDown', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: items,
        },
    });

    await handleKeyboard('ArrowDown', document.querySelector('.svelte-select-list'));
    const focusedElemBounding = document.querySelector('.list-item .hover');
    equal(focusedElemBounding.innerHTML.trim(), `Pizza`);
    unmount(select);
});

test('on enter active item fires a select event', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithIndex,
        },
    });

    let value = undefined;

    select.$on('change', (event) => {
        value = JSON.stringify(event.detail);
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(0);
    equal(value, JSON.stringify({ value: 'cake', label: 'Cake', index: 2 }));
    unmount(select);
});

test('on tab active item fires a select event', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithIndex,
        },
    });

    let value = undefined;
    select.$on('change', (event) => {
        value = JSON.stringify(event.detail);
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    await wait(0);
    equal(value, JSON.stringify({ value: 'cake', label: 'Cake', index: 2 }));
    unmount(select);
});

test('on selected of current active item does not fire a select event', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithIndex,
            value: { value: 'chocolate', label: 'Chocolate', index: 0 },
        },
    });

    let itemSelectedFired = false;

    select.$on('change', () => {
        itemSelectedFired = true;
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    equal(itemSelectedFired, false);
    unmount(select);
});

test("selected item's default view", async () => {
    const select = mount(Select, {
        target,
        props: {
            value: { value: 'chips', label: 'Chips' },
        },
    });

    ok(target.querySelector('.selected-item').innerHTML === 'Chips');
    unmount(select);
});

test('select view updates with value updates', async () => {
    const select = mount(Select, {
        target,
    });

    await handleSet(select, { value: { value: 'chips', label: 'Chips' } });
    ok(target.querySelector('.selected-item').innerHTML === 'Chips');

    unmount(select);
});

test('clear wipes value and updates view', async () => {
    const select = mount(Select, {
        target,
        props: {
            value: { value: 'chips', label: 'Chips' },
        },
    });

    await wait(0);
    await handleSet(select, { value: undefined });
    ok(!target.querySelector('.selected-item'));

    unmount(select);
});

test('clicking on Select opens list', async () => {
    const select = mount(Select, {
        target,
        props: {},
    });

    await querySelectorClick('.svelte-select');
    const listContainer = document.querySelector('.svelte-select-list');
    ok(listContainer);

    unmount(select);
});

test('Select opens list populated with items', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    await querySelectorClick('.svelte-select');
    ok(document.querySelector('.list-item'));

    unmount(select);
});

test('list starts with first item in hover state', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    await querySelectorClick('.svelte-select');
    ok(document.querySelector('.list-item .hover').innerHTML === 'Chocolate');

    unmount(select);
});

test('select item from list', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    await querySelectorClick('.svelte-select');
    await handleKeyboard('ArrowDown');
    await handleKeyboard('ArrowDown');
    await handleKeyboard('Enter');
    ok(document.querySelector('.selected-item').innerHTML === 'Cake');

    unmount(select);
});

test('when placement is set to top list should be above the input', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
            floatingConfig: { placement: 'top-start' },
        },
    });

    target.style.margin = '300px 0 0 0';
    await wait(0);
    const distanceOfListBottomFromViewportTop = document
        .querySelector('.svelte-select-list')
        .getBoundingClientRect().bottom;
    const distanceOfInputTopFromViewportTop = document.querySelector('.svelte-select').getBoundingClientRect().top;
    ok(distanceOfListBottomFromViewportTop <= distanceOfInputTopFromViewportTop);
    target.style.margin = '0';
    unmount(select);
});

test('when placement is set to bottom the list should be below the input', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
            floatingConfig: { placement: 'bottom-start' },
        },
    });

    await wait(0);
    const distanceOfListTopFromViewportTop = document.querySelector('.svelte-select-list').getBoundingClientRect().top;
    const distanceOfInputBottomFromViewportTop = document
        .querySelector('.svelte-select')
        .getBoundingClientRect().bottom;

    ok(distanceOfListTopFromViewportTop >= distanceOfInputBottomFromViewportTop);

    unmount(select);
});

test('blur should close list and remove focus from select', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    select.$set({ focused: true });
    div.click();
    div.remove();
    ok(!document.querySelector('.svelte-select-list'));
    ok(document.querySelector('.svelte-select input') !== document.activeElement);
    unmount(select);
});

test('blur should close list and remove focus from select but preserve filterText value', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const select = mount(Select, {
        target,
        props: {
            items,
            clearFilterTextOnBlur: false,
        },
    });

    const selectInput = document.querySelector('.svelte-select input');

    select.$set({ focused: true });
    select.$set({ filterText: 'potato' });
    div.click();
    div.remove();
    ok(!document.querySelector('.svelte-select-list'));
    ok(selectInput !== document.activeElement);

    await wait(0);
    ok(selectInput.value === 'potato');
    unmount(select);
});

test('blur should close list and remove focus from select and clear filterText value', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    const selectInput = document.querySelector('.svelte-select input');

    select.$set({ listOpen: true });
    select.$set({ filterText: 'potato' });
    await wait(0);
    selectInput.blur();
    await wait(0);
    ok(selectInput.value === '');
    unmount(select);
});

test('selecting item should close list but keep focus on select', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    querySelectorClick('.svelte-select');
    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(0);
    ok(!document.querySelector('.svelte-select-list'));
    ok(document.querySelector('.svelte-select.focused'));
    unmount(select);
});

test('clicking Select with selected item should open list with item listed as active', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });
    querySelectorClick('.svelte-select');
    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(0);
    querySelectorClick('.svelte-select');
    await wait(0);
    ok(document.querySelector('.list-item .active').innerHTML === 'Cake');
    unmount(select);
});

test('focus on Select input updates focus state', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    document.querySelector('.svelte-select input').focus();

    ok(select.focused);
    unmount(select);
});

test('key up and down when Select focused opens list', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    const input = document.querySelector('.svelte-select input');
    input.focus();
    await wait(0);
    ok(select.focused);
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await wait(0);
    ok(document.querySelector('.svelte-select-list'));

    unmount(select);
});

test('list should keep width of parent Select', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            focused: true,
        },
    });

    const input = document.querySelector('.svelte-select input');
    input.focus();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await wait(0);
    const selectContainer = document.querySelector('.svelte-select');
    const listContainer = document.querySelector('.svelte-select-list');
    equal(selectContainer.offsetWidth, listContainer.offsetWidth);

    unmount(select);
});

test('Placeholder text should reappear when list is closed', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    querySelectorClick('.svelte-select');
    div.click();
    div.remove();
    const selectInput = document.querySelector('.svelte-select input');
    equal(selectInput.attributes.placeholder.value, 'Please select');

    unmount(select);
});

test('typing in Select filter will hide selected Item', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    querySelectorClick('.svelte-select');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    select.$set({ filterText: 'potato' });
    ok(!document.querySelector('.svelte-select .value'));

    unmount(select);
});

test('clearing selected item closes list if open', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    querySelectorClick('.svelte-select');
    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(0);
    select.handleClear();
    await wait(0);
    ok(!document.querySelector('.svelte-select-list'));

    unmount(select);
});

test('closing list clears Select filter text', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    querySelectorClick('.svelte-select');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    select.$set({ filterText: 'potato' });
    div.click();
    div.remove();
    const selectInput = document.querySelector('.svelte-select input');
    equal(selectInput.attributes.placeholder.value, 'Please select');

    unmount(select);
});

test('closing list clears Select filter text', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    querySelectorClick('.svelte-select');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    select.$set({ filterText: 'potato' });
    div.click();
    div.remove();
    const selectInput = document.querySelector('.svelte-select input');
    equal(selectInput.attributes.placeholder.value, 'Please select');

    unmount(select);
});

test('closing list item clears Select filter text', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    querySelectorClick('.svelte-select');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    select.$set({ filterText: 'potato' });
    div.click();
    div.remove();
    const selectInput = document.querySelector('.svelte-select input');
    equal(selectInput.attributes.placeholder.value, 'Please select');

    unmount(select);
});

test('typing while Select is focused populates Select filter text', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    select.$set({ focused: true });
    document.querySelector('.svelte-select input').blur();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 't' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 't' }));
    // KeyboardEvent not firing in svelte - not sure why, manual test seems to work

    unmount(select);
});

test('Select input placeholder wipes while item is selected', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: { name: 'Item #2' },
        },
    });

    const selectInput = document.querySelector('.svelte-select input');
    equal(selectInput.attributes.placeholder.value, '');

    unmount(select);
});

test('Select listOpen state controls list', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
        },
    });

    await wait(0);
    ok(document.querySelector('.svelte-select-list'));
    await handleSet(select, { listOpen: false });
    ok(!document.querySelector('.svelte-select-list'));

    unmount(select);
});

test('clicking Select toggles list open state', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    ok(!document.querySelector('.svelte-select-list'));
    await querySelectorClick('.svelte-select');
    ok(document.querySelector('.svelte-select-list'));
    await querySelectorClick('.svelte-select');
    ok(!document.querySelector('.svelte-select-list'));
    unmount(select);
});

test('Select filter text filters list', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    ok(select.getFilteredItems().length === 5);
    select.filterText = 'Ice';
    ok(select.getFilteredItems().length === 1);

    unmount(select);
});

test('Select filter text filters list with itemFilter', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            itemFilter: (label, filterText, option) => label === 'Ice Cream',
        },
    });

    ok(select.getFilteredItems().length === 1);
    select.filterText = 'cream ice';
    ok(select.getFilteredItems().length === 1);

    unmount(select);
});

test('Typing in the Select filter opens list', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            focused: true,
        },
    });

    await handleSet(select, { filterText: '5' });
    ok(document.querySelector('.svelte-select-list'));
    unmount(select);
});

test('While filtering, the first item in list should receive hover class', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            focused: true,
        },
    });

    await wait(0);
    await handleSet(select, { filterText: 'I' });
    ok(document.querySelector('.list-item .hover'));
    unmount(select);
});

test('Select container styles can be overridden', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: { name: 'Item #2' },
            containerStyles: `padding-left: 40px;`,
        },
    });

    equal(document.querySelector('.svelte-select').style.cssText, `padding-left: 40px;`);
    unmount(select);
});

test('Select can be disabled', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            disabled: true,
        },
    });

    ok(document.querySelector('.svelte-select.disabled'));

    unmount(select);
});

test('Select list closes when you click enter', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            focused: true,
        },
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    unmount(select);
});

test('tabbing should move between tabIndexes and others Selects', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            focused: false,
        },
    });

    const other = mount(Select, {
        target: extraTarget,
        props: {
            items,
            focused: false,
        },
    });

    // window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
    // TAB not working from Puppeteer - not sure why.

    unmount(select);
    unmount(other);
});

test(`shouldn't be able to clear a disabled Select`, async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            disabled: true,
            value: { name: 'Item #4' },
        },
    });

    ok(!document.querySelector('.clear-select'));

    unmount(select);
});

test(`two way binding between Select and it's parent component`, async () => {
    const parent = mount(ParentContainer, {
        target,
        props: {
            items,
            value: { value: 'chips', label: 'Chips' },
        },
    });

    equal(document.querySelector('.selected-item').innerHTML, document.querySelector('.result').innerHTML);

    parent.$set({
        value: { value: 'ice-cream', label: 'Ice Cream' },
    });

    equal(document.querySelector('.selected-item').innerHTML, document.querySelector('.result').innerHTML);
    querySelectorClick('.svelte-select');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    equal(document.querySelector('.selected-item').innerHTML, document.querySelector('.result').innerHTML);

    unmount(parent);
});

test(`show ellipsis for overflowing text in a list item`, async () => {
    const longest =
        'super super super super super super super super super super super super super super super super super super super super super super super super super super super super loooooonnnng name';

    target.style.width = '300px';
    target.style.position = 'relative';

    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: [
                {
                    index: 0,
                    label: longest,
                },
                {
                    index: 1,
                    label: 'Not so loooooonnnng name',
                },
            ],
        },
    });

    await wait(0);
    const first = document.querySelector('.list-item:first-child .item');
    const last = document.querySelector('.list-item:last-child .item');

    ok(first.scrollWidth > first.clientWidth);
    ok(last.scrollWidth === last.clientWidth);

    unmount(select);
    target.style.width = '';
});

test('focusing in an external textarea should close and blur it', async () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items,
        },
    });

    textarea.focus();
    await wait(0);
    ok(!select.listOpen);
    textarea.remove();
    unmount(select);
});

test('if only one item in list it should have hover state', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: [
                {
                    index: 0,
                    name: 'test one',
                },
            ],
        },
    });

    ok(document.querySelector('.list-item .item').classList.contains('hover'));

    unmount(select);
});

test(`hovered item in a filtered list shows hover state`, async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    select.$set({ filterText: 'i' });

    // const lastItem = document.querySelector('.list-item:last-child');
    // hover item and check for hover state

    ok(true);

    unmount(select);
});

test(`data shouldn't be stripped from item - currently only saves name`, async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    await querySelectorClick('.svelte-select');
    await querySelectorClick('.list-item');
    equal(JSON.stringify(select.value), JSON.stringify({ value: 'chocolate', label: 'Chocolate' }));

    unmount(select);
});

test('should not be able to clear when clearing is disabled', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            clearable: false,
        },
    });

    querySelectorClick('.svelte-select');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    ok(!document.querySelector('.clear-select'));

    unmount(select);
});

test('should not be able to search when searching is disabled', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            searchable: false,
        },
    });

    const selectInput = document.querySelector('.svelte-select input');
    ok(selectInput.attributes.readonly);

    unmount(select);
});

test('placeholder should be prop value', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const placeholder = 'Test placeholder value';

    const select = mount(Select, {
        target,
        props: {
            items: itemsWithGroup,
            placeholder,
        },
    });

    const selectInput = document.querySelector('.svelte-select input');
    equal(selectInput.attributes.placeholder.value, placeholder);

    unmount(select);
});

test('should display loading icon when loading is enabled', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const select = mount(Select, {
        target,
        props: {
            items,
            loading: true,
        },
    });

    ok(document.querySelector('.loading'));

    unmount(select);
});

test('inputStyles prop applies css to select input', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: { value: 'pizza', label: 'Pizza' },
            inputStyles: `padding-left: 40px;`,
        },
    });

    equal(document.querySelector('.svelte-select input').style.cssText, `padding-left: 40px;`);
    unmount(select);
});

test('items should be grouped by groupBy expression', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithGroup,
            groupBy,
        },
    });

    function groupBy(item) {
        return item.group;
    }

    let title = document.querySelector('.list-group-title').innerHTML;
    ok(title === 'Sweet');
    let item = document.querySelector('.list-item .item.group-item').innerHTML;
    ok(item === 'Chocolate');
    unmount(select);
});

test('clicking group header should not make a selected', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithGroup,
            groupBy: (item) => item.group,
        },
    });

    await wait(0);
    await querySelectorClick('.list-group-title');

    ok(!select.value);

    unmount(select);
});

test('clicking an item with selectable: false should not make a selected', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithSelectable,
        },
    });

    await wait(0);
    await querySelectorClick('.list-item:nth-child(1)');
    ok(!select.value);
    select.listOpen = true;
    await querySelectorClick('.list-item:nth-child(4)');
    ok(!select.value);

    unmount(select);
});

test('clicking an item with selectable not specified should make a selected', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithSelectable,
        },
    });

    await wait(0);
    document.querySelector('.list-item:nth-child(2)').click();
    ok(select.value && select.value.value == 'selectableDefault');

    unmount(select);
});

test('clicking an item with selectable: true should make a selected', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithSelectable,
        },
    });

    await wait(0);
    await querySelectorClick('.list-item:nth-child(3)');
    ok(select.value && select.value.value == 'selectableTrue');
    unmount(select);
});

test('when groupBy, no active item and keydown enter is fired then list should close without selecting item', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithGroup,
            groupBy: (item) => item.group,
        },
    });

    await wait(0);
    await querySelectorClick('.svelte-select');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ok(!select.value);

    unmount(select);
});

test('when groupHeaderSelectable clicking group header should select createGroupHeaderItem(groupValue,item)', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithGroup,
            groupHeaderSelectable: true,
            groupBy,
            createGroupHeaderItem,
        },
    });

    function groupBy(item) {
        return item.group;
    }

    function createGroupHeaderItem(groupValue, item) {
        return {
            label: `XXX ${groupValue} XXX ${item.label}`,
        };
    }

    await wait(0);

    const groupHeaderItem = select.getFilteredItems()[0];
    const groupItem = select.getFilteredItems().find((item) => {
        return item.group === groupHeaderItem.id;
    });

    await querySelectorClick('.list-item');

    ok(select.value.groupHeader);
    equal(select.value.label, createGroupHeaderItem(groupBy(groupItem), groupItem).label);

    unmount(select);
});

test('groups should be sorted by expression', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithGroup,
            groupBy: (item) => item.group,
            groupFilter: (groups) => groups.reverse(),
        },
    });

    await wait();

    ok(document.querySelector('.list-group-title').textContent.trim() === 'Savory');
    ok(document.querySelector('.list-item .group-item').textContent.trim() === 'Pizza');

    unmount(select);
});

test('when multiple is true show each item in value', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [
                { value: 'pizza', label: 'Pizza' },
                { value: 'chips', label: 'Chips' },
            ],
        },
    });

    const all = target.querySelectorAll('.multi-item span');

    ok(all[0].innerHTML.startsWith('Pizza'));
    ok(all[1].innerHTML.startsWith('Chips'));

    unmount(select);
});

test('when multiple is true and value is undefined show placeholder text', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: undefined,
        },
    });

    ok(!target.querySelector('.multi-item span'));

    unmount(select);
});

test('when multiple is true clicking item in list will populate value', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: undefined,
        },
    });

    await querySelectorClick('.svelte-select');
    await querySelectorClick('.list-item');

    equal(JSON.stringify(select.value), JSON.stringify([{ value: 'chocolate', label: 'Chocolate' }]));

    unmount(select);
});

test('when multiple is true items in value will not appear in list', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [{ value: 'chocolate', label: 'Chocolate' }],
        },
    });

    await wait(0);

    equal(
        JSON.stringify(select.getFilteredItems()),
        JSON.stringify([
            { value: 'pizza', label: 'Pizza' },
            { value: 'cake', label: 'Cake' },
            { value: 'chips', label: 'Chips' },
            { value: 'ice-cream', label: 'Ice Cream' },
        ]),
    );

    unmount(select);
});

test('when multiple is true both value and filterText filters list', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            multiple: true,
            items,
            value: [{ value: 'chocolate', label: 'Chocolate' }],
        },
    });

    ((select.filterText = 'Pizza'),
        equal(JSON.stringify(select.getFilteredItems()), JSON.stringify([{ value: 'pizza', label: 'Pizza' }])));

    unmount(select);
});

test('when multiple is true clicking X on a selected item will remove it from value', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'pizza', label: 'Pizza' },
            ],
        },
    });

    const event = new PointerEvent('pointerup');
    document.querySelector('.multi-item-clear').dispatchEvent(event);
    equal(JSON.stringify(select.value), JSON.stringify([{ value: 'pizza', label: 'Pizza' }]));

    unmount(select);
});

test('when multiple is true and all selected items have been removed then placeholder should show and clear all should hide', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [{ value: 'chocolate', label: 'Chocolate' }],
        },
    });

    document.querySelector('.multi-item-clear').click();

    unmount(select);
});

test('when multiple is true and items are selected then clear all should wipe all selected items', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'pizza', label: 'Pizza' },
            ],
        },
    });

    document.querySelector('.clear-select').click();
    equal(select.value, undefined);

    unmount(select);
});

test('when multiple and groupBy is active then items should be selectable', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items: itemsWithGroup,
            groupBy: (item) => item.group,
        },
    });

    target.style.maxWidth = '400px';
    await querySelectorClick('.svelte-select');
    await querySelectorClick('.list-item .group-item');
    equal(
        JSON.stringify(select.value),
        JSON.stringify([{ groupItem: true, value: 'chocolate', label: 'Chocolate', group: 'Sweet' }]),
    );

    unmount(select);
});

test('when multiple and selected items reach edge of container then Select height should increase and selected items should wrap to new line', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
        },
    });

    target.style.maxWidth = '200px';
    ok(document.querySelector('.svelte-select').scrollHeight === 40);
    await handleSet(select, {
        value: [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'pizza', label: 'Pizza' },
        ],
    });
    ok(document.querySelector('.svelte-select').scrollHeight > 42);
    unmount(select);
});

test('when multiple and value is populated then navigating with LeftArrow updates activeValue', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'pizza', label: 'Pizza' },
                { value: 'chips', label: 'Chips' },
            ],
            focused: true,
        },
    });

    target.style.maxWidth = '100%';

    const input = document.querySelector('.svelte-select input');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

    ok(select.$capture_state().activeValue === 1);

    unmount(select);
});

test('when multiple and value is populated then navigating with ArrowRight updates activeValue', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'pizza', label: 'Pizza' },
                { value: 'chips', label: 'Chips' },
            ],
            focused: true,
        },
    });

    const input = document.querySelector('.svelte-select input');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    ok(select.$capture_state().activeValue === 1);

    unmount(select);
});

test('when multiple and value has items and list opens then first item in list should be active', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
        },
    });

    await querySelectorClick('.svelte-select');
    await querySelectorClick('.list-item');
    await wait(0);
    await handleKeyboard('ArrowDown');
    ok(document.querySelector('.list-item .hover'));
    unmount(select);
});

test('when multiple, disabled, and value has items then items should be locked', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            disabled: true,
            value: [{ value: 'chocolate', label: 'Chocolate' }],
        },
    });

    ok(document.querySelector('.multi-item.disabled'));

    unmount(select);
});

test('when multiple is true show each item in value if simple arrays are used', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items: ['pizza', 'chips', 'chocolate'],
            value: ['pizza', 'chocolate'],
        },
    });

    const all = target.querySelectorAll('.multi-item span');
    ok(all[0].innerHTML.startsWith('pizza'));
    ok(all[1].innerHTML.startsWith('chocolate'));

    unmount(select);
});

test('when label is set you can pass a string and see the right label', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: [
                { id: 0, name: 'ONE' },
                { id: 1, name: 'TWO' },
            ],
            value: { id: 0, name: 'ONE' },
            label: 'name',
        },
    });

    ok(document.querySelector('.selected-item').innerHTML === 'ONE');

    unmount(select);
});

test('when getValue method is set should use that key to update value', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: [
                { id: 0, label: 'ONE' },
                { id: 1, label: 'TWO' },
            ],
            value: { id: 0, label: 'ONE' },
            itemId: 'id',
        },
    });

    ok(select.value.id === 0);
    await querySelectorClick('.svelte-select');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ok(select.value.id === 1);

    unmount(select);
});

test('when loadOptions method is supplied and filterText has length then items should populate via promise resolve', async () => {
    const select = mount(Select, {
        target,
        props: {
            label: 'name',
            loadOptions: getPosts,
            itemId: 'id',
        },
    });

    await wait(0);
    select.$set({ filterText: 'Juniper' });
    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    unmount(select);
});

test('when label method is supplied and value are no items then display result of label', async () => {
    const select = mount(Select, {
        target,
        props: {
            label: 'notLabel',
            value: { notLabel: 'This is not a label', value: 'not important' },
        },
    });

    ok(document.querySelector('.selected-item').innerHTML === 'This is not a label');

    unmount(select);
});

test('when label and items is supplied then display result of label for each option', async () => {
    const select = mount(Select, {
        target,
        props: {
            label: 'notLabel',
            listOpen: true,
            items: [
                { notLabel: 'This is not a label', value: 'not important #1' },
                { notLabel: 'This is not also not a label', value: 'not important #2' },
            ],
        },
    });

    ok(document.querySelector('.item')?.innerHTML === 'This is not a label');

    unmount(select);
});

test('when label method and items is supplied then display result of label for each option', async () => {
    const select = mount(Select, {
        target,
        props: {
            label: 'notLabel',
            listOpen: true,
            items: [
                { notLabel: 'This is not a label', value: 'not important #1' },
                { notLabel: 'This is not also not a label', value: 'not important #2' },
            ],
        },
    });

    ok(document.querySelector('.item').innerHTML === 'This is not a label');

    unmount(select);
});

test('when loadOptions method is supplied, multiple is true and filterText has length then items should populate via promise resolve', async () => {
    const select = mount(Select, {
        target,
        props: {
            loadOptions: getPosts,
            itemId: 'id',
            multiple: true,
        },
    });

    await wait(0);
    await handleSet(select, { filterText: 'Juniper' });
    await wait(600);
    await handleKeyboard('ArrowDown');
    await handleKeyboard('Enter');
    ok(document.querySelector('.multi-item span').innerHTML.startsWith('Juniper Wheat Beer'));
    unmount(select);
});

test('when selection slot render slot content', async () => {
    const select = mount(SelectionSlotTest, {
        target,
    });

    ok(document.querySelector('.selected-item').innerHTML === 'Slot: one');

    unmount(select);
});

test('when multiple and selection slot render slot content', async () => {
    const select = mount(SelectionSlotMultipleTest, {
        target,
    });

    const items = document.querySelectorAll('.multi-item span');

    ok(items[0].innerHTML.startsWith('Index: 0 Slot: one'));
    ok(items[1].innerHTML.startsWith('Index: 1 Slot: two'));

    unmount(select);
});

test('when hideEmptyState true then do not show "no items" div ', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
            filterText: 'x',
            hideEmptyState: true,
        },
    });

    await wait(0);

    ok(!document.querySelector('.empty'));

    unmount(select);
});

test('when value is selected then change event should fire', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items,
        },
    });

    let selectEvent = undefined;

    select.$on('change', (event) => {
        selectEvent = event;
    });

    await handleKeyboard('ArrowDown');
    await handleKeyboard('Enter');

    ok(selectEvent);

    unmount(select);
});

test('when value is cleared the clear event is fired', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: items[0],
        },
    });

    let clearEvent = false;
    select.$on('clear', () => {
        clearEvent = true;
    });

    document.querySelector('.clear-select').click();

    ok(clearEvent);

    unmount(select);
});

test('when multi item is cleared the clear event is fired with removed item', async () => {
    const itemToRemove = items[0];

    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [itemToRemove],
        },
    });

    let removedItem;

    select.$on('clear', (event) => {
        removedItem = event.detail;
    });

    const event = new PointerEvent('pointerup');
    document.querySelector('.multi-item-clear').dispatchEvent(event);
    equal(JSON.stringify(removedItem), JSON.stringify(itemToRemove));

    unmount(select);
});

test('when single item is cleared the clear event is fired with removed item', async () => {
    const itemToRemove = items[0];

    const select = mount(Select, {
        target,
        props: {
            items,
            value: itemToRemove,
        },
    });

    let removedItem;

    select.$on('clear', (event) => {
        removedItem = event.detail;
    });

    document.querySelector('.clear-select').click();
    equal(JSON.stringify(removedItem), JSON.stringify(itemToRemove));

    unmount(select);
});

test('when items in list filter or update then first item in list should highlight', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            focused: true,
        },
    });

    await handleKeyboard('ArrowDown');
    ok(document.querySelector('.svelte-select-list .hover').innerHTML === 'Chocolate');
    await handleSet(select, { filterText: 'chi' });
    ok(document.querySelector('.hover').innerHTML === 'Chips');

    unmount(select);
});

test('when item is selected or state changes then check value[itemId] has changed before firing "input" event', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: { value: 'cake', label: 'Cake' },
        },
    });

    let item = undefined;
    select.$on('input', () => {
        item = true;
    });
    await handleSet(select, { value: { value: 'cake', label: 'Cake' } });
    ok(!item);

    unmount(select);
});

test('when multiple and item is selected or state changes then check value[itemId] has changed before firing "input" event', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [
                { value: 'pizza', label: 'Pizza' },
                { value: 'chips', label: 'Chips' },
            ],
        },
    });

    let item = undefined;

    select.$on('input', () => {
        item = true;
    });

    await handleSet(select, {
        value: [
            { value: 'pizza', label: 'Pizza' },
            { value: 'chips', label: 'Chips' },
        ],
    });
    ok(!item);
    item = false;
    await handleSet(select, { value: [{ value: 'pizza', label: 'Pizza' }] });

    ok(item);
    unmount(select);
});

test('when focused turns to false then check Select is no longer in focus', async () => {
    const select = mount(Select, {
        target,
        props: {
            focused: true,
            items,
        },
    });

    const selectSecond = mount(Select, {
        target: extraTarget,
        props: {
            focused: false,
            items,
        },
    });

    select.$on('input', () => {
        setTimeout(() => {
            select.$set({
                focused: false,
            });
        }, 0);

        selectSecond.$set({
            focused: true,
        });
    });

    await handleSet(select, { value: { value: 'pizza', label: 'Pizza' } });

    await wait(0);

    ok(selectSecond.focused);
    ok(!select.focused);

    unmount(selectSecond);
    unmount(select);
});

test('when items is just an array of strings then render list', async () => {
    const items = ['one', 'two', 'three'];

    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
        },
    });

    await wait(0);
    ok(document.querySelector('.item').innerHTML === 'one');

    unmount(select);
});

test('when items are just strings then value should render', async () => {
    const items = ['one', 'two', 'three'];

    const select = mount(Select, {
        target,
        props: {
            items,
            value: { value: 'one', label: 'one', index: 0 },
        },
    });

    ok(document.querySelector('.selected-item').innerHTML === 'one');
    unmount(select);
});

test('when multiple and value has items then check each item is unique', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [
                { value: 'pizza', label: 'Pizza' },
                { value: 'pizza', label: 'Pizza' },
                { value: 'cake', label: 'Cake' },
            ],
        },
    });

    ok(select.value.length === 2);

    unmount(select);
});

test('when multiple and textFilter has length then enter should select item', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            focused: true,
            filterText: 'p',
            listOpen: true,
        },
    });

    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ok(select.value[0].value === 'pizza');

    unmount(select);
});

test('when multiple and textFilter has length and no items in list then enter should do nothing', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            focused: true,
            filterText: 'zc',
            listOpen: true,
        },
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ok(!select.value);

    unmount(select);
});

test('When multiple and no selected item then delete should do nothing', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            focused: true,
            listOpen: true,
        },
    });

    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
    ok(select.listOpen === true);

    unmount(select);
});

test('When list is open, filterText applied and Enter/Tab key pressed should select and show highlighted value', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            focused: true,
            filterText: 'A5',
            items: ['A5', 'test string', 'something else'],
        },
    });

    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    equal(select.value.value, 'A5');
    await wait(0);
    ok(target.querySelector('.selected-item').innerHTML === 'A5');

    unmount(select);
});

test('When inputAttributes is supplied each attribute is placed on the Select input field', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            inputAttributes: {
                id: 'testId',
                autocomplete: 'custom-value',
            },
        },
    });

    const el = document.getElementById('testId');

    equal(el.id, 'testId');
    equal(el.getAttribute('autocomplete'), 'custom-value');

    unmount(select);
});

test('when items and value supplied as just strings then value should render correctly', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: ['Pizza', 'Chocolate', 'Crisps'],
            value: 'Pizza',
        },
    });

    equal(document.querySelector('.selected-item').innerHTML, 'Pizza');

    unmount(select);
});

test('when multiple with items and value supplied as just strings then value should render correctly', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items: ['Pizza', 'Chocolate', 'Crisps'],
            value: ['Pizza'],
        },
    });

    ok(document.querySelector('.multi-item span').innerHTML.startsWith('Pizza'));

    unmount(select);
});

test('when multiple, groupBy and value are supplied then list should be filtered', async () => {
    let _items = [
        { id: 1, name: 'Foo', group: 'first' },
        { id: 2, name: 'Bar', group: 'second' },
        { id: 3, name: 'Baz', group: 'second' },
        { id: 4, name: 'Qux', group: 'first' },
        { id: 5, name: 'Bah', group: 'first' },
    ];

    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items: _items,
            groupBy: (item) => item.group,
            itemId: 'id',
            label: 'name',
            value: [{ id: 2, name: 'Bar', group: 'second' }],
            listOpen: true,
        },
    });

    ok(!select.getFilteredItems().find((item) => item.name === 'Bar'));

    unmount(select);
});

test('When items are collection and value a string then lookup item using itemId and update value to match', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: 'cake',
        },
    });

    await wait(0);
    ok(select.value.value === 'cake');
    select.$set({ value: 'pizza' });
    await wait(0);
    ok(select.value.value === 'pizza');
    unmount(select);
});

test('When listAutoWidth is set to false list container should have style of width:auto', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listAutoWidth: false,
            listOpen: true,
        },
    });

    await wait(0);
    const listWidth = document.querySelectorAll('.svelte-select-list')[0].style.width;
    ok(listWidth === 'auto');
    unmount(select);
});

test('When item is already active and is selected from list then close list', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
            value: 'pizza',
        },
    });

    await wait(0);
    await querySelectorClick('.svelte-select-list > .list-item > .item.active');
    await wait(0);
    ok(select.value.value === 'pizza');
    unmount(select);
});

test('When prepend named slot is supplied then render content', async () => {
    const select = mount(PrependSlotTest, {
        target,
    });

    ok(document.querySelector('.before').innerHTML === 'Before it all');

    unmount(select);
});

test('When showChevron prop is true only show chevron when there is no value on Select', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: { value: 'chocolate', label: 'Chocolate' },
            showChevron: true,
        },
    });

    ok(document.querySelectorAll('.indicator').length === 0);

    unmount(select);
});

test('When showChevron prop is true and no value show chevron on Select', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            showChevron: true,
        },
    });

    ok(document.querySelectorAll('.chevron')[0]);

    unmount(select);
});

test('When showChevron and clearable is true always show chevron on Select', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: { value: 'chocolate', label: 'Chocolate' },
            showChevron: true,
            clearable: false,
        },
    });

    ok(document.querySelectorAll('.chevron')[0]);

    unmount(select);
});

test('When items and loadOptions then listOpen should be false', async () => {
    const select = mount(Select, {
        target,
        props: {
            loadOptions: resolvePromise,
        },
    });

    ok(select.listOpen === false);

    unmount(select);
});

test('Select container classes can be injected', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: { value: 'cake', label: 'Cake' },
            class: 'svelte-select testclass',
        },
    });

    ok(document.querySelector('.svelte-select').classList.contains('testclass'));
    unmount(select);
});

test('When loadOptions promise is resolved then dispatch loaded', async () => {
    const select = mount(Select, {
        target,
        props: {
            loadOptions: resolvePromise,
        },
    });

    let loadedEventData = undefined;
    const loadedOff = select.$on('loaded', (event) => {
        loadedEventData = event;
    });
    let errorEventData = undefined;
    const errorOff = select.$on('error', (event) => {
        errorEventData = event;
    });

    await wait(0);
    select.$set({ listOpen: true });
    await wait(0);
    select.$set({ filterText: 'test' });
    await wait(500);

    equal(loadedEventData.detail.items[0].value, 'a');
    equal(errorEventData, undefined);

    loadedOff();
    errorOff();
    unmount(select);
});

test('When loadOptions promise is rejected then dispatch error', async () => {
    const select = mount(Select, {
        target,
        props: {
            loadOptions: rejectPromise,
        },
    });

    let loadedEventData = undefined;
    const loadedOff = select.$on('loaded', (event) => {
        loadedEventData = event;
    });
    let errorEventData = undefined;
    const errorOff = select.$on('error', (event) => {
        errorEventData = event;
    });

    await wait(0);
    select.$set({ listOpen: true });
    await wait(0);
    select.$set({ filterText: 'test' });
    await wait(500);
    equal(loadedEventData, undefined);
    equal(errorEventData.detail.type, 'loadOptions');
    equal(errorEventData.detail.details, 'error 123');

    loadedOff();
    errorOff();
    unmount(select);
});

test('When items change then value should also update', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: { value: 'chips', label: 'Chips' },
        },
    });

    await wait(0);

    select.$set({
        items: [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'pizza', label: 'Pizza' },
            { value: 'cake', label: 'Cake' },
            { value: 'chips', label: 'Loaded Fries' },
            { value: 'ice-cream', label: 'Ice Cream' },
        ],
    });

    await wait(0);

    ok(select.value.label === 'Loaded Fries');
    ok(target.querySelector('.selected-item').innerHTML === 'Loaded Fries');

    unmount(select);

    await wait(0);

    const multiSelect = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [
                { value: 'chips', label: 'Chips' },
                { value: 'pizza', label: 'Pizza' },
            ],
        },
    });

    await wait(0);

    multiSelect.$set({
        items: [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'pizza', label: 'Cheese Pizza' },
            { value: 'cake', label: 'Cake' },
            { value: 'chips', label: 'Loaded Fries' },
            { value: 'ice-cream', label: 'Ice Cream' },
        ],
    });

    await wait(0);

    ok(multiSelect.value[0].label === 'Loaded Fries');
    ok(multiSelect.value[1].label === 'Cheese Pizza');

    unmount(multiSelect);
});

test('When items change then value should also update but only if found in items', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: { value: 'chips', label: 'Chips' },
        },
    });

    await wait(0);

    select.$set({
        items: [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'pizza', label: 'Pizza' },
            { value: 'cake', label: 'Cake' },
            { value: 'loaded-fries', label: 'Loaded Fries' },
            { value: 'ice-cream', label: 'Ice Cream' },
        ],
    });

    await wait(0);

    ok(select.value.label === 'Chips');
    ok(target.querySelector('.selected-item').innerHTML === 'Chips');

    unmount(select);
});

test('When multiple and multiFullItemClearable then clicking anywhere on the item will remove item', async () => {
    const multiSelect = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            multiFullItemClearable: true,
            value: [
                { value: 'chips', label: 'Chips' },
                { value: 'pizza', label: 'Pizza' },
            ],
        },
    });

    await wait(0);
    await querySelectorClick('.multi-item span');
    await wait(0);
    ok(multiSelect.value[0].label === 'Pizza');

    unmount(multiSelect);
});

test('When multiple and filterText then items should filter out already selected items', async () => {
    const multiSelect = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [
                { value: 'chips', label: 'Chips' },
                { value: 'pizza', label: 'Pizza' },
            ],
        },
    });

    ok(multiSelect.getFilteredItems().length === 3);

    unmount(multiSelect);
});

test('when loadOptions and items is supplied then list should close on blur', async () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    let items = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
    ];
    let loadOptions = async (filterText) => getPosts(filterText);

    const select = mount(Select, {
        target,
        props: {
            items,
            loadOptions,
        },
    });

    select.$set({ focused: true });
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await wait(0);
    select.$set({ filterText: 's' });
    await wait(600);
    div.click();
    div.remove();

    unmount(select);
});

async function getCancelledRes() {
    Promise.resolve({ cancelled: true });
}

test('when loadOptions response returns cancelled true then dont end loading state', async () => {
    const select = mount(Select, {
        target,
        props: {
            loadOptions: getCancelledRes,
        },
    });

    select.$set({ filterText: 'Juniper' });
    await wait(0);

    unmount(select);
});

test('when ClearIcon replace clear icon', async () => {
    const select = mount(ClearIconSlotTest, {
        target,
    });

    ok(target.querySelector('.clear-select div').innerHTML === 'x');

    unmount(select);
});

test('losing focus of Select should close list', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
        },
    });

    ok(select.listOpen);
    document.querySelector('.svelte-select input').blur();
    await wait();
    ok(!select.listOpen);
    unmount(select);
});

test('clicking on an external textarea should close and blur it', async () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items,
        },
    });

    ok(select.listOpen);
    document.querySelector('textarea').focus();
    ok(!select.listOpen);

    textarea.remove();
    unmount(select);
});

test('when switching between multiple true/false ensure Select continues working', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
            value: { value: 'chips', label: 'Chips' },
        },
    });

    select.multiple = true;
    select.loadOptions = itemsPromise;

    ok(JSON.stringify(select.value) === JSON.stringify([{ value: 'chips', label: 'Chips' }]));
    ok(Array.isArray(select.value));

    select.multiple = false;
    select.loadOptions = null;
    select.items = [...items];

    ok(!select.value);

    unmount(select);
});

test('when searchable is false then input should be readonly', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            searchable: false,
        },
    });

    let elem = target.querySelector('.svelte-select input');
    ok(elem.hasAttribute('readonly'));

    unmount(select);
});

test('when esc key pressed should close list', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
        },
    });

    await wait(0);
    ok(select.listOpen === true);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    ok(select.listOpen === false);

    unmount(select);
});

test('when multiple and placeholderAlwaysShow then always show placeholder text', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            value: [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'pizza', label: 'Pizza' },
            ],
            multiple: true,
            placeholderAlwaysShow: true,
            placeholder: 'foo bar',
        },
    });

    await wait(0);
    let elem = target.querySelector('.svelte-select input[type="text"]');
    ok(elem.placeholder === 'foo bar');

    unmount(select);
});

test('when loadOptions and value then items should show on promise resolve', async () => {
    const loadOptionsFn = async () => {
        return Promise.resolve([
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'ice-cream', label: 'Ice-cream' },
            { value: 'pizza', label: 'pizza' },
        ]);
    };

    const select = mount(Select, {
        target,
        props: {
            value: {
                value: 'chocolate',
                label: 'Chocolate',
            },
            listOpen: true,
            filterText: 'a',
            loadOptions: loadOptionsFn,
        },
    });

    await wait(300);
    ok(select.getFilteredItems().length === 3);

    unmount(select);
});

test('when loadOptions, multiple and value then filterText should remain on promise resolve', async () => {
    const loadOptionsFn = async () => {
        return Promise.resolve([
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'ice-cream', label: 'Ice-cream' },
            { value: 'pizza', label: 'pizza' },
        ]);
    };

    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            value: {
                value: 'chocolate',
                label: 'Chocolate',
            },
            listOpen: true,
            filterText: 'test',
            loadOptions: loadOptionsFn,
        },
    });

    await wait(300);
    ok(select.filterText === 'test');

    unmount(select);
});

test('When listOffset is set list position offset changes', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOffset: 0,
            listOpen: true,
        },
    });

    await wait(0);
    let elem = document.querySelector('.svelte-select-list');
    ok(elem.style.top === '41px');

    unmount(select);
});

test('When items are updated post onMount ensure filtering still works', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: null,
        },
    });

    await wait(0);

    select.items = ['One', 'Two', 'Three'].map((item) => ({ value: item, label: item }));
    select.filterText = 'Two';
    select.listOpen = true;

    ok(select.getFilteredItems().length === 1);
    ok(select.getFilteredItems()[0].value === 'Two');

    unmount(select);
});

test('When grouped items are updated post onMount ensure filtering still works', async () => {
    const select = mount(Select, {
        target,
        props: {
            groupBy: (item) => item.group,
        },
    });

    await wait(0);

    select.items = ['One', 'Two', 'Three'].map((item) => ({
        value: item,
        label: item,
        group: item.includes('T') ? '2nd Group' : '1st Group',
    }));
    select.filterText = 'Tw';
    select.listOpen = true;

    ok(select.getFilteredItems().length === 2);
    ok(select.getFilteredItems()[0].label === '2nd Group');
    ok(select.getFilteredItems()[1].label === 'Two');

    unmount(select);
});

test('When groupBy and value selected ensure filtering still works', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: itemsWithGroup,
            groupBy: (item) => item.group,
            listOpen: true,
        },
    });

    select.filterText = 'Cake';
    document.querySelector('.list-item .item.group-item').click();
    await wait(0);
    ok(select.getFilteredItems().length === 7);

    unmount(select);
});

test('When value selected and filterText then ensure selecting the active value still clears filterText', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    select.filterText = 'Cake';
    document.querySelector('.list-item .item').click();
    await wait(0);
    select.listOpen = true;
    select.filterText = 'Cake';
    document.querySelector('.list-item .item').click();

    ok(select.filterText.length === 0);

    unmount(select);
});

test('When multiple on:input events should fire on each item removal (including the last item)', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            multiple: true,
            value: ['Cake', 'Chips'],
        },
    });

    let events = [];

    select.$on('input', (e) => {
        events.push('event fired');
    });

    const event = new PointerEvent('pointerup');
    document.querySelector('.multi-item-clear').dispatchEvent(event);
    await wait(0);
    document.querySelector('.multi-item-clear').dispatchEvent(event);
    await wait(0);
    ok(events.length === 2);

    unmount(select);
});

test('When inputAttributes.name supplied, add to hidden input', async () => {
    const select = mount(Select, {
        target,
        props: {
            name: 'Foods',
            items: items,
            showChevron: true,
        },
    });

    let hidden = document.querySelector('input[type="hidden"]').name;
    equal(hidden, 'Foods');

    unmount(select);
});

test('When no value then hidden field should also have no value', async () => {
    const select = mount(Select, {
        target,
        props: {
            inputAttributes: { name: 'Foods' },
            items: items,
        },
    });

    let hidden = document.querySelector('input[type="hidden"]').value;
    ok(!hidden);

    unmount(select);
});

test('When value then hidden field should have value', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: items,
            value: { value: 'cake', label: 'Cake' },
        },
    });

    let hidden = document.querySelector('input[type="hidden"]').value;
    equal(JSON.parse(hidden).value, 'cake');

    unmount(select);
});

test('When multiple and no value then hidden field should no value', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items: items,
        },
    });

    let hidden = document.querySelector('input[type="hidden"]').value;
    ok(!hidden);

    unmount(select);
});

test('When multiple and value then hidden fields should list value items', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items: items,
            value: [
                { value: 'cake', label: 'Cake' },
                { value: 'pizza', label: 'Pizza' },
            ],
        },
    });

    let hidden = JSON.parse(document.querySelector('input[type="hidden"]').value);
    equal(hidden[0].value, 'cake');
    equal(hidden[1].value, 'pizza');

    unmount(select);
});

test('When listOpen then aria-context describes highlighted item', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: items,
            listOpen: true,
        },
    });

    let aria = document.querySelector('#aria-context');
    ok(aria.innerHTML.includes('Chocolate'));
    await handleKeyboard('ArrowDown');
    ok(aria.innerHTML.includes('Pizza'));

    unmount(select);
});

test('When listOpen and value then aria-selection describes value', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: items,
            value: { value: 'cake', label: 'Cake' },
            focused: true,
        },
    });

    let aria = document.querySelector('#aria-selection');
    ok(aria.innerHTML.includes('Cake'));

    unmount(select);
});

test('When listOpen, value and multiple then aria-selection describes value', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items: items,
            value: [
                { value: 'cake', label: 'Cake' },
                { value: 'pizza', label: 'Pizza' },
            ],
            focused: true,
        },
    });

    let aria = document.querySelector('#aria-selection');
    ok(aria.innerHTML.includes('Cake'));
    ok(aria.innerHTML.includes('Pizza'));

    unmount(select);
});

test('When ariaValues and value supplied, then aria-selection uses default updated', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: items,
            value: { value: 'pizza', label: 'Pizza' },
            focused: true,
            ariaValues: (val) => `Yummy ${val} in my tummy!`,
        },
    });

    let aria = document.querySelector('#aria-selection');
    equal(aria.innerHTML, 'Yummy Pizza in my tummy!');

    unmount(select);
});

test('When ariaListOpen, listOpen, then aria-context uses default updated', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: items,
            listOpen: true,
            ariaListOpen: (label, count) => `label: ${label}, count: ${count}`,
        },
    });

    await wait(0);
    let aria = document.querySelector('#aria-context');
    equal(aria.innerHTML, 'label: Chocolate, count: 5');

    unmount(select);
});

test('When ariaFocused, focused value supplied, then aria-context uses default updated', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: items,
            focused: true,
            listOpen: false,
            ariaFocused: () => `nothing to see here.`,
        },
    });

    let aria = document.querySelector('#aria-context');
    equal(aria.innerHTML, 'nothing to see here.');
    unmount(select);
});

test('When id supplied then add to input', async () => {
    const select = mount(Select, {
        target,
        props: {
            id: 'foods',
            items: items,
        },
    });

    let aria = document.querySelector('input[type="text"]');
    equal(aria.id, 'foods');

    unmount(select);
});

test('allows the user to select an item by clicking with a focusable ancestor', async () => {
    const ancestor = document.createElement('div');
    ancestor.setAttribute('tabindex', '-1');
    target.appendChild(ancestor);

    const select = mount(Select, {
        target: ancestor,
        props: {
            items,
        },
    });

    await querySelectorClick('.svelte-select');
    await querySelectorClick('.list-item');
    equal(select.value.label, 'Chocolate');

    unmount(select);
});

test('when listOpen true on page load then list should show onMount', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
        },
    });

    let list = document.querySelector('.svelte-select-list');

    ok(list);

    unmount(select);
});

test('when listOpen true on page load then list should show onMount', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
        },
    });

    let list = document.querySelector('.svelte-select-list');

    ok(list);

    unmount(select);
});

test('when value is set check from item and show correct label', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
        },
    });

    select.value = 'cake';
    equal(select.value.label, 'Cake');
    unmount(select);
});

test('when component focuses fire on:focus event', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
        },
    });

    let f = false;
    select.$on('focus', () => {
        f = true;
    });

    let ele = document.querySelector('.svelte-select input');
    ele.focus();

    ok(f);

    unmount(select);
});

test('when component blurs fire on:blur event', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            focused: true,
        },
    });

    let b = false;
    select.$on('blur', () => {
        b = true;
    });

    let ele = document.querySelector('.svelte-select input');
    ele.blur();

    ok(b);

    unmount(select);
});

test('when loadOptions and groupBy then group headers should appear', async () => {
    const select = mount(Select, {
        target,
        props: {
            debounceWait: 1,
            groupBy,
            loadOptions: async function () {
                return itemsWithGroup;
            },
        },
    });

    function groupBy(item) {
        return item.group;
    }

    select.$set({ filterText: 'potato' });
    await wait(50);
    const header = document.querySelector('.svelte-select-list .list-group-title');
    ok(header.innerHTML === 'Sweet');

    unmount(select);
});

test('when user selects an item then change event fires', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items,
        },
    });

    let value = undefined;

    select.$on('change', (event) => {
        value = JSON.stringify(event.detail);
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(0);
    equal(value, JSON.stringify({ value: 'cake', label: 'Cake' }));

    unmount(select);
});

test('when item selected programmatically a change event should NOT fire', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items,
        },
    });

    let value = undefined;
    select.$set({ value: { value: 'cake', label: 'Cake' } });

    select.$on('change', (event) => {
        value = event.detail;
    });

    await wait(0);
    ok(value === undefined);

    unmount(select);
});

test('when value is cleared then justValue should be null', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items,
            value: { value: 'cake', label: 'Cake' },
        },
    });

    select.handleClear();
    await wait(0);
    ok(!select.justValue);

    unmount(select);
});

test('when items are grouped and filter text results in no items then list renders correct message', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithGroup,
            groupBy,
        },
    });

    function groupBy(item) {
        return item.group;
    }

    let title = document.querySelector('.list-group-title').innerHTML;
    ok(title === 'Sweet');
    let item = document.querySelector('.list-item .item.group-item').innerHTML;
    ok(item === 'Chocolate');
    select.filterText = 'foo';
    let empty = document.querySelector('.svelte-select-list .empty');
    ok(empty);
    unmount(select);
});

test('when named slot chevron show content', async () => {
    const select = mount(ChevronSlotTest, {
        target,
    });

    ok(document.querySelector('.chevron div').innerHTML === '⬆️');

    unmount(select);
});

test('when named slot list show content', async () => {
    const select = mount(ListSlotTest, {
        target,
    });

    ok(document.querySelector('.svelte-select-list').innerHTML.trim() === 'onetwo');

    unmount(select);
});

test('when named slot input-hidden', async () => {
    const select = mount(InputHiddenSlotTest, {
        target,
    });

    ok(document.querySelector('input[type="hidden"][name="test"]').value.trim() === 'one');

    unmount(select);
});

test('when named slot item show content', async () => {
    const select = mount(ItemSlotTest, {
        target,
    });

    ok(document.querySelector('.svelte-select-list .item').innerHTML === '* one *');

    unmount(select);
});

test('when named slots list-prepend and list-append show content', async () => {
    const select = mount(OuterListTest, {
        target,
    });

    ok(document.querySelector('.svelte-select-list').innerHTML.startsWith('prepend'));
    ok(document.querySelector('.svelte-select-list').innerHTML.endsWith('append'));

    unmount(select);
});

test('when itemId and justValue then return correct value', async () => {
    const select = mount(Select, {
        target,
        props: {
            items: collection,
            value: { _id: 2, label: 'Cake' },
            itemId: '_id',
        },
    });

    ok(select.justValue === 2);
    unmount(select);
});

test('when --item-height css variable supplied then item height should match new height', async () => {
    const select = mount(ItemHeightTest, {
        target,
    });

    ok(document.querySelector('.item').offsetHeight === 50);

    unmount(select);
});

test('when --multi-item-color css variable supplied then CSS should apply', async () => {
    const select = mount(MultiItemColor, {
        target,
    });

    ok(getComputedStyle(document.querySelector('.multi-item')).getPropertyValue('color') === 'rgb(255, 0, 0)');

    unmount(select);
});

test('when groupHeaderSelectable false and groupBy true then group headers should never have active/hover states', async () => {
    const select = mount(GroupHeaderNotSelectable, {
        target,
    });

    await querySelectorClick('.svelte-select');

    let item = document.querySelector('.item.hover.group-item');

    ok(item.innerHTML === 'Chocolate');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    await wait(0);
    item = document.querySelector('.item.hover.group-item');
    ok(item.innerHTML === 'Chips');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

    await wait(0);
    item = document.querySelector('.item.hover.group-item');
    ok(item.innerHTML === 'Pizza');

    select.$set({ filterText: 'Ice' });

    await wait(0);
    item = document.querySelector('.item.hover.group-item');
    ok(item.innerHTML === 'Ice Cream');

    select.$set({ filterText: '' });

    await wait(0);
    item = document.querySelector('.item.hover.group-item');
    ok(item.innerHTML === 'Chocolate');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

    await wait(0);
    item = document.querySelector('.item.hover.group-item');
    ok(item.innerHTML === 'Chips');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    await wait(0);
    item = document.querySelector('.item.hover.group-item');
    ok(item.innerHTML === 'Chocolate');

    unmount(select);
});

test('when hasError then show error styles', async () => {
    const select = mount(Select, {
        target,
        props: {
            hasError: true,
        },
    });

    ok(document.querySelector('.svelte-select.error'));
    select.$set({ hasError: false });
    await wait(0);
    ok(!document.querySelector('.svelte-select.error'));

    unmount(select);
});

test('when items filter then event on:filter fires', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
        },
    });

    let event = undefined;

    select.$on('filter', (e) => {
        event = e.detail;
    });

    select.$set({ filterText: 'ch' });
    await wait(0);
    ok(event && event.length === 2);

    unmount(select);
});

test('clicking tab on item with selectable false should not select item', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithSelectable,
            filterText: '2',
        },
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    await wait(0);
    ok(!select.value);
    unmount(select);
});

test('when multiple and clicking enter an item with selectable false should not be selected', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithSelectable,
            filterText: '2',
            multiple: true,
        },
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(0);
    ok(!select.value);
    unmount(select);
});

test('when list has one item that is not selectable then clicking up/down keys should reset hover index', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: [
                { value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
                { value: 'pizza', label: 'Pizza', group: 'Savory' },
                { value: 'cake', label: 'Cake', group: 'Sweet', selectable: false },
                { value: 'chips', label: 'Chips', group: 'Savory' },
                { value: 'ice-cream', label: 'Ice Cream', group: 'Sweet' },
            ],
            filterText: 'Ca',
        },
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ok(!select.value);
    select.$set({ filterText: 'pi' });
    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ok(select.value.label === 'Pizza');

    unmount(select);
});

test('when list has no items that are selectable then clicking up/down keys should reset hover index', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithSelectable,
            filterText: 'not',
        },
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ok(!select.value);
    select.$set({ filterText: 'se' });
    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(0);
    ok(select.value.label === 'SelectableDefault');
    unmount(select);
});

test('when listOpen and value then hoverItemIndex should be the active value', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: items,
            value: { value: 'cake', label: 'Cake' },
        },
    });

    ok(select.hoverItemIndex === 2);

    unmount(select);
});

test('when listOpen and multiple then hoverItemIndex should be 0', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: items,
            multiple: true,
        },
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    await wait(0);
    await querySelectorClick('.svelte-select');
    ok(select.hoverItemIndex === 0);

    unmount(select);
});

test('when listOpen and value and groupBy then hoverItemIndex should be the active value', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: itemsWithGroupAndSelectable,
            value: { value: 'chocolate', label: 'Chocolate', group: 'Sweet' },
            groupBy: (i) => i.group,
            groupHeaderSelectable: true,
        },
    });

    ok(select.hoverItemIndex === 1);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    ok(select.hoverItemIndex === 4);

    unmount(select);
});

test('when groupBy, itemId and label then list should render correctly', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: [
                { id: 1, name: 'name 1', group: 'group 1' },
                { id: 2, name: 'name 2', group: 'group 1' },
                { id: 3, name: 'name 3', group: 'group 2' },
                { id: 4, name: 'name 4', group: 'group 1' },
                { id: 5, name: 'name 5', group: 'group 3' },
            ],
            itemId: 'id',
            label: 'name',
            groupBy: (i) => i.group,
        },
    });

    let titles = document.querySelectorAll('.list-group-title');
    let items = document.querySelectorAll('.item.group-item');

    ok(titles[1].innerHTML === 'group 2');
    ok(items[3].innerHTML === 'name 3');

    unmount(select);
});

test('when listOpen and value and groupBy then hoverItemIndex should be the active value', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items: [
                { id: 1, name: 'name 1', group: 'group 1' },
                { id: 2, name: 'name 2', group: 'group 1' },
                { id: 3, name: 'name 3', group: 'group 2' },
                { id: 4, name: 'name 4', group: 'group 1' },
                { id: 5, name: 'name 5', group: 'group 3' },
            ],
            itemId: 'id',
            label: 'name',
            groupBy: (i) => i.group,
        },
    });

    ok(select.hoverItemIndex === 1);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    ok(select.hoverItemIndex === 2);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    ok(select.hoverItemIndex === 2);

    unmount(select);
});

test('when closeListOnChange is false and item selected then list should remain open', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            closeListOnChange: false,
        },
    });

    await querySelectorClick('.svelte-select');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ok(select.value.value === 'chocolate');
    ok(select.listOpen);

    await querySelectorClick('.svelte-select');
    ok(!select.listOpen);

    await querySelectorClick('.svelte-select');
    await querySelectorClick('.list-item:nth-child(3)');
    ok(select.value.value === 'cake');
    ok(select.listOpen);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    ok(!select.listOpen);

    unmount(select);
});

test('when listOpen and value and groupBy then hoverItemIndex should be the active value', async () => {
    const select = mount(HoverItemIndexTest, {
        target,
    });

    await querySelectorClick('.svelte-select');
    ok(select.hoverItemIndex === 1);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await wait(0);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    ok(select.hoverItemIndex === 2);
    unmount(select);
});

test('when loadOptions and groupBy then titles should not duplicate after filterText clears', async () => {
    const select = mount(LoadOptionsGroup, {
        target,
    });

    select.$set({ filterText: 'cre' });
    await wait(500);
    ok(document.querySelectorAll('.list-group-title').length === 1);
    select.$set({ filterText: 'cr' });
    await wait(500);
    ok(document.querySelectorAll('.list-group-title').length === 1);

    unmount(select);
});

test('when loadOptions and value then it should set initial value', async () => {
    const select = mount(LoadOptionsGroup, {
        target,
        props: {
            value: 'cake',
        },
    });

    ok(document.querySelector('.value-container .selected-item').innerHTML === 'cake');
    await wait(500);
    ok(document.querySelector('.value-container .selected-item').innerHTML === 'Cake');

    unmount(select);
});

test('when item is selected then select event fires with selected item', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items,
        },
    });

    let selectedItem;

    select.$on('select', (event) => {
        selectedItem = event.detail;
    });

    await handleKeyboard('Enter');
    await wait(0);

    equal(selectedItem.value, 'chocolate');
    equal(selectedItem.label, 'Chocolate');

    unmount(select);
});

test('when filterSelectedItems is false selected items remain in filtered list', async () => {
    const select = mount(Select, {
        target,
        props: {
            multiple: true,
            items,
            value: [{ value: 'chips', label: 'Chips' }],
            filterSelectedItems: false,
            listOpen: true,
        },
    });

    ok(select.getFilteredItems().length === 5);
    ok(select.getFilteredItems().some((item) => item.value === 'chips'));

    unmount(select);
});

test('when hoverItemIndex changes then hoverItem event fires', async () => {
    const select = mount(Select, {
        target,
        props: {
            listOpen: true,
            items,
        },
    });

    const hoverIndexes = [];

    select.$on('hoverItem', (event) => {
        hoverIndexes.push(event.detail);
    });

    await wait(0);
    await handleKeyboard('ArrowDown');
    await wait(0);

    ok(hoverIndexes.length > 0);
    ok(hoverIndexes.includes(1));

    unmount(select);
});

test('when required is true and no value then hidden required select is rendered', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            required: true,
        },
    });

    const requiredSelect = document.querySelector('select.required');
    ok(requiredSelect);
    ok(requiredSelect.required);

    unmount(select);
});

test('when required slot is supplied then render custom content', async () => {
    const select = mount(RequiredSlotTest, {
        target,
    });

    ok(document.querySelector('.custom-required').innerHTML === 'REQUIRED');

    unmount(select);
});

test('when empty slot is supplied then render custom content', async () => {
    const select = mount(EmptySlotTest, {
        target,
    });

    ok(document.querySelector('.custom-empty').innerHTML === 'Nothing to see here...');

    unmount(select);
});

test('when loading-icon slot is supplied then render custom content', async () => {
    const select = mount(LoadingIconSlotTest, {
        target,
    });

    ok(document.querySelector('.loading div').innerHTML === '★');

    unmount(select);
});

test('when multi-clear-icon slot is supplied then render custom content', async () => {
    const select = mount(MultiClearIconSlotTest, {
        target,
    });

    ok(document.querySelector('.multi-item-clear div').innerHTML === '❌');

    unmount(select);
});

test('when debounceWait is set loadOptions is delayed', async () => {
    let loadOptionsCalls = 0;

    const select = mount(Select, {
        target,
        props: {
            debounceWait: 100,
            loadOptions: async () => {
                loadOptionsCalls++;
                return ['a', 'b'];
            },
        },
    });

    select.$set({ filterText: 'test' });
    await wait(50);
    equal(loadOptionsCalls, 0);

    await wait(100);
    equal(loadOptionsCalls, 1);

    unmount(select);
});

test('when floatingConfig strategy is fixed list uses fixed positioning', async () => {
    const select = mount(Select, {
        target,
        props: {
            items,
            listOpen: true,
            floatingConfig: { strategy: 'fixed' },
        },
    });

    await wait(0);

    const position = getComputedStyle(document.querySelector('.svelte-select-list')).position;
    equal(position, 'fixed');

    unmount(select);
});

test('when list-position css variable is fixed list uses fixed positioning', async () => {
    const select = mount(ListPositionFixedTest, {
        target,
    });

    await wait(0);

    const position = getComputedStyle(document.querySelector('.svelte-select-list')).position;
    equal(position, 'fixed');

    unmount(select);
});

test('when filter has no matches create-item pattern adds and selects new item', async () => {
    const createItem = mount(CreateItemTest, {
        target,
    });

    createItem.$set({ filterText: 'newitem' });
    await wait(0);

    ok(document.querySelector('.item').innerHTML.includes('newitem'));

    await handleKeyboard('Enter');
    await wait(0);

    equal(createItem.value.label, 'newitem');
    equal(createItem.value.created, true);

    unmount(createItem);
});
