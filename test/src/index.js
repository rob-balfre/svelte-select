import svelte from 'svelte';
import {Store} from 'svelte/store.js';
import CustomItem from './CustomItem.html';
import Select from '../../src/Select.svelte';
import List from '../../src/List.svelte';
import SelectDefault from './Select/Select--default.html'
import SelectFocus from './Select/Select--focus.html'
import SelectItemSelected from './Select/Select--itemSelected.html'
import SelectMultiSelected from './Select/Select--multiSelected.html'
import SelectMultiEmpty from './Select/Select--multiSelectEmpty.html'
import ListDefault from './List/List--default.html'
import ListEmpty from './List/List--empty.html'
import ListGrouped from './List/List--grouped.html'
import ListGroupedFiltered from './List/List--groupedFiltered.html'
import ListGroupedReversed from './List/List--groupedReversed.html'
import ListActiveItem from './List/List--activeItem.html'
import ParentContainer from './Select/ParentContainer.html'
import {assert, test, done} from 'tape-modern';


// setup
const target = document.querySelector('main');
const testTarget = document.getElementById('testTemplate');
const extraTarget = document.getElementById('extra');
const items = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'pizza', label: 'Pizza'},
  {value: 'cake', label: 'Cake'},
  {value: 'chips', label: 'Chips'},
  {value: 'ice-cream', label: 'Ice Cream'}
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

function indent(node, spaces) {
  if (node.childNodes.length === 0) return;

  if (node.childNodes.length > 1 || node.childNodes[0].nodeType !== 3) {
    const first = node.childNodes[0];
    const last = node.childNodes[node.childNodes.length - 1];

    const head = `\n${spaces}  `;
    const tail = `\n${spaces}`;

    if (first.nodeType === 3) {
      first.data = `${head}${first.data}`;
    } else {
      node.insertBefore(document.createTextNode(head), first);
    }

    if (last.nodeType === 3) {
      last.data = `${last.data}${tail}`;
    } else {
      node.appendChild(document.createTextNode(tail));
    }

    let lastType = null;
    for (let i = 0; i < node.childNodes.length; i += 1) {
      const child = node.childNodes[i];
      if (child.nodeType === 1) {
        indent(node.childNodes[i], `${spaces}  `);

        if (lastType === 1) {
          node.insertBefore(document.createTextNode(head), child);
          i += 1;
        }
      }

      lastType = child.nodeType;
    }
  }
}

function normalize(html) {
  const div = document.createElement('div');
  div.innerHTML = html
    .replace(/<link.+\/?>/g, '')
    .replace(/<!--.+?-->/g, '')
    .replace(/<!---->/g, '')
    .replace(/<object.+\/object>/g, '')
    .replace(/svelte-ref-\w+/g, '')
    .replace(/\s*svelte-\w+\s*/g, '')
    .replace(/class=""/g, '')
    .replace(/style=""/g, '')
    .replace(/>\s+/g, '>')
    .replace(/\s+</g, '<');

  indent(div, '');

  div.normalize();
  return div.innerHTML;
}

function wait(ms) {
  return new Promise(f => setTimeout(f, ms));
}

assert.htmlEqual = (a, b, msg) => {
  assert.equal(normalize(a), normalize(b));
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

  testTemplate.destroy();
  select.destroy();
});

test('when isFocused true container adds focused class', async (t) => {
  const testTemplate = new SelectFocus({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      isFocused: true
    }
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  select.destroy();
});

test('when isFocused changes to true input should focus', async (t) => {
  const select = new Select({
    target,
    data: {
      isFocused: false
    }
  });

  const setFocus = () => {
    select.set({isFocused: true});
  };

  const hasFocused = await focus(select.refs.input, setFocus);
  t.ok(hasFocused);
  select.destroy();
});

test('default empty list', async (t) => {
  const testTemplate = new ListEmpty({
    target: testTarget
  });

  const list = new List({
    target,
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  list.destroy();
});

test('default list with five items', async (t) => {
  const testTemplate = new ListDefault({
    target: testTarget
  });

  const list = new List({
    target,
    data: {
      items: itemsWithIndex
    }
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  list.destroy();
});

test('should highlight active list item', async (t) => {
  const testTemplate = new ListActiveItem({
    target: testTarget
  });

  const list = new List({
    target,
    data: {
      items: itemsWithIndex,
      selectedValue: {value: 'pizza', label: 'Pizza', index: 1},
      activeItemIndex: 1,
    }
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  list.destroy();
});

test('list scrolls to active item', async (t) => {
  const extras = [
    {value: 'chicken-schnitzel', label: 'Chicken Schnitzel', index: 5},
    {value: 'fried-chicken', label: 'Fried Chicken', index: 6},
    {value: 'sunday-roast', label: 'Sunday Roast', index: 7},
  ];
  const list = new List({
    target,
    data: {
      items: itemsWithIndex.concat(extras),
      selectedValue: {value: 'sunday-roast', label: 'Sunday Roast'},
    }
  });

  const {container} = list.refs;
  let offsetBounding;
  const focusedElemBounding = container.querySelector('.listItem.active');
  if (focusedElemBounding) {
    offsetBounding = container.getBoundingClientRect().bottom - focusedElemBounding.getBoundingClientRect().bottom;
  }

  t.equal(offsetBounding, 0);
  list.destroy();
});

test('hover item updates on keyUp or keyDown', async (t) => {
  const list = new List({
    target,
    data: {
      items: itemsWithIndex,
      activeItem: {value: 'chocolate', label: 'Chocolate'},
      activeItemIndex: 0,
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  const {container} = list.refs;
  const focusedElemBounding = container.querySelector('.listItem.hover');
  t.equal(focusedElemBounding.innerHTML.trim(), `<div class="item">Pizza</div>`);
  list.destroy();
});

test('on enter active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    data: {
      items: itemsWithIndex
    }
  });

  let selectedValue = undefined;
  list.on('itemSelected', event => {
    selectedValue = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.equal(JSON.stringify(selectedValue), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.destroy();
});

test('on tab active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    data: {
      items: itemsWithIndex
    }
  });

  let selectedValue = undefined;
  list.on('itemSelected', event => {
    selectedValue = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));

  t.equal(JSON.stringify(selectedValue), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.destroy();
});

test('on selected of current active item does not fire a itemSelected event', async (t) => {
  const list = new List({
    target,
    data: {
      items: itemsWithIndex,
      selectedValue: { value: 'chocolate', label: 'Chocolate', index: 0 },
      isFocused: true
    }
  });

  let itemSelectedFired = false;

  list.on('itemSelected', () => {
    itemSelectedFired = true;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.equal(itemSelectedFired, false);
  list.destroy();
});

test('selected item\'s default view', async (t) => {
  const testTemplate = new SelectItemSelected({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      selectedValue: {value: 'chips', label: 'Chips'},
    }
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
  select.destroy();
  testTemplate.destroy();
});

test('select view updates with selectedValue updates', async (t) => {
  let testTemplate = new SelectDefault({
    target: testTarget
  });

  const select = new Select({
    target,
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
  testTemplate.destroy();

  testTemplate = new SelectItemSelected({
    target: testTarget
  });

  select.set({selectedValue: {value: 'chips', label: 'Chips'}});

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  select.destroy();
});

test('clear wipes selectedValue and updates view', async (t) => {
  let testTemplate = new SelectItemSelected({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      selectedValue: {value: 'chips', label: 'Chips'},
    }
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
  testTemplate.destroy();

  testTemplate = new SelectDefault({
    target: testTarget
  });

  select.set({selectedValue: undefined});

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  select.destroy();
});

test('clicking on Select opens List', async (t) => {
  const select = new Select({
    target,
  });

  document.querySelector('.selectContainer').click();
  const listContainer = document.querySelector('.listContainer');
  t.ok(listContainer);

  select.destroy();
});

test('Select opens List populated with items', async (t) => {
  const testTemplate = new ListDefault({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  const listContainer = document.querySelector('.listContainer');
  t.htmlEqual(listContainer.outerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  select.destroy();
});

test('List starts with first item in hover state', async (t) => {
  const testTemplate = new ListDefault({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();

  testTemplate.destroy();
  select.destroy();
});

test('List starts with first item in hover state', async (t) => {
  const testTemplate = new ListDefault({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      items,
      activeItemIndex: 1,
    }
  });

  document.querySelector('.selectContainer').click();

  testTemplate.destroy();
  select.destroy();
});

test('select item from list', async (t) => {
  const testTemplate = new ListDefault({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      items,
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify({value: 'cake', label: 'Cake'}));

  testTemplate.destroy();
  select.destroy();
});

test('when listPosition is set to top list should be above the input', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      listOpen: true,
      listPlacement: 'top'
    }
  });

  const distanceOfListBottomFromViewportTop = document.querySelector('.listContainer').getBoundingClientRect().bottom;
  const distanceOfInputTopFromViewportTop = document.querySelector('.selectContainer').getBoundingClientRect().top;

  t.ok(distanceOfListBottomFromViewportTop <= distanceOfInputTopFromViewportTop);

  select.destroy();
});

test('when listPlacement is set to bottom the list should be below the input', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      listOpen: true,
      listPlacement: 'bottom'
    }
  });

  const distanceOfListTopFromViewportTop = document.querySelector('.listContainer').getBoundingClientRect().top;
  const distanceOfInputBottomFromViewportTop = document.querySelector('.selectContainer').getBoundingClientRect().bottom;

  t.ok(distanceOfListTopFromViewportTop >= distanceOfInputBottomFromViewportTop);

  select.destroy();
});

test('blur should close list and remove focus from select', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    data: {
      items
    }
  });

  select.set({isFocused: true});
  div.click();
  div.remove();
  t.ok(!document.querySelector('.listContainer'));
  t.ok(document.querySelector('.selectContainer input') !== document.activeElement);
  select.destroy();
});

test('selecting item should close list but keep focus on select', async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(!document.querySelector('.listContainer'));
  t.ok(select.get().isFocused);
  t.ok(document.querySelector('.selectContainer.focused'));
  select.destroy();
});

test('clicking Select with selected item should open list with item listed as active', async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  document.querySelector('.selectContainer').click();
  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify({value: 'cake', label: 'Cake'}));
  select.destroy();
});

test('focus on Select input updates focus state', async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer input').focus();
  t.ok(select.get().isFocused);

  select.destroy();
});

test('key up and down when Select focused opens list', async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer input').focus();
  t.ok(select.get().isFocused);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  t.ok(document.querySelector('.listContainer'));

  select.destroy();
});

test('List should keep width of parent Select', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isFocused: true
    }
  });

  document.querySelector('.selectContainer input').focus();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  const selectContainer = document.querySelector('.selectContainer');
  const listContainer = document.querySelector('.listContainer');
  t.equal(selectContainer.offsetWidth, listContainer.offsetWidth);

  select.destroy();
});

test('Placeholder text should reappear when List is closed', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.destroy();
});

test('typing in Select filter will hide selected Item', async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.set({filterText: 'potato'});
  t.ok(!document.querySelector('.selectContainer .selectedValue'));

  select.destroy();
});

test('clearing selected item closes List if open', async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  document.querySelector('.clearSelect').click();
  t.ok(!document.querySelector('.listContainer'));

  select.destroy();
});

test('closing List clears Select filter text', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.set({filterText: 'potato'});
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.destroy();
});

test('closing List clears Select filter text', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.set({filterText: 'potato'});
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.destroy();
});

test('closing List item clears Select filter text', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  select.set({filterText: 'potato'});
  div.click();
  div.remove();
  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, 'Select...');

  select.destroy();
});

test('typing while Select is focused populates Select filter text', async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  select.set({isFocused: true});
  document.querySelector('.selectContainer input').blur();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 's'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 't'}));
  // KeyboardEvent not firing in svelte - not sure why, manual test seems to work

  select.destroy();
});

test('Select input placeholder wipes while item is selected', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      selectedValue: {name: 'Item #2'},
      activeItemIndex: 1,
    }
  });

  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, '');

  select.destroy();
});

test('Select listOpen state controls List', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      listOpen: true
    }
  });

  t.ok(document.querySelector('.listContainer'));
  select.set({
    listOpen: false
  });
  t.ok(!document.querySelector('.listContainer'));

  select.destroy();
});

test('clicking Select toggles List open state', async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  t.ok(!document.querySelector('.listContainer'));
  document.querySelector('.selectContainer').click();
  t.ok(document.querySelector('.listContainer'));
  document.querySelector('.selectContainer').click();
  t.ok(!document.querySelector('.listContainer'));

  select.destroy();
});

test('Select filter text filters list', async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  t.ok(select.get().filteredItems.length === 5);
  select.set({filterText: 'Ice Cream'});
  t.ok(select.get().filteredItems.length === 1);

  select.destroy();
});

test('Typing in the Select filter opens List', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isFocused: true
    }
  });

  select.set({filterText: '5'});
  t.ok(document.querySelector('.listContainer'));
  select.destroy();
});

test('While filtering, the first item in List should receive hover class', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isFocused: true
    }
  });

  select.set({filterText: 'I'});
  t.ok(document.querySelector('.listItem.hover'));
  select.destroy();
});

test('Select container styles can be overridden', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      selectedValue: {name: 'Item #2'},
      activeItemIndex: 1,
      containerStyles: `padding-left: 40px;`
    }
  });

  t.equal(document.querySelector('.selectContainer').style.cssText, `padding-left: 40px;`);
  select.destroy();
});

test('Select can be disabled', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isDisabled: true,
    }
  });

  t.ok(document.querySelector('.selectContainer.disabled'));

  select.destroy();
});

test('Select List closes when you click enter', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));


  select.destroy();
});

test('tabbing should move between tabIndexes and others Selects', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isFocused: false
    }
  });

  const other = new Select({
    target: extraTarget,
    data: {
      items,
      isFocused: false
    }
  });

  // window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));
  // TAB not working from Puppeteer - not sure why.

  select.destroy();
  other.destroy();
});

test(`shouldn't be able to clear a disabled Select`, async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isDisabled: true,
      selectedValue: {name: 'Item #4'}
    }
  });


  t.ok(!document.querySelector('.clearSelect'));

  select.destroy();
});

test(`two way binding between Select and it's parent component`, async (t) => {
  const parent = new ParentContainer({
    target,
    data: {
      items,
      selectedValue: {value: 'chips', label: 'Chips'},
    }
  });

  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);

  parent.set({
    selectedValue: {value: 'ice-cream', label: 'Ice Cream'},
  });

  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);
  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(document.querySelector('.selection').innerHTML, document.querySelector('.result').innerHTML);

  parent.destroy();
});

test(`show ellipsis for overflowing text in a List item`, async (t) => {
  const longest = 'super super super super super super super super super super super super super super super super super super super super super super super super super super super super loooooonnnng name';

  target.style.width = '300px';

  const list = new List({
    target,
    data: {
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

  list.destroy();
  target.style.width = '';
});


test('clicking between Selects should close and blur other Select', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isFocused: false
    }
  });

  const other = new Select({
    target: extraTarget,
    data: {
      items,
      isFocused: false
    }
  });

  document.querySelector('.selectContainer').click();
  t.ok(select.get().list);
  document.querySelector('#extra .selectContainer').click();
  t.ok(!select.get().list);
  t.ok(other.get().list);

  select.destroy();
  other.destroy();
});

test('if only one item in list it should have hover state', async (t) => {
  const list = new List({
    target,
    data: {
      items: [{
        index: 0,
        name: 'test one'
      }]
    }
  });

  t.ok(document.querySelector('.listItem').classList.contains('hover'));

  list.destroy();
});

test(`hovered item in a filtered list shows hover state`, async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  select.set({filterText: 'i'});

  // const lastItem = document.querySelector('.listItem:last-child');
  // hover item and check for hover state

  t.ok(true);

  select.destroy();
});

test(`data shouldn't be stripped from item - currently only saves name`, async (t) => {
  const select = new Select({
    target,
    data: {
      items
    }
  });

  document.querySelector('.selectContainer').click();
  document.querySelector('.listItem').click();
  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify({value: 'chocolate', label: 'Chocolate'}));

  select.destroy();
});

test('should not be able to clear when clearing is disabled', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isClearable: false
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.ok(!document.querySelector('.clearSelect'));

  select.destroy();
});

test('should not be able to search when searching is disabled', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isSearchable: false
    }
  });

  const selectInput = document.querySelector('.selectContainer input');
  t.ok(selectInput.attributes.readonly);

  select.destroy();
});

test('should display indicator when searching is disabled', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    data: {
      items,
      isSearchable: false
    }
  });

  t.ok(document.querySelector('.indicator'));

  select.destroy();
});

test('placeholder should be prop value', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const placeholder = 'Test placeholder value';

  const select = new Select({
    target,
    data: {
      items: itemsWithGroup,
      placeholder
    }
  });

  const selectInput = document.querySelector('.selectContainer input');
  t.equal(selectInput.attributes.placeholder.value, placeholder);

  select.destroy();
});

test('should display spinner when waiting is enabled', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    data: {
      items,
      isWaiting: true
    }
  });

  t.ok(document.querySelector('.spinner'));

  select.destroy();
});

test('inputStyles prop applies css to select input', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      selectedValue: {value: 'pizza', label: 'Pizza'},
      activeItemIndex: 1,
      inputStyles: `padding-left: 40px;`
    }
  });

  t.equal(document.querySelector('.selectContainer input').style.cssText, `padding-left: 40px;`);
  select.destroy();
});

test('items should be grouped by groupBy expression', async (t) => {
  const testTemplate = new ListGrouped({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      items: itemsWithGroup,
      groupBy: (item) => item.group
    }
  });

  document.querySelector('.selectContainer').click();

  t.htmlEqual(target.querySelector('.listContainer').outerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  select.destroy();
});

test('groups should be filtered by expression', async (t) => {
  const testTemplate = new ListGroupedFiltered({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      items: itemsWithGroup,
      groupBy: (item) => item.group,
      groupFilter: (groups) => {
        return groups.filter((group) => {
          return group !== 'Sweet';
        });
      }
    }
  });

  document.querySelector('.selectContainer').click();

  t.htmlEqual(target.querySelector('.listContainer').outerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  select.destroy();
});

test('groups should be sorted by expression', async (t) => {
  const testTemplate = new ListGroupedReversed({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      items: itemsWithGroup,
      groupBy: (item) => item.group,
      groupFilter: (groups) => groups.reverse()
    }
  });

  document.querySelector('.selectContainer').click();

  t.htmlEqual(target.querySelector('.listContainer').outerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  select.destroy();
});

test('when isMulti is true show each item in selectedValue', async (t) => {
  const selectMultiSelected = new SelectMultiSelected({
    target: testTarget,
  });

  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      selectedValue: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'chips', label: 'Chips'},
      ],
    }
  });


  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
  select.destroy();
  selectMultiSelected.destroy();
});

test('when isMulti is true and selectedValue is undefined show placeholder text', async (t) => {
  const selectDefault = new SelectMultiEmpty({
    target: testTarget,
  });

  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      selectedValue: undefined
    }
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  select.destroy();
  selectDefault.destroy();
});

test('when isMulti is true clicking item in List will populate selectedValue', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      selectedValue: undefined
    }
  });

  document.querySelector('.selectContainer').click();
  document.querySelector('.listItem').click();

  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify([{value: 'chocolate', label: 'Chocolate'}]));

  select.destroy();
});

test('when isMulti is true items in selectedValue will not appear in List', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  t.equal(JSON.stringify(select.get().filteredItems), JSON.stringify([
    {value: 'pizza', label: 'Pizza'},
    {value: 'cake', label: 'Cake'},
    {value: 'chips', label: 'Chips'},
    {value: 'ice-cream', label: 'Ice Cream'}
  ]));

  select.destroy();
});

test('when isMulti is true both selectedValue and filterText filters List', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      filterText: 'Pizza',
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  t.equal(JSON.stringify(select.get().filteredItems), JSON.stringify([
    {value: 'pizza', label: 'Pizza'}
  ]));

  select.destroy();
});

test('when isMulti is true clicking X on a selected item will remove it from selectedValue', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]
    }
  });

  document.querySelector('.multiSelectItem_clear').click();
  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify([{value: 'pizza', label: 'Pizza'}]));

  select.destroy();
});

test('when isMulti is true and all selected items have been removed then placeholder should show and clear all should hide', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}]
    }
  });

  document.querySelector('.multiSelectItem_clear').click();

  select.destroy();
});

test('when isMulti is true and items are selected then clear all should wipe all selected items', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]
    }
  });

  document.querySelector('.clearSelect').click();
  t.equal(select.get().selectedValue, undefined);

  select.destroy();
});

test('when isMulti and groupBy is active then items should be selectable', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items: itemsWithGroup,
      groupBy: (item) => item.group
    }
  });

  target.style.maxWidth = '400px';
  document.querySelector('.selectContainer').click();
  document.querySelector('.listItem').click();

  t.equal(JSON.stringify(select.get().selectedValue), JSON.stringify([{groupValue: 'Sweet', value: 'chocolate', label: 'Chocolate', group: 'Sweet'}]));

  select.destroy();
});

test('when isMulti and selected items reach edge of container then Select height should increase and selected items should wrap to new line', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items
    }
  });

  target.style.maxWidth = '250px';
  t.ok(document.querySelector('.selectContainer').scrollHeight === 42);
  select.set({selectedValue: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}]})
  t.ok(document.querySelector('.selectContainer').scrollHeight > 44);
  select.destroy();
});

test('when isMulti and selectedValue is populated then navigating with LeftArrow updates activeSelectedValue', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}, {value: 'pizza', label: 'Pizza'}, {value: 'chips', label: 'Chips'},],
      isFocused: true
    }
  });

  target.style.maxWidth = '100%';
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowLeft'}));
  t.ok(select.get().activeSelectedValue === 1)

  select.destroy();
});

test('when isMulti and selectedValue is populated then navigating with ArrowRight updates activeSelectedValue', async (t) => {
  const select = new Select({
    target,
    data: {
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
  t.ok(select.get().activeSelectedValue === 1);

  select.destroy();
});

test('when isMulti and selectedValue has items and list opens then first item in list should be active', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      isFocused: true
    }
  });

  document.querySelector('.selectContainer').click();
  document.querySelector('.listItem').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  t.ok(document.querySelector('.listItem.hover'));

  select.destroy();
});

test('when isMulti, isDisabled, and selectedValue has items then items should be locked', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      isDisabled: true,
      selectedValue: [{value: 'chocolate', label: 'Chocolate'}],
    }
  });

  t.ok(document.querySelector('.multiSelectItem.disabled'));

  select.destroy();
});

test('when getValue method is set should use that key to update selectedValue', async (t) => {
  const select = new Select({
    target,
    data: {
      items: [{id: 0, label: 'ONE'}, {id: 1, label: 'TWO'}],
      selectedValue: {id: 0, label: 'ONE'},
      optionIdentifier: 'id'
    }
  });

  t.ok(select.get().selectedValue.id === 0);
  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(select.get().selectedValue.id === 1);

  select.destroy();
});

test('when loadOptions method is supplied and filterText has length then items should populate via promise resolve', async (t) => {
  const select = new Select({
    target,
    data: {
      getOptionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      Selection: CustomItem
    }
  });

  select.set({filterText: 'Juniper'});
  await wait(500);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  select.destroy();
});

test('when noOptionsMessage is set and there are no items then show message', async (t) => {
  const select = new Select({
    target,
    data: {
      noOptionsMessage: 'SO SO SO SCANDALOUS',
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  t.ok(document.querySelector('.empty').innerHTML === 'SO SO SO SCANDALOUS');

  select.destroy();
});

test('when noOptionsMessage is set and there are no items then show message', async (t) => {
  const select = new Select({
    target,
    data: {
      noOptionsMessage: 'SO SO SO SCANDALOUS',
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  t.ok(document.querySelector('.empty').innerHTML === 'SO SO SO SCANDALOUS');

  select.destroy();
});

test('when getSelectionLabel method is supplied and selectedValue are no items then display result of getSelectionLabel', async (t) => {
 const select = new Select({
    target,
    data: {
      getSelectionLabel: (option) => option.notLabel,
      selectedValue: {notLabel: 'This is not a label', value: 'not important'},
    }
  });


  t.ok(document.querySelector('.selection').innerHTML === 'This is not a label');

  select.destroy();
});

test('when getOptionLabel method and items is supplied then display result of getOptionLabel for each option', async (t) => {
  const select = new Select({
    target,
    data: {
      getOptionLabel: (option) => option.notLabel,
      isFocused: true,
      items: [{notLabel: 'This is not a label', value: 'not important #1'}, {notLabel: 'This is not also not a label', value: 'not important #2'}],
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  t.ok(document.querySelector('.item').innerHTML === 'This is not a label');

  select.destroy();
});

test('when getOptionLabel method and items is supplied then display result of getOptionLabel for each option', async (t) => {
  const select = new Select({
    target,
    data: {
      getOptionLabel: (option) => option.notLabel,
      isFocused: true,
      items: [{notLabel: 'This is not a label', value: 'not important #1'}, {notLabel: 'This is not also not a label', value: 'not important #2'}],
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  t.ok(document.querySelector('.item').innerHTML === 'This is not a label');

  select.destroy();
});


test('when a custom Item component is supplied then use to display each item', async (t) => {
  const select = new Select({
    target,
    data: {
      Item: CustomItem,
      getOptionLabel: (option) => option.name,
      isFocused: true,
      items: [{
        image_url: 'https://images.punkapi.com/v2/keg.png',
        name: 'A Name', tagline: 'A tagline', abv: 'A abv'}],
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  t.ok(document.querySelector('.customItem_name').innerHTML === 'A Name');

  select.destroy();
});

test('when a custom Selection component is supplied then use to display selection', async (t) => {
  const select = new Select({
    target,
    data: {
      Item: CustomItem,
      Selection: CustomItem,
      getOptionLabel: (option) => option.name,
      isFocused: true,
      items: [{
        image_url: 'https://images.punkapi.com/v2/keg.png',
        name: 'A Name', tagline: 'A tagline', abv: 'A abv'}],
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.ok(document.querySelector('.customItem_name').innerHTML === 'A Name');

  select.destroy();
});

test('when loadOptions method is supplied, isMulti is true and filterText has length then items should populate via promise resolve', async (t) => {
  const select = new Select({
    target,
    data: {
      getOptionLabel: (option) => option.name,
      getSelectionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',
      Item: CustomItem,
      isMulti: true
    }
  });

  select.set({filterText: 'Juniper'});
  await wait(500);
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.ok(document.querySelector('.multiSelectItem_label').innerHTML === 'Juniper Wheat Beer');
  select.destroy();
});

test('when getSelectionLabel contains HTML then render the HTML', async (t) => {
  const select = new Select({
    target,
    data: {
      selectedValue: items[0],
      getSelectionLabel: (option) => `<p>${option.label}</p>`,
    }
  });

  t.ok(document.querySelector('.selection').innerHTML === '<p>Chocolate</p>');

  select.destroy();
});

test('when getOptionLabel contains HTML then render the HTML', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      getOptionLabel: (option) => `<p>${option.label}</p>`,
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  t.ok(document.querySelector('.item').innerHTML === '<p>Chocolate</p>');

  select.destroy();
});

test('when isMulti is true, selectedValue populated and arrowLeft is pressed then no items in list should be active', async (t) => {
  const selectMultiSelected = new SelectMultiSelected({
    target: testTarget,
  });

  const select = new Select({
    target,
    data: {
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
  select.destroy();
  selectMultiSelected.destroy();
});

test('when hideEmptyState true then do not show "no options" div ', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      listOpen: true,
      filterText: 'x',
      hideEmptyState: true
    }
  });

  t.ok(!document.querySelector('.empty'));

  select.destroy();
});

test('when selectedValue changes then select event should fire', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isFocused: true
    }
  });

  let selectEvent = undefined;
  const listener = select.on('select', event => {
    selectEvent = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.ok(selectEvent);

  listener.cancel();
  select.destroy();
});

test('when selectedValue is cleared then clear event from fire select event', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      selectedValue: items[0],
    }
  });

  let clearEvent = false;
  const listener = select.on('clear', () => {
    clearEvent = true;
  });

  document.querySelector('.clearSelect').click();

  t.ok(clearEvent);

  listener.cancel();
  select.destroy();
});

test('when items in list filter or update then first item in list should highlight', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      isFocused: true
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));

  t.ok(document.querySelector('.hover .item').innerHTML === 'Cake');
  select.set({filterText: 'c'});
  t.ok(document.querySelector('.hover .item').innerHTML === 'Chocolate');

  select.destroy();
});

test('when item is selected or state changes then check selectedValue[optionIdentifier] has changed before firing "select" event', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      selectedValue: {value: 'cake', label: 'Cake'}
    }
  });

  let item = undefined;

  const listener = select.on('select', () => {
    item = true;
  });

  select.set({selectedValue: {value: 'cake', label: 'Cake'}});

  t.ok(!item)
  listener.cancel();
  select.destroy();
});

test('when isMulti and item is selected or state changes then check selectedValue[optionIdentifier] has changed before firing "select" event', async (t) => {
  const select = new Select({
    target,
    data: {
      isMulti: true,
      items,
      selectedValue: [
        {value: 'pizza', label: 'Pizza'},
        {value: 'chips', label: 'Chips'},
      ],
    }
  });

  let item = undefined;

  const listener = select.on('select', () => {
    item = true;
  });

  select.set({selectedValue: [{value: 'pizza', label: 'Pizza'},{value: 'chips', label: 'Chips'}]});
  t.ok(!item);
  item = false;

  select.set({selectedValue: [{value: 'pizza', label: 'Pizza'}]});
  t.ok(item);

  listener.cancel();
  select.destroy();
});

test('when isFocused turns to false then check Select is no longer in focus', async (t) => {
  const select = new Select({
    target,
    data: {
      isFocused: true,
      items,
    }
  });

  const selectSecond = new Select({
    target: extraTarget,
    data: {
      isFocused: false,
      items,
    }
  });

  const listener = select.on('select', () => {
    setTimeout(() => {
      select.set({
        isFocused: false,
      })
    }, 0)
  
    selectSecond.set({
      isFocused: true
    })
  });

  select.set({
    selectedValue: {value: 'pizza', label: 'Pizza'},
  })

  await wait(0);

  t.ok(selectSecond.get().isFocused);
  t.ok(!select.get().isFocused);  

  listener.cancel();
  selectSecond.destroy();
  select.destroy();
});

test('when items and loadOptions method are both supplied then fallback to items until filterText changes', async (t) => {
  const items = [{name: 'test1', id: 0}, {name: 'test2', id: 1}, {name: 'test3', id: 2}];

  const select = new Select({
    target,
    data: {
      getOptionLabel: (option) => option.name,
      getSelectionLabel: (option) => option.name,
      loadOptions: getPosts,
      optionIdentifier: 'id',      
      items,
      isFocused: true,
      listOpen: true
    }
  });

  const listener = select.on('state', ({current, changed}) => {
    if (changed.filterText && current.filterText === '' && !current.selectedValue) {
      select.set({
        items
      })
    }
  });

  t.ok(document.querySelector('.item').innerHTML === 'test1');
  select.set({filterText: 'Juniper'});
  await wait(500);
  t.ok(document.querySelector('.item').innerHTML === 'Juniper Wheat Beer');
  select.set({filterText: ''});
  t.ok(document.querySelector('.item').innerHTML === 'test1');

  listener.cancel();
  select.destroy();
});

test('when items is just an array of strings and isArrayOfStrings is true then render list', async (t) => {
  const items = ['one', 'two', 'three'];

  const select = new Select({
    target,
    data: {
      isArrayOfStrings: true,
      items,
      listOpen: true
    }
  });

  t.ok(document.querySelector('.item').innerHTML === 'one');

  select.destroy();
});

test('when selectedValue just a string and isArrayOfStrings is true then selectedValue should render', async (t) => {
  const items = ['one', 'two', 'three'];

  const select = new Select({
    target,
    data: {
      isArrayOfStrings: true,
      items,
      selectedValue: 'one',
    }
  });

  t.ok(document.querySelector('.selection').innerHTML === 'one');

  select.destroy();
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
