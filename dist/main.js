/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

eval("{console.log('Hello, Webpack!');\n\n// Reusable Dropdown Menu Module\nclass DropdownMenu {\n  constructor(options = {}) {\n    this.options = {\n      trigger: options.trigger || 'click', // 'click' or 'hover'\n      closeOnClickOutside: options.closeOnClickOutside !== false,\n      closeOnItemSelect: options.closeOnItemSelect !== false,\n      ...options,\n    };\n\n    this.dropdowns = [];\n    this.activeDropdown = null;\n    this.init();\n  }\n\n  init() {\n    // Find all dropdowns on the page\n    const dropdownElements = document.querySelectorAll('[data-dropdown]');\n\n    dropdownElements.forEach((dropdownEl) => {\n      this.createDropdown(dropdownEl);\n    });\n\n    // Close dropdowns when clicking outside\n    if (this.options.closeOnClickOutside) {\n      document.addEventListener('click', (e) => {\n        if (!e.target.closest('[data-dropdown]')) {\n          this.closeAll();\n        }\n      });\n    }\n  }\n\n  createDropdown(dropdownEl) {\n    const btn = dropdownEl.querySelector('[data-dropdown-btn]');\n    const content = dropdownEl.querySelector('[data-dropdown-content]');\n    const items = content.querySelectorAll('a');\n\n    if (!btn || !content) return;\n\n    const dropdown = {\n      element: dropdownEl,\n      btn,\n      content,\n      items,\n      isOpen: false,\n    };\n\n    this.dropdowns.push(dropdown);\n\n    // Add event listeners based on trigger type\n    if (this.options.trigger === 'hover') {\n      this.addHoverListeners(dropdown);\n    } else {\n      this.addClickListeners(dropdown);\n    }\n\n    // Add item selection listeners\n    items.forEach((item) => {\n      item.addEventListener('click', (e) => {\n        e.preventDefault();\n        this.selectItem(dropdown, item);\n      });\n    });\n  }\n\n  addClickListeners(dropdown) {\n    dropdown.btn.addEventListener('click', (e) => {\n      e.preventDefault();\n      e.stopPropagation();\n      this.toggleDropdown(dropdown);\n    });\n  }\n\n  addHoverListeners(dropdown) {\n    let timeout;\n\n    dropdown.element.addEventListener('mouseenter', () => {\n      clearTimeout(timeout);\n      this.openDropdown(dropdown);\n    });\n\n    dropdown.element.addEventListener('mouseleave', () => {\n      timeout = setTimeout(() => {\n        this.closeDropdown(dropdown);\n      }, 150);\n    });\n  }\n\n  toggleDropdown(dropdown) {\n    if (dropdown.isOpen) {\n      this.closeDropdown(dropdown);\n    } else {\n      this.openDropdown(dropdown);\n    }\n  }\n\n  openDropdown(dropdown) {\n    // Close other dropdowns first\n    this.closeAll();\n\n    dropdown.isOpen = true;\n    dropdown.element.classList.add('active');\n    dropdown.content.classList.add('show');\n    this.activeDropdown = dropdown;\n  }\n\n  closeDropdown(dropdown) {\n    dropdown.isOpen = false;\n    dropdown.element.classList.remove('active');\n    dropdown.content.classList.remove('show');\n\n    if (this.activeDropdown === dropdown) {\n      this.activeDropdown = null;\n    }\n  }\n\n  closeAll() {\n    this.dropdowns.forEach((dropdown) => {\n      this.closeDropdown(dropdown);\n    });\n  }\n\n  selectItem(dropdown, item) {\n    // Remove previous selection\n    dropdown.items.forEach((i) => i.classList.remove('selected'));\n\n    // Add selection to clicked item\n    item.classList.add('selected');\n\n    // Update button text\n    dropdown.btn.textContent = `${item.textContent} ▼`;\n\n    // Emit custom event\n    const event = new CustomEvent('dropdownSelect', {\n      detail: {\n        dropdown: dropdown.element,\n        value: item.dataset.value,\n        text: item.textContent,\n      },\n    });\n    document.dispatchEvent(event);\n\n    // Close dropdown if configured to do so\n    if (this.options.closeOnItemSelect) {\n      this.closeDropdown(dropdown);\n    }\n  }\n\n  // Public API methods\n  getValue(dropdownElement) {\n    const selectedItem = dropdownElement.querySelector('.dropdown-content a.selected');\n    return selectedItem ? selectedItem.dataset.value : null;\n  }\n\n  setValue(dropdownElement, value) {\n    const item = dropdownElement.querySelector(`[data-value=\"${value}\"]`);\n    if (item) {\n      const dropdown = this.dropdowns.find((d) => d.element === dropdownElement);\n      if (dropdown) {\n        this.selectItem(dropdown, item);\n      }\n    }\n  }\n\n  destroy() {\n    this.closeAll();\n    this.dropdowns = [];\n    this.activeDropdown = null;\n  }\n}\n\n// Initialize dropdowns when DOM is loaded\ndocument.addEventListener('DOMContentLoaded', () => {\n  // Create dropdown instance with default options\n  const dropdownMenu = new DropdownMenu({\n    trigger: 'hover', // or 'click'\n    closeOnClickOutside: false,\n    closeOnItemSelect: false,\n  });\n\n  // Listen for selection events\n  document.addEventListener('dropdownSelect', (e) => {\n    console.log('Selected:', e.detail.value, 'Text:', e.detail.text);\n  });\n\n  // Make it globally available for debugging\n  window.dropdownMenu = dropdownMenu;\n});\n\n// Export for module usage\nif ( true && module.exports) {\n  module.exports = DropdownMenu;\n}\n\n\n//# sourceURL=webpack://dropdown-menu/./src/index.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;