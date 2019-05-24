import getName from 'namey-mcnameface';
import normalizeHtml from '../utils/normalizeHtml';

import CustomItem from './CustomItem.svelte';
import Select from '../../src/Select.svelte';
import List from '../../src/List.svelte';
import SelectDefault from './Select/Select--default.html'
import SelectMultiSelected from './Select/Select--multiSelected.html'
import ListDefault from './List/List--default.html'
import ParentContainer from './Select/ParentContainer.html'
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

// setup
const target = document.querySelector('main');
const testTarget = document.getElementById('testTemplate');
const extraTarget = document.getElementById('extra');
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

function wait(ms) {
  return new Promise(f => setTimeout(f, ms));
}

assert.htmlEqual = (a, b) => {
  assert.equal(normalizeHtml(a), normalizeHtml(b));
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

  const hasFocused = await focus(select.$$.ctx.input, setFocus);
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
      selectedValue: {value: 'pizza', label: 'Pizza', index: 1},
      activeItemIndex: 1,
    }
  });

  t.ok(target.querySelector('.listItem.active .item').innerHTML === 'Pizza');

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
      selectedValue: {value: 'sunday-roast', label: 'Sunday Roast'},
    }
  });

  let offsetBounding;
  const container = target.querySelector('.listContainer');
  const focusedElemBounding = container.querySelector('.listItem.active');
  if (focusedElemBounding) {
    offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
  }

  t.equal(offsetBounding, 0);
  list.$destroy();
});

test.only('list scrolls to hovered item when navigating with keys', async (t) => {
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

    const hoveredItem = container.querySelector('.listItem.hover');
    const isInViewport = container.getBoundingClientRect().bottom - hoveredItem.getBoundingClientRect().bottom >= 0;

    selectedItemsAreWithinBounds = selectedItemsAreWithinBounds && isInViewport;

    loopCount += 1;
  } while (loopCount < totalListItems);


  t.ok(selectedItemsAreWithinBounds);
  //list.$destroy();
});

test('hover item updates on keyUp or keyDown', async (t) => {
  const list = new List({
    target,
    props: {
      items: items,
      activeItem: {value: 'chocolate', label: 'Chocolate'},
      activeItemIndex: 0,
    }
  });

  await handleKeyboard('ArrowDown');
  const focusedElemBounding = target.querySelector('.listItem.hover');
  t.equal(focusedElemBounding.innerHTML.trim(), `<div class="item">Pizza</div>`);
  list.$destroy();
});

test('on enter active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex
    }
  });

  let selectedValue = undefined;
  list.$on('itemSelected', event => {
    selectedValue = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(JSON.stringify(selectedValue.detail), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.$destroy();
});

test('on tab active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex
    }
  });

  let selectedValue = undefined;
  list.$on('itemSelected', event => {
    selectedValue = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
  t.equal(JSON.stringify(selectedValue.detail), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.$destroy();
});

test('on selected of current active item does not fire a itemSelected event', async (t) => {
  const list = new List({
    target,
    props: {
      items: itemsWithIndex,
      selectedValue: { value: 'chocolate', label: 'Chocolate', index: 0 },
      isFocused: true
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
      selectedValue: {value: 'chips', label: 'Chips'},
    }
  });

  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Chips');
  select.$destroy();
});

test('select view updates with selectedValue updates', async (t) => {
  const select = new Select({
    target,
  });
  
  await handleSet(select, {selectedValue: {value: 'chips', label: 'Chips'}});
  t.ok(target.querySelector('.selectedItem .selection').innerHTML === 'Chips');
  
  select.$destroy();
});

test('clear wipes selectedValue and updates view', async (t) => {
  const select = new Select({
    target,
    props: {
      selectedValue: {value: 'chips', label: 'Chips'},
    }
  });

  await handleSet(select, {selectedValue: undefined});
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
  t.ok(target.querySelector('.listItem.hover .item').innerHTML === 'Chocolate');

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
      activeItemIndex: 1,
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
  t.ok(document.querySelector('.listItem.hover .item').innerHTML === 'Cake');
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
  t.ok(select.$$.ctx.isFocused);
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
  t.ok(select.$$.ctx.isFocused);
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
  t.ok(!document.querySelector('.selectContainer .selectedValue'));

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
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  await wait(0);
  document.querySelector('.clearSelect').click();
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
      selectedValue: {name: 'Item #2'},
      activeItemIndex: 1,
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

  t.ok(select.$$.ctx.filteredItems.length === 5);
  await handleSet(select, {filterText: 'Ice Cream'})
  t.ok(select.$$.ctx.filteredItems.length === 1);

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

  await handleSet(select, {filterText: 'I'})
  t.ok(document.querySelector('.listItem.hover'));
  select.$destroy();
});

test('Select container styles can be overridden', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      selectedValue: {name: 'Item #2'},
      activeItemIndex: 1,
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
      selectedValue: {name: 'Item #4'}
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
      selectedValue: {value: 'chips', label: 'Chips'},
    }
  });

  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);

  parent.$set({
    selectedValue: {value: 'ice-cream', label: 'Ice Cream'},
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

  const first = document.querySelector('.listItem');
  const last = document.querySelector('.listItem:last-child');

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
  t.ok(select.$$.ctx.list);
  await querySelectorClick('#extra .selectContainer');
  t.ok(!select.$$.ctx.list);
  t.ok(other.$$.ctx.list);

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

  t.ok(document.querySelector('.listItem').classList.contains('hover'));

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
  t.equal(JSON.stringify(select.$$.ctx.selectedValue), JSON.stringify({value: 'chocolate', label: 'Chocolate'}));

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
      selectedValue: {value: 'pizza', label: 'Pizza'},
      activeItemIndex: 1,
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
      items: itemsWithGroup,
      groupBy: (item) => item.group
    }
  });

  await querySelectorClick('.selectContainer');
  t.ok(target.querySelector('.listGroupTitle'));

  select.$destroy();
});

test('groups should be filtered by expression', async (t) => {  
  const select = new Select({
    target,
    props: {
      items: itemsWithGroup,
      groupBy: (item) => item.group,
      groupFilter: (groups) => {
        return groups.filter((group) => {
          return group !== 'Sweet';
        });
      }
    }
  });

  await querySelectorClick('.selectContainer');

  t.ok(target.querySelector('.listGroupTitle').innerHTML === 'Savory');
  t.ok(target.querySelector('.listItem.hover .item').innerHTML === 'Pizza');

  select.$destroy();
});

test('groups should be sorted by expression', async (t) => {
  const select = new Select({
    target,
    props: {
      items: itemsWithGroup,
      groupBy: (item) => item.group,
      groupFilter: (groups) => groups.reverse()
    }
  });

  await querySelectorClick('.selectContainer');
  t.ok(target.querySelector('.listGroupTitle').innerHTML === 'Savory');
  t.ok(target.querySelector('.listItem.hover .item').innerHTML === 'Pizza');
  
  select.$destroy();
});

test('when isMulti is true show each item in selectedValue', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: [
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

test('when isMulti is true and selectedValue is undefined show placeholder text', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: undefined
    }
  });

  t.ok(!target.querySelector('.multiSelectItem'));

  select.$destroy();
});

test('when isMulti is true clicking item in List will populate selectedValue', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: undefined
    }
  });

  await querySelectorClick('.selectContainer');
  await querySelectorClick('.listItem');

  t.equal(JSON.stringify(select.$$.ctx.selectedValue), JSON.stringify([{value: 'chocolate', label: 'Chocolate'}]));

  select.$destroy();
});

test('when isMulti is true items in selectedValue will not appear in List', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  t.equal(JSON.stringify(select.$$.ctx.filteredItems), JSON.stringify([
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Chips'},
    {value: 'ice-cream', label: 'Ice Cream'}
  ]));

  select.$destroy();
});

test('when isMulti is true both selectedValue and filterText filters List', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      filterText: 'Pizza',
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  t.equal(JSON.stringify(select.$$.ctx.filteredItems), JSON.stringify([
    {value: 'pizza', label: 'Pizza'}
  ]));

  select.$destroy();
});

test('when isMulti is true clicking X on a selected item will remove it from selectedValue', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]
    }
  });

  document.querySelector('.multiSelectItem_clear').click();
  t.equal(JSON.stringify(select.$$.ctx.selectedValue), JSON.stringify([{value: 'pizza', label: 'Pizza'}]));

  select.$destroy();
});

test('when isMulti is true and all selected items have been removed then placeholder should show and clear all should hide', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}]
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
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]
    }
  });

  document.querySelector('.clearSelect').click();
  t.equal(select.$$.ctx.selectedValue, undefined);

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
  t.equal(JSON.stringify(select.$$.ctx.selectedValue), JSON.stringify([{groupValue: 'Sweet', value: 'chocolate', label: 'Chocolate', group: 'Sweet'}]));

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
  await handleSet(select, {selectedValue: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]});
  t.ok(document.querySelector('.selectContainer').scrollHeight > 44);
  select.$destroy();
});

test('when isMulti and selectedValue is populated then navigating with LeftArrow updates activeSelectedValue', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}, {value: 'chips', label: 'Chips'},],
      isFocused: true
    }
  });

  target.style.maxWidth = '100%';
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  t.ok(select.$$.ctx.activeSelectedValue === 1)

  select.$destroy();
});

test('when isMulti and selectedValue is populated then navigating with ArrowRight updates activeSelectedValue', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}, {value: 'chips', label: 'Chips'},],
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowRight'}));
  t.ok(select.$$.ctx.activeSelectedValue === 1);

  select.$destroy();
});

test('when isMulti and selectedValue has items and list opens then first item in list should be active', async (t) => {
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

  t.ok(document.querySelector('.listItem.hover'));

  select.$destroy();
});

test('when isMulti, isDisabled, and selectedValue has items then items should be locked', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      isDisabled: true,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}],
    }
  });

  t.ok(document.querySelector('.multiSelectItem.disabled'));

  select.$destroy();
});

test('when getValue method is set should use that key to update selectedValue', async (t) => {
  const select = new Select({
    target,
    props: {
      items: [{id: 0, label: 'ONE'}, {id: 1, label: 'TWO'}],
      selectedValue: {id: 0, label: 'ONE'},
      optionIdentifier: 'id'
    }
  });

  t.ok(select.$$.ctx.selectedValue.id === 0);
  await querySelectorClick('.selectContainer');
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(select.$$.ctx.selectedValue.id === 1);

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

test('when getSelectionLabel method is supplied and selectedValue are no items then display result of getSelectionLabel', async (t) => {
 const select = new Select({
    target,
    props: {
      getSelectionLabel: (option) => option.notLabel,
      selectedValue: {notLabel: 'This is not a label', value: 'not important'},
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
      selectedValue: items[0],
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

test('when isMulti is true, selectedValue populated and arrowLeft is pressed then no items in list should be active', async (t) => {
  const selectMultiSelected = new SelectMultiSelected({
    target: testTarget,
  });

  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: [
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

  t.ok(!document.querySelector('.empty'));

  select.$destroy();
});

test('when selectedValue changes then select event should fire', async (t) => {
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

test('when selectedValue is cleared then clear event from fire select event', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      selectedValue: items[0],
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
  
  t.ok(document.querySelector('.hover .item').innerHTML === 'Cake');
  await handleSet(select, {filterText: 'c'});
  t.ok(document.querySelector('.hover .item').innerHTML === 'Chocolate');

  select.$destroy();
});

test('when item is selected or state changes then check selectedValue[optionIdentifier] has changed before firing "select" event', async (t) => {
  const select = new Select({
    target,
    props: {
      items,
      selectedValue: {value: 'cake', label: 'Cake'}
    }
  });

  let item = undefined;

  select.$on('select', () => {
    item = true;
  });

  await handleSet(select, {selectedValue: {value: 'cake', label: 'Cake'}});

  t.ok(!item)
  select.$destroy();
});

test('when isMulti and item is selected or state changes then check selectedValue[optionIdentifier] has changed before firing "select" event', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'chips', label: 'Chips'},
      ],
    }
  });

  let item = undefined;

  select.$on('select', () => {
    item = true;
  });

  await handleSet(select, {selectedValue: [{value: 'pizza', label: 'Pizza'},{value: 'chips', label: 'Chips'}]});
  t.ok(!item);
  item = false;
  await handleSet(select, {selectedValue: [{value: 'pizza', label: 'Pizza'}]});
  
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

  await handleSet(select, {selectedValue: {value: 'pizza', label: 'Pizza'}});


  await wait(0);

  t.ok(selectSecond.$$.ctx.isFocused);
  t.ok(!select.$$.ctx.isFocused);  

  selectSecond.$destroy();
  select.$destroy();
});

test('when items and loadOptions method are both supplied then fallback to items until filterText changes', async (t) => {
  const items = [{name: 'test1', id: 0}, {name: 'test2', id: 1}, {name: 'test3', id: 2}];

  const select = new Select({
    target,
    props: {
      getOptionLabel: (option) => option.name,
      getSelectionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',      
      items,
      isFocused: true,
      listOpen: true
    }
  });

  select.$on('state', ({current, changed}) => {
    if (changed.filterText && current.filterText === '' && !current.selectedValue) {
      select.$set({
        items
      })
    }
  });

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

  t.ok(document.querySelector('.item').innerHTML === 'one');

  select.$destroy();
});

test('when selectedValue just a string then selectedValue should render', async (t) => {
  const items = ['one', 'two', 'three'];

  const select = new Select({
    target,
    props: {
      items,
      selectedValue: {value: 'one', label: 'one', index: 0}
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

  select.$set({filterText: 'Juniper'});
  await wait(500);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(document.querySelector('.customItem_name').innerHTML === 'Juniper Wheat Beer');
  select.$set({selectedValue: undefined, filterText: '', listOpen: true});
  await wait(0);
  t.ok(document.querySelector('.empty'));

  select.$destroy();
});

test('when isMulti and selectedValue has items then check each item is unique', async (t) => {
  const select = new Select({
    target,
    props: {
      isMulti: true,
      items,
      selectedValue: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'pizza', label: 'Pizza'},
        {value: 'cake', label: 'Cake'},
      ],
    }
  });

  t.ok(select.$$.ctx.selectedValue.length === 2);

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

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(select.$$.ctx.selectedValue[0].value === 'pizza');

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
  t.ok(select.$$.ctx.selectedValue === undefined);

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

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Backspace'}));
  t.ok(select.$$.ctx.listOpen === true);

  select.$destroy();
});

test('...', async (t) => {
  function fill(len, fn) {
    return Array(len).fill().map((_, i) => fn(i));
  };
  
  const items = fill(100, (i) => {
    const name = getName();
    return name
  });

  const select = new Select({
    target,
    props: {
     
      items,
      
    }
  });

  select.$destroy();
});


function focus(element, setFocus) {
  return new Promise(fulfil => {
    element.addEventListener('focus', function handler() {
      element.removeEventListener('focus', handler);
      fulfil(true);
    });

    setFocus();
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

// this allows us to close puppeteer once tests have completed
window.done = done;
