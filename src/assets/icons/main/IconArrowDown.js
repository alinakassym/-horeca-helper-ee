import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const IconArrowDown = ({color, size}) => {
  return (
    <Svg
      width={size || 24}
      height={size || 24}
      fill="none">
      <Path
        d="M11.808 14.77l-3.715-4.458A.8.8 0 018.708 9h6.584a.8.8 0 01.614 1.312l-3.714 4.458a.25.25 0 01-.384 0z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
