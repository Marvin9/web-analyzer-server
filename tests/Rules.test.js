const Rules = require('../helpers/rules/Rules');

const vars = [
  [
    'title', {
      ruleName: 'test-rule',
      fn: (node, an) => { },
    }],
  [
    'title', {
      ruleName: 'another-title-rule',
      fn: (node, an) => { },
    },
  ],
];

const generateOutputObjFromVars = (i) => ({
  [vars[i][0]]: {
    [vars[i][1].ruleName]: vars[i][1].fn,
  },
});

describe('setRule function', () => {
  it('should not add rule for invalid constraint', () => {
    const r = new Rules();

    const correctTagName = 'body';
    const correctObj = {
      ruleName: 'any-rule',
      fn: (node, an) => { },
    };

    // 1. tagName is not string
    expect(r.setRule(1, correctObj)).toBeFalsy();

    // 2. second arg is not object
    expect(r.setRule(correctTagName, 1)).toBeFalsy();

    // 3. obj should contain ruleName & fn, ruleName should be string & fn function
    expect(r.setRule(correctTagName, { ruleName: 1, fn: () => { } })).toBeFalsy();
    expect(r.setRule(correctTagName, { ruleName: 'rulename', fn: 'string' })).toBeFalsy();

    // 4. true if all correct
    expect(r.setRule(correctTagName, correctObj)).toBeTruthy();
  });

  it('should set values to empty rulesBuffer if given correctly', () => {
    const r = new Rules();
    r.setRule(vars[0][0], vars[0][1]);
    expect(r.rulesBuffer).toMatchObject(generateOutputObjFromVars(0));
  });

  it('should set values to existing tag', () => {
    const r = new Rules();
    r.setRule(vars[0][0], vars[0][1]);
    r.setRule(vars[1][0], vars[1][1]);
    const expectedObj = {
      title: {
        'test-rule': expect.any(Function),
        'another-title-rule': expect.any(Function),
      },
    };
    expect({ ...r.rulesBuffer }).toMatchObject(expectedObj);
  });
});

describe('getRule function', () => {
  it('should return 0 if rule don\'t exist', () => {
    const r = new Rules();
    expect(r.getRule('x', 'y')).toBe(0);
  });

  it('should return function if rule exist', () => {
    const r = new Rules();
    r.setRule(vars[0][0], vars[0][1]);
    r.setRule(vars[1][0], vars[1][1]);

    expect(typeof r.getRule(vars[0][0], vars[0][1].ruleName)).toBe('function');
    expect(typeof r.getRule(vars[1][0], vars[1][1].ruleName)).toBe('function');
  });
});
