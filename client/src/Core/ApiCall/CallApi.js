import {baseApiCall} from './BaseApiCall';
import {ENTRIES, SIGN_UP_VERIFY} from './EndPoint';

export const signUpVerifyApi = data => {
  return baseApiCall({
    url: SIGN_UP_VERIFY,
    method: 'post',
    data,
  });
};

export const getEntriesApi = poolId => {
  return baseApiCall({
    url: ENTRIES,
    method: 'get',
  });
};
