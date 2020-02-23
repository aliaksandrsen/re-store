
const updateOrder = (bookId, state, quantity) => {
    // const bookId = action.payload;
    const { booklist: { books }, shoppingCart: { cartItems } } = state;
  
    const book = books.find((book) => book.id === bookId);
    const itemIndex = cartItems.findIndex(({ id }) => id === bookId);
    const item = cartItems[itemIndex];
  
    const newItem = updateCartItem(book, item, quantity);
    return {
      orderTotal: 0,
      cartItems: updateCartItems(cartItems, newItem, itemIndex),
    };
  }
  
  
  // update array
  const updateCartItems = (cartItems, item, idx) => {
  
    // ! удалять элементы из массива
    if (item.count === 0) {
      return [
        ...cartItems.slice(0, idx),
        ...cartItems.slice(idx + 1)
      ];
    }
  
    // ! добавлять новые элементы к массиву
    if (idx === -1) {
      return [
        ...cartItems,
        item
      ];
    }
  
    // ! обновлять существующий массив
    return [
      ...cartItems.slice(0, idx),
      item,
      ...cartItems.slice(idx + 1)
    ];
  };
  
  // update one item
  const updateCartItem = (book, item = {}, quantity) => {
  
    const {
      id = book.id,
      count = 0,
      title = book.title,
      total = 0 } = item;
  
    return {
      id,
      title,
      count: count + quantity,
      total: total + quantity * book.price
    };
  };
  
  
  
  
  const updateShoppingCart = (state, action) => {
    if (state === undefined) {
      return {
        cartItems: [],
        orderTotal: 0,
      };
    }
  
    switch (action.type) {
      case 'BOOK_ADDED_TO_CART':
        const addQuantity = 1;
        return updateOrder(action.payload, state, addQuantity);
  
  
      case 'BOOK_REMOVED_FROM_CART':
        const remQuantity = -1;
        return updateOrder(action.payload, state, remQuantity);
  
  
      case 'ALL_BOOK_REMOVED_FROM_CART':
        const itemIndex = state.shoppingCart.cartItems.findIndex(({ id }) => id === action.payload);
        const item = state.shoppingCart.cartItems[itemIndex];
        return updateOrder(action.payload, state, -item.count);
  
      default:
        return state.shoppingCart;
    }
  };

  export default updateShoppingCart;
  