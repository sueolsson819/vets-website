export const alertStatus = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning'
};

// Alert action types
export const CLOSE_ALERT = 'CLOSE_ALERT';
export const OPEN_ALERT = 'OPEN_ALERT';

// Compose action types
export const ADD_COMPOSE_ATTACHMENTS = 'ADD_COMPOSE_ATTACHMENTS';
export const DELETE_COMPOSE_ATTACHMENT = 'DELETE_COMPOSE_ATTACHMENT';
export const DELETE_COMPOSE_MESSAGE = 'DELETE_COMPOSE_MESSAGE';
export const FETCH_RECIPIENTS_FAILURE = 'FETCH_RECIPIENTS_FAILURE';
export const FETCH_RECIPIENTS_SUCCESS = 'FETCH_RECIPIENTS_SUCCESS';
export const RESET_MESSAGE_OBJECT = 'RESET_MESSAGE_OBJECT';
export const SET_MESSAGE_FIELD = 'SET_MESSAGE_FIELD';

// Folders action types
export const CREATE_FOLDER_FAILURE = 'CREATE_FOLDER_FAILURE';
export const CREATE_FOLDER_SUCCESS = 'CREATE_FOLDER_SUCCESS';
export const DELETE_FOLDER_FAILURE = 'DELETE_FOLDER_FAILURE';
export const DELETE_FOLDER_SUCCESS = 'DELETE_FOLDER_SUCCESS';
export const FETCH_FOLDERS_FAILURE = 'FETCH_FOLDERS_FAILURE';
export const FETCH_FOLDERS_SUCCESS = 'FETCH_FOLDERS_SUCCESS';
export const FETCH_FOLDER_FAILURE = 'FETCH_FOLDER_FAILURE';
export const FETCH_FOLDER_SUCCESS = 'FETCH_FOLDER_SUCCESS';
export const TOGGLE_FOLDER_NAV = 'TOGGLE_FOLDER_NAV';
export const TOGGLE_MANAGED_FOLDERS = 'TOGGLE_MANAGED_FOLDERS';
export const SET_CURRENT_FOLDER = 'SET_CURRENT_FOLDER';

// Messages action types
export const ADD_DRAFT_ATTACHMENTS = 'ADD_DRAFT_ATTACHMENTS';
export const CLEAR_DRAFT = 'CLEAR_DRAFT';
export const DELETE_DRAFT_ATTACHMENT = 'DELETE_DRAFT_ATTACHMENT';
export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const FETCH_THREAD_FAILURE = 'FETCH_THREAD_FAILURE';
export const FETCH_THREAD_SUCCESS = 'FETCH_THREAD_SUCCESS';
export const MOVE_MESSAGE_FAILURE = 'MOVE_MESSAGE_FAILURE';
export const MOVE_MESSAGE_SUCCESS = 'MOVE_MESSAGE_SUCCESS';
export const SAVE_DRAFT_FAILURE = 'SAVE_DRAFT_FAILURE';
export const SAVE_DRAFT_SUCCESS = 'SAVE_DRAFT_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const TOGGLE_MESSAGE_COLLAPSED = 'TOGGLE_MESSAGE_COLLAPSED';
export const TOGGLE_MESSAGES_COLLAPSED = 'TOGGLE_MESSAGES_COLLAPSED';
export const TOGGLE_MOVE_TO = 'TOGGLE_MOVE_TO';
export const TOGGLE_REPLY_DETAILS = 'TOGGLE_REPLY_DETAILS';
export const UPDATE_DRAFT = 'UPDATE_DRAFT';

// Modals action types
export const CLOSE_ATTACHMENTS_MODAL = 'CLOSE_ATTACHMENTS_MODAL';
export const CLOSE_CREATE_FOLDER = 'CLOSE_CREATE_FOLDER';
export const OPEN_ATTACHMENTS_MODAL = 'OPEN_ATTACHMENTS_MODAL';
export const OPEN_CREATE_FOLDER = 'OPEN_CREATE_FOLDER';
export const SET_NEW_FOLDER_NAME = 'SET_NEW_FOLDER_NAME';
export const TOGGLE_CONFIRM_DELETE = 'TOGGLE_CONFIRM_DELETE';

// Search action types
export const SET_ADVSEARCH_END_DATE = 'SET_ADVSEARCH_END_DATE';
export const SET_ADVSEARCH_START_DATE = 'SET_ADVSEARCH_START_DATE';
export const SET_SEARCH_PARAM = 'SET_SEARCH_PARAM';
export const TOGGLE_ADVANCED_SEARCH = 'TOGGLE_ADVANCED_SEARCH';
