import React from 'react'
import Navbar from '../component/Navbar'
import Footerpage from '../component/Footer'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
      <Footerpage/>
    </div>
  )
}

export default Layout
