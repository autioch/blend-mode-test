const modes = [
  'normal',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity'
];

function createEl(className, textContent = ''){
  const el = document.createElement('div');
  el.className = className;
  el.textContent = textContent;

  return el;
}

function createTest(style, mode, leftColor, rightColor, bgColor = '') {
  const test = createEl(`test ${bgColor}`);
  const isolator = createEl('isolator');
  const left = createEl(`left ${leftColor}`, 'LL');
  const right = createEl(`right ${rightColor}`, 'RR');

  left.style[style] = mode;
  right.style[style] = mode;

  isolator.append(left, right);
  test.append(isolator);

  return test;
}

function createTestGroup(style, mode){
  const parent = createEl('test-group');
  const title= createEl('title', mode);
  const content = createEl('content');

  const diffGreen = createTest(style, mode, 'red', 'blue', 'green');
  const sameGreen = createTest(style, mode, 'red', 'red', 'green');
  const bgGreen = createTest(style, mode, 'red', 'green', 'green');
  const diff = createTest(style, mode, 'red', 'blue');
  const same = createTest(style, mode, 'red', 'red');
  const bg = createTest(style, mode, 'red', 'green');
  const contentOpacity = createEl('content');

  const diffGreenOpacity = createTest(style, mode, 'red-opacity', 'blue-opacity', 'green');
  const sameGreenOpacity = createTest(style, mode, 'red-opacity', 'red-opacity', 'green');
  const bgGreenOpacity = createTest(style, mode, 'red-opacity', 'green-opacity', 'green');
  const diffOpacity = createTest(style, mode, 'red-opacity', 'blue-opacity');
  const sameOpacity = createTest(style, mode, 'red-opacity', 'red-opacity');
  const bgOpacity = createTest(style, mode, 'red-opacity', 'green-opacity');

  content.append(diffGreen, sameGreen, bgGreen, diff, same, bg);
  contentOpacity.append(diffGreenOpacity, sameGreenOpacity, bgGreenOpacity, diffOpacity, sameOpacity, bgOpacity);
  parent.append(title, content, contentOpacity);

  return parent;
}

mbma.append(...modes.map(mode => createTestGroup('mixBlendMode', mode)))
mbmi.append(...modes.map(mode => createTestGroup('mixBlendMode', mode)))

bbma.append(...modes.map(mode => createTestGroup('backgroundBlendMode', mode)))
bbmi.append(...modes.map(mode => createTestGroup('backgroundBlendMode', mode)))
