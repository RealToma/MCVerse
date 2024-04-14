import React from 'react'

const Icon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
)

Icon.defaultProps = {
  width: '32',
  height: '32',
  color: 'white',
}

export default Icon
