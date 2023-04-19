Blockly.Blocks['heart'] = {
  init: function () {
    this.jsonInit({
      message0: 'O coração está %1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'entity',
          options: [
            ['parado', 'stopped'],
            ['batendo', 'beating'],
            ['desconhecido', 'unknown']
          ]
        },
        {
          type: 'input_value',
          name: 'ekg',
          check: 'Ekg'
        }
      ],
      message1: 'ritmo %1',
      args1: [
        {
          type: 'field_number',
          name: 'rhythm',
          value: 100,
          min: 0,
          max: 100
        }
      ],
      message2: '%1 saudável',
      args2: [
        {
          type: 'field_checkbox',
          name: 'left',
          check: 'Boolean'
        }
      ],
      colour: 160,
      tooltip: 'Coração'
    })
  }
}

Blockly.Blocks['heart_image'] = {
  init: function () {
    this.jsonInit({
      message0: '%1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'entity',
          options: [
            [{src: 'images/heart1.svg', width: 100, height: 100, alt: 'heart 1'}, 'heart1'],
            [{src: 'images/heart2.svg', width: 100, height: 100, alt: 'heart 2'}, 'heart2']
          ]
        }
      ],
      colour: 200,
      tooltip: 'Eletro',
      output: 'Ekg'
    })
  }
}