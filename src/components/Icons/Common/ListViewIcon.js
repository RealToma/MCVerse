import React from 'react'

const ListViewIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="25" y="0.964355" width="2" height="20" rx="1" transform="rotate(90 25 0.964355)" fill={color} />
    <rect x="3" y="0.964355" width="2" height="3" rx="1" transform="rotate(90 3 0.964355)" fill={color} />
    <rect x="25" y="7.96436" width="2" height="20" rx="1" transform="rotate(90 25 7.96436)" fill={color} />
    <rect x="3" y="7.96436" width="2" height="3" rx="1" transform="rotate(90 3 7.96436)" fill={color} />
    <rect x="25" y="13.9644" width="2" height="20" rx="1" transform="rotate(90 25 13.9644)" fill={color} />
    <rect x="3" y="13.9644" width="2" height="3" rx="1" transform="rotate(90 3 13.9644)" fill={color} />
    <rect x="25" y="20.9644" width="2" height="20" rx="1" transform="rotate(90 25 20.9644)" fill={color} />
    <rect x="3" y="20.9644" width="2" height="3" rx="1" transform="rotate(90 3 20.9644)" fill={color} />
  </svg>
)

ListViewIcon.defaultProps = {
  width: '25',
  height: '23',
  color: 'white',
}

export default ListViewIcon
