import React from 'react'

const GridViewIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="8.96436" width="4" height="15" rx="2" fill={color} />
    <rect x="8" y="8.96436" width="4" height="15" rx="2" fill={color} />
    <rect x="16" y="8.96436" width="4" height="15" rx="2" fill={color} />
    <rect y="0.964355" width="4" height="5" rx="2" fill={color} />
    <rect x="8" y="0.964355" width="4" height="5" rx="2" fill={color} />
    <rect x="16" y="0.964355" width="4" height="5" rx="2" fill={color} />
  </svg>
)

GridViewIcon.defaultProps = {
  width: '20',
  height: '24',
  color: 'white',
}

export default GridViewIcon
