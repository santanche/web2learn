const html = (strings, ...values) => {return { raw: strings, values }}

const title = 'My Title'
const message = 'My Message'

const doc = html`<!DOCTYPE html>
  <html lang="en-US">
    <head>
      <title>${title}</title>
    </head>
    <body>
      <h1>${message}</h1>
    </body>
  </html>`;

console.log('=== doc')
console.log(doc)