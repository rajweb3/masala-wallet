import {wp} from './Constant';

export const textStyle = (size, color, fontWeight) => {
  const fontSize = size + '';
  return {
    fontSize: wp(fontSize),
    color: color,
    fontWeight: fontWeight ? fontWeight : '400',
  };
};
