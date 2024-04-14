import React from 'react'

const BridgeIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.9985 11.1022C19.9805 10.6263 19.7978 10.1868 19.4843 9.86459C19.3266 9.7026 19.166 9.5452 19.0028 9.39212V5.95295C19.0028 5.7692 18.9338 5.59388 18.8127 5.46973C18.1001 4.73908 17.2978 4.12126 16.4155 3.62191V2.8324C16.4155 2.47039 16.1532 2.17691 15.8296 2.17691C15.506 2.17691 15.2437 2.47039 15.2437 2.8324V3.04897C15.0902 2.98478 14.9353 2.9229 14.7779 2.86508C14.066 2.60346 13.3108 2.40611 12.5179 2.27375V1.61642C12.5179 1.25442 12.2556 0.960938 11.932 0.960938C11.6084 0.960938 11.3461 1.25442 11.3461 1.61642V2.12818C10.9086 2.09148 10.4616 2.07256 10.0054 2.07256C9.53367 2.07256 9.07192 2.09292 8.62028 2.13216V1.61642C8.62028 1.25442 8.35793 0.960938 8.03434 0.960938C7.71075 0.960938 7.4484 1.25442 7.4484 1.61642V2.28144C6.67118 2.41376 5.93017 2.60826 5.23111 2.86504C5.05911 2.92823 4.8899 2.99583 4.72267 3.06658V2.8324C4.72267 2.47039 4.46033 2.17691 4.13673 2.17691C3.81314 2.17691 3.5508 2.47039 3.5508 2.8324V3.64599C2.6849 4.14127 1.89736 4.75114 1.19756 5.47021C1.07666 5.59444 1.00791 5.76972 1.00799 5.95334L1.00983 9.37997C0.842171 9.5368 0.677405 9.69836 0.515648 9.86455C0.202133 10.1867 0.0195164 10.6263 0.00146952 11.1022C-0.0165773 11.578 0.132094 12.0333 0.420062 12.384C1.01455 13.1081 2.02486 13.1561 2.67224 12.491C2.93931 12.2166 3.22549 11.9514 3.52279 11.7029C5.40478 10.1302 7.64454 9.29895 9.99996 9.29895C12.3554 9.29895 14.5951 10.1302 16.4771 11.7029C16.7742 11.9512 17.0604 12.2163 17.3277 12.491C17.6226 12.7941 18.0055 12.9609 18.4057 12.9609C18.8509 12.9609 19.2789 12.7506 19.5799 12.384C19.8679 12.0332 20.0166 11.578 19.9985 11.1022ZM3.55084 7.48788C3.08049 7.7607 2.62326 8.06393 2.18123 8.39661L2.18006 6.246C2.60506 5.8326 3.06228 5.46365 3.55084 5.13923V7.48788ZM7.44844 5.99333C6.51239 6.18617 5.59966 6.48499 4.72271 6.88339V4.47579C5.55735 4.07686 6.46669 3.78639 7.44844 3.60592V5.99333ZM11.3461 5.80485C10.9008 5.75718 10.4517 5.73266 10 5.73266C9.53692 5.73266 9.07664 5.75871 8.62032 5.80879V3.44606C9.06891 3.40477 9.53043 3.38349 10.0054 3.38349C10.4647 3.38349 10.9114 3.40354 11.3461 3.44226V5.80485ZM15.2437 6.86827C14.3665 6.47271 13.4538 6.17691 12.518 5.98673V3.59857C13.4989 3.77551 14.4082 4.06187 15.2437 4.45634V6.86827ZM17.8309 8.4057C17.3746 8.06152 16.9021 7.74877 16.4156 7.46848V5.11187C16.9205 5.44307 17.3928 5.82111 17.8309 6.24652V8.4057Z"
      fill={color}
    />
  </svg>
)

BridgeIcon.defaultProps = {
  width: '20',
  height: '13',
  color: 'white',
}

export default BridgeIcon
