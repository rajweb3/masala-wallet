import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export const wp = (size) => {
  return widthPercentageToDP(size);
};
export const hp = (size) => {
  return heightPercentageToDP(size);
};
