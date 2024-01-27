function countVariables(arr1: string[]): number {
  const symbolArr = ["&", "|", "->", "<->", "(", ")", "~"];

  const uniqueElementsSet = new Set(arr1);
  const commonElementsSet = new Set(symbolArr);
  let varArray: string[] = [];

  uniqueElementsSet.forEach((element) => {
    if (!commonElementsSet.has(element)) {
      varArray.push(element);
    }
  });

  const filteredArray = varArray.filter((element) => element !== " ");
  return filteredArray.length;
}

export default countVariables;
