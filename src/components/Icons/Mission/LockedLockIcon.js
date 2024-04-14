const LockedLockIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 29 36" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M2.8575 15.0398C4.21805 14.7361 5.85211 14.4288 7.68867 14.1933V11.186C7.68867 7.68234 10.5391 4.83117 14.0435 4.83117C17.5479 4.83117 20.3984 7.68164 20.3984 11.186V14.1933C22.2349 14.4281 23.8697 14.7354 25.2295 15.0398V11.186C25.2295 5.0182 20.2113 0 14.0435 0C7.8757 0 2.8575 5.0182 2.8575 11.186V15.0398Z" />
    <path d="M14.0435 22.4529C13.3172 22.4529 12.7266 23.0435 12.7266 23.7698C12.7266 24.4962 13.3172 25.0875 14.0435 25.0875C14.7698 25.0875 15.3605 24.4969 15.3605 23.7705C15.3605 23.0442 14.7698 22.4536 14.0435 22.4536V22.4529Z" />
    <path d="M14.0435 15.8899C7.41445 15.8899 1.89211 17.3925 0 17.9754V33.9145C1.89492 34.4967 7.42922 36.0007 14.0435 36.0007C20.6578 36.0007 26.1949 34.4981 28.087 33.9152V17.9761C26.1921 17.3939 20.6578 15.8899 14.0435 15.8899ZM15.0982 27.0302V30.4917H12.9888V27.0302C11.6142 26.5844 10.6172 25.2921 10.6172 23.7705C10.6172 21.8812 12.1542 20.3442 14.0435 20.3442C15.9328 20.3442 17.4698 21.8812 17.4698 23.7705C17.4698 25.2921 16.4728 26.5844 15.0982 27.0302Z" />{' '}
  </svg>
)

LockedLockIcon.defaultProps = {
  width: '36',
  height: '36',
  color: 'white',
}

export default LockedLockIcon