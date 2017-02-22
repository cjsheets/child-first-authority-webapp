import * as types from './actionTypes';

export function setExpandSidebar(open = false) {
  return {type: types.TOGGLE_EXPAND_SIDEBAR, open};
}

export function setPopoverSidebar(open = false) {
  return {type: types.TOGGLE_POPOVER_SIDEBAR, open};
}
