console.log('Hello, Webpack!');

// Reusable Dropdown Menu Module
class DropdownMenu {
  constructor(options = {}) {
    this.options = {
      trigger: options.trigger || 'click', // 'click' or 'hover'
      closeOnClickOutside: options.closeOnClickOutside !== false,
      closeOnItemSelect: options.closeOnItemSelect !== false,
      ...options,
    };

    this.dropdowns = [];
    this.activeDropdown = null;
    this.init();
  }

  init() {
    // Find all dropdowns on the page
    const dropdownElements = document.querySelectorAll('[data-dropdown]');

    dropdownElements.forEach((dropdownEl) => {
      this.createDropdown(dropdownEl);
    });

    // Close dropdowns when clicking outside
    if (this.options.closeOnClickOutside) {
      document.addEventListener('click', (e) => {
        if (!e.target.closest('[data-dropdown]')) {
          this.closeAll();
        }
      });
    }
  }

  createDropdown(dropdownEl) {
    const btn = dropdownEl.querySelector('[data-dropdown-btn]');
    const content = dropdownEl.querySelector('[data-dropdown-content]');
    const items = content.querySelectorAll('a');

    if (!btn || !content) return;

    const dropdown = {
      element: dropdownEl,
      btn,
      content,
      items,
      isOpen: false,
    };

    this.dropdowns.push(dropdown);

    // Add event listeners based on trigger type
    if (this.options.trigger === 'hover') {
      this.addHoverListeners(dropdown);
    } else {
      this.addClickListeners(dropdown);
    }

    // Add item selection listeners
    items.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectItem(dropdown, item);
      });
    });
  }

  addClickListeners(dropdown) {
    dropdown.btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleDropdown(dropdown);
    });
  }

  addHoverListeners(dropdown) {
    let timeout;

    dropdown.element.addEventListener('mouseenter', () => {
      clearTimeout(timeout);
      this.openDropdown(dropdown);
    });

    dropdown.element.addEventListener('mouseleave', () => {
      timeout = setTimeout(() => {
        this.closeDropdown(dropdown);
      }, 150);
    });
  }

  toggleDropdown(dropdown) {
    if (dropdown.isOpen) {
      this.closeDropdown(dropdown);
    } else {
      this.openDropdown(dropdown);
    }
  }

  openDropdown(dropdown) {
    // Close other dropdowns first
    this.closeAll();

    dropdown.isOpen = true;
    dropdown.element.classList.add('active');
    dropdown.content.classList.add('show');
    this.activeDropdown = dropdown;
  }

  closeDropdown(dropdown) {
    dropdown.isOpen = false;
    dropdown.element.classList.remove('active');
    dropdown.content.classList.remove('show');

    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    }
  }

  closeAll() {
    this.dropdowns.forEach((dropdown) => {
      this.closeDropdown(dropdown);
    });
  }

  selectItem(dropdown, item) {
    // Remove previous selection
    dropdown.items.forEach((i) => i.classList.remove('selected'));

    // Add selection to clicked item
    item.classList.add('selected');

    // Update button text
    dropdown.btn.textContent = `${item.textContent} ▼`;

    // Emit custom event
    const event = new CustomEvent('dropdownSelect', {
      detail: {
        dropdown: dropdown.element,
        value: item.dataset.value,
        text: item.textContent,
      },
    });
    document.dispatchEvent(event);

    // Close dropdown if configured to do so
    if (this.options.closeOnItemSelect) {
      this.closeDropdown(dropdown);
    }
  }

  // Public API methods
  getValue(dropdownElement) {
    const selectedItem = dropdownElement.querySelector('.dropdown-content a.selected');
    return selectedItem ? selectedItem.dataset.value : null;
  }

  setValue(dropdownElement, value) {
    const item = dropdownElement.querySelector(`[data-value="${value}"]`);
    if (item) {
      const dropdown = this.dropdowns.find((d) => d.element === dropdownElement);
      if (dropdown) {
        this.selectItem(dropdown, item);
      }
    }
  }

  destroy() {
    this.closeAll();
    this.dropdowns = [];
    this.activeDropdown = null;
  }
}

// Initialize dropdowns when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create dropdown instance with default options
  const dropdownMenu = new DropdownMenu({
    trigger: 'hover', // or 'click'
    closeOnClickOutside: false,
    closeOnItemSelect: false,
  });

  // Listen for selection events
  document.addEventListener('dropdownSelect', (e) => {
    console.log('Selected:', e.detail.value, 'Text:', e.detail.text);
  });

  // Make it globally available for debugging
  window.dropdownMenu = dropdownMenu;
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DropdownMenu;
}
