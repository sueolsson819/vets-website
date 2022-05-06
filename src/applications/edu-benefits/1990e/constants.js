import PropTypes from 'prop-types';

export const SPONSOR_RELATIONSHIP = {
  CHILD: 'Child',
  SPOUSE: 'Spouse',
};
export const SPONSOR_NOT_LISTED_LABEL = 'Someone not listed here';
export const SPONSOR_NOT_LISTED_VALUE = 'SPONSOR_NOT_LISTED';
export const IM_NOT_SURE_LABEL = 'I’m not sure';
export const IM_NOT_SURE_VALUE = 'IM_NOT_SURE';
export const SPONSORS_TYPE = PropTypes.shape({
  sponsors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      date: PropTypes.string,
      relationship: PropTypes.string,
    }),
  ),
  someoneNotListed: PropTypes.bool,
});

export const YOUR_PROFILE_URL = '/profile';
