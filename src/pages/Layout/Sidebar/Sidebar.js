import React from 'react'

import { NavLink } from 'react-router-dom'

import { menus } from '../menus'

const Sidebar = () => {
  return (
    <div className="hidden lg:block absolute top-[11vh] left-0  z-10 group">
      {menus.map((menu, index) => (
        <React.Fragment key={menu.id}>
          {menu.isDisable ? (
            <div>
              {menu.isSubMenu ? (
                <div className="items-center hidden py-4 cursor-not-allowed opacity-40 pl-14 group-hover:flex animate-menu-show">
                  {menu.icon}
                  <div className={`text-white leading-3 font-bold text-[11px] tracking-[1px] uppercase ml-4`}>{menu.id}</div>
                </div>
              ) : (
                <>
                  {index > 0 && <div className="h-px w-full bg-gradient-to-r from-[rgba(85,211,255,0.84)] to-[rgba(120,220,255,0)]"></div>}

                  <div className="flex items-center py-4 pl-6 pr-6 cursor-not-allowed opacity-40 group-hover:pr-0">
                    {menu.icon}
                    <div
                      className={`text-white leading-3 font-bold text-xs tracking-[1px] uppercase ml-4 hidden group-hover:block animate-menu-show`}
                    >
                      {menu.id}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <NavLink to={menu.name} key={menu.id}>
              {({ isActive }) => (
                <>
                  {menu.isSubMenu ? (
                    <div className="items-center hidden py-4 cursor-pointer pl-14 group-hover:flex animate-menu-show">
                      {isActive ? menu.iconActive : menu.icon}
                      <div
                        className={`${
                          isActive ? 'text-cyan-200' : 'text-white'
                        } leading-3 font-bold text-[11px] tracking-[1px] uppercase ml-4`}
                      >
                        {menu.id}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* {menu.hasSubMenu ? (
                        <div className="h-px w-full bg-gradient-to-r from-[rgba(85,211,255,0.84)] to-[rgba(120,220,255,0)] group-hover:hidden"></div>
                      ) : (
                        <div className="h-px w-full bg-gradient-to-r from-[rgba(85,211,255,0.84)] to-[rgba(120,220,255,0)]"></div>
                      )} */}
                      {index > 0 && (
                        <div className="h-px w-full bg-gradient-to-r from-[rgba(85,211,255,0.84)] to-[rgba(120,220,255,0)]"></div>
                      )}

                      <div className="flex items-center py-4 pl-6 pr-6 cursor-pointer group-hover:pr-0">
                        {isActive ? menu.iconActive : menu.icon}
                        <div
                          className={`${
                            isActive ? 'text-amber-600' : 'text-white'
                          } leading-3 font-bold text-xs tracking-[1px] uppercase ml-4 hidden group-hover:block animate-menu-show`}
                        >
                          {menu.id}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </NavLink>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default Sidebar
