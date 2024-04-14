const SnowIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.5695 13.2313L18.0225 14.4491L16.2698 13.438V11.5407L18.0025 10.5457L22.5694 11.7694C22.6612 11.7939 22.7535 11.806 22.8449 11.806C23.314 11.806 23.7432 11.4927 23.87 11.0181C24.0219 10.451 23.6857 9.86823 23.1187 9.71647L20.615 9.04564L22.923 7.72053C23.4317 7.42835 23.6078 6.77883 23.3155 6.2699C23.0223 5.76097 22.3741 5.58466 21.8652 5.87755L19.5524 7.20578L20.2231 4.70124C20.3748 4.13429 20.0391 3.55138 19.4718 3.39961C18.9082 3.25179 18.323 3.5843 18.1711 4.15086L16.9524 8.69807L15.2089 9.69936L13.5561 8.74373V6.73857L16.8985 3.39627C17.3134 2.98114 17.3134 2.30874 16.8985 1.89356C16.4834 1.47848 15.8112 1.47848 15.3959 1.89356L13.5561 3.73325V1.06254C13.5562 0.475791 13.0803 0 12.4935 0C11.9068 0 11.4309 0.475737 11.4309 1.06254V3.72008L9.60456 1.89356C9.18948 1.47848 8.51708 1.47848 8.1019 1.89356C7.68682 2.30869 7.68682 2.98109 8.1019 3.39627L11.4309 6.72524V8.75145L9.79064 9.69774L8.04712 8.69737L6.82936 4.15092C6.67766 3.58435 6.09522 3.25093 5.52871 3.39967C4.96171 3.55143 4.62522 4.13435 4.77714 4.70129L5.44776 7.2054L3.13508 5.87755C2.62523 5.5846 1.97626 5.76054 1.6845 6.27017C1.39247 6.77921 1.56857 7.42829 2.07745 7.72048L4.38527 9.04558L1.88154 9.71642C1.31449 9.86818 0.978099 10.451 1.12997 11.0181C1.25707 11.4926 1.68623 11.8059 2.15538 11.8059C2.24675 11.8059 2.33904 11.7938 2.43111 11.7693L6.99861 10.5452L8.72934 11.5389L8.73112 13.438L6.97789 14.4508L2.43111 13.2313C1.86805 13.0835 1.28205 13.4164 1.12997 13.9827C0.978099 14.5496 1.31449 15.1326 1.88154 15.2835L4.37609 15.9526L2.0748 17.2811C1.56679 17.5747 1.39247 18.224 1.68628 18.7321C1.88311 19.074 2.24016 19.2634 2.60699 19.2634C2.78709 19.2634 2.96988 19.2186 3.13734 19.1206L5.45029 17.7858L4.77714 20.2995C4.62522 20.8674 4.96171 21.4485 5.52871 21.6012C5.62051 21.6261 5.71274 21.6378 5.80417 21.6378C6.2731 21.6378 6.70227 21.3241 6.82936 20.8492L8.05316 16.2831L9.79377 15.2788L11.4309 16.2235V18.2757L8.1019 21.6048C7.68682 22.0198 7.68682 22.6921 8.1019 23.1074C8.30946 23.3149 8.58087 23.4178 8.8532 23.4178C9.12461 23.4178 9.39699 23.3149 9.60456 23.1074L11.4309 21.2809V23.9376C11.4309 24.5254 11.9068 25.0002 12.4935 25.0002C13.0803 25.0002 13.5562 24.5253 13.5562 23.9376V21.2677L15.3959 23.1074C15.6034 23.3149 15.8748 23.4178 16.1472 23.4178C16.4196 23.4178 16.691 23.3149 16.8985 23.1074C17.3134 22.6922 17.3134 22.0199 16.8985 21.6048L13.5562 18.2624V16.2317L15.2073 15.2787L16.9475 16.283L18.1713 20.8491C18.2982 21.324 18.7274 21.6377 19.1962 21.6377C19.2873 21.6377 19.3799 21.626 19.4719 21.6011C20.0392 21.4484 20.3749 20.8673 20.2232 20.2994L19.5493 17.7857L21.8631 19.1205C22.0306 19.2184 22.2133 19.2633 22.3935 19.2633C22.7603 19.2633 23.1173 19.0739 23.3141 18.732C23.6079 18.2239 23.4337 17.5747 22.9256 17.281L20.6243 15.9527L23.1188 15.2836C23.6859 15.1326 24.0221 14.5496 23.8702 13.9828C23.7192 13.4164 23.1356 13.0828 22.5695 13.2313ZM14.1446 13.438L12.5001 14.3878L10.8567 13.438L10.8549 11.5372L12.5001 10.5881L14.1446 11.5386V13.438Z"
      fill={color}
    />
  </svg>
)

SnowIcon.defaultProps = {
  width: '25',
  height: '25',
  color: 'white',
}

export default SnowIcon