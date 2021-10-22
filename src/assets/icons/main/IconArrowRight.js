import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const IconArrowRight = ({color, size}) => {
  return (
    <Svg
      width={size || 32}
      height={size || 32}
      viewBox="0 0 32 32"
      fill="none"
    >
      <Path
        d="M22.667 15a1 1 0 110 2v-2zM4 17a1 1 0 110-2v2zm18.667 0H4v-2h18.667v2z"
        fill={color || '#FFFFFF'}
      />
      <Path
        d="M29.048 15.796l-7.783-5.56a.8.8 0 00-1.265.652v10.224a.8.8 0 001.265.651l7.783-5.56a.25.25 0 000-.406z"
        fill={color || '#FFFFFF'}
      />
    </Svg>
  );
};
