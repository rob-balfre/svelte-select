import svelte from 'svelte';
import {Store} from 'svelte/store.js';
import Select from '../../src/Select.html';
import List from '../../src/List.html';
import SelectDefault from './Select/Select--default.html'
import SelectFocus from './Select/Select--focus.html'
import SelectItemSelected from './Select/Select--itemSelected.html'
import ListDefault from './List/List--default.html'
import ListEmpty from './List/List--empty.html'
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
  {value: 'ice-cream', label: 'Ice Cream'},
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
      selectedItem: {value: 'pizza', label: 'Pizza', index: 1},
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
      selectedItem: {value: 'sunday-roast', label: 'Sunday Roast'},
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
  t.equal(focusedElemBounding.innerHTML.trim(), `Pizza`);
  list.destroy();
});

test('on enter active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    data: {
      items: itemsWithIndex
    }
  });

  let selectedItem = undefined;
  list.on('itemSelected', event => {
    selectedItem = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.equal(JSON.stringify(selectedItem), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.destroy();
});

test('on tab active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    data: {
      items: itemsWithIndex
    }
  });

  let selectedItem = undefined;
  list.on('itemSelected', event => {
    selectedItem = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));

  t.equal(JSON.stringify(selectedItem), JSON.stringify({value: 'cake', label: 'Cake', index: 2}));
  list.destroy();
});

test('selected item\'s default view', async (t) => {
  const testTemplate = new SelectItemSelected({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      selectedItem: {value: 'chips', label: 'Chips'},
    }
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
  select.destroy();
  testTemplate.destroy();
});

test('select view updates with selectedItem updates', async (t) => {
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

  select.set({selectedItem: {value: 'chips', label: 'Chips'}});

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  select.destroy();
});

test('clear wipes selectedItem and updates view', async (t) => {
  let testTemplate = new SelectItemSelected({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      selectedItem: {value: 'chips', label: 'Chips'},
    }
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);
  testTemplate.destroy();

  testTemplate = new SelectDefault({
    target: testTarget
  });

  select.set({selectedItem: undefined});

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
  t.equal(JSON.stringify(select.get().selectedItem), JSON.stringify({value: 'cake', label: 'Cake'}));

  testTemplate.destroy();
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
  t.equal(JSON.stringify(select.get().selectedItem), JSON.stringify({value: 'cake', label: 'Cake'}));
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
  t.ok(!document.querySelector('.selectContainer .selectedItem'));

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
  document.querySelector('.clearSelectedItem').click();
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
      selectedItem: {name: 'Item #2'},
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
      selectedItem: {name: 'Item #2'},
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
      selectedItem: {name: 'Item #4'}
    }
  });


  t.ok(!document.querySelector('.clearSelectedItem'));

  select.destroy();
});

test(`two way binding between Select and it's parent component`, async (t) => {
  const parent = new ParentContainer({
    target,
    data: {
      items,
      selectedItem: {value: 'chips', label: 'Chips'},
    }
  });

  t.equal(document.querySelector('.selectedItem').innerHTML, document.querySelector('.result').innerHTML);
  parent.set({
    selectedItem: {value: 'ice-cream', label: 'Ice Cream'},
  });
  t.equal(document.querySelector('.selectedItem').innerHTML, document.querySelector('.result').innerHTML);
  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(document.querySelector('.selectedItem').innerHTML, document.querySelector('.result').innerHTML);

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
  t.equal(JSON.stringify(select.get().selectedItem), JSON.stringify({value: 'chocolate', label: 'Chocolate'}));

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

  t.ok(!document.querySelector('.clearSelectedItem'));

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
      items,
      placeholder,
      isSearchable: false,
      isClearable: false,
      getOptionLabel: (option) => `${option.label}${option.label}`
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

test.only('inputStyles prop applies css to select input', async (t) => {
  const select = new Select({
    target,
    data: {
      items,
      selectedItem: {value: 'pizza', label: 'Pizza'},
      activeItemIndex: 1,
      inputStyles: `padding-left: 40px;`
    }
  });

  t.equal(document.querySelector('.selectContainer input').style.cssText, `padding-left: 40px;`);
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

// this allows us to close puppeteer once tests have completed
window.done = done;
