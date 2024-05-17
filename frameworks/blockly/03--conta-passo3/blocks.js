Blockly.Blocks['conta'] = {
  init: function () {
    this.jsonInit({
      message0: 'conta: %1 + %2 %3',
      args0: [
        {
          type: 'field_number',
          name: 'A'
        },
        {
          type: 'field_number',
          name: 'B'
        },
        {
          type: 'input_value',
          name: 'C',
          check: 'encaixe'
        }
      ],
      colour: 160
    })
  }
}

Blockly.Blocks['resultado'] = {
  init: function () {
    this.jsonInit({
      message0: 'resultado: %1',
      args0: [
        {
          type: 'field_number',
          name: 'R'
        }
      ],
      colour: 80,
      output: 'encaixe'
    })
  }
}