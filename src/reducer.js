export const initialState = {
  basket: [],
};

// Selector
export const getBasketTotal = (basket) => {
  var basketTotal = 0;
  basket.forEach((basketItem) => {
    basketTotal += basketItem.price;
  });
  return basketTotal;
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((basketItem) => {
        return basketItem.id === action.item.id;
      });
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.item.id}) as it's not in the basket!`
        );
      }
      return {
        ...state,
        basket: newBasket,
      };
  }
};

export default reducer;
