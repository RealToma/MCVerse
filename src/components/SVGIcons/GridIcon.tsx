import { TViewOption } from 'pages/Farms/types'

const SVGIcon = ({ className }: { className: string }) => {
  return (
    <svg className={className} width="28" height="26" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.75" width="7.58333" height="11.3043" rx="2" />
      <rect x="0.75" y="14.6956" width="7.58333" height="11.3043" rx="2" />
      <rect x="10.5" width="7.58333" height="11.3043" rx="2" />
      <rect x="10.5" y="14.6956" width="7.58333" height="11.3043" rx="2" />
      <rect x="20.25" width="7.58333" height="11.3043" rx="2" />
      <rect x="20.25" y="14.6956" width="7.58333" height="11.3043" rx="2" />
    </svg>
  )
}

export default SVGIcon
