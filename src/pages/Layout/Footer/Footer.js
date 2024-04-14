import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from "react-redux";

import grantsSocialDiscord from 'assets/image/social-discord.png'
import grantsSocialInstagram from 'assets/image/social-instagram.png'
import grantsSocialTwitter from 'assets/image/social-twitter.png'
import * as Images from 'utils/helper/image.helper'

// import { setAvaxPrice } from "../../../reducers/globalInfoSlice";

const Footer = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const getAvaxPrice = async () => {
  //     try {
  //       const coinData = await fetch(
  //         "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2&vs_currencies=usd",
  //         { method: "GET" }
  //       );
  //       const coin = await coinData.json();
  //       dispatch(setAvaxPrice(coin["avalanche-2"].usd));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getAvaxPrice();

  //   setInterval(() => {
  //     getAvaxPrice();
  //   }, 300000);
  //   return () => {
  //     // clearInterval(getAvaxPriceTimer);
  //   };
  // }, [dispatch]);

  return (
    <footer className="mt-auto">
      <div className="flex justify-between">
        <div className="relative py-4 pl-2 pr-4 bg-footer-left w-72">
          <div className="relative flex items-center gap-2">
            <a
              href="https://mcverse.app"
              target={'_blank'}
              rel="noreferrer"
              className="text-[10px] text-cyan-100  tracking-[2px] uppercase text-shadow-blue"
            >
              mcverse.app
            </a>
            <div className="flex items-center gap-1">
              <a href="https://discord.gg/8vMcCx3R2K" target={'_blank'} rel="noreferrer">
                <img src={grantsSocialDiscord} alt="discord" className="w-6" />
              </a>
              <a href="https://twitter.com/TheMCVerse" target={'_blank'} rel="noreferrer">
                <img src={grantsSocialTwitter} alt="twitter" className="w-6" />
              </a>
              <a href="https://www.instagram.com/the_mcverse/" target={'_blank'} rel="noreferrer">
                <img src={grantsSocialInstagram} alt="instagram" className="w-6" />
              </a>
            </div>
          </div>
          <img src={Images.footerBorderLeft} alt="" className="absolute bottom-0 left-0" />
        </div>
        <div className="relative hidden py-4 pl-4 pr-2 bg-footer-right sm:block w-72">
          <div className="flex items-center justify-end">
            <div
              className="w-6 h-6 bg-green rounded-full border border-black"
              style={{ boxShadow: '0px 0px 5px rgba(255, 192, 0, 0.74902)' }}
            ></div>
            <div className="ml-2 uppercase ">
              <div className="text-green text-sm tracking-widest">connected</div>
              <div className="text-[#9E9E9E] text-[8px] tracking-wider">avalanche network</div>
            </div>
          </div>
          <img src={Images.footerBorderRight} alt="" className="absolute bottom-0 right-0" />
        </div>
        <div
          className="w-6 h-6 bg-green rounded-full border border-black sm:hidden ml-2 mt-2 mr-6"
          style={{ boxShadow: '0px 0px 5px rgba(255, 192, 0, 0.74902)' }}
        ></div>
      </div>
    </footer>
  )
}

export default Footer
