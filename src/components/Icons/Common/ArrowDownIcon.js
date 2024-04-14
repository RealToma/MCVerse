import React from 'react'

const ArrowDownIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0.5L4 3.5L1 0.5" stroke={color} strokeLinecap="round" />
  </svg>
)

ArrowDownIcon.defaultProps = {
  width: '8',
  height: '5',
  color: 'white',
  opacity: '1',
}

export default ArrowDownIcon
