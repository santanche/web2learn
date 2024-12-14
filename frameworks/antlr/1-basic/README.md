# ANTLR

# Installing the Tool

~~~
pip install antlr4-tools
~~~

# Generating the Parser in JavaScript

~~~
antlr4 -Dlanguage=JavaScript -o generated -Xexact-output-dir grammar/Expr.g4
~~~

## Vite Environment

~~~
npm create vite@latest 1-vanilla -- --template vanilla
cd 1-vanilla
npm install
npm run dev
~~~