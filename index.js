const products = [
  {
    product_id: "A",
    title: "The SlimCase",
    price: 899
  },
  {
    product_id: "B",
    title: "Hardcover Notebook",
    price: 1499
  },
  {
    product_id: "C",
    title: "Softcover Journal",
    price: 575
  },
];
const promos = {
  "A": {
    desc: "buy 2, get 1 free",
    quantity_required: 2,
    discount: "100%"
  }
}

class Basket {
  constructor() {
    this.items = {};
  }

  // methods
  add(item) {
    let productID = item['product_id'];
    if(this.items[productID]) {
      // If item already exists in hash, increment
      this.items[productID]['quantity'] += 1;
    } else {
      // Else, create a new object
      this.items[productID] = {
        "title": item['title'],
        "price": item['price'],
        "quantity": 1
      }
    }
  }

  remove(item) {
    if(this.items[item['product_id']]) {
      delete this.items[item['product_id']];
    }
  }

  changeQuantity(item, newQty) {
    let productID = item['product_id'];

    // If the new quantity if less than 1, remove the object from items
    if(newQty < 1) {
      delete this.items[productID];
      return
    }
    // Otherwise, update the quantity
    if(this.items[productID]) {
      this.items[productID]['quantity'] = newQty;
    }
  }

  printItemList() {
    // To provide a tidy list of items and qtys
    let str = "";
    const groupedItems = this.items;
    for(var key in groupedItems) {
      // divide prices by 100 since stored as integers
      str += `${groupedItems[key]['title']} ($${groupedItems[key]['price']/100}) - Qty: ${groupedItems[key]['quantity']}\n\r`;
    }
    return str;
  }

  totalCost() {
    let total = 0;
    const items = this.items;

    for (var key in items) {
      if (promos[key] && items[key]['quantity'] >= promos[key]['quantity_required']) {
        var numberOfDiscounts = Math.floor(items[key]['quantity'] / promos[key]['quantity_required']);
        total += (items[key]['price'] * items[key]['quantity']) - (items[key]['price'] * numberOfDiscounts);
      } else {
        total += items[key]['price'] * items[key]['quantity'];
      }
    }
    return `$${total / 100}`; // divide by 100, since all prices are stored as integers
  }
};



const basket = new Basket();
// basket.add(products[1]);
// basket.add(products[0]);
// basket.add(products[2]);
// basket.add(products[1]);
// basket.remove(products[0]);
// basket.changeQuantity(products[2], 5);
//
// console.log(basket.printItemList()); // Hardcover Notebook Qty 2, Softcover Journal 5
// console.log("total cost => " + basket.totalCost()); // total cost = $58.73
