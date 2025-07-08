# Playwright Test Setup Guide

## Install environments

Ensure you already installed Node.js >= 16

Install Playwright

```
npx playwright install
```

Install Typescript

```
npm install --save-dev typescript
npm install --save-dev ts-node
npx tsc --init
```

Install dotenv

```
npm install dotenv
```

## Create .env file with content

Example:

```
BASE_URL=(URL of AUT)
USER_NAME=(Your account username to login)
PASSWORD=(Your password account to login)
```

## How to run test

```
npx playwright test
```

## How to view HTML test report

```
npx playwright show-report
```

## How to run test in UI Mode

```
npx playwright test --ui
```

## Extension for formatting the code

- Code Spell Checker
- Prettier - Code formatter