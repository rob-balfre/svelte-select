import svelte from 'svelte';
import Select from '../../src/Select.html';
import List from '../../src/List.html';
import SelectDefault from './Select/Select--default.html'
import SelectFocus from './Select/Select--focus.html'
import SelectItemSelected from './Select/Select--itemSelected.html'
import ListDefault from './List/List--default.html'
import ListEmpty from './List/List--empty.html'
import ListActiveItem from './List/List--activeItem.html'
import {assert, test, done} from 'tape-modern';

// setup
const target = document.querySelector('main');
const testTarget = document.getElementById('testTemplate');

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
    .replace(/<object.+\/object>/g, '')
    .replace(/svelte-ref-\w+/g, '')
    .replace(/\s*svelte-\w+\s*/g, '')
    .replace(/class=""/g, '')
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
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ]
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
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ],
      activeItem: {name: 'Item #2'},
      activeItemIndex: 1,
    }
  });

  t.htmlEqual(target.innerHTML, testTarget.innerHTML);

  testTemplate.destroy();
  list.destroy();
});

test('list scrolls to active item', async (t) => {
  const list = new List({
    target,
    data: {
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ],
      activeItem: {name: 'Item #4'},
      activeItemIndex: 3,
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
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ],
      activeItem: {name: 'Item #1'},
      activeItemIndex: 0,
    }
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  const {container} = list.refs;
  const focusedElemBounding = container.querySelector('.listItem.hover');
  t.equal(focusedElemBounding.innerHTML, `Item #2`);
  list.destroy();
});

test('on enter active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    data: {
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ]
    }
  });

  let selectedItem = undefined;
  list.on('itemSelected', event => {
    selectedItem = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));

  t.equal(JSON.stringify(selectedItem), JSON.stringify({name: 'Item #3'}));
  list.destroy();
});

test('on tab active item fires a itemSelected event', async (t) => {
  const list = new List({
    target,
    data: {
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ]
    }
  });

  let selectedItem = undefined;
  list.on('itemSelected', event => {
    selectedItem = event;
  });

  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Tab'}));

  t.equal(JSON.stringify(selectedItem), JSON.stringify({name: 'Item #3'}));
  list.destroy();
});

test('selected item\'s default view', async (t) => {
  const testTemplate = new SelectItemSelected({
    target: testTarget
  });

  const select = new Select({
    target,
    data: {
      selectedItem: {name: 'Item #4'}
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

  select.set({selectedItem: {name: 'Item #4'}});

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
      selectedItem: {name: 'Item #4'}
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
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ]
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
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ]
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
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ],
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
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ],
      activeItemIndex: 1,
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  t.equal(JSON.stringify(select.get().selectedItem), JSON.stringify({name: 'Item #3'}));

  testTemplate.destroy();
  select.destroy();
});

test('blur should close list and remove focus from select', async (t) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const select = new Select({
    target,
    data: {
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ],
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
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ],
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
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ],
    }
  });

  document.querySelector('.selectContainer').click();
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'ArrowDown'}));
  window.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
  document.querySelector('.selectContainer').click();
  t.equal(JSON.stringify(select.get().selectedItem), JSON.stringify({name: 'Item #3'}));
  select.destroy();
});

test('focus on Select input updates focus state', async (t) => {
  const select = new Select({
    target,
    data: {
      items: [
        {name: 'Item #1'},
        {name: 'Item #2'},
        {name: 'Item #3'},
        {name: 'Item #4'},
        {name: 'Item #5'}
      ],
    }
  });

  document.querySelector('.selectContainer input').focus();
  t.ok(select.get().isFocused)

  // select.destroy();
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