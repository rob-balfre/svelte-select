import './reset.css'
import getName from '../utils/nameGen';
import normalizeHtml from '../utils/normalizeHtml';

import CustomItem from './CustomItem.svelte';
import Select from '../../src/Select.svelte';
import List from '../../src/List.svelte';
import TestIcon from './TestIcon.svelte';
import TestClearIcon from './TestClearIcon.svelte';
import SelectDefault from './Select/Select--default.svelte'
import SelectMultiSelected from './Select/Select--multiSelected.svelte'
import ListDefault from './List/List--default.svelte'
import ParentContainer from './Select/ParentContainer.svelte'
import {assert, test, done} from 'tape-modern';

function querySelectorClick(selector) {
  document.querySelector(selector).click();
  return new Promise(f => setTimeout(f, 0));
}

function handleKeyboard(key) {
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': key}));
  return new Promise(f => setTimeout(f, 0));
}

function handleSet(component, data) {
  component.$set(data);
  return new Promise(f => setTimeout(f, 0));
}

function focus(element, setFocus) {
  return new Promise(resolve => {
    element.addEventListener('focus', function handler() {
      element.removeEventListener('focus', handler);
      resolve(true);
    });

    if (setFocus) setFocus();
  });
}

function getPosts(filterText) {
  filterText = filterText ? filterText.replace(' ','_') : '';

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.punkapi.com/v2/beers?beer_name=${filterText}`);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setTimeout(resolve(JSON.parse(xhr.response).sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
        })), 2000);
      } else {
        reject()
      }
    };
  });
}

function resolvePromise() {
  return new Promise((resolve, reject) => {
    resolve(['a', 'b', 'c']);
  })
}

function rejectPromise() {
  return new Promise((resolve, reject) => {
    reject('error 123');
  })
}

// setup
const target = document.createElement('main');
document.body.appendChild(target);

const testTarget = document.createElement("div");
testTarget.id = 'testTemplate';
document.body.appendChild(testTarget);

const extraTarget = document.createElement("div");
extraTarget.id = 'extra';
document.body.appendChild(extraTarget)

const items = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'pizza', label: 'Pizza'},
  {value: 'cake', label: 'Cake'},
  {value: 'chips', label: 'Chips'},
  {value: 'ice-cream', label: 'Ice Cream'},
];

const itemsWithGroup = [
  {value: 'chocolate', label: 'Chocolate', group: 'Sweet'},
  {value: 'pizza', label: 'Pizza', group: 'Savory'},
  {value: 'cake', label: 'Cake', group: 'Sweet'},
  {value: 'chips', label: 'Chips', group: 'Savory'},
  {value: 'ice-cream', label: 'Ice Cream', group: 'Sweet'}
];

const itemsWithIndex = [
  {value: 'chocolate', label: 'Chocolate', index: 0},
  {value: 'pizza', label: 'Pizza', index: 1},
  {value: 'cake', label: 'Cake', index: 2},
  {value: 'chips', label: 'Chips', index: 3},
  {value: 'ice-cream', label: 'Ice Cream', index: 4},
];

function itemsPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(items)));
    })
  })
}

function wait(ms) {
  return new Promise(f => setTimeout(f, ms));
}

assert.htmlEqual = (a, b) => {
  assert.equal(normalizeHtml(a), normalizeHtml(b));
};

assert.arrayEqual = (a, b) => {
  assert.ok(Array.isArray(a));
  assert.ok(Array.isArray(b));
  assert.equal(a.length, b.length);
  assert.ok(a.every((val, i) => val === b[i]));
};

// tests
test('with no data creates default elements', async (t) => {
  const testTemplate = new SelectDefault({
    target: testTarget
  });

  const select = new Select({
    target,
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.$destroy();
  select.$destroy();
});

test('when isFocused true container adds focused class', async (t) => {
  const select = new Select({
    target,
    props: {
      isFocused: true
    }
  });

  t.ok(target.querySelector('.focused'));

  select.$destroy();
});

test('when isFocused changes to true input should focus', async (t) => {
  const select = new Select({
    target,
    props: {
      isFocused: false
    }
  });

  const setFocus = () => {
    select.$set({isFocused: true});
  };

  const hasFocused = await focus(target.querySelector('.selectContainer input'), setFocus);
  t.ok(hasFocused);
  select.$destroy();
});

test('default empty list', async (t) => {
  const list = new List({
    target,
  });

  t.ok(target.querySelector('.empty'));

  list.$destroy();
});

test('default list with five items', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex
    }
  });

  t.ok(target.getElementsByClassName('listItem').length);

  list.$destroy();
});

test('should highlight active list item', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex,
      value: {value: 'pizza', label: 'Pizza', index: 1}
    }
  });

  t.ok(target.querySelector('.listItem .active').innerHTML === 'Pizza');

  list.$destroy();
});

test('list scrolls to active item', async (t) => {
  const extras = [
    {value: 'chicken-schnitzel', label: 'Chicken Schnitzel', index: 5},
    {value: 'fried-chicken', label: 'Fried Chicken', index: 6},
    {value: 'sunday-roast', label: 'Sunday Roast', index: 7},
  ];
  const list = new List({
    target,
    props: {
      items: itemsWithIndex.concat(extras),
      value: {value: 'sunday-roast', label: 'Sunday Roast'},
    }
  });

  let offsetBounding;
  const container = target.querySelector('.listContainer');
  const focusedElemBounding = container.querySelector('.listItem .active');
  if (focusedElemBounding) {
    offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
  }

  t.equal(offsetBounding, 0);
  list.$destroy();
});

test('list scrolls to hovered item when navigating with keys', async (t) => {
  const extras = [
    {value: 'chicken-schnitzel', label: 'Chicken Schnitzel', index: 5},
    {value: 'fried-chicken', label: 'Fried Chicken', index: 6},
    {value: 'sunday-roast', label: 'Sunday Roast', index: 7},
  ];
  const list = new List({
    target,
    props: {
      items: itemsWithIndex.concat(extras)
    }
  });

  const container = target.querySelector('.listContainer');
  const totalListItems = container.querySelectorAll('.listItem').length;
  let selectedItemsAreWithinBounds = true;
  let loopCount = 1;

  do {
    await handleKeyboard('ArrowDown');

    const hoveredItem = container.querySelector('.listItem .hover');
    const isInViewport = container.getBoundingClientRect().bottom - hoveredItem.getBoundingClientRect().bottom >= 0;

    selectedItemsAreWithinBounds = selectedItemsAreWithinBounds && isInViewport;

    loopCount += 1;
  } while (loopCount < totalListItems);


  t.ok(selectedItemsAreWithinBounds);
  list.$destroy();
});

test('hover item updates on keyUp or keyDown', async (t) => {
  const list = new List({
    target,
    props: {
      items: items,
      activeItemIndex: 0,
    }
  });

  await handleKeyboard('ArrowDown');
  const focusedElemBounding = target.querySelector('.listItem .hover');
  t.equal(focusedElemBounding.innerHTML.trim(), `Pizza`);
  list.$destroy();
});

test('on enter active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex
    }
  });

  let value = undefined;
  list.$on('itemSelected', event => {
    value = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(JSON.stringify(value.detail), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.$destroy();
});

test('on tab active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex
    }
  });

  let value = undefined;
  list.$on('itemSelected', event => {
    value = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
  t.equal(JSON.stringify(value.detail), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.$destroy();
});

test('on selected of current active item does not fire a itemSelected event', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex,
      value: { value: 'chocolate', label: 'Chocolate', index: 0 }
    }
  });

  let itemSelectedFired = false;

  list.$on('itemSelected', () => {
    itemSelectedFired = true;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.equal(itemSelectedFired, false);
  list.$destroy();
});

test('selected item\'s default view', async (t) => {
  const select = new Select({
    target,
    props: {
      value: {value: 'chips', label: 'Chips'},
    }
  });

  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Chips');
  select.$destroy();
});

test('select view updates with value updates', async (t) => {
  const select = new Select({
    target,
  });

  await handleSet(select, {value: {value: 'chips', label: 'Chips'}});
  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Chips');

  select.$destroy();
});

test('clear wipes value and updates view', async (t) => {
  const select = new Select({
    target,
    props: {
      value: {value: 'chips', label: 'Chips'},
    }
  });

  await wait(0);
  await handleSet(select, {value: undefined});
  t.ok(!target.querySelector('.selectedItem .selection'));

  select.$destroy();
});

test('clicking on Select opens List', async (t) => {
  const select = new Select({
    target,
  });

  await querySelectorClick('.selectContainer');
  const listContainer = document.querySelector('.listContainer');
  t.ok(listContainer);

  select.$destroy();
});

test('Select opens List populated with items', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  await querySelectorClick('.selectContainer');
  t.ok(target.querySelector('.listItem'));

  select.$destroy();
});

test('List starts with first item in hover state', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  await querySelectorClick('.selectContainer');
  t.ok(target.querySelector('.listItem .hover').innerHTML === 'Chocolate');

  select.$destroy();
});

test('List starts with first item in hover state', async (t) => {
  const testTemplate = new ListDefault({
    target: testTarget
  });

  const select = new Select({
    target,
    props: {
      items,
    }
  });

  document.querySelector('.selectContainer').click();

  testTemplate.$destroy();
  select.$destroy();
});

test('select item from list', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
    }
  });

  await querySelectorClick('.selectContainer');
  await handleKeyboard('ArrowDown');
  await handleKeyboard('ArrowDown');
  await handleKeyboard('Enter');
  t.ok(document.querySelector('.selection').innerHTML === 'Cake');

  select.$destroy();
});

test('when listPosition is set to top list should be above the input', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true,
      listPlacement: 'top'
    }
  });

  const distanceOfListBottomFromViewportTop = document.querySelector('.listContainer').getBoundingClientRect().bottom;
  const distanceOfInputTopFromViewportTop = document.querySelector('.selectContainer').getBoundingClientRect().top;

  t.ok(distanceOfListBottomFromViewportTop <= distanceOfInputTopFromViewportTop);

  select.$destroy();
});

test('when listPlacement is set to bottom the list should be below the input', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true,
      listPlacement: 'bottom'
    }
  });

  await wait(0);
  const distanceOfListTopFromViewportTop = document.querySelector('.listContainer').getBoundingClientRect().top;
  const distanceOfInputBottomFromViewportTop = document.querySelector('.selectContainer').getBoundingClientRect().bottom;

  t.ok(distanceOfListTopFromViewportTop >= distanceOfInputBottomFromViewportTop);

  select.$destroy();
});

test('blur should close list and remove focus from select', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  select.$set({isFocused: true});
  div.click();
  div.remove();
  t.ok(!document.querySelector('.listContainer'));
  t.ok(document.querySelector('.selectContainer input') !== document.activeElement);
  select.$destroy();
});

test('selecting item should close list but keep focus on select', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  t.ok(!document.querySelector('.listContainer'));
  t.ok(document.querySelector('.selectContainer.focused'));
  select.$destroy();
});

test('clicking Select with selected item should open list with item listed as active', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  document.querySelector('.selectContainer').click();
  await wait(0);
  t.ok(document.querySelector('.listItem .hover').innerHTML === 'Cake');
  select.$destroy();
});

test('focus on Select input updates focus state', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });
  
  document.querySelector('.selectContainer input').focus();

  t.ok(select.isFocused);
  select.$destroy();
});

test('key up and down when Select focused opens list', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer input').focus();
  await wait(0);
  t.ok(select.isFocused);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  t.ok(document.querySelector('.listContainer'));

  select.$destroy();
});

test('List should keep width of parent Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  document.querySelector('.selectContainer input').focus();
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  const selectContainer = document.querySelector('.selectContainer');
  const listContainer = document.querySelector('.listContainer');
  t.equal(selectContainer.offsetWidth, listContainer.offsetWidth);

  select.$destroy();
});

test('Placeholder text should reappear when List is closed', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.$destroy();
});

test('typing in Select filter will hide selected Item', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.$set({filterText: 'potato'});
  t.ok(!document.querySelector('.selectContainer .value'));

  select.$destroy();
});

test('clearing selected item closes List if open', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  select.handleClear();
  await wait(0);
  t.ok(!document.querySelector('.listContainer'));

  select.$destroy();
});

test('closing List clears Select filter text', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.$set({filterText: 'potato'});
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.$destroy();
});

test('closing List clears Select filter text', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.$set({filterText: 'potato'});
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.$destroy();
});

test('closing List item clears Select filter text', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.$set({filterText: 'potato'});
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.$destroy();
});

test('typing while Select is focused populates Select filter text', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  select.$set({isFocused: true});
  document.querySelector('.selectContainer input').blur();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
  // KeyboardEvent not firing in svelte - not sure why, manual test seems to work

  select.$destroy();
});

test('Select input placeholder wipes while item is selected', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {name: 'Item #2'},
    }
  });

  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, '');

  select.$destroy();
});

test('Select listOpen state controls List', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true
    }
  });

  await wait(0);
  t.ok(document.querySelector('.listContainer'));
  await handleSet(select, {listOpen: false})
  t.ok(!document.querySelector('.listContainer'));

  select.$destroy();
});

test('clicking Select toggles List open state', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  t.ok(!document.querySelector('.listContainer'));
  await querySelectorClick('.selectContainer');
  t.ok(document.querySelector('.listContainer'));
  await querySelectorClick('.selectContainer');
  t.ok(!document.querySelector('.listContainer'));

  select.$destroy();
});

test('Select filter text filters list', async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  await wait(0);
  t.ok(select.filteredItems.length === 5);
  await handleSet(select, {filterText: 'Ice'})
  t.ok(select.filteredItems.length === 1);

  select.$destroy();
});

test('Select filter text filters list with itemFilter', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      itemFilter: (label, filterText, option) => label === 'Ice Cream'
    }
  });

  await wait(0);
  t.ok(select.filteredItems.length === 5);
  await handleSet(select, {filterText: 'cream ice'})
  t.ok(select.filteredItems.length === 1);

  select.$destroy();
});

test('Typing in the Select filter opens List', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  await handleSet(select, {filterText: '5'})
  t.ok(document.querySelector('.listContainer'));
  select.$destroy();
});

test('While filtering, the first item in List should receive hover class', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  await wait(0);
  await handleSet(select, {filterText: 'I'})
  t.ok(document.querySelector('.listItem .hover'));
  select.$destroy();
});

test('Select container styles can be overridden', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {name: 'Item #2'},
      containerStyles: `padding-left: 40px;`
    }
  });

  t.equal(document.querySelector('.selectContainer').style.cssText, `padding-left: 40px;`);
  select.$destroy();
});

test('Select can be disabled', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isDisabled: true,
    }
  });

  t.ok(document.querySelector('.selectContainer.disabled'));

  select.$destroy();
});

test('Select List closes when you click enter', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));


  select.$destroy();
});

test('tabbing should move between tabIndexes and others Selects', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: false
    }
  });

  const other = new Select({
    target: extraTarget,
    props: {
      items,
      isFocused: false
    }
  });

  // window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
  // TAB not working from Puppeteer - not sure why.

  select.$destroy();
  other.$destroy();
});

test(`shouldn't be able to clear a disabled Select`, async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isDisabled: true,
      value: {name: 'Item #4'}
    }
  });


  t.ok(!document.querySelector('.clearSelect'));

  select.$destroy();
});

test(`two way binding between Select and it's parent component`, async (t) => {
  const parent = new ParentContainer({
    target,
    props: {
      items,
      value: {value: 'chips', label: 'Chips'},
    }
  });

  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);

  parent.$set({
    value: {value: 'ice-cream', label: 'Ice Cream'},
  });

  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);
  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);

  parent.$destroy();
});

test(`show ellipsis for overflowing text in a List item`, async (t) => {
  const longest = 'super super super super super super super super super super super super super super super super super super super super super super super super super super super super loooooonnnng name';

  target.style.width = '300px';

  const list = new List({
    target,
    props: {
      items: [
        {
          index: 0,
          label: longest
        },
        {
          index: 1,
          label: 'Not so loooooonnnng name'
        }
      ]
    }
  });

  const first = document.querySelector('.listItem:first-child .item');
  const last = document.querySelector('.listItem:last-child .item');

  t.ok(first.scrollWidth > first.clientWidth);
  t.ok(last.scrollWidth === last.clientWidth);

  list.$destroy();
  target.style.width = '';
});


test('clicking between Selects should close and blur other Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: false
    }
  });

  const other = new Select({
    target: extraTarget,
    props: {
      items,
      isFocused: false
    }
  });

  await querySelectorClick('.selectContainer');
  t.ok(select.listOpen);
  t.ok(select.isFocused);
  t.ok(!other.isFocused);
  t.ok(!other.isFocused);

  await querySelectorClick('#extra .selectContainer');
  t.ok(!select.listOpen);
  t.ok(!select.isFocused);
  t.ok(other.listOpen);
  t.ok(other.isFocused);

  select.$destroy();
  other.$destroy();
});

test('if only one item in list it should have hover state', async (t) => {
  const list = new List({
    target,
    props: {
      items: [{
        index: 0,
        name: 'test one'
      }]
    }
  });

  t.ok(document.querySelector('.listItem .item').classList.contains('hover'));

  list.$destroy();
});

test(`hovered item in a filtered list shows hover state`, async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  select.$set({filterText: 'i'});

  // const lastItem = document.querySelector('.listItem:last-child');
  // hover item and check for hover state

  t.ok(true);

  select.$destroy();
});

test(`data shouldn't be stripped from item - currently only saves name`, async (t) => {
  const select = new Select({
    target,
    props: {
      items
    }
  });

  await querySelectorClick('.selectContainer');
  await querySelectorClick('.listItem');
  t.equal(JSON.stringify(select.value), JSON.stringify({value: 'chocolate', label: 'Chocolate'}));

  select.$destroy();
});

test('should not be able to clear when clearing is disabled', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isClearable: false
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.ok(!document.querySelector('.clearSelect'));

  select.$destroy();
});

test('should not be able to search when searching is disabled', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isSearchable: false
    }
  });

  const selectInput = document.querySelector('.selectContainer input');
  t.ok(selectInput.attributes.readonly);

  select.$destroy();
});

test('should display indicator when searching is disabled', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items,
      isSearchable: false
    }
  });

  t.ok(document.querySelector('.indicator'));

  select.$destroy();
});

test('placeholder should be prop value', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const placeholder = 'Test placeholder value';

  const select = new Select({
    target,
    props: {
      items: itemsWithGroup,
      placeholder
    }
  });

  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, placeholder);

  select.$destroy();
});

test('should display spinner when waiting is enabled', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    props: {
      items,
      isWaiting: true
    }
  });

  t.ok(document.querySelector('.spinner'));

  select.$destroy();
});

test('inputStyles prop applies css to select input', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'pizza', label: 'Pizza'},
      inputStyles: `padding-left: 40px;`
    }
  });

  t.equal(document.querySelector('.selectContainer input').style.cssText, `padding-left: 40px;`);
  select.$destroy();
});

test('items should be grouped by groupBy expression', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy
    }
  });

  function groupBy(item) {
    return item.group;
  }

  let title = document.querySelector('.listGroupTitle').innerHTML;
  t.ok(title === 'Sweet');
  let item = document.querySelector('.listItem .item').innerHTML; 
  t.ok(item === 'Chocolate');
  select.$destroy();
});


test('clicking group header should not make a selected', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy: (item) => item.group
    }
  });

  await wait(0);
  await querySelectorClick('.listGroupTitle');

  t.equal(select.value, undefined);

  select.$destroy();
});

test('when groupBy, no active item and keydown enter is fired then list should close without selecting item', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy: (item) => item.group
    }
  });

  await wait(0);
  await querySelectorClick('.selectContainer');
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(select.value, undefined);

  select.$destroy();
});

test('when isGroupHeaderSelectable clicking group header should select createGroupHeaderItem(groupValue,item)', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      isGroupHeaderSelectable: true,
      groupBy,
      createGroupHeaderItem
    }
  });

  function groupBy(item) {
    return item.group;
  }

  function createGroupHeaderItem(groupValue, item) {
    return {
      label: `XXX ${groupValue} XXX ${item.label}`
    };
  }

  await wait(0);

  const groupHeaderItem = select.filteredItems[0];
  const groupItem = select.filteredItems.find((item) => {
    return item.group === groupHeaderItem.id;
  });

  await querySelectorClick('.listItem');

  t.ok(select.value.isGroupHeader);
  t.equal(select.value.label, createGroupHeaderItem(groupBy(groupItem), groupItem).label);

  select.$destroy();
});

test('group headers label should be created by getGroupHeaderLabel(item)', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy,
      getGroupHeaderLabel
    }
  });

  function groupBy(item) {
    return item.group;
  }

  function getGroupHeaderLabel(item) {
    return `Group label is ${item.id}`;
  }

  await wait(0);

  const groupHeaderItem = select.filteredItems[0];

  t.equal(target.querySelector('.listGroupTitle').textContent, getGroupHeaderLabel(groupHeaderItem));

  select.$destroy();
});

test('groups should be sorted by expression', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      items: itemsWithGroup,
      groupBy: (item) => item.group,
      groupFilter: (groups) => groups.reverse()
    }
  });

  await wait();

  t.ok(target.querySelector('.listGroupTitle').textContent.trim() === 'Savory');
  t.ok(target.querySelector('.listItem').textContent.trim() === 'Pizza');

  select.$destroy();
});

test('when isMulti is true show each item in value', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'chips', label: 'Chips'},
      ],
    }
  });

  const all = target.querySelectorAll('.multiSelectItem .multiSelectItem_label');
  t.ok(all[0].innerHTML === 'Pizza');
  t.ok(all[1].innerHTML === 'Chips');

  select.$destroy();
});

test('when isMulti is true and value is undefined show placeholder text', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: undefined
    }
  });

  t.ok(!target.querySelector('.multiSelectItem'));

  select.$destroy();
});

test('when isMulti is true clicking item in List will populate value', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: undefined
    }
  });

  await querySelectorClick('.selectContainer');
  await querySelectorClick('.listItem');

  t.equal(JSON.stringify(select.value), JSON.stringify([{value: 'chocolate', label: 'Chocolate'}]));

  select.$destroy();
});

test('when isMulti is true items in value will not appear in List', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  await wait(0);

  t.equal(JSON.stringify(select.filteredItems), JSON.stringify([
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Chips'},
    {value: 'ice-cream', label: 'Ice Cream'}
  ]));

  select.$destroy();
});

test('when isMulti is true both value and filterText filters List', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  select.filterText = 'Pizza',

  t.equal(JSON.stringify(select.filteredItems), JSON.stringify([
    {value: 'pizza', label: 'Pizza'}
  ]));

  select.$destroy();
});

test('when isMulti is true clicking X on a selected item will remove it from value', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]
    }
  });

  document.querySelector('.multiSelectItem_clear').click();
  t.equal(JSON.stringify(select.value), JSON.stringify([{value: 'pizza', label: 'Pizza'}]));

  select.$destroy();
});

test('when isMulti is true and all selected items have been removed then placeholder should show and clear all should hide', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  document.querySelector('.multiSelectItem_clear').click();

  select.$destroy();
});

test('when isMulti is true and items are selected then clear all should wipe all selected items', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]
    }
  });

  document.querySelector('.clearSelect').click();
  t.equal(select.value, undefined);

  select.$destroy();
});

test('when isMulti and groupBy is active then items should be selectable', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items: itemsWithGroup,
      groupBy: (item) => item.group
    }
  });

  target.style.maxWidth = '400px';
  await querySelectorClick('.selectContainer');
  await querySelectorClick('.listItem');
  t.equal(JSON.stringify(select.value), JSON.stringify([{"isGroupItem":true,"value":"chocolate","label":"Chocolate","group":"Sweet"}]));

  select.$destroy();
});

test('when isMulti and selected items reach edge of container then Select height should increase and selected items should wrap to new line', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items
    }
  });

  target.style.maxWidth = '250px';
  t.ok(document.querySelector('.selectContainer').scrollHeight === 42);
  await handleSet(select, {value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]});
  t.ok(document.querySelector('.selectContainer').scrollHeight > 44);
  select.$destroy();
});

test('when isMulti and value is populated then navigating with LeftArrow updates activeValue', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}, {value: 'chips', label: 'Chips'},],
      isFocused: true
    }
  });

  target.style.maxWidth = '100%';
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));

  t.ok(select.$capture_state().activeValue === 1);

  select.$destroy();
});

test('when isMulti and value is populated then navigating with ArrowRight updates activeValue', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}, {value: 'chips', label: 'Chips'},],
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowRight'}));
  t.ok(select.$capture_state().activeValue === 1);

  select.$destroy();
});

test('when isMulti and value has items and list opens then first item in list should be active', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isFocused: true
    }
  });

  await querySelectorClick('.selectContainer');
  await querySelectorClick('.listItem');
  await handleKeyboard('ArrowDown');

  t.ok(document.querySelector('.listItem .hover'));

  select.$destroy();
});

test('when isMulti, isDisabled, and value has items then items should be locked', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isDisabled: true,
      value: [{value: 'chocolate', label: 'Chocolate'}],
    }
  });

  t.ok(document.querySelector('.multiSelectItem.disabled'));

  select.$destroy();
});

test('when isMulti is true show each item in value if simple arrays are used', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items: ['pizza', 'chips', 'chocolate'],
      value: ['pizza', 'chocolate']
    }
  });

  const all = target.querySelectorAll('.multiSelectItem .multiSelectItem_label');
  t.ok(all[0].innerHTML === 'pizza');
  t.ok(all[1].innerHTML === 'chocolate');

  select.$destroy();
});

test('when getValue method is set should use that key to update value', async (t) => {
  const select = new Select({
    target,
    props: {
      items: [{id: 0, label: 'ONE'}, {id: 1, label: 'TWO'}],
      value: {id: 0, label: 'ONE'},
      optionIdentifier: 'id'
    }
  });

  t.ok(select.value.id === 0);
  await querySelectorClick('.selectContainer');
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(select.value.id === 1);

  select.$destroy();
});

test('when loadOptions method is supplied and filterText has length then items should populate via promise resolve', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      Selection: CustomItem
    }
  });

  await wait(0);
  select.$set({filterText: 'Juniper'});
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  select.$destroy();
});

test('when noOptionsMessage is set and there are no items then show message', async (t) => {
  const select = new Select({
    target,
    props: {
      noOptionsMessage: 'SO SO SO SCANDALOUS',
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  t.ok(document.querySelector('.empty').innerHTML === 'SO SO SO SCANDALOUS');

  select.$destroy();
});

test('when getSelectionLabel method is supplied and value are no items then display result of getSelectionLabel', async (t) => {
 const select = new Select({
    target,
    props: {
      getSelectionLabel: (option) => option.notLabel,
      value: {notLabel: 'This is not a label', value: 'not important'},
    }
  });


  t.ok(document.querySelector('.selection').innerHTML === 'This is not a label');

  select.$destroy();
});

test('when getOptionLabel method and items is supplied then display result of getOptionLabel for each option', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.notLabel,
      isFocused: true,
      items: [{notLabel: 'This is not a label', value: 'not important #1'}, {notLabel: 'This is not also not a label', value: 'not important #2'}],
    }
  });

  await handleKeyboard('ArrowDown');
  t.ok(document.querySelector('.item').innerHTML === 'This is not a label');

  select.$destroy();
});

test('when getOptionLabel method and items is supplied then display result of getOptionLabel for each option', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.notLabel,
      isFocused: true,
      items: [{notLabel: 'This is not a label', value: 'not important #1'}, {notLabel: 'This is not also not a label', value: 'not important #2'}],
    }
  });

  await handleKeyboard('ArrowDown');
  t.ok(document.querySelector('.item').innerHTML === 'This is not a label');

  select.$destroy();
});


test('when a custom Item component is supplied then use to display each item', async (t) => {
  const select = new Select({
    target,
    props: {
      Item: CustomItem,
      getOptionLabel: (option) => option.name,
      isFocused: true,
      items: [{
        image_url: 'https://images.punkapi.com/v2/keg.png',
        name: 'A Name', tagline: 'A tagline', abv: 'A abv'}],
    }
  });

  await handleKeyboard('ArrowDown');
  t.ok(document.querySelector('.customItem_name').innerHTML === 'A Name');

  select.$destroy();
});

test('when a custom Selection component is supplied then use to display selection', async (t) => {
  const select = new Select({
    target,
    props: {
      Item: CustomItem,
      Selection: CustomItem,
      getOptionLabel: (option) => option.name,
      isFocused: true,
      items: [{
        image_url: 'https://images.punkapi.com/v2/keg.png',
        name: 'A Name', tagline: 'A tagline', abv: 'A abv'}],
    }
  });

  await handleKeyboard('ArrowDown');
  await handleKeyboard('Enter');

  t.ok(document.querySelector('.customItem_name').innerHTML === 'A Name');

  select.$destroy();
});

test('when loadOptions method is supplied, isMulti is true and filterText has length then items should populate via promise resolve', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      getSelectionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      isMulti: true
    }
  });

  await wait(0);
  await handleSet(select, {filterText: 'Juniper'});
  await wait(600);
  await handleKeyboard('ArrowDown');
  await handleKeyboard('Enter');
  t.ok(document.querySelector('.multiSelectItem_label').innerHTML === 'Juniper Wheat Beer');
  select.$destroy();
});

test('when getSelectionLabel contains HTML then render the HTML', async (t) => {
  const select = new Select({
    target,
    props: {
      value: items[0],
      getSelectionLabel: (option) => `<p>${option.label}</p>`,
    }
  });

  t.ok(document.querySelector('.selection').innerHTML === '<p>Chocolate</p>');

  select.$destroy();
});

test('when getOptionLabel contains HTML then render the HTML', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      getOptionLabel: (option) => `<p>${option.label}</p>`,
      isFocused: true
    }
  });

  await handleKeyboard('ArrowDown');
  t.ok(document.querySelector('.item').innerHTML === '<p>Chocolate</p>');

  select.$destroy();
});

test('when isMulti is true, value populated and arrowLeft is pressed then no items in list should be active', async (t) => {
  const selectMultiSelected = new SelectMultiSelected({
    target: testTarget,
  });

  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'chips', label: 'Chips'},
      ],
      isFocused: true

    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  t.ok(!document.querySelector('.hover'));
  select.$destroy();
  selectMultiSelected.$destroy();
});

test('when hideEmptyState true then do not show "no options" div ', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true,
      filterText: 'x',
      hideEmptyState: true
    }
  });

  await wait(0);

  t.ok(!document.querySelector('.empty'));

  select.$destroy();
});

test('when value changes then select event should fire', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
    }
  });

  let selectEvent = undefined;

  select.$on('select', event => {
    selectEvent = event;
  });

  await handleSet(select, {isFocused: true});
  await handleKeyboard('ArrowDown');
  await handleKeyboard('Enter');

  t.ok(selectEvent);

  select.$destroy();
});

test('when value is cleared the clear event is fired', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: items[0],
    }
  });

  let clearEvent = false;
  select.$on('clear', () => {
    clearEvent = true;
  });

  document.querySelector('.clearSelect').click();
  t.ok(clearEvent);

  select.$destroy();
});

test('when multi item is cleared the clear event is fired with removed item', async (t) => {
  const itemToRemove = items[0];

  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [itemToRemove]
    }
  });

  let removedItem;

  select.$on('clear', (event) => {
    removedItem = event.detail;
  });

  document.querySelector('.multiSelectItem_clear').click();
  t.equal(JSON.stringify(removedItem), JSON.stringify(itemToRemove));

  select.$destroy();
});

test('when items in list filter or update then first item in list should highlight', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isFocused: true
    }
  });

  await handleKeyboard('ArrowDown');
  await handleKeyboard('ArrowDown');
  await handleKeyboard('ArrowDown');

  t.ok(document.querySelector('.hover').innerHTML === 'Cake');
  await handleSet(select, {filterText: 'c'});
  t.ok(document.querySelector('.hover').innerHTML === 'Chocolate');

  select.$destroy();
});

test('when item is selected or state changes then check value[optionIdentifier] has changed before firing "select" event', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'cake', label: 'Cake'}
    }
  });

  let item = undefined;

  select.$on('select', () => {
    item = true;
  });

  await handleSet(select, {value: {value: 'cake', label: 'Cake'}});

  t.ok(!item)
  select.$destroy();
});

test('when isMulti and item is selected or state changes then check value[optionIdentifier] has changed before firing "select" event', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'chips', label: 'Chips'},
      ],
    }
  });

  let item = undefined;

  select.$on('select', () => {
    item = true;
  });

  await handleSet(select, {value: [{value: 'pizza', label: 'Pizza'},{value: 'chips', label: 'Chips'}]});
  t.ok(!item);
  item = false;
  await handleSet(select, {value: [{value: 'pizza', label: 'Pizza'}]});

  t.ok(item);
  select.$destroy();
});

test('when isFocused turns to false then check Select is no longer in focus', async (t) => {
  const select = new Select({
    target,
    props: {
      isFocused: true,
      items,
    }
  });

  const selectSecond = new Select({
    target: extraTarget,
    props: {
      isFocused: false,
      items,
    }
  });

  select.$on('select', () => {
    setTimeout(() => {
      select.$set({
        isFocused: false,
      })
    }, 0)

    selectSecond.$set({
      isFocused: true
    })
  });

  await handleSet(select, {value: {value: 'pizza', label: 'Pizza'}});


  await wait(0);

  t.ok(selectSecond.isFocused);
  t.ok(!select.isFocused);

  selectSecond.$destroy();
  select.$destroy();
});

test('when items and loadOptions method are both supplied then fallback to items until filterText changes', async (t) => {
  const _items = [{name: 'test1', id: 0}, {name: 'test2', id: 1}, {name: 'test3', id: 2}];

  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      getSelectionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      items: _items,
      isFocused: true,
      listOpen: true
    }
  });

  await wait(0);
  t.ok(document.querySelector('.item').innerHTML === 'test1');
  await handleSet(select, {filterText: 'Juniper'});
  await wait(500);
  t.ok(document.querySelector('.item').innerHTML === 'Juniper Wheat Beer');
  await handleSet(select, {filterText: ''});
  t.ok(document.querySelector('.item').innerHTML === 'test1');

  select.$destroy();
});

test('when items is just an array of strings then render list', async (t) => {
  const items = ['one', 'two', 'three'];

  const select = new Select({
    target,
    props: {
      items,
      listOpen: true
    }
  });

  await wait(0);
  t.ok(document.querySelector('.item').innerHTML === 'one');

  select.$destroy();
});

test('when items are just strings then value should render', async (t) => {
  const items = ['one', 'two', 'three'];

  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'one', label: 'one', index: 0}
    }
  });

  t.ok(document.querySelector('.selection').innerHTML === 'one');
  select.$destroy();
});

test('when isVirtualList then render list', async (t) => {
  function fill(len, fn) {
    return Array(len).fill().map((_, i) => fn(i));
  }

  const items = fill(10000, (i) => {
      const name = getName();
      return name
  });

  const select = new Select({
    target,
    props: {
      items,
      isVirtualList: true,
      listOpen: true
    }
  });

  await wait(0);
  t.ok(document.querySelector('.listItem'));

  select.$destroy();
});

test('when isVirtualList and filterText changes then rendered list scrolls to top', async (t) => {
  function fill(len, fn) {
    return Array(len).fill().map((_, i) => fn(i));
  }

  const items = fill(10000, (i) => {
      const name = getName();
      return name
  });

  const select = new Select({
    target,
    props: {
      items,
      isVirtualList: true,
      listOpen: true
    }
  });

  await wait(0);
  const virtual = document.querySelector('svelte-virtual-list-viewport');
  virtual.scrollTop = 120000;

  select.$set({
    filterText: 'swift'
  });

  await wait(0);
  t.ok(virtual.scrollTop === 0);

  select.$destroy();
});

test('when loadOptions method is supplied but filterText is empty then do not run loadOptions and clean list', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      Selection: CustomItem
    }
  });

  await wait(0);
  select.$set({filterText: 'Juniper'});
  await wait(500);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(document.querySelector('.customItem_name').innerHTML === 'Juniper Wheat Beer');
  select.$set({value: undefined, filterText: ''});
  await wait(0);
  select.$set({listOpen: true});
  await wait(0);
  t.ok(document.querySelector('.empty'));

  select.$destroy();
});

test('when isMulti and value has items then check each item is unique', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'pizza', label: 'Pizza'},
        {value: 'cake', label: 'Cake'},
      ],
    }
  });

  t.ok(select.value.length === 2);

  select.$destroy();
});

test('when isMulti and textFilter has length then enter should select item', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isFocused: true,
      filterText: 'p',
      listOpen: true
    }
  });

  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(select.value[0].value === 'pizza');

  select.$destroy();
});

test('when isMulti and textFilter has length and no items in list then enter should do nothing', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isFocused: true,
      filterText: 'zc',
      listOpen: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(select.value === undefined);

  select.$destroy();
});

test('When isMulti and no selected item then delete should do nothing', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isFocused: true,
      listOpen: true
    }
  });

  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Backspace'}));
  t.ok(select.listOpen === true);

  select.$destroy();
});

test('When list is open, filterText applied and Enter/Tab key pressed should select and show highlighted value', async (t) => {
  const select = new Select({
    target,
    props: {
      listOpen: true,
      isFocused: true,
      filterText: 'A5',
      items: ['A5', 'test string', 'something else']
    }
  });

  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(select.value.value, 'A5');
  await wait(0);
  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'A5');

  select.$destroy();
});


test('When inputAttributes is supplied each attribute is placed on the Select input field', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      inputAttributes: {
        id: 'testId',
        autocomplete: 'custom-value'
      }
    }
  });

  const el = document.getElementById('testId');

  t.equal(el.id, 'testId');
  t.equal(el.getAttribute('autocomplete'), 'custom-value');

  select.$destroy();
});

test('when items and value supplied as just strings then value should render correctly', async (t) => {
  const select = new Select({
    target,
    props: {
      items: ['Pizza', 'Chocolate', 'Crisps'],
      value: 'Pizza'
    }
  });

  t.equal(document.querySelector('.selectedItem .selection').innerHTML, 'Pizza');

  select.$destroy();
});

test('when isMulti with items and value supplied as just strings then value should render correctly', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items: ['Pizza', 'Chocolate', 'Crisps'],
      value: ['Pizza']
    }
  });

  t.equal(document.querySelector('.multiSelectItem_label').innerHTML, 'Pizza');

  select.$destroy();
});

test('when isMulti, groupBy and value are supplied then list should be filtered', async (t) => {
  let _items = [
    { id: 1, name: "Foo", group: "first" },
    { id: 2, name: "Bar", group: "second" },
    { id: 3, name: "Baz", group: "second" },
    { id: 4, name: "Qux", group: "first" },
    { id: 5, name: "Bah", group: "first" },
  ];

  const select = new Select({
    target,
    props: {
      isMulti: true,
      items: _items,
      groupBy: (item) => item.group,
      optionIdentifier: 'id',
      getSelectionLabel: (item) => item.name,
      getOptionLabel: (item) => item.name,
      value: [{ id: 2, name: "Bar", group: "second" }],
      listOpen: true
    }
  });

  t.ok(!select.filteredItems.find(item => item.name === 'Bar'));

  select.$destroy();
});

test('When isCreatable disabled, creator is not displayed', async (t) => {
  const filterText = 'abc';

  const select = new Select({
    target,
    props: {
      items,
      isFocused: true,
      listOpen: true
    }
  });

  select.$set({ filterText });

  await wait(0);

  t.ok(document.querySelector('.listContainer > .empty'));

  select.$destroy();
});

test('When isCreatable enabled, creator displays getOptionLabel for isCreator', async (t) => {
  const filterText = 'abc_XXXX';

  function getOptionLabel(item, filterText) {
    return item.isCreator ? `Wanna add ${filterText}?`: item.label;
  }

  const creatorItem = { label: filterText, value: filterText, isCreator: true };

  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true,
      getOptionLabel
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  const listItems = document.querySelectorAll('.listContainer > .listItem');
  t.equal(listItems[listItems.length - 1].querySelector('.item').innerHTML, getOptionLabel(creatorItem, filterText));

  select.$destroy();
});

test('When isCreatable enabled, creator is not displayed when duplicate item value in item list', async (t) => {
  const dupeValueForCheck = 'xxxxxx';
  const item = {
    value: dupeValueForCheck,
    label: dupeValueForCheck
  };

  const select = new Select({
    target,
    props: {
      items: [item],
      isCreatable: true,
      listOpen: true
    }
  });

  await wait(0);
  select.$set({ filterText: dupeValueForCheck });
  await wait(0);

  const listItems = document.querySelectorAll('.listContainer > .listItem');
  t.equal(listItems[listItems.length - 1].querySelector('.item').innerHTML, dupeValueForCheck);

  select.$destroy();
});

test('When creator selected, selected item is set to created item', async (t) => {
  const filterText = 'abc';

  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  const { value } = select;
  t.ok(value.value === 'abc');
  t.ok(value.label === 'abc');

  select.$destroy();
});

test('When creator is selected, created item it added to multi selection', async (t) => {
  const filterText = 'abc';

  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true,
      isMulti: true
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  const { value } = select;
  t.ok(value[0].value === 'abc');
  t.ok(value[0].label === 'abc');

  select.$destroy();
});

test('When creator is selected multiple times, items are all added to multi selection', async (t) => {
  const filterTextForItem1 = 'abc';
  const filterTextForItem2 = 'def';

  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true,
      isMulti: true
    }
  });

  await wait(0);
  select.$set({ filterText: filterTextForItem1 });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  t.ok(select.value[0].value === 'abc');

  select.$set({ filterText: filterTextForItem2 });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  t.ok(select.value[1].value === 'def');

  select.$destroy();
});

test('When isMulti and an items remove icon is clicked then item should be removed from value', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      value: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'cake', label: 'Cake'},
      ],
      isMulti: true
    }
  });

  await querySelectorClick('.multiSelectItem_clear');
  t.ok(select.value[0].value === 'cake')
  await querySelectorClick('.multiSelectItem_clear');
  t.ok(select.value === undefined);

  select.$destroy();
});

test('When isCreatable with non-default item structure, item creator displays getCreatorLabel label for isCreator', async (t) => {
  const _items = [
    {country: 'Italy', food: 'Pizza'},
    {country: 'Australia', food: 'Meat Pie'},
    {country: 'China', food: 'Fried Rice'}
  ];

  const filterText = 'Fried Chicken Roll';

  function creatorLabel(filterText) {
    return `Do you want to create ${ filterText } as an added food?`;
  }

  function itemDisplay(item, filterText) {
    return item.isCreator ? creatorLabel(filterText) : `${item.food} (${item.country})`;
  }

  const select = new Select({
    target,
    props: {
      optionIdentifier: 'food',
      getOptionLabel: itemDisplay,
      getSelectionLabel: itemDisplay,
      items: _items,
      isCreatable: true,
      createItem(filterText) {
        return {
          food: filterText,
          country: 'Added'
        };
      }
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  const listItems = document.querySelectorAll('.listContainer > .listItem');
  console.log('listItems :>> ', listItems);
  t.equal(listItems[listItems.length - 1].querySelector('.item').innerHTML, creatorLabel(filterText));

  select.$destroy();
});

test('When isCreatable and isMulti and optionIdentifier is supplied creator displays getCreatorLabel label', async (t) => {
  const filterText = 'abc';
  const _items = [
    {foo: 'chocolate', label: 'Chocolate'},
    {foo: 'pizza', label: 'Pizza'}
  ];

  const select = new Select({
    target,
    props: {
      optionIdentifier: 'foo',
      isMulti: true,
      items: _items,
      isCreatable: true
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  const listItems = document.querySelectorAll('.listContainer > .listItem');
  t.equal(listItems[listItems.length - 1].querySelector('.item').innerHTML, `Create \"${ filterText }\"`);

  select.$destroy();
});

test('When isCreatable and isMulti and optionIdentifier is supplied multiple creatable items can be added', async (t) => {
  const filterText = 'foo';
  const filterText2 = 'bar';

  const _items = [
    {id: 1, tag_name: 'Banana'},
    {id: 5, tag_name: 'Orange'},
    {id: 4, tag_name: 'Tree'},
    {id: 3, tag_name: 'Guns'},
    {id: 2, tag_name: 'Cars'},
  ];

  const optionIdentifier = 'tag_name';
  const getOptionLabel = (option) => option.tag_name;
  const getSelectionLabel = (option) => option.tag_name;
  const createItem = (filterText) => ({id:undefined, tag_name:filterText});

  const select = new Select({
    target,
    props: {
      optionIdentifier,
      isMulti: true,
      items: _items,
      isCreatable: true,
      getOptionLabel,
      getSelectionLabel,
      createItem,
    }
  });

  await wait(0);
  select.$set({ filterText });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  select.$set({ filterText: filterText2 });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);

  t.ok(select.value.length === 2);
  t.ok(select.value[0].tag_name);

  select.$destroy();
});

test('When isCreatable and item is created then createItem method should only run once', async (t) => {
  let createItemRun = 0;
  const createItem = (filterText) => {
    createItemRun += 1;
    return {
      value: filterText,
      label: filterText
    };
  };

  const select = new Select({
    target,
    props: {
      isCreatable: true,
      items,
      createItem
    }
  });

  await wait(0);
  select.$set({ filterText: 'foo' });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.ok(createItemRun === 2);

  select.$destroy();
});

test('When items are collection and value a string then lookup item using optionIdentifier and update value to match', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: 'cake'
    }
  });

  await wait(0);
  t.ok(select.value.value === 'cake');
  select.$set({ value: 'pizza' });
  await wait(0);
  t.ok(select.value.value === 'pizza');
  select.$destroy();
});

test('When listAutoWidth is set to false list container should have style of width:100%', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listAutoWidth: false,
      listOpen: true
    }
  });

  await wait(0);
  const listWidth = document.querySelectorAll('.selectContainer > div')[0].style.width;
  t.ok(listWidth === '100%');
  select.$destroy();
});


test('When item is already active and is selected from list then close list', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true,
      value: 'pizza'
    }
  });

  await wait(0);
  await querySelectorClick('.listContainer > .listItem > .item.active');
  await wait(0);
  t.ok(select.value.value === 'pizza');
  select.$destroy();
});


test('When Icon prop is supplied then render on Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      Icon: TestIcon
    }
  });

  t.ok(document.querySelectorAll('#testIcon')[0]);

  select.$destroy();
});

test('When showChevron prop is true only show chevron when there is no value on Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'chocolate', label: 'Chocolate'},
      showChevron: true
    }
  });

  t.ok(document.querySelectorAll('.indicator').length === 0);

  select.$destroy();
});

test('When showChevron prop is true and no value show chevron on Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      showChevron: true
    }
  });

  t.ok(document.querySelectorAll('.indicator')[0]);

  select.$destroy();
});

test('When showIndicator prop is true always show chevron on Select', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'chocolate', label: 'Chocolate'},
      showIndicator: true
    }
  });

  t.ok(document.querySelectorAll('.indicator')[0]);

  select.$destroy();
});

test('When items and loadItems then listOpen should be false', async (t) => {
  const select = new Select({
    target,
    props: {
      getSelectionLabel: (option) => option.name,
      getOptionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      items: [{
        id: 1,
        name: 'Initial Items #1'
      }]

    }
  });

  t.ok(select.listOpen === false);

  select.$destroy();
});

test('Select container classes can be injected', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: { name: 'Item #2' },
      containerClasses: 'testclass',
    },
  });

  t.ok(
    document.querySelector('.selectContainer').classList.contains('testclass')
  );
  select.$destroy();
});


test('When noOptionsMessage is changed after List component has been created then propagate update', async (t) => {
  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      Selection: CustomItem,
      noOptionsMessage: 'FIRST'
    },
  });

  await wait(0);
  select.$set({listOpen: true});
  await wait(0);
  t.ok(document.querySelector('.empty').innerHTML === 'FIRST');
  select.$set({noOptionsMessage: 'SECOND'});
  await wait(0);
  t.ok(document.querySelector('.empty').innerHTML === 'SECOND');
  select.$set({filterText: 'sdfsf ssdfsdfs fs'});
  select.$set({noOptionsMessage: 'THIRD'});
  await wait(0);
  t.ok(document.querySelector('.empty').innerHTML === 'THIRD');

  select.$destroy();
});


test('When loadOptions promise is resolved then dispatch loaded', async (t) => {
  const select = new Select({
    target,
    props: {
      loadOptions: resolvePromise,
    },
  });

  let loadedEventData = undefined;
  const loadedOff = select.$on('loaded', event => {
    loadedEventData = event;
  });
  let errorEventData = undefined;
  const errorOff = select.$on('error', event => {
    errorEventData = event;
  })

  await wait(0);
  select.$set({listOpen: true});
  await wait(0);
  select.$set({filterText: 'test'});
  await wait(500);
  t.arrayEqual(loadedEventData.detail.items, ['a', 'b', 'c']);
  t.equal(errorEventData, undefined);

  loadedOff();
  errorOff();
  select.$destroy();
});

test('When loadOptions promise is rejected then dispatch error', async (t) => {
  const select = new Select({
    target,
    props: {
      loadOptions: rejectPromise,
    },
  });

  let loadedEventData = undefined;
  const loadedOff = select.$on('loaded', event => {
    loadedEventData = event;
  });
  let errorEventData = undefined;
  const errorOff = select.$on('error', event => {
    errorEventData = event;
  });

  await wait(0);
  select.$set({listOpen: true});
  await wait(0);
  select.$set({filterText: 'test'});
  await wait(500);
  t.equal(loadedEventData, undefined);
  t.equal(errorEventData.detail.type, 'loadOptions');
  t.equal(errorEventData.detail.details, 'error 123');

  loadedOff();
  errorOff();
  select.$destroy();
});

test('When items change then value should also update', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'chips', label: 'Chips'},
    },
  });

  await wait(0);

  select.$set({items: [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Loaded Fries'},
    {value: 'ice-cream', label: 'Ice Cream'},
  ]});

  await wait(0);

  t.ok(select.value.label === 'Loaded Fries');
  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Loaded Fries');

  select.$destroy();

  await wait(0);

  const multiSelect = new Select({
    target,
    props: {
      isMulti: true,
      items,
      value: [{value: 'chips', label: 'Chips'}, {value: 'pizza', label: 'Pizza'}],
    },
  });

  await wait(0);

  multiSelect.$set({items: [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'pizza', label: 'Cheese Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Loaded Fries'},
    {value: 'ice-cream', label: 'Ice Cream'},
  ]});

  await wait(0);

  t.ok(multiSelect.value[0].label === 'Loaded Fries');
  t.ok(multiSelect.value[1].label === 'Cheese Pizza');

  multiSelect.$destroy();
});

test('When items change then value should also update but only if found in items', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: {value: 'chips', label: 'Chips'},
    },
  });

  await wait(0);

  select.$set({items: [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'loaded-fries', label: 'Loaded Fries'},
    {value: 'ice-cream', label: 'Ice Cream'},
  ]});

  await wait(0);

  t.ok(select.value.label === 'Chips');
  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Chips');

  select.$destroy();
});

test('When isMulti and multiFullItemClearable then clicking anywhere on the item will remove item', async (t) => {
  const multiSelect = new Select({
    target,
    props: {
      isMulti: true,
      items,
      multiFullItemClearable: true,
      value: [{value: 'chips', label: 'Chips'}, {value: 'pizza', label: 'Pizza'}],
    },
  });

  await wait(0);
  await querySelectorClick('.multiSelectItem');
  await wait(0);
  t.ok(multiSelect.value[0].label === 'Pizza');
  
  multiSelect.$destroy();
});

test('when loadOptions and items is supplied then list should close on blur', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let items=[{value:1, label:1}, {value:2, label:2}];
	let loadOptions = async(filterText) => {
		const res = await fetch(`https://api.punkapi.com/v2/beers?beer_name=${filterText}`)
		const data = await res.json();    
    return data.map((beer)=> ({value: beer.id, label: beer.name}));
	}

  const select = new Select({
    target,
    props: {
      items,
      loadOptions,
    }
  });

  select.$set({isFocused: true});
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  select.$set(({ filterText: 's'}))
  await wait(600);
  div.click();
  div.remove();

  select.$destroy();
});



test('when isCreatable and item created then event "itemCreated" should dispatch', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isCreatable: true,
      isFocused: true,
      listOpen: true,
      isMulti: true
    }
  });
  
  let eventDetail;
  select.$on('itemCreated', (event) => {
    eventDetail = event.detail;
  });

  select.$set({ filterText: 'TestCreate' });
  await wait(0);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  await wait(0);
  t.ok(eventDetail === 'TestCreate');

  select.$destroy();
});

async function getCancelledRes() {
  Promise.resolve({cancelled: true});
}

test('when loadOptions response returns cancelled true then dont end loading state', async (t) => {
  const select = new Select({
    target,
    props: {
      loadOptions: getCancelledRes,
    }
  });

  select.$set({filterText: 'Juniper'});
  await wait(0);
  

  select.$destroy();
});

test('when ClearItem replace clear icon', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      ClearIcon: TestClearIcon,
      value: {value: 'chips', label: 'Chips'}
    }
  });
  
  t.ok(target.querySelector('.testClearIcon'));

  select.$destroy();
});


test('when switching between isMulti true/false ensure Select continues working', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true,
      value: {value: 'chips', label: 'Chips'}
    }
  });

  select.isMulti = true;
  select.loadOptions = itemsPromise;

  t.ok(JSON.stringify(select.value) === JSON.stringify([{value: 'chips', label: 'Chips'}]));
  t.ok(Array.isArray(select.value));
  
  select.isMulti = false;
  select.loadOptions = null;
  select.items = [...items];

  t.ok(select.value === null);

  select.$destroy();
});

test('when isSearchable is false then input should be readonly', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      isSearchable: false
    }
  });

  let elem = target.querySelector('.selectContainer input');
  t.ok(elem.hasAttribute('readonly'));

  select.$destroy();
});


test('when esc key pressed should close list', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      listOpen: true
    }
  });

  await wait(0);
  t.ok(select.listOpen === true);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
  t.ok(select.listOpen === false);

  select.$destroy();
});


test('when isMulti and placeholderAlwaysShow then always show placeholder text', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      value: [{value: 'chocolate', label: 'Chocolate'},
      {value: 'pizza', label: 'Pizza'},],
      isMulti: true,
      placeholderAlwaysShow: true,
      placeholder: 'foo bar'
    }
  });

  await wait(0);
  let elem = target.querySelector('.selectContainer input');
  t.ok(elem.placeholder === 'foo bar');

  select.$destroy();
});



// this allows us to close puppeteer once tests have completed
window.done = done;
export default {};
