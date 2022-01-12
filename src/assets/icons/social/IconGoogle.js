import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconGoogle = ({style, color, size}) => {
  return (
    <Svg
      style={style}
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none">
      <Path
        d="M12.205 11.238v3.82h5.55c-.725 2.317-2.697 3.973-5.55 3.973-3.4 0-6.157-2.699-6.157-6.031s2.758-6.031 6.157-6.031c1.526 0 2.92.547 3.996 1.453l2.873-2.817A10.29 10.29 0 0 0 12.204 3C6.567 3 2 7.477 2 13s4.566 10 10.205 10c8.563 0 10.451-7.852 9.615-11.746l-9.615-.016Z"
        fill={color || '#767676'}
      />
    </Svg>
  );
};
