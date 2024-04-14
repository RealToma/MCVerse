import React from 'react'

const ArrowUpIcon = ({ width, height, color, opacity }) => (
  <svg width={width} height={height} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity={opacity} d="M1 4.5L4 1.5L7 4.5" stroke={color} strokeLinecap="round" />
  </svg>
)

ArrowUpIcon.defaultProps = {
  width: '8',
  height: '5',
  color: 'white',
  opacity: '1',
}

export default ArrowUpIcon
