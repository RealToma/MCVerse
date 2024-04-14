const InventoryIcon = ({ width, height, color }) => (
  <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      d="M502 0h-40c-5.522 0-10 4.478-10 10v72h-25V26c0-5.522-4.478-10-10-10H287c-5.522 0-10 4.478-10 10v16h-76V10c0-5.522-4.477-10-10-10H90c-5.523 0-10 4.478-10 10v72H60V10c0-5.522-4.477-10-10-10H10C4.477 0 0 4.478 0 10v492c0 5.522 4.477 10 10 10h40c5.523 0 10-4.478 10-10v-30h392v30c0 5.522 4.478 10 10 10h40c5.522 0 10-4.478 10-10V10c0-5.522-4.478-10-10-10zM40 492H20V20h20v472zM297 52V36h110v46H297V52zm-96 10h76v20h-76V62zM100 20h81v21h-81V20zm0 41h81v21h-81V61zm352 391H60v-20h392v20zm-330-80h-22v-30h92v70h-92v-20h22c5.51 0 10-4.49 10-10s-4.49-10-10-10zm90 40v-20h70v20h-70zm90 0v-46h110v46H302zm150 0h-20v-56c0-5.522-4.478-10-10-10H292c-5.522 0-10 4.478-10 10v16h-70v-40c0-5.522-4.477-10-10-10H90c-5.523 0-10 4.478-10 10v80H60V302h392v110zm0-130H60v-20h392v20zm-352-40v-60h92v60h-92zm112 0v-20h80v20h-80zm140 0v-46h60v46h-60zm100 0h-20v-56c0-5.522-4.478-10-10-10h-80c-5.522 0-10 4.478-10 10v56h-20v-30c0-5.522-4.478-10-10-10h-90v-30c0-5.522-4.477-10-10-10H90c-5.523 0-10 4.478-10 10v70H60V142h392v100zm0-120H60v-20h392v20zm40 370h-20V20h20v472z"
      fill={color}
    />
    <path d="M162 372c-5.51 0-10 4.49-10 10s4.49 10 10 10 10-4.49 10-10-4.49-10-10-10z" fill={color} />
  </svg>
)

InventoryIcon.defaultProps = {
  width: '17',
  height: '17',
  color: 'white',
}

export default InventoryIcon
