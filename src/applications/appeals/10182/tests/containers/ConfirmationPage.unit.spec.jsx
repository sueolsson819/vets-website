import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { format } from 'date-fns';

import formConfig from '../../config/form';
import initialData from '../schema/initialData';

import ConfirmationPage from '../../containers/ConfirmationPage';
import { SELECTED, FORMAT_READABLE } from '../../constants';

const data = {
  user: {
    profile: {
      userFullName: {
        first: 'Foo',
        middle: 'Man',
        last: 'Choo',
      },
    },
  },
  form: {
    formId: formConfig.formId,
    submission: {
      response: {},
      timestamp: Date.now(),
    },
    data: {
      ...initialData.data,
      contestedIssues: [
        {
          [SELECTED]: true,
          attributes: {
            ratingIssueSubjectText: 'test 543',
          },
        },
        {
          [SELECTED]: false,
          attributes: {
            ratingIssueSubjectText: 'test 987',
          },
        },
      ],
    },
  },
};

describe('Confirmation page', () => {
  const fakeStore = {
    getState: () => data,
    subscribe: () => {},
    dispatch: () => {},
  };

  it('should render the confirmation page', () => {
    const tree = mount(<ConfirmationPage store={fakeStore} />);
    expect(tree).not.to.be.undefined;
    tree.unmount();
  });
  it('should render the user name', () => {
    const tree = mount(<ConfirmationPage store={fakeStore} />);
    expect(tree.text()).to.contain('Foo Man Choo');
    tree.unmount();
  });
  it('should render the submit date', () => {
    const date = format(
      new Date(data.form.submission.timestamp),
      FORMAT_READABLE,
    );
    const tree = mount(<ConfirmationPage store={fakeStore} />);
    expect(tree.text()).to.contain(date);
    tree.unmount();
  });
  it('should render the selected contested issue', () => {
    const tree = mount(<ConfirmationPage store={fakeStore} />);
    const list = tree.find('ul').text();
    expect(list).to.contain('test 543');
    expect(list).not.to.contain('test 987');
    tree.unmount();
  });
  it('should reset the wizard sessionStorage', () => {
    const tree = mount(<ConfirmationPage store={fakeStore} />);
    tree.unmount();
  });
});
