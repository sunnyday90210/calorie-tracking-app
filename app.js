// Storage Controller

// Item Controller
const ItemCtrl = (function() {
  // Item Construstor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure
  const data = {
    items: [
      // { id: 0, name: "Steak Dinner", calories: 1200 },
      // { id: 1, name: "Cookie", calories: 400 },
      // { id: 2, name: "Eggs", calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // Public Methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // Created id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      // Loop through the items
      data.items.forEach(function(item) {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },

    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories);

      let found = null;
      // Loop through the items
      data.items.forEach(function(item) {
        if(item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      })

      return found;

    },
    
    deleteItem: function(id) {
      // Get the ids
      const ids = data.items.map(function(item) {
        return item.id;
      });

      // Get the index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },

    clearAllItems: function() {
      data.items = [];
    },

    setCurrentItem: function(item) {
      data.currentItem = item;
    },

    getCurrentItem: function() {
      return data.currentItem;
    },

    getTotalCalories: function() {
      let total = 0;

      // Loop through items and add to calories
      data.items.forEach(function(item) {
        total += item.calories;
      });

      // Set total calories in data sturcute
      data.totalCalories = total;

      // Return Total Calories
      return data.totalCalories;
    },

    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  };

  // Public methods
  return {
    populateItemList: function(items) {
      let html = '';

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fas fa-pencil-alt"></i>
            </a>
          </li>`;
      });

      // Insert list Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    addListItem: function(item) {
      // Show list item
      document.querySelector(UISelectors.itemList).style.display = 'block';

      // Create li element
      const li = document.createElement('li');
      // Add Class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `<strong>${item.name}: </strong> <em>${
        item.calories
      } Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fas fa-pencil-alt"></i></a>`;

      // Insert Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },

      updateListItem: function(item) {
        let listItems = document.querySelectorAll(UISelectors.listItems);

        // Turn Node list into array
        listItems = Array.from(listItems);

        listItems.forEach(function(listItem){
          const itemID = listItem.getAttribute('id');

          if(itemID === `item-${item.id}`) {
            document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${
              item.calories
      } Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fas fa-pencil-alt"></i></a>`;
          }
        });

      },

    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },

    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },

    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },

    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn Node list into array
      listItems = Array.from(listItems);

      listItems.forEach(function(item) {
        item.remove();

      })
    },


    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },

    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },

    getSelectors: function() {
      return UISelectors;
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {

  // Load event listeners
  const loadEventListererns = function() {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

    // Disable submit on enter
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit Icon Click Event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    //Update itme event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);


    //Delete itme event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);


    // Back Button
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

    //Clear itmes event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  
  };

  // Add item Submit
  const itemAddSubmit = function(e) {
    // Get form input from UI Controler
    const input = UICtrl.getItemInput();
    // Check for name and calorie input
    if (input.name !== '' && input.calories !== '') {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add new item to UI List
      UICtrl.addListItem(newItem);

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the ui
      UICtrl.showTotalCalories(totalCalories);

      // Clear Fields
      UICtrl.clearInput();

    }

    e.preventDefault();
  };

  // Click Edit item
  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) {
      // Get List item id
      const listId = e.target.parentNode.parentNode.id;
      // Break into an array
      const listIdArr = listId.split('-');

      // Get the actual ID
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set that current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };



  // Update item submit
  const itemUpdateSubmit = function(e) {
    // Get item inputupdatedItem
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);
    
    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the ui
    UICtrl.showTotalCalories(totalCalories);

    // Clear Fields
    UICtrl.clearEditState();

    e.preventDefault();
  };


  // Delete button event
  const itemDeleteSubmit = function (e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);

    // Delete from UI
    UICtrl.deleteListItem(currentItem.id);

    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the ui
    UICtrl.showTotalCalories(totalCalories);

    // Clear Fields
    UICtrl.clearEditState();

    e.preventDefault();
  }


  const clearAllItemsClick = function(e) {
    // Delete all items from data strcture
    ItemCtrl.clearAllItems();

    // get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Add total calories to the ui
    UICtrl.showTotalCalories(totalCalories);

    // Remove from UI
    UICtrl.removeItems();

    UICtrl.hideList();
  }


  // Public Methods
  return {
    init: function() {
      // Clear Edit state / set initial state
      UICtrl.clearEditState();
      // Fetch items from data structure
      const items = ItemCtrl.getItems();

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }

      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add total calories to the ui
      UICtrl.showTotalCalories(totalCalories);

      // Load event liseners
      loadEventListererns();
    }
  };
})(ItemCtrl, UICtrl);

// Initializing App
App.init();
