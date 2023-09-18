@builtin "whitespace.ne"

main -> knot

knot -> knot_level __ title _ knot_level:? {%
  function(d) {
		return {
			type: (d[4]) ? 'knot' : 'title',
      level: d[0],
			title: d[2]
		}
	}
%}

knot_level -> "#":+ {%
  function(d) {
    return d[0].join('').length
  }
%}

title -> [a-zA-Z0-9_]:+ {%
	function(d) {
		return d[0].join('')
	}
%}
