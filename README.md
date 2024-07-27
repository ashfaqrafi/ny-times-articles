# NY Times Most Popular Articles

This project is set up with React working in Vite with HMR and some ESLint rules.

## How to run the project

1. Clone the repository
2. Run `npm install` in the project root directory to install the dependencies
3. Run `npm run dev` to start the project
4. Open your browser and go to `http://localhost:5173/`
5. You will see the prject is up and running.

## How to run the tests

1. Run `npm run test`

## How to generate the test code coverage report

1. Run `npm run test:coverage`

## How to run linting

1. Run `npm run lint`

## How to run SonarQube

1. Run `docker compose up` in a new terminal in the project root
2. Run `node ./sonarqube/sonarscan.cjs` in another new terminal in the project root
3. Open your browser and go to `http://localhost:9000/`
4. Set up the SonarQube server
8. Follow the instructions to analyze the project
9. You will see the project is analyzed

## How to run Cypress tests

1. Run `npx cypress open`
2. For running end to end tests click on `E2E Testing` option in the newly opened window in the browser
3. Select browser from the list of browsers and click on `Start E2E Testing` button
4. You will see the `spec.cy.js` file in the `Specs` section
5. Click on the `spec.cy.js` file
6. You will see the Cypress tests are running

## How to build the project

1. Run `npm run build`

## How to run the project in development mode

1. Run `npm run dev`

## How to run the project in development mode with a specific port

1. Run `npm run dev -- --port 3000`

## Husky

This project uses Husky to run the linting and testing scripts before committing the code. If the linting or testing scripts fail, the commit will be aborted. It automatically lint commit messages, code, and run tests upon committing or pushing.
