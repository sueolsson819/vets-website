import { expect } from 'chai';

import { SELECTED } from '../../constants';
import {
  someSelected,
  hasSomeSelected,
  getSelected,
  getIssueName,
  showAddIssueQuestion,
  isEmptyObject,
  setInitialEditMode,
  issuesNeedUpdating,
} from '../../utils/helpers';

describe('someSelected', () => {
  it('should return true for issues that have some selected values', () => {
    expect(someSelected([{ [SELECTED]: true }, {}])).to.be.true;
    expect(someSelected([{}, { [SELECTED]: true }, {}])).to.be.true;
    expect(someSelected([{}, {}, {}, { [SELECTED]: true }])).to.be.true;
  });
  it('should return false for issues with no selected values', () => {
    expect(someSelected()).to.be.false;
    expect(someSelected([])).to.be.false;
    expect(someSelected([{}, {}])).to.be.false;
    expect(someSelected([{}, { [SELECTED]: false }, {}])).to.be.false;
    expect(someSelected([{}, {}, {}, { [SELECTED]: false }])).to.be.false;
  });
});

describe('hasSomeSelected', () => {
  const testIssues = (contestableIssues, additionalIssues) =>
    hasSomeSelected({ contestableIssues, additionalIssues });
  it('should return true for issues that have some selected values', () => {
    expect(testIssues([{ [SELECTED]: true }], [{}])).to.be.true;
    expect(testIssues([{}], [{ [SELECTED]: true }, {}])).to.be.true;
    expect(testIssues([{}], [{}, {}, { [SELECTED]: true }])).to.be.true;
    expect(
      testIssues([{}, { [SELECTED]: true }], [{}, {}, { [SELECTED]: true }]),
    ).to.be.true;
  });
  it('should return false for no selected issues', () => {
    expect(testIssues()).to.be.false;
    expect(testIssues([], [])).to.be.false;
    expect(testIssues([{}], [{}])).to.be.false;
    expect(testIssues([{ [SELECTED]: false }], [{}])).to.be.false;
    expect(testIssues([{}], [{ [SELECTED]: false }, {}])).to.be.false;
    expect(testIssues([{}], [{}, {}, { [SELECTED]: false }])).to.be.false;
    expect(
      testIssues([{}, { [SELECTED]: false }], [{}, {}, { [SELECTED]: false }]),
    ).to.be.false;
  });
});

describe('getSelected', () => {
  it('should return selected contestable issues', () => {
    expect(
      getSelected({
        contestableIssues: [
          { type: 'no', [SELECTED]: false },
          { type: 'ok', [SELECTED]: true },
        ],
      }),
    ).to.deep.equal([{ type: 'ok', [SELECTED]: true }]);
  });
  it('should return selected additional issues', () => {
    expect(
      getSelected({
        additionalIssues: [
          { type: 'no', [SELECTED]: false },
          { type: 'ok', [SELECTED]: true },
        ],
      }),
    ).to.deep.equal([{ type: 'ok', [SELECTED]: true }]);
  });
  it('should return all selected issues', () => {
    expect(
      getSelected({
        contestableIssues: [
          { type: 'no1', [SELECTED]: false },
          { type: 'ok1', [SELECTED]: true },
        ],
        additionalIssues: [
          { type: 'no2', [SELECTED]: false },
          { type: 'ok2', [SELECTED]: true },
        ],
      }),
    ).to.deep.equal([
      { type: 'ok1', [SELECTED]: true },
      { type: 'ok2', [SELECTED]: true },
    ]);
  });
});

describe('getIssueName', () => {
  it('should return undefined', () => {
    expect(getIssueName()).to.be.undefined;
  });
  it('should return a contestable issue name', () => {
    expect(
      getIssueName({ attributes: { ratingIssueSubjectText: 'test' } }),
    ).to.eq('test');
  });
  it('should return an added issue name', () => {
    expect(getIssueName({ issue: 'test2' })).to.eq('test2');
  });
});

describe('showAddIssueQuestion', () => {
  it('should show add issue question when contestable issues selected', () => {
    expect(showAddIssueQuestion({ contestableIssues: [{ [SELECTED]: true }] }))
      .to.be.true;
  });
  it('should not show add issue question when no issues or none selected', () => {
    expect(showAddIssueQuestion({ contestableIssues: [] })).to.be.false;
    expect(showAddIssueQuestion({ contestableIssues: [{}] })).to.be.false;
    expect(showAddIssueQuestion({ contestableIssues: [{ [SELECTED]: false }] }))
      .to.be.false;
  });
});

describe('isEmptyObject', () => {
  it('should return true for an empty object', () => {
    expect(isEmptyObject({})).to.be.true;
  });
  it('should return true for non objects or filled objects', () => {
    expect(isEmptyObject()).to.be.false;
    expect(isEmptyObject('')).to.be.false;
    expect(isEmptyObject([])).to.be.false;
    expect(isEmptyObject('test')).to.be.false;
    expect(isEmptyObject(null)).to.be.false;
    expect(isEmptyObject(true)).to.be.false;
    expect(isEmptyObject(() => {})).to.be.false;
    expect(isEmptyObject({ test: '' })).to.be.false;
  });
});

describe('setInitialEditMode', () => {
  it('should set edit mode when missing data', () => {
    [
      [{}],
      [{ issue: 'test' }],
      [{ decisionDate: '2000-01-01' }],
      [{ issue: '', decisionDate: '' }],
      [{ issue: undefined, decisionDate: undefined }],
    ].forEach(test => {
      expect(setInitialEditMode(test)).to.deep.equal([true]);
    });
    expect(
      setInitialEditMode([
        { issue: '', decisionDate: '2000-01-01' },
        { issue: 'test', decisionDate: '' },
      ]),
    ).to.deep.equal([true, true]);
  });
  it('should not set edit mode when data exists', () => {
    expect(
      setInitialEditMode([{ issue: 'test', decisionDate: '2000-01-01' }]),
    ).to.deep.equal([false]);
    expect(
      setInitialEditMode([
        { issue: 'test', decisionDate: '2000-01-01' },
        { issue: 'test2', decisionDate: '2000-01-02' },
      ]),
    ).to.deep.equal([false, false]);
  });
});

describe('issuesNeedUpdating', () => {
  const createEntry = (ratingIssueSubjectText, approxDecisionDate) => ({
    attributes: {
      ratingIssueSubjectText,
      approxDecisionDate,
    },
  });
  it('should return true if array lengths are different', () => {
    expect(issuesNeedUpdating([], [''])).to.be.true;
    expect(issuesNeedUpdating([''], ['', ''])).to.be.true;
  });
  it('should return true if content is different', () => {
    expect(
      issuesNeedUpdating(
        [createEntry('test', '123'), createEntry('test2', '345')],
        [createEntry('test', '123'), createEntry('test2', '346')],
      ),
    ).to.be.true;
    expect(
      issuesNeedUpdating(
        [createEntry('test', '123'), createEntry('test3', '345')],
        [createEntry('test', '123'), createEntry('test', '345')],
      ),
    ).to.be.true;
  });
  it('should return true if arrays are the same', () => {
    expect(
      issuesNeedUpdating(
        [createEntry('test', '123'), createEntry('test2', '345')],
        [createEntry('test', '123'), createEntry('test2', '345')],
      ),
    ).to.be.false;
  });
});
