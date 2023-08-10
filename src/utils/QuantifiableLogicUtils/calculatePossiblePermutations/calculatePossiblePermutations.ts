const calculatePossiblePermutations = (knowledgeBase: string[][]) => {
  console.log("calculation possible permutations");
  const possibleSubstitues = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  const numOfExistentialVars = calculateFrequency(knowledgeBase, "\u2203");
  const numOfUniversalVars = calculateFrequency(knowledgeBase, "\u2200");
  const usedSubstitutes = findCharactersInRange(knowledgeBase);
  for (let i = 0; i < numOfExistentialVars; i++) {
    const sub = possibleSubstitues.shift();
    if (!sub) return;
    if (usedSubstitutes.includes(sub)) {
      i--;
      continue;
    } else {
      usedSubstitutes.unshift(sub);
    }
  }
  const possiblePerumutations = generatePermutations(
    usedSubstitutes,
    numOfUniversalVars
  );
  return {
    possiblePerumutationsForUniversals: possiblePerumutations,
    usedSubstitutes: usedSubstitutes,
  };
};

export default calculatePossiblePermutations;

/**
 * HELPER FUNCTIONS
 */
export function calculateFrequency(
  strings: string[][],
  targetElement: string
): number {
  let frequency = 0;

  for (const stringArray of strings) {
    for (const element of stringArray) {
      if (element.includes(targetElement)) {
        frequency++;
      }
    }
  }

  return frequency;
}

function findCharactersInRange(strings: string[][]): string[] {
  const targetChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
  const result: string[] = [];

  for (const stringArray of strings) {
    for (const element of stringArray) {
      for (const char of element) {
        if (targetChars.includes(char) && !result.includes(char)) {
          result.push(char);
        }
      }
    }
  }

  return result;
}

export function generatePermutations(
  inputArray: string[],
  length: number
): string[][] {
  const result: string[][] = [];

  function backtrack(currentPermutation: string[]) {
    if (currentPermutation.length === length) {
      result.push([...currentPermutation]);
      return;
    }

    for (const element of inputArray) {
      currentPermutation.push(element);
      backtrack(currentPermutation);
      currentPermutation.pop();
    }
  }

  backtrack([]);

  return result;
}
