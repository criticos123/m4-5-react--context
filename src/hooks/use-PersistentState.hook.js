import React, { useState, useEffect } from "react";

export default function usePersistentState(value, key) {
  const myStorage = window.localStorage;
  let defaultValue;
  if (myStorage.getItem(key)) {
    defaultValue = JSON.parse(myStorage.getItem(key));
  } else {
    defaultValue = value;
  }
  const [storage, setStorage] = useState(defaultValue);
  useEffect(() => {
    myStorage.setItem(key, JSON.stringify(storage));
  }, [storage]);
  return [storage, setStorage];
}
