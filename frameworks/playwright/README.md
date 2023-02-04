Playwright
==========

Playwright Tutorial
=============

[Playwright](https://playwright.dev/) is a test automation tool.

Basic steps to start on Playwright on "Installation".

# Summary of Installation Commands

1. create a folder and enter in it
2. install Playright: `npm init playwright@latest`
  2.1. we preliminary answered the questions in the following way:

~~~
Do you want to use TypeScript or JavaScript? … 
> JavaScript

Where to put your end-to-end tests?
> tests

Add a GitHub Actions workflow? (y/N)
> false

Install Playwright browsers (can be done manually via 'npx playwright install')? (Y/n)
> false

Install Playwright operating system dependencies (requires sudo / root - can be done manually via 'sudo npx playwright install-deps')? (y/N)
> false
~~~

3. running Playwright: `npx playwright test`
4. showing the Playwright report: `npx playwright show-report`

To enable `<script type="module">` in the example, it was necessary to install the node.js [http-server](https://github.com/http-party/http-server), as browsers do not accept module inclusion from `file:` pages; they must be `http(s):`.