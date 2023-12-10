import { ChainConfig } from "../../../Constants/ChainConfig";

const { createSlice } = require("@reduxjs/toolkit");

const GetUserInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfoData: null,
    selectedTestNet: null,
    networkId: null,
    networkName: null,
    networkIcon: null,
  },
  reducers: {
    getUserInfo(state, actions) {
      state.userInfoData = actions.payload;
    },
    setSelectedTestNet(state, actions) {
      let id;
      let name;
      let icon;

      const lk = ChainConfig?.map((item, index) => {
        if (item?.network == actions.payload.network) {
          id = item?.id;
          name = item.name;
          icon = item.icon;
        }
      });
      state.networkId = id;
      state.networkName = name;
      state.networkIcon = name;
      state.selectedTestNet = actions.payload;
    },
  },
});

export const { getUserInfo, setSelectedTestNet } = GetUserInfoSlice.actions;
export default GetUserInfoSlice.reducer;
