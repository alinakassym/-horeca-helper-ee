import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const IconGoogle = ({color, size}) => {
  return (
    <Svg
      width={size || 32}
      height={size || 32}
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M15.941 13.808v4.601h6.39c-.595 2.924-3.084 4.604-6.39 4.604a7.04 7.04 0 010-14.078 6.888 6.888 0 014.387 1.57l3.467-3.466a11.905 11.905 0 10-7.854 20.846c5.956 0 11.372-4.332 11.372-11.912a9.951 9.951 0 00-.266-2.166l-11.106.001z"
        fill={color || '#767676'}
      />
    </Svg>
  );
};
