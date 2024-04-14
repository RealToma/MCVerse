import React from 'react'

const TiresIcon = ({ width, height, color }) => (
  <svg width={width} height={height} viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.4987 0C12.4334 0 9.43684 0.908983 6.88809 2.612C4.33934 4.31502 2.35283 6.73559 1.17977 9.5676C0.00671535 12.3996 -0.300211 15.5159 0.29781 18.5223C0.895831 21.5288 2.37194 24.2904 4.53947 26.4579C6.707 28.6255 9.46861 30.1016 12.4751 30.6996C15.4815 31.2976 18.5978 30.9907 21.4298 29.8176C24.2618 28.6446 26.6824 26.6581 28.3854 24.1093C30.0884 21.5606 30.9974 18.5641 30.9974 15.4987C30.9933 11.3895 29.359 7.44971 26.4534 4.54404C23.5477 1.63837 19.6079 0.00414169 15.4987 0ZM25.952 25.6678L23.866 25.4435C23.806 25.4362 23.7451 25.441 23.6869 25.4574C23.6286 25.4739 23.5743 25.5018 23.527 25.5394C23.4796 25.5771 23.4402 25.6238 23.4111 25.6768C23.382 25.7298 23.3637 25.7881 23.3573 25.8483C23.3509 25.9084 23.3565 25.9692 23.3739 26.0272C23.3912 26.0852 23.4199 26.1391 23.4582 26.1859C23.4966 26.2326 23.5439 26.2713 23.5973 26.2997C23.6508 26.328 23.7093 26.3454 23.7695 26.3509L25.0941 26.4917C22.4987 28.7673 19.177 30.0431 15.7256 30.09L14.3931 28.4395C14.3158 28.3496 14.2064 28.2934 14.0883 28.2828C13.9702 28.2721 13.8526 28.3079 13.7604 28.3824C13.6682 28.457 13.6087 28.5646 13.5944 28.6823C13.5801 28.8 13.6122 28.9187 13.6839 29.0131L14.5287 30.0561C11.0712 29.8284 7.80873 28.3729 5.32964 25.952L5.55388 23.866C5.5604 23.8064 5.55511 23.7461 5.53833 23.6886C5.52154 23.6311 5.49359 23.5774 5.45606 23.5307C5.41852 23.4839 5.37215 23.4451 5.31959 23.4162C5.26703 23.3874 5.20931 23.3693 5.14973 23.3628C5.09003 23.3555 5.02948 23.3603 4.97166 23.3768C4.91383 23.3933 4.85989 23.4212 4.813 23.4589C4.76611 23.4965 4.72723 23.5432 4.69863 23.5961C4.67004 23.649 4.65231 23.7071 4.64649 23.7669L4.50568 25.0941C2.23102 22.4938 0.958794 19.1671 0.91783 15.7125L2.56835 14.3801C2.65224 14.3011 2.70314 14.1933 2.71083 14.0783C2.71852 13.9634 2.68243 13.8497 2.60981 13.7603C2.53718 13.6708 2.43341 13.6122 2.31931 13.5961C2.20521 13.58 2.08925 13.6076 1.99471 13.6735L0.951727 14.5183C1.17905 11.0658 2.63062 7.8076 5.04543 5.32963L7.15486 5.5643H7.2044C7.32127 5.56452 7.43376 5.51988 7.51869 5.4396C7.60362 5.35931 7.65451 5.2495 7.66086 5.13281C7.66722 5.01611 7.62855 4.90142 7.55284 4.81239C7.47713 4.72336 7.37014 4.66678 7.25394 4.6543L5.92675 4.5135C8.51988 2.24121 11.8374 0.966519 15.2849 0.917823L16.6173 2.56834C16.6598 2.62152 16.7138 2.66438 16.7752 2.69374C16.8366 2.72309 16.9038 2.73816 16.9719 2.73783C17.0578 2.73728 17.1418 2.71251 17.2143 2.66634C17.2867 2.62018 17.3446 2.5545 17.3814 2.47687C17.4182 2.39924 17.4323 2.3128 17.4221 2.2275C17.412 2.1422 17.3779 2.06151 17.3239 1.9947L16.4817 0.95172C19.9334 1.17943 23.1906 2.63098 25.6678 5.04542L25.4331 7.15485C25.4266 7.21443 25.4319 7.27471 25.4486 7.33225C25.4654 7.38979 25.4934 7.44346 25.5309 7.4902C25.5685 7.53693 25.6148 7.57581 25.6674 7.60462C25.7199 7.63342 25.7777 7.65159 25.8373 7.65809H25.8868C25.9991 7.65754 26.1073 7.61584 26.1909 7.54087C26.2745 7.46591 26.3277 7.36289 26.3405 7.25133L26.4813 5.92413C28.7568 8.51961 30.0326 11.8413 30.0796 15.2927L28.4291 16.6251C28.3804 16.6621 28.3396 16.7084 28.3092 16.7614C28.2788 16.8144 28.2593 16.873 28.252 16.9336C28.2446 16.9943 28.2495 17.0558 28.2664 17.1145C28.2833 17.1733 28.3118 17.228 28.3502 17.2755C28.3886 17.323 28.4362 17.3623 28.4901 17.3911C28.544 17.4199 28.6031 17.4375 28.664 17.443C28.7248 17.4485 28.7862 17.4417 28.8444 17.423C28.9026 17.4044 28.9564 17.3742 29.0027 17.3343L30.0457 16.4895C29.8159 19.9384 28.3645 23.1925 25.952 25.6678Z"
      fill={color}
    />
    <path
      d="M15.4987 5.29053C13.4797 5.29053 11.5061 5.88923 9.82735 7.01092C8.14862 8.1326 6.84022 9.7269 6.06758 11.5922C5.29495 13.4575 5.09279 15.51 5.48668 17.4902C5.88056 19.4704 6.8528 21.2893 8.28044 22.717C9.70808 24.1446 11.527 25.1168 13.5072 25.5107C15.4874 25.9046 17.5399 25.7025 19.4052 24.9298C21.2705 24.1572 22.8648 22.8488 23.9865 21.1701C25.1082 19.4913 25.7069 17.5177 25.7069 15.4987C25.7041 12.7922 24.6277 10.1973 22.7139 8.28348C20.8001 6.36968 18.2052 5.29329 15.4987 5.29053ZM15.4987 24.7943C13.6602 24.7943 11.863 24.2491 10.3344 23.2277C8.80572 22.2063 7.61428 20.7545 6.91072 19.056C6.20716 17.3574 6.02308 15.4884 6.38175 13.6852C6.74042 11.8821 7.62574 10.2258 8.92575 8.92574C10.2258 7.62574 11.8821 6.74042 13.6852 6.38175C15.4884 6.02308 17.3574 6.20716 19.056 6.91072C20.7545 7.61428 22.2063 8.80571 23.2277 10.3344C24.2491 11.863 24.7943 13.6602 24.7943 15.4987C24.7915 17.9632 23.8113 20.326 22.0686 22.0686C20.326 23.8113 17.9632 24.7915 15.4987 24.7943Z"
      fill={color}
    />
    <path
      d="M15.4987 7.21484C13.8603 7.21484 12.2587 7.70068 10.8964 8.61093C9.53417 9.52117 8.47241 10.8149 7.84542 12.3286C7.21843 13.8423 7.05438 15.5079 7.37402 17.1148C7.69365 18.7217 8.48262 20.1978 9.64114 21.3563C10.7997 22.5148 12.2757 23.3038 13.8826 23.6234C15.4895 23.9431 17.1551 23.779 18.6688 23.152C20.1825 22.525 21.4763 21.4633 22.3865 20.101C23.2968 18.7387 23.7826 17.1371 23.7826 15.4987C23.7805 13.3023 22.9071 11.1965 21.354 9.64342C19.8009 8.09034 17.6951 7.21691 15.4987 7.21484ZM21.5245 11.2616L20.7606 12.2785L17.3917 12.8913L16.9328 9.50158L17.6707 8.4586C19.2291 8.94279 20.5839 9.92817 21.5245 11.2616ZM22.7996 14.4062L21.7566 14.0855C21.6472 14.0514 21.529 14.0598 21.4255 14.1089L18.7059 15.4127C18.689 14.7893 18.4895 14.1846 18.1322 13.6735L21.1021 13.152C21.2155 13.1317 21.3171 13.0693 21.3863 12.9773L22.0356 12.109C22.4157 12.8272 22.6738 13.6035 22.7996 14.4062ZM15.4987 17.7959C15.0463 17.7959 14.604 17.6618 14.2276 17.4106C13.8513 17.1594 13.5579 16.8023 13.3844 16.3844C13.2109 15.9666 13.1651 15.5067 13.2528 15.0628C13.3405 14.6189 13.5578 14.211 13.8772 13.8905C14.1966 13.57 14.6037 13.3514 15.0473 13.2621C15.4909 13.1729 15.951 13.2172 16.3694 13.3892C16.7879 13.5613 17.146 13.8535 17.3984 14.229C17.6509 14.6044 17.7865 15.0463 17.7881 15.4987C17.7874 16.1057 17.546 16.6876 17.1168 17.1168C16.6876 17.546 16.1057 17.7874 15.4987 17.7881V17.7959ZM8.96184 12.109L9.6137 12.9799C9.68164 13.0722 9.78248 13.1347 9.89531 13.1546L12.8652 13.6735C12.5126 14.1843 12.3168 14.787 12.302 15.4075L9.58241 14.1037C9.47523 14.0536 9.35276 14.047 9.24084 14.0855L8.19786 14.4062C8.32362 13.6035 8.58179 12.8272 8.96184 12.109ZM16.7138 8.22914L16.0854 9.11828C16.019 9.21314 15.9901 9.32931 16.0046 9.44422L16.4087 12.4324C15.8138 12.251 15.1784 12.251 14.5835 12.4324L14.9877 9.44422C15.0034 9.32923 14.9745 9.21259 14.9068 9.11828L14.2784 8.22914C15.0828 8.09338 15.9042 8.09338 16.7086 8.22914H16.7138ZM13.3241 8.45338L14.062 9.49636L13.6057 12.8913L10.2369 12.2785L9.4729 11.2616C10.4136 9.92817 11.7684 8.94279 13.3267 8.4586L13.3241 8.45338ZM8.13006 15.3866L9.34774 15.0085L12.435 16.4948L10.8053 19.509L9.60588 19.9314C8.64164 18.6552 8.12232 17.0982 8.12746 15.4987C8.12746 15.4622 8.13006 15.4231 8.13006 15.3866ZM10.2473 20.6641L11.2747 20.3147C11.3854 20.2789 11.4786 20.2025 11.5354 20.1009L12.9669 17.4413C13.3438 17.9336 13.8556 18.3059 14.4401 18.5129L12.3541 20.6954C12.2744 20.7791 12.2296 20.8901 12.229 21.0057L12.2133 22.0904C11.4836 21.727 10.8192 21.2451 10.2473 20.6641ZM13.1155 22.471L13.1338 21.196L15.4987 18.7215L17.8637 21.196L17.8819 22.471C16.3376 23.0029 14.6598 23.0029 13.1155 22.471ZM18.7893 22.0904L18.7737 21.0057C18.773 20.8901 18.7283 20.7791 18.6485 20.6954L16.5626 18.5129C17.147 18.3059 17.6588 17.9336 18.0358 17.4413L19.4673 20.1009C19.5241 20.2025 19.6172 20.2789 19.728 20.3147L20.7553 20.6641C20.1835 21.2451 19.5191 21.727 18.7893 22.0904ZM21.3968 19.9184L20.1921 19.509L18.5625 16.4948L21.6497 15.0085L22.8674 15.3866C22.8674 15.4257 22.8674 15.4622 22.8674 15.4987C22.8729 17.0974 22.3555 18.654 21.3942 19.9314L21.3968 19.9184Z"
      fill={color}
    />
  </svg>
)

TiresIcon.defaultProps = {
  width: '31',
  height: '31',
  color: 'white',
}
export default TiresIcon
