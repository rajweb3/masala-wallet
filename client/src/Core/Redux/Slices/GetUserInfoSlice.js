import { ChainConfig } from "../../../Constants/ChainConfig";

const { createSlice } = require("@reduxjs/toolkit");

const GetUserInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfoData: null,
    selectedTestNet: null,
    networkId: null,
    networkName: null,
  },
  reducers: {
    getUserInfo(state, actions) {
      state.userInfoData = actions.payload;
    },
    setSelectedTestNet(state, actions) {
      let id;
      let name;

      const lk = ChainConfig?.map((item, index) => {
        if (item?.network == actions.payload.network) {
          id = item?.id;
          name = item.name;
        }
      });
      state.networkId = id;
      state.networkName = name;
      state.selectedTestNet = actions.payload;
    },
  },
});

export const { getUserInfo, setSelectedTestNet } = GetUserInfoSlice.actions;
export default GetUserInfoSlice.reducer;
