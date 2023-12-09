const {createSlice} = require('@reduxjs/toolkit');

const GetUserInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userInfoData: null,
  },
  reducers: {
    getUserInfo(state, actions) {
      state.userInfoData = actions.payload;
    },
  },
});

export const {getUserInfo} = GetUserInfoSlice.actions;
export default GetUserInfoSlice.reducer;
