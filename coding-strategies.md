# Coding Strategies and Decisions

Welcome to the document on coding strategies and important decisions that shape my project's development. This document serves as a valuable resource where I discuss the key approaches, methodologies, and considerations that guide my coding practices.

**Note:** Please be aware that this document is a work in progress. Not all important strategies are reflected here as of now. I am continually refining my strategies and documenting my decisions as this project evolves. Feel free to revisit this document to stay updated on my latest coding insights and approaches.

## Table of Contents

- [Expand Knowledge Base](#expand-knowledge-base)
- [Check Knowledge Base](#check-knowledge-base)
- [The Restriction on UG](#the-restriction-on-uguniversal-generalization)
- [Get Deduction Steps](#get-deduction-steps)
- [Why not Skolemization](#why-not-skolemization)
- [Shading of the Venn Diagrams](#shading-of-the-venn-diagrams)

## Expand Knowledge Base:

This is an implementation of a forward chaining algorithm. The current contents of the knowledge are tested for simplification. They are run with all the other contents, (including itself) to see if, from either of the two premises or from the premise itself, a third one can be deduced. It only works to simplify the current contents of the premises to avoid unnecessary expansion. It simplifies [P ∧ Q] into [P] and [Q] but does not deduce [P ∧ Q] from [P], [Q] since this would unnecessarily lead to a potentially infinite knowledge base. If [P ∧ Q] is needed anywhere in the premises, a backward chaining algorithm check knowledge base conjoins [P], [Q].

## Check Knowledge Base:

This is an implementation of a backward chaining algorithm. It is passed a conclusion, and it tries to reach the conclusion by breaking down the wff(well-formed formula) into smaller parts and recursively calling itself with the base case of searching in the knowledge base for only primitive wffs that are necessary to reach the conclusion and returning the respective Boolean. For example, the premise [P -> Q] may be reduced to either [¬P] or [Q], since on either of the primitive wffs [¬P], [Q], we can use addition and then material implication to reach the desired conclusion of [P -> Q].

## The Restriction on UG(Universal Generalization):

One of the restrictions on universal generalization prevents from generalizing over a constant that was existentially instantiated. This prevents from making fallacious inferences from “some man is happy” to “JQ is happy” to “everyone is happy.”
This was(is?) somewhat of a challenging process.
As of now, in the process of generalization, I have kept existentially instantiated constants to have an underscore before them, P_a. But since this hinders the process as P_a -> Q and Pa -> Q must be treated the same if Q is to be inferred, I have treated P_a and Pa as the same throughout the inference process, and then at the during generalization, I have placed a strict check which prevents universal generalization over any constant with an underscore behind it.
But before this approach, many others followed. One of them was for me to keep a linked list of all the wffs and how they came into the knowledge base. Since I can have “some man is happy”, and “all men are happy” both as premises. I can universally generalize the second one. For both, I can instantiate “JQ is happy”, but it would be fallacious to instantiate the first one universally. Hence, keeping an array would be insufficient since I do not require the constant value, but I require the same constant(reference ?). To check whether it is the very same constant that has been through all the processing and in and out of wffs, linked lists seemed suitable that track each constant separately. This approach was deemed inefficient for reasons obvious when the current approach was implemented. (Lesser data structure, fewer checks, and more freedom to use the constants in the wffs however the process demands, resulting in a more scalable codebase.)

## Get Deduction Steps

This function combines forward and backward chaining by first expanding the knowledge base and then checking in the knowledge base if the conclusion can be inferred from any of the premises. If the conclusion cannot be reached by the current contents of the knowledge base, and if the knowledge base has expanded by forward chaining, it runs the expansion of the knowledge base again. If a conclusion is unreachable, it would be deemed so if any tried expansion of the knowledge base does not result in an expansion, in which case, after checking with the conclusion and for any contradiction (that may be used for contradiction exploitation), it would break out of the function and return false.

## Why not Skolemization

Although Skolemization is not used in the current version of getting the deduction steps for First-order logic arguments, it is being implemented in the semantic tableaux for first-order logic. There was an approach in which I was implementing Skolemization, although halfway through, I decided otherwise and planned to go on along with my current version. Skolemization is immensely powerful in reaching the conclusion much more efficiently than trying out all combinations, which I do in my current approach. Furthermore, Skolemization would help easily expand the current model to accommodate functions within Quantifiers. Although optimization is desired, the aim of this application is not merely to see whether an argument is valid or not but to provide the deduction steps for an argument, if valid. Converting the argument into Skolem standard form and processing it required that there must be another algorithm that converts the Skolem standard form steps to standard textbook-style natural deduction steps. In hindsight, this complicates things for the current model, although a future update may change that.
Under deprecated utils, I have stored some helper functions for Skolemization that may be helpful in FOL Semantic Tableaux.

## Shading of the Venn Diagrams

There are infinitely many possible syllogisms but only 256 logically distinct types. Although having 256 SVGs would be inefficient, breaking each circle’s possible type of shading into an SVG and placing the SVGs in a 3D manner may be one possible solution.
The implementation used here is to depict the circles through a canvas element and use functions to draw the lines and the shadings. All the implemented approaches follow a pattern of the following type. Some points on the circumference of circle A are acquired and then points on the symmetrical ellipse. For example, to shade circle A, as when “no man is immortal,” the entirety of circle A that does not lie within the circumference of circle B is shaded. So, the symmetrical points represent points on the circumference of circle B that are symmetrical to the points on the circumference of circle A if circle B were not present.

<p align="center">
    <svg width="258" height="134" viewBox="0 0 258 134" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H258V134H0V0Z" fill="white"/>
    <path d="M0.5 0.5H257.5V133.5H0.5V0.5Z" stroke="#111111" stroke-opacity="0.0666667"/>
    <path d="M63.5 18.1385H120.667" stroke="#363636"/>
    <path d="M68.1667 13.8192H115.417" stroke="#363636"/>
    <path d="M145.458 59.6036C145.458 87.2096 121.63 109.707 92.0833 109.707C62.5368 109.707 38.7083 87.2096 38.7083 59.6036C38.7083 31.9979 62.5368 9.5 92.0833 9.5C121.63 9.5 145.458 31.9979 145.458 59.6036Z" stroke="#363636" stroke-width="5"/>
    <path d="M55.9167 24.4735L118.917 24.7537" stroke="#363636"/>
    <path d="M48.3333 30.8085H115.417" stroke="#363636"/>
    <path d="M43.6667 36.8555L110.75 36.8555" stroke="#363636"/>
    <path d="M42.5 43.4784H107.833" stroke="#363636"/>
    <path d="M40.75 49.2373H106.083" stroke="#363636"/>
    <path d="M38.4167 55.5723L105.5 55.2843" stroke="#363636"/>
    <path d="M37.25 61.3313L104.917 61.6168" stroke="#363636"/>
    <path d="M38.4167 67.0903H104.917" stroke="#363636"/>
    <path d="M40.165 73.1373L107.25 72.5614" stroke="#363636"/>
    <path d="M41.3333 78.0326L109.583 77.7446" stroke="#363636"/>
    <path d="M43.6667 83.2157H111.042" stroke="#363636"/>
    <path d="M50.0833 89.2627L115.417 89.2627" stroke="#363636"/>
    <path d="M52.9998 95.1631H120.084" stroke="#363636"/>
    <path d="M59.4099 100.487H123.001" stroke="#363636"/>
    <path d="M71.0833 105.388H115.417" stroke="#363636"/>
    <path d="M212.25 59.8916C212.25 87.4975 188.421 109.995 158.875 109.995C129.329 109.995 105.5 87.4975 105.5 59.8916C105.5 32.2859 129.329 9.78796 158.875 9.78796C188.421 9.78796 212.25 32.2859 212.25 59.8916Z" stroke="#363636" stroke-width="5"/>
    <path d="M38.9141 101.79L34.207 114.749H32.2832L37.7031 100.531H38.9434L38.9141 101.79ZM42.8594 114.749L38.1426 101.79L38.1133 100.531H39.3535L44.793 114.749H42.8594ZM42.6152 109.486V111.029H34.627V109.486H42.6152Z" fill="#111111"/>
    <path d="M210.219 108.099H206.615L206.596 106.585H209.867C210.408 106.585 210.88 106.494 211.283 106.312C211.687 106.13 211.999 105.869 212.221 105.531C212.449 105.186 212.562 104.775 212.562 104.3C212.562 103.779 212.462 103.356 212.26 103.031C212.064 102.699 211.762 102.458 211.352 102.308C210.948 102.152 210.434 102.074 209.809 102.074H207.035V114.749H205.15V100.531H209.809C210.538 100.531 211.189 100.606 211.762 100.755C212.335 100.898 212.82 101.126 213.217 101.439C213.62 101.745 213.926 102.135 214.135 102.611C214.343 103.086 214.447 103.656 214.447 104.32C214.447 104.906 214.298 105.436 213.998 105.911C213.699 106.38 213.282 106.764 212.748 107.064C212.221 107.363 211.602 107.555 210.893 107.64L210.219 108.099ZM210.131 114.749H205.873L206.938 113.216H210.131C210.73 113.216 211.238 113.112 211.654 112.904C212.077 112.695 212.4 112.402 212.621 112.025C212.842 111.641 212.953 111.188 212.953 110.667C212.953 110.14 212.859 109.684 212.67 109.3C212.481 108.916 212.185 108.62 211.781 108.411C211.378 108.203 210.857 108.099 210.219 108.099H207.533L207.553 106.585H211.225L211.625 107.132C212.309 107.191 212.888 107.386 213.363 107.718C213.839 108.044 214.2 108.46 214.447 108.968C214.701 109.476 214.828 110.036 214.828 110.648C214.828 111.533 214.633 112.282 214.242 112.894C213.858 113.499 213.314 113.962 212.611 114.281C211.908 114.593 211.081 114.749 210.131 114.749Z" fill="#111111"/>
    </svg>
</p>

Note: this diagram does not depict a real syllogistic figure. It is just used here as an example.
