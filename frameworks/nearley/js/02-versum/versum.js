// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "main", "symbols": ["knot"]},
    {"name": "knot$ebnf$1", "symbols": ["knot_level"], "postprocess": id},
    {"name": "knot$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "knot", "symbols": ["knot_level", "__", "title", "_", "knot$ebnf$1"], "postprocess": 
          function(d) {
        	return {
        		type: (d[4]) ? 'knot' : 'title',
              level: d[0],
        		title: d[2]
        	}
        }
        },
    {"name": "knot_level$ebnf$1", "symbols": [{"literal":"#"}]},
    {"name": "knot_level$ebnf$1", "symbols": ["knot_level$ebnf$1", {"literal":"#"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "knot_level", "symbols": ["knot_level$ebnf$1"], "postprocess": 
        function(d) {
          return d[0].join('').length
        }
        },
    {"name": "title$ebnf$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "title$ebnf$1", "symbols": ["title$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "title", "symbols": ["title$ebnf$1"], "postprocess": 
        function(d) {
        	return d[0].join('')
        }
        }
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
