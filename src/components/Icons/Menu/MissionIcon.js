const MissionIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.08 6.7V5.43335H15L13.32 7.96665L15 10.5H7.72001M11.08 6.7L7.72001 10.5M11.08 6.7V1.63335H4.36001V6.7H11.08ZM11.08 6.7H7.72001V10.5M4.36001 16.8333V1M4.36001 16.8333L1.55998 20H7.16L4.36001 16.8333ZM1 20H7.72001"
      stroke={color}
      strokeWidth="2"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

MissionIcon.defaultProps = {
  width: '16',
  height: '21',
  color: 'white',
}

export default MissionIcon
