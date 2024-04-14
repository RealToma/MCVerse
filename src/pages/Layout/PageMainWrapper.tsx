import { ReactNode } from 'react'

const PageMainWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="max-w-[1500px] mx-4 md:ml-[13vw] md:mr-0 2xl:mb-4 text-white mt-8 3xl:mx-auto">{children}</div>
}

export default PageMainWrapper
