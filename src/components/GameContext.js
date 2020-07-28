import React from "react";
import usePersistentState from "../hooks/use-PersistentState.hook";
import { items } from "../data";
export const GameContext = React.createContext(null);
export const GameProvider = ({ children }) => {
  const [numCookies, setNumCookies] = usePersistentState(1000, "num-cookies");
  const [purchasedItems, setPurchasedItems] = usePersistentState(
    {
      cursor: 0,
      grandma: 0,
      farm: 0,
    },
    "purchased-cookies"
  );
  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };

  return (
    <GameContext.Provider
      value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        calculateCookiesPerSecond,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
