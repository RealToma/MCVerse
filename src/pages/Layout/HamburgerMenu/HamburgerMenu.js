import React from 'react'

import { NavLink } from 'react-router-dom'

import './HamburgerMenu.css'
import { menus } from '../menus'

const HamburgerMenu = ({ handleClickMenu }) => {
  return (
    <>
      {menus.map((menu) => (
        <React.Fragment key={menu.id}>
          {menu.isDisable ? (
            <div>
              {menu.isSubMenu ? (
                <div className="flex items-center py-4 cursor-not-allowed pl-14 group opacity-40">
                  {menu.icon}
                  <div className={`text-white group-hover:animate-bounce leading-3 font-bold text-[11px] tracking-[1px] uppercase ml-4`}>
                    {menu.id}
                  </div>
                </div>
              ) : (
                <>
                  <div className="h-px w-full bg-gradient-to-r from-[rgba(85,211,255,0.84)] to-[rgba(120,220,255,0)]"></div>
                  <div className="flex items-center py-4 pl-6 cursor-not-allowed group opacity-40">
                    {menu.icon}
                    <div className={`text-white group-hover:animate-bounce leading-3 font-bold text-xs tracking-[1px] uppercase ml-4`}>
                      {menu.id}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <NavLink to={menu.name} onClick={() => handleClickMenu()} key={menu.id}>
              {({ isActive }) => (
                <>
                  {menu.isSubMenu ? (
                    <div className="flex items-center py-4 cursor-pointer pl-14 group">
                      {isActive ? menu.iconActive : menu.icon}
                      <div
                        className={`${
                          isActive ? 'text-cyan-200' : 'text-white group-hover:animate-bounce'
                        } leading-3 font-bold text-[11px] tracking-[1px] uppercase ml-4`}
                      >
                        {menu.id}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="h-px w-full bg-gradient-to-r from-[rgba(85,211,255,0.84)] to-[rgba(120,220,255,0)]"></div>
                      <div className="flex items-center py-4 pl-6 cursor-pointer group">
                        {isActive ? menu.iconActive : menu.icon}
                        <div
                          className={`${
                            isActive ? 'text-amber-600' : 'text-white group-hover:animate-bounce'
                          } leading-3 font-bold text-xs tracking-[1px] uppercase ml-4`}
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
    </>
  )
}

export default HamburgerMenu
