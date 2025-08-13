"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setcount] = useState(0);
  return <button onClick={() => setcount((c) => c + 1)}>{count}</button>;
}
