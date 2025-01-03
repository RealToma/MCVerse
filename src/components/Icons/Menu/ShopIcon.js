const ShopIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M29.5956 7.57078C29.3677 7.32234 29.066 7.14545 28.6992 7.04584L23.496 5.75209V3.86695C23.496 2.89781 22.7075 2.10938 21.7382 2.10938H8.26172C7.29246 2.10938 6.50391 2.89781 6.50391 3.86695V5.75238L1.31232 7.04303C1.30852 7.04396 1.30465 7.04496 1.30084 7.04602C0.48627 7.26615 0 7.86281 0 8.64211C0 8.84947 0.0379688 9.08719 0.0423633 9.11361C0.0450586 9.12984 0.0483984 9.14596 0.0523828 9.16189L4.42828 26.5368C4.65475 27.4832 5.61674 28.0794 6.54844 27.8314L15.0004 25.795L23.4516 27.8312C24.3336 28.0917 25.3717 27.4649 25.5715 26.5371V26.5364L26.9748 20.9654C27.0494 20.6947 26.8749 20.3289 26.5494 20.2542C26.2801 20.1732 25.9021 20.3695 25.8386 20.6796L24.4341 26.2558C24.3668 26.5391 24.0608 26.7968 23.7257 26.6923L19.9329 25.7783H21.7382C22.7075 25.7783 23.496 24.9899 23.496 24.0207V15.6203L24.1441 15.4839C24.3451 15.4416 24.5091 15.2972 24.5767 15.1034L25.9244 11.2367C25.9945 11.0356 25.9499 10.8123 25.808 10.6535L23.4961 8.06666V6.95982L28.3997 8.17898C28.7716 8.28117 28.8841 8.50365 28.807 8.89143L27.126 15.5662C27.0468 15.8797 27.2378 16.1989 27.5514 16.2775C27.8203 16.3599 28.1992 16.1624 28.2627 15.8527L29.9479 9.16213L29.9543 9.13049C29.9842 8.9782 29.9995 8.80939 30 8.64246C30.0035 8.24104 29.8564 7.85027 29.5956 7.57078ZM6.50391 14.4229L6.421 14.4054L5.29576 11.1769L6.50391 9.82512V14.4229ZM6.27404 26.6923C5.99795 26.7888 5.6475 26.5871 5.56594 26.2557L1.19537 8.90209C1.18213 8.61152 1.04174 8.3707 1.60137 8.17857L6.50391 6.95982V8.0666L4.19197 10.6535C4.05006 10.8122 4.00547 11.0355 4.07561 11.2366L5.42326 15.1034C5.49082 15.2972 5.65494 15.4416 5.85586 15.4838L6.50391 15.6203V24.0208C6.50391 24.9899 7.29246 25.7784 8.26172 25.7784H10.0671L6.27404 26.6923ZM24.7042 11.1769L23.5789 14.4054L23.496 14.4229V9.82518L24.7042 11.1769ZM22.3242 24.0208C22.3242 24.3438 22.0613 24.6067 21.7382 24.6067H8.26172C7.93863 24.6067 7.67578 24.3438 7.67578 24.0208V3.86695C7.67578 3.54393 7.93863 3.28107 8.26172 3.28107H21.7383C22.0614 3.28107 22.3242 3.54393 22.3242 3.86695V24.0208H22.3242Z"
      fill={color}
    />
    <path
      d="M27.1938 17.6999C27.1469 17.6876 27.0989 17.6816 27.0509 17.6816C26.7819 17.6816 26.5481 17.8639 26.4825 18.1247C26.404 18.4381 26.5944 18.7569 26.9079 18.836C26.9548 18.8477 27.0034 18.8542 27.0515 18.8542C27.3198 18.8542 27.5536 18.672 27.6192 18.4112C27.6977 18.0977 27.5073 17.7784 27.1938 17.6999Z"
      fill={color}
    />
    <path
      d="M11.7773 16.9922C11.4537 16.9922 11.1913 17.2546 11.1913 17.5781V19.8286L9.95912 17.3279C9.83877 17.0835 9.56561 16.9544 9.30059 17.0162C9.03533 17.078 8.84766 17.3145 8.84766 17.5869V22.2656C8.84766 22.5892 9.11004 22.8516 9.43359 22.8516C9.75715 22.8516 10.0195 22.5892 10.0195 22.2656V20.1016L11.1654 22.4271C11.325 22.7501 11.6364 22.8386 11.874 22.783C12.0997 22.7303 12.3633 22.5217 12.3633 22.1077V17.5781C12.3632 17.2546 12.1008 16.9922 11.7773 16.9922Z"
      fill={color}
    />
    <path
      d="M15.8789 18.1641C16.2025 18.1641 16.4648 17.9017 16.4648 17.5781C16.4648 17.2546 16.2025 16.9922 15.8789 16.9922H14.1211C13.7975 16.9922 13.5352 17.2546 13.5352 17.5781V22.2656C13.5352 22.5892 13.7975 22.8516 14.1211 22.8516C14.4446 22.8516 14.707 22.5892 14.707 22.2656V20.4634H15.7393C16.0628 20.4634 16.3252 20.201 16.3252 19.8775C16.3252 19.5539 16.0628 19.2915 15.7393 19.2915H14.707V18.1641H15.8789Z"
      fill={color}
    />
    <path
      d="M20.5664 16.9922H18.2227C17.8991 16.9922 17.6367 17.2546 17.6367 17.5781C17.6367 17.9017 17.8991 18.1641 18.2227 18.1641H18.8038V22.2656C18.8038 22.5892 19.0662 22.8516 19.3898 22.8516C19.7133 22.8516 19.9757 22.5892 19.9757 22.2656V18.1641H20.5664C20.89 18.1641 21.1523 17.9017 21.1523 17.5781C21.1523 17.2546 20.89 16.9922 20.5664 16.9922Z"
      fill={color}
    />
    <path
      d="M10.6631 13.1632L14.7061 15.5069C14.797 15.5596 14.8985 15.586 15 15.586C15.1015 15.586 15.203 15.5596 15.2939 15.5069L19.3369 13.1632C19.5176 13.0583 19.6289 12.8652 19.6289 12.6563V7.96876C19.6289 7.75982 19.5176 7.56669 19.3369 7.46187L15.2939 5.11812C15.1121 5.01271 14.8879 5.01271 14.7062 5.11812L10.6632 7.46187C10.4824 7.56669 10.3711 7.75982 10.3711 7.96876V12.6563C10.3711 12.8652 10.4824 13.0583 10.6631 13.1632ZM11.543 8.30638L15 6.3023L18.457 8.30638V12.3187L15 14.3228L11.543 12.3187V8.30638Z"
      fill={color}
    />
  </svg>
)

ShopIcon.defaultProps = {
  width: '30',
  height: '30',
  color: 'white',
}

export default ShopIcon
