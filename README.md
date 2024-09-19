<h1 align="center">My Logic Hub</h1>

<p align="center"><em>Currently a beta version</em></p>

Welcome to My Logic Hub, a platform designed for performing various logical calculations. This app is built with a focus on Test-Driven Development (TDD) and runs entirely in the browser, using web workers to handle calculations in the background where necessary.

You can check out My Logic Hub at [mylogichub.com](https://mylogichub.com).

## Table of Contents

- [Running Locally](#running-locally)
- [Running Tests](#running-tests)
- [Available Logical Calculators](#available-logical-calculators)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Running Locally

**Tech Stack:** Next.js, React, TypeScript, SCSS

To run My Logic Hub locally, follow these steps:

```bash
  git clone https://github.com/kror-shack/my-logic-hub.git

  cd my-logic-hub

  npm install

  npm run dev
```

**Environment Variables**

All environment variables required in this project are solely for data logging purposes (firebase, vercel and google-analytics) and do not affect the app's functionality. They are not required for running the app.

## Running Tests

**Tech Stack:** Jest, Playwright, React-testing-library

I used [Jest](https://jestjs.io/) as the test runner, [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro/) for testing React components and [Playwright](https://playwright.dev/) for end-to-end testing/HTML canvas testing.

To run unit tests, run the following command

```bash
  npm run test
```

To run e2e tests, run the following command. To run tests with UI Mode add the optional `--ui` flag.

```bash
  npx playwright test
```

## Available Logical Calculators

The app currently offers the following logical calculators:

1. **First Order Logic Calculator**: Generate natural deduction steps for FOL arguments.
2. **Propositional Logic Calculator**: Generate natural deduction steps for propositional logic arguments.
3. **Semantic Tableaux Generator**: Generate a semantic tableaux for propositional logic.
4. **Propositional Logic Indirect Proof Generator**: Generate a natural deduction styled propositional logic indirect proof.
5. **Logic Venn**: Generate Venn Diagrams and validity details for a syllogistic argument.
6. **Truth Table Generator**: Generate a truth table for a propositional logic formula.
7. **Counter Model Generator**: Generate counter models via truth functional expansion.

#### Note: The style of natural deduction employed here uses inference rules for each step without the use of assumptions.

## Known Issues

There may be known issues in this beta version. Please refer to the project's issue tracker on GitHub, or the [user reports page](https://www.mylogichub.com/user-reports), for the most up-to-date information.

## Contributing

I welcome contributions from the community! If you'd like to help with the app's development, feel free to submit a pull request or reach out to me. You can also explore the document outlining key coding strategies and important decisions that guide the project’s development: **[coding strategies and decisions](coding-strategies.md)**.

## Acknowledgements

- Introduction to Logic _by Irving M. Copi, Carl Cohen, Victor Rodych_
- Logic: Techniques of Formal Reasoning _by Donald Kalish, Richard Montague, Gary Mar_

## License

Copyright © 2023 Fouzan Tariq(tariqfouzan@gmail.com)

You may modify and distribute this software under the terms of the GNU General Public License v3. See the [LICENSE](LICENSE) file for details.

---

Thank you for using My Logic Hub. I greatly appreciate your feedback and support.

<p><a href="https://www.buymeacoffee.com/krorshack"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="krorshack" /></a><a href="https://ko-fi.com/sadfdsfdsfasdfadf">
