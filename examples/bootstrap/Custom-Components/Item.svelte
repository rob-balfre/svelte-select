<script>
  export let isActive = false;
  export let item;

  let el;
  $: parent = el ? el.parentElement : null;

  // Bootstrap wants all of these on the same element, and binding a variable from slotted
  // content to the parent is either impossible or just obtuse, so we'll do this in a fairly
  // straightforward JS way.
  $: {
    if (parent) {
      if (isActive && !parent.classList.contains('active')) {
        parent.classList.add('active');
      } else if (!isActive && parent.classList.contains('active')) {
        parent.classList.remove('active');
      }
    }
  }
</script>

<div bind:this={el}>
  {item.name}
  <small>Community: {item.coi} Last Modified: {item.lastModified}</small>
</div>
