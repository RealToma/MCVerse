const ListIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 30 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M8.27695 0H2.03555C0.913477 0 0 0.917059 0 2.04353V8.30882C0 9.43588 0.913477 10.3524 2.03555 10.3524H8.27637C9.39902 10.3524 10.3119 9.43529 10.3119 8.30882V2.04412C10.3125 0.917059 9.39902 0 8.27695 0Z" />
    <path d="M8.27695 13.647H2.03555C0.912891 13.647 0 14.5641 0 15.6906V21.9559C0 23.0829 0.913477 23.9994 2.03555 23.9994H8.27637C9.39902 23.9994 10.3119 23.0823 10.3119 21.9559V15.6906C10.3119 14.5635 9.39844 13.647 8.27637 13.647H8.27695Z" />
    <path d="M29.0625 4.7059H14.0625C13.5445 4.7059 13.125 4.28472 13.125 3.76472C13.125 3.24472 13.5445 2.82355 14.0625 2.82355H29.0625C29.5805 2.82355 30 3.24472 30 3.76472C30 4.28472 29.5805 4.7059 29.0625 4.7059Z" />
    <path d="M23.9062 8.23532H14.0625C13.5445 8.23532 13.125 7.81414 13.125 7.29414C13.125 6.77414 13.5445 6.35297 14.0625 6.35297H23.9062C24.4242 6.35297 24.8438 6.77414 24.8438 7.29414C24.8438 7.81414 24.4242 8.23532 23.9062 8.23532Z" />
    <path d="M29.0625 18.1176H14.0625C13.5445 18.1176 13.125 17.6965 13.125 17.1765C13.125 16.6565 13.5445 16.2353 14.0625 16.2353H29.0625C29.5805 16.2353 30 16.6565 30 17.1765C30 17.6965 29.5805 18.1176 29.0625 18.1176Z" />
    <path d="M23.9062 21.8824H14.0625C13.5445 21.8824 13.125 21.4612 13.125 20.9412C13.125 20.4212 13.5445 20 14.0625 20H23.9062C24.4242 20 24.8438 20.4212 24.8438 20.9412C24.8438 21.4612 24.4242 21.8824 23.9062 21.8824Z" />
  </svg>
)

ListIcon.defaultProps = {
  width: '30',
  height: '24',
  color: 'white',
}

export default ListIcon