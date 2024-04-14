import React from 'react'

const MenuIcon = ({ width, height, color }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={width} height="3" rx="1.5" fill={color} />
      <rect y="9" width={width} height="3" rx="1.5" fill={color} />
      <rect y="18" width={width} height="3" rx="1.5" fill={color} />
    </svg>
  )
}

MenuIcon.defaultProps = {
  width: '23',
  height: '21',
  color: 'white',
}

export default MenuIcon
