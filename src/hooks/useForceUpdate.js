import { useState } from "react";

export let useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};
