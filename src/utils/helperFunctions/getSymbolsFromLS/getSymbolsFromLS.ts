export function getOrSymbol() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("orSymbol") || "∨";
  }
  return "∨";
}

export function getAndSymbol() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("andSymbol") || "∧";
  }
  return "∧";
}

export function getBiConditionalSymbol() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("biconditionalSymbol") || "<->";
  }
  return "<->";
}

export function getImplicationSymbol() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("implicationSymbol") || "->";
  }
  return "->";
}

export function getNegationSymbol() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("notSymbol") || "¬";
  }
  return "¬";
}
