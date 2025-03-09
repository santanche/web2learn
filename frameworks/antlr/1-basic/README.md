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

Creating a vanilla Vite environment to host the code:

~~~
npm create vite@latest 1-basic -- --template vanilla
cd 1-basic
npm install
npm install antlr4
~~~

Running the environment:

~~~
npm run dev
~~~