# svelte-select changelog

## 3.4.0

* Bumped version of Svelte to 3.19.1 and fixed up some tests

## 3.3.7

* Virtual list height fix

## 3.3.6

*  Thanks for @jpz for this update... Fix input blurring issue when within shadow DOM

## 3.3.5

*  MS Edge fix: Replaced object literal spreading

## 3.3.4

*  Fix for fix for a fix for IE11 disable input fix 😿

## 3.3.3

*  Fix for a fix for IE11 disable input fix (don't code tired!)

## 3.3.2

*  IE11 disable input fix

## 3.3.0

*  Thanks to @jackc for this update... Added itemFilter method

## 3.2.0

*  List will now close if active item gets selected

## 3.1.2

*  Thanks to @dimfeld for these updates...
*  Removing unused properties from List.svelte
*  Fix handling of console message type "warning"

## 3.1.1

*  README updated for Sapper SSR

## 3.1.0

*  added prop listAutoWidth - List width will grow wider than the Select container (depending on list item content length)
*  README updated

## 3.0.2

*  selectedValue that are strings now look-up and set correct value
*  README / demo updates

## 3.0.1

*  Item created bug fix
*  Virtual list scroll fix

## 3.0.0

*  Breaking change: isCreatable refactor
*  getCreateLabel has been removed
*  If using isCreatable and custom list or item components would need to implement filterText prop

## 2.1.0

*  CSS vars for theme control
*  Clear event improved for multi-select support
*  Grouping improvements
*  Svelte v3 upgrade bug fixes

## 2.0.3

*  allow html content in multi selection

## 2.0.2

*  CSS height bug fix
*  Fix for Async loading (again)

## 2.0.1

*  Nothing, just npm being weird!

## 2.0.0

*  Upgrade to Svelte v3
*  Added isCreatable

## 1.7.6

*  Fix for Async loading
*  Security patch

## 1.7.5

*  Disabled colour values updated


## 1.7.4

*  Fix for destroy method

## 1.7.3

*  Fix for isOutOfViewport.js import typo


## 1.7.2

*  Moved svelte-virtual-list into source

## 1.7.1

*  Fix for svelte-virtual-list

## 1.7.0

*  Multi-select bug fixes
*  Added hasError prop and styles
*  Added isVirtualList prop (Experimental)

## 1.6.0

*  Added menuPlacement

## 1.5.5

*  isMulti on:select bug fix

## 1.5.4

*  Set background default to #fff
*  Only fire select event when a new item is selected

## 1.5.3

* Removed unused class causing warnings
* README typo

## 1.5.2

* Reset highlighted item index to 0 when list updates or filters

## 1.5.1

* Fix for npm publish missing a file

## 1.5.0

* Added events for select and clear
* Updated README
* Added tests

## 1.4.0

* Added hideEmptyState
* Updated README
* Added tests

## 1.3.0

* Updated README
* Updated filtering with loadOptions
* LeftArrow and RightArrow now remove highlight from list items
* Added tests
* Updated examples

## 1.2.0

* Updated README
* Added Async (loadOptions)
* Added noOptionsMessage  
* Bug fixes
* Updated examples

## 1.1.0

* Updated README
* Added Multi-select
* Added Grouping
* IE11 support

## 1.0.0

* First release
