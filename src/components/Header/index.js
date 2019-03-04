import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import './Header.css'

const Header = () => {
  return(
    <div>
    <AppBar position="static">
      <Toolbar className='header-bar'>
        <Typography variant="title" color="inherit">
          <i className='header-text' >Statistics!</i>
        </Typography>
      </Toolbar>
    </AppBar>
    </div>
  )
}
export default Header;
