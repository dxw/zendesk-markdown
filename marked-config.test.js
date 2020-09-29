const marked = require('./marked-config')

test('turns \\n into <br>', () => {
  expect(marked('Thanks,\nMallory')).toBe('<p>Thanks,<br>Mallory</p>\n')
})
