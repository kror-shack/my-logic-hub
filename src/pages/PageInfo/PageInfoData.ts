import {
  PageDetails,
  RuleDetails,
  SymbolDetails,
} from "../../types/sharedTypes";

const sharedSymbols: SymbolDetails[] = [
  {
    name: "Conjunction (And Operation)",
    usage: `The operator for conjunction is represented by the symbol "∧" or "&". It combines two propositions and is true only when both propositions are true.`,
    example: `P ∧ Q, A & B`,
  },
  {
    name: "Disjunction (Or Operation)",
    usage: `The operator for disjunction is represented by the symbol "∨" or "|". It combines two propositions and is true when at least one of the propositions is true.`,
    example: `P ∨ Q, A | B`,
  },
  {
    name: "Material Implication",
    usage: `The operator for material implication is represented by the symbol "->. It represents "if...then..." statements and is true unless the first proposition is true and the second is false.`,
    example: `P -> Q`,
  },
  {
    name: "Biconditional",
    usage: `The operator for biconditional is represented by the symbol "<->". It represents "if and only if" statements and is true when both propositions have the same truth value.`,
    example: `P <-> Q`,
  },
  {
    name: "Negation",
    usage: `For the operator of negation, the symbols "~", "!", and "¬" are permissible. It is used to reverse the truth value of a proposition.`,
    example: `~P, !(P -> Q), ¬R`,
  },
];

const folSymbols: SymbolDetails[] = [
  ...sharedSymbols,

  {
    name: "Universal Quantifier (∀)",
    usage:
      "The symbol '∀' is used to represent the universal quantifier in First-Order Logic. It indicates that a statement holds true for all objects in a specified domain. The binding varaible must be along side the quantifier whereas the scope must be bound in parantheses.",
    example: "∀x (Px), ∀x (Px -> Qx) ",
  },
  {
    name: "Existential Quantifier (∃)",
    usage:
      "The symbol '∃' is used to represent the existential quantifier in First-Order Logic. It indicates that there exists at least one object in a specified domain for which a statement is true. The binding varaible must be along side the quantifier whereas the scope must be bound in parantheses.",
    example: "∃x (Qx), ∃x (Qx -> Px) ",
  },
];

const sharedRules: RuleDetails[] = [
  {
    name: "Modus Ponens (MP)",
    otherName: ["Implication Elimination, Affirming the Antecedent"],
    description:
      "Modus Ponens is a valid rule of inference that states if you have a conditional statement (p → q) and the antecedent (p) is true, then you can infer that the consequent (q) is also true.",
  },
  {
    name: "Modus Tollens (MT)",
    otherName: ["Denying the Consequent"],
    description:
      "Modus Tollens is a valid rule of inference that states if you have a conditional statement (p → q) and the consequent (q) is false, then you can infer that the antecedent (p) must also be false.",
  },
  {
    name: "Material Implication (MI)",
    otherName: ["Implication Equivalence"],
    description:
      "Material Implication is a logical equivalence rule that simplifies conditional statements. It states that (p → q) is equivalent to (¬p ∨ q), where ¬ represents negation and ∨ represents disjunction.",
  },
  {
    name: "De Morgan's Laws",
    otherName: [],
    description:
      "De Morgan's Laws are a set of rules that describe how to negate conjunctions and disjunctions. They state that ¬(p ∧ q) is equivalent to (¬p ∨ ¬q) and ¬(p ∨ q) is equivalent to (¬p ∧ ¬q).",
  },
  {
    name: "Simplification (S)",
    otherName: ["Conjunction Elimination"],
    description:
      "Simplification is a rule that allows you to simplify a conjunction (p ∧ q) to its individual components (p and q).",
  },
  {
    name: "Hypothetical Syllogism (HS)",
    otherName: ["Transitive Law"],
    description:
      "Hypothetical Syllogism is a valid rule of inference that states if you have two conditional statements (p → q) and (q → r), you can infer the conditional statement (p → r).",
  },
  {
    name: "Biconditional Elimination",
    otherName: [],
    description:
      "Biconditional Elimination is a rule that allows you to extract the implications from a biconditional statement (p ↔ q). It results in two conditional statements: (p → q) and (q → p).",
  },
  {
    name: "Biconditional Introduction",
    otherName: [],
    description:
      "The Biconditional Introduction is a fundamental rule in propositional logic. It allows you to establish a biconditional statement (p ↔ q) when you have both implications: (p → q) and (q → p). In other words, if you have 'p implies q' and 'q implies p,' you can infer the biconditional 'p if and only if q.' This rule is used to express that two propositions are logically equivalent and can be interchanged in logical reasoning.",
  },
  {
    name: "Disjunctive Syllogism (DS)",
    otherName: [],
    description:
      "Disjunctive Syllogism is a valid rule of inference that states if you have a disjunction (p ∨ q) and the negation of one disjunct (¬p or ¬q), you can infer the other disjunct.",
  },
  {
    name: "Addition",
    otherName: [],
    description:
      "The Addition Rule is a logical inference rule that allows you to introduce a disjunction (OR) by asserting one of its disjuncts. In other words, if you have a proposition p, you can derive the statement (p ∨ q), where q represents any arbitrary proposition. This rule is useful when you want to expand your set of premises or conclusions by asserting a new possibility.",
  },
  {
    name: "Double Negation (DN)",
    otherName: [],
    description:
      "Double Negation is a rule that states that double negating a proposition (¬¬p) is equivalent to the original proposition (p).",
  },
  {
    name: "Conjunction",
    otherName: [],
    description:
      "The Conjunction Rule, also known as Simplification, is a fundamental rule of propositional logic. It states that if we have two individual propositions 'A' and 'B,' then we can infer the conjunction 'A and B' (A ∧ B). This rule allows us to simplify complex propositions by breaking them down into their constituent parts for analysis and inference.",
  },
  {
    name: "Transposition",
    otherName: ["Contrapositive"],
    description:
      "The Transposition Rule, also known as the Contrapositive, is a fundamental rule in propositional logic. It allows us to transform an implication (p → q) into its contrapositive form (¬q → ¬p). In other words, if we have an implication 'p implies q,' we can infer its contrapositive, which states that 'not q implies not p.'",
  },
  {
    name: "Negation (¬)",
    otherName: [],
    description:
      "Negation, often denoted as ¬, is a fundamental logical operation that negates a proposition. If a proposition p is true, then ¬p is false, and if p is false, then ¬p is true.",
  },
];

const quanfitiableRules = [
  ...sharedRules,
  {
    name: "Existential Generalization (EG)",
    otherName: ["existential introduction"],
    description:
      "Existential Generalization, often denoted as EG, is a valid rule of inference in predicate logic. It allows you to infer the existence of an element that satisfies a predicate.",
  },
  {
    name: "Universal Generalization (UG)",
    otherName: ["universal introduction"],
    description:
      "Universal Generalization, often denoted as UG, is a valid rule of inference used in predicate logic. It allows you to generalize a statement from a specific instance to all elements of a set.",
  },
  {
    name: "Existential Instantiation (EI)",
    otherName: ["existential elimination"],
    description:
      "Existential Instantiation, often denoted as EI, is a valid rule of inference in predicate logic. It allows you to instantiate an existential quantifier (∃) with a specific element that satisfies the existential statement.",
  },
  {
    name: "Universal Instantiation (UI)",
    otherName: ["universal specification", "universal elimination"],
    description:
      "Universal Instantiation, often denoted as UI, is a valid rule of inference in predicate logic. It allows you to instantiate a universal quantifier (∀) with a specific element from a set.",
  },
];

const proofByContradictionRules = [
  ...sharedRules,
  {
    name: "Assuming the Contradiction",
    otherName: [],
    description:
      "Assuming the Contradiction is a step in a proof by contradiction where you assume the opposite of what you want to prove and derive a contradiction from it. This involves assuming ¬p, where p is the proposition you wish to prove, and then demonstrating that this assumption leads to a logical contradiction.",
  },
  {
    name: "Reiterating the Contradiction",
    otherName: [],
    description:
      "Reiterating the Contradiction is a step in a proof by contradiction where you highlight the contradiction that arises from assuming ¬p (the opposite of what you want to prove). This step emphasizes that the assumption ¬p cannot be true, leading to the conclusion that p (the proposition you want to prove) must be true.",
  },
];

const semanticTableauxRules = [
  {
    name: "Conjunction Rule",
    otherName: [],
    description:
      "The Conjunction Rule is used to split a branch into two branches, each representing one of the conjuncts of a conjunction in the formula.",
  },
  {
    name: "Negation of Conjunction Rule",
    otherName: [],
    description:
      "The Negation of Conjunction Rule is used to create a branch that assumes the negation of a conjunction, effectively treating it as a disjunction of negations.",
  },
  {
    name: "Disjunction Rule",
    otherName: [],
    description:
      "The Disjunction Rule is used to create two branches, each assuming one of the disjuncts of a disjunction in the formula.",
  },
  {
    name: "Negation of Disjunction Rule",
    otherName: [],
    description:
      "The Negation of Disjunction Rule is used to create a branch that assumes the negation of a disjunction, effectively treating it as a conjunction of negations.",
  },
  {
    name: "Negation Rule",
    otherName: [],
    description:
      "The Negation Rule is used to create a branch that assumes the negation of a subformula, effectively changing the truth value of that subformula.",
  },
  {
    name: "Double Negation Rule",
    otherName: [],
    description:
      "The Double Negation Rule is used to eliminate double negations by simplifying them back to the original subformula.",
  },
  {
    name: "Implication Rule",
    otherName: [],
    description:
      "The Implication Rule is used to create two branches, one assuming the antecedent of an implication, and the other assuming the negation of the consequent.",
  },
  {
    name: "Negation of Implication Rule",
    otherName: [],
    description:
      "The Negation of Implication Rule is used to create a branch that assumes the negation of an implication, effectively treating it as a conjunction and a negation.",
  },
  {
    name: "Biconditional Rule",
    otherName: [],
    description:
      "The Biconditional Rule is used to create two branches, one assuming the conjunction of the implication in one direction, and the other assuming the conjunction of the implication in the opposite direction.",
  },
  {
    name: "Negation of Biconditional Rule",
    otherName: [],
    description:
      "The Negation of Biconditional Rule is used to create a branch that assumes the negation of a biconditional, effectively treating it as a disjunction of implications.",
  },
];

const truthTableRules = [
  {
    name: "Negation Rule",
    otherName: [],
    description:
      "The Negation Rule is used to determine the truth value of a negated proposition. It negates the truth value of the proposition it applies to. If the original proposition is true, the negation is false, and if the original proposition is false, the negation is true.",
  },
  {
    name: "Conjunction Rule",
    otherName: [],
    description:
      "The Conjunction Rule is used to determine the truth value of a conjunction (AND) between two propositions. It evaluates to true only if both of the constituent propositions are true; otherwise, it is false.",
  },
  {
    name: "Disjunction Rule",
    otherName: [],
    description:
      "The Disjunction Rule is used to determine the truth value of a disjunction (OR) between two propositions. It evaluates to true if at least one of the constituent propositions is true; otherwise, it is false.",
  },
  {
    name: "Implication Rule",
    otherName: [],
    description:
      "The Implication Rule is used to determine the truth value of an implication (→) between two propositions. It evaluates to false only if the antecedent is true and the consequent is false; otherwise, it is true.",
  },
  {
    name: "Biconditional Rule",
    otherName: [],
    description:
      "The Biconditional Rule is used to determine the truth value of a biconditional (↔) between two propositions. It evaluates to true if both propositions have the same truth value (either both true or both false); otherwise, it is false.",
  },
];

const PageInfoData: Record<string, PageDetails> = {
  "quantificational-logic": {
    header: "Quantificational Logic Calculator",
    description:
      "Quantifiable logic or in the cotext of this app First-Order Logic, often abbreviated as FOL, is a branch of logic that extends Propositional Logic. It deals with propositions (statements) that are either true or false, similar to Propositional Logic. However, it goes further by introducing variables, predicates, quantifiers, and functions, allowing for more complex and expressive statements. In this app, you can generate natural deduction proofs for FOL containing universal and existential quantifiers.",
    inputSyntax: {
      description:
        "All uppercase alphabets are allowed as predicates. Lowercase letters are treated as variables Use of empty premises is not allowed.",
      symbols: folSymbols,
    },
    supportedRules: quanfitiableRules,
    webpage: "/quantificational-logic-calculator",
    wikipediaLink: "https://en.wikipedia.org/wiki/First-order_logic",
  },
  "propositional-logic": {
    header: "Propositional Logic Calculator",
    description:
      "Propositional Logic, often referred to as sentential logic, is a branch of formal logic that deals with propositions or statements that are either true or false. In this app, you can generate natural deduction proofs for propositonal logic.",
    inputSyntax: {
      description:
        "All uppercase alphabets are allowed as predicates. Use of empty premises is not allowed.",
      symbols: sharedSymbols,
    },
    supportedRules: sharedRules,
    webpage: "/propositional-logic-calculator",
    wikipediaLink: "https://simple.wikipedia.org/wiki/Propositional_logic",
  },

  "venn-diagram": {
    header: "Venn Diagram Generator",
    description:
      "Venn Diagrams in Syllogistic Figures are a graphical representation and analysis tool used in formal logic, particularly in the context of categorical syllogisms. These diagrams provide a visual means of illustrating and evaluating logical relationships between different sets or categories. In this app, you can generate Venn diagrams from syllogistic figures, and see whether they are valid or not. ",
    inputSyntax: {
      description: `A categorical syllogism consists of three categorical propositions: a major premise, a minor premise, and a conclusion. Each proposition is structured as 'All [subject term] are [predicate term],' where the subject and predicate terms represent categories or sets. The syllogism follows a specific format: 'All A are B' (major premise), 'All B are C' (minor premise), and 'Therefore, All A are C' (conclusion). This format represents a valid categorical syllogism known as a Barbara syllogism.`,
      symbols: undefined,
    },
    supportedRules: undefined,
    webpage: "/venn-diagram-generator",
    wikipediaLink: "https://en.wikipedia.org/wiki/Syllogism",
  },
  "truth-table": {
    header: "Truth Table Generator",
    description:
      "Truth Tables in Propositional Logic are a systematic method for evaluating and representing the truth values of logical formulas. In this app, you can generate truth tables for propositional logic.",
    inputSyntax: {
      description:
        "Use of both uppercase and lowercase alpahabets as predicates is allowed, although they would be treated as different predicated.",
      symbols: sharedSymbols,
    },
    supportedRules: truthTableRules,
    webpage: "/truth-table-generator",
    wikipediaLink: "https://en.wikipedia.org/wiki/Truth_table",
  },

  "semantic-tableaux": {
    header: "Semantic Tableaux Generator",
    description:
      "Semantic Tableaux, often referred to as a truth tree, is a graphical method used in logic and formal semantics. It serves as a tool for determining the validity or satisfiability of logical formulas or sets of formulas.In this app, you can generate tree proofs for propositional logic. Work is currently in-progress to extend this app to FOL semantic Tableaux. The x at the end of each branch represents the absurdity marker for that branch.",
    inputSyntax: {
      description:
        "All uppercase alphabets are allowed as predicates. Use of empty premises is not allowed.",
      symbols: sharedSymbols,
    },
    supportedRules: semanticTableauxRules,
    webpage: "/semantic-tableaux-generator",
    wikipediaLink: "https://en.wikipedia.org/wiki/Method_of_analytic_tableaux",
  },
  "propositional-logic-indirect-proof": {
    header: "Propositional Logic Indirect Proof Generator",
    description:
      "Propositional Logic Indirect Proof, also known as Proof by Contradiction in the context of Propositional Logic, is a method of reasoning that seeks to establish the truth of a proposition by assuming its opposite and demonstrating a logical contradiction. In this app, you can generate natural deduction styled indirect proofs for propositional logic.",
    inputSyntax: {
      description:
        "All uppercase alphabets are allowed as predicates. Use of empty premises is not allowed.",
      symbols: sharedSymbols,
    },
    supportedRules: proofByContradictionRules,
    webpage: "/propositional-logic-indirect-proof-generator",
    wikipediaLink: "https://en.wikipedia.org/wiki/Proof_by_contradiction",
  },
};
export default PageInfoData;
