Blockly.Blocks['conta'] = {
  init: function () {
    this.jsonInit({
      message0: 'conta: %1 + %2',
      args0: [
        {
          type: 'field_number',
          name: 'A'
        },
        {
          type: 'field_number',
          name: 'B'
        }
      ],
      colour: 160
    })
  }
}