# svelte-select changelog

## 5.0.0

* Added named slot `list`
* Added named slot `item`
* Removed Virtual list
* noOptionsMessage removed
* optionIdentifier -> itemId
* getOptionLabel removed
* getGroupHeaderLabel removed
* itemCreated event removed
* labelIdentifier -> label
* creatable removed, use named slots and bake in your create own logic
* isGroupHeaderSelectable -> groupHeaderSelectable
* isSearchable -> searchable
* isFocused -> focused
* isCreatable -> creatable
* isClearable -> clearable
* isWaiting -> loading
* Added named slot `prepend`
* Added named slot `chevron-icon`
* Added named slot `clear-icon`
* Added named slot `loading-icon`
* Removed iconProps
* Removed ClearIcon component
* Removed ChevronIcon component
* Removed Multi component
* Added named slot `selection`
* Removed Selection component
* isMulti -> multiple
* Other improvements (see docs)
* select-container -> svelte-select
* added justValue
* Placeholder default change from 'Select...' to 'Please select'
* added blur and focus events
* Added suggestions feature
* computePlacement now computes to fixed list
* removed isOutOfViewport and clickOutside
* new debounce method
* filterMethod changed to filter
* added support for svelte-tiny-virtual-list
* removed virtual-list class and css props
* loadOptionsInterval -> debounceWait
* selectedValue removed
* MultiSelection -> Multi
* added postcss to example, tests
* tailwind css option
* breaking: containerClasses -> class
* listGroupTitle -> list-group-title
* listContainer -> list 
* selectContainer and other CSS class names updated, selectContainer -> svelte-select for example
* LoadingIcon prop added
* CSS props updates. Added .icons and removed some css vars
* Removed logic to show chevron if isSearchable is false
* indicator class renamed to chevron 
* showIndicator renamed showChevron
* indicatorSvg removed, use ChevronIcon going forward
* removed playwright and puppeteer, tests now just run in the browser with sirv
* debounce method is now exported as a prop
* Convert repo to use SvelteKit
* Change licence from LIL to ISC

## 4.4.1

* Added missing prop 'placeholderAlwaysShow' to TypeScript declaration file (#305) - thanks to @paolotiu

## 4.4.0

* Added support for non-selectable items - thanks to @mpdaugherty 

## 4.3.1

* TextFilter bug fix (#291)

## 4.3.0

* Added A11y support (#286) - thanks to @fedoskina
* Added id prop

## 4.2.7

* Bug fixes for #278, #279, #280, #285 - thanks to @davidfou 

## 4.2.6

* TypeScript declaration in package.json (#277) - thanks to @davidfou

## 4.2.5

* multiple on:select fix (#276)

## 4.2.4

* CreateGroupHeaderItem fix (#275)

## 4.2.3

* Filtering refactor (#274)

## 4.2.2

* Bug fix for filtering items (#274)

## 4.2.1

* Bug fix to remove focus when an external field is focused programmatically - thanks to @davidfou

## 4.2.0

* Added listOffset prop
* Added CSS custom props '--listRight' and '--listLeft'

## 4.1.0

* Added labelIdentifier prop - thanks to @martgnz

## 4.0.0

* selectedValue deprecated please use value going forward
* Lots of bug fixes
* Internals reworked and (hopefully) improved
* File size reduced

## 3.17.0

* Added ClearIcon prop
* Added docs for filteredItems
* loadOptions res now checked for cancelled value

## 3.16.1

* Bug fix for loadOptions and list causing blur to not close list - thanks to @Ginfone for reporting

## 3.16.0

* New CSS custom props '--placeholderOpacity' and 'disabledPlaceholderOpacity' added - thanks to @tiaanduplessis

## 3.15.0

* Added new prop multiFullItemClearable for easier clearable items when multiple is true - thanks to @stephenlrandall

## 3.14.3

* Regression fix for 3.14.2 clearing selectedValue if not found in items - thanks to @frederikhors for reporting

## 3.14.2

* Fix so selectedValue updates on items change - thanks to @stephenlrandall

## 3.14.1

* Fix input attributes so the defaults can be overwritten

## 3.14.0

* Added event 'loaded' when loadOptions resolves - thanks to @singingwolfboy

## 3.13.0

* Added TypeScript declaration file - thanks to @singingwolfboy

## 3.12.0

* new event 'error' is dispatched on caught errors
* loadOptions now catches errors
* new CSS custom prop '--errorBackground' added
* CSS fix for long multi items wrapping text

## 3.11.1

* Fix to prevent multiple updates on focus events - thanks to @stephenlrandall

## 3.11.0

* README reformatted
* iconProps added for Icon component - thanks to @stephenlrandall

## 3.10.1

* Fix for noOptionsMessage not updating when changed - thanks to @frederikhors

## 3.10.0

* Added indicatorSvg prop - thanks to @oharsta (again!)

## 3.9.0

* Added showIndicator prop - thanks to @oharsta

## 3.8.1

* Fix for containerClasses repeating

## 3.8.0

* Added containerClasses prop - thanks to @0xCAP

## 3.7.2

* Fix for loadOptions with items opening list by default

## 3.7.1

* Fix for groupHeader selection on enter - thanks to @KiwiJuicer

## 3.7.0

* Added new CSS vars for groupTitleFontWeight, groupItemPaddingLeft and itemColor - thanks to @john-trieu-nguyen

## 3.6.2

* CSS vars padding default fix

## 3.6.1

* CSS vars typo fix

## 3.6.0

* Added CSS vars for input padding and left

## 3.5.0

* Added Icon and showChevron props

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

*  multiple on:select bug fix

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
