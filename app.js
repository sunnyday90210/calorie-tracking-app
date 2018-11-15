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
      { id: 0, name: 'Steak Dinner', calories: 1200 },
      { id: 0, name: 'Cookie', calories: 400 },
      { id: 0, name: 'Eggs', calories: 300 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  return {
    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  return {};
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // Public Methods
  return {
    init: function() {
      console.log('Initializing App');
    }
  };
})(ItemCtrl, UICtrl);

// Initializing App
App.init();
