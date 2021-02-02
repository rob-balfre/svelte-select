<!--
  Bootstrap likes it when these classes don't have wrappers in the list, so
  <div on:click on:mouseover><slot/></div> is no good. If anyone knows of a
  way to pass through on:click and on:mouseover to Item.svelte, that would
  simplify things as this could be just <slot/> and all the markup could be
  there.
-->
<div
  class="list-group-item list-group-item-action"
  on:click
  on:mouseover>
  <slot/>
</div>
