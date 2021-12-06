import React from 'react';
import placeHolderImage from '../media/logo.png'
import { Button, CircularProgress, Snackbar } from "@material-ui/core";

const navBar = () => {

  const frowBetween = {
    display: 'flex',
    flexDirection: 'row' as any,
    justifyContent: 'space-between',
  }

  const frowCenter = {
    display: 'flex',
    flexDirection: 'row' as any,
    justifyContent: 'center',
    paddingTop: '50px',
  }


  return (
    <div style={frowCenter}>
      <div style={{...frowBetween, width: '70%'}}>
        <div>
          <a href='https://dinosols.app'>
            <img src={placeHolderImage} style={{width: '30px'}}/>
          </a>  
        </div>
        <div style={{...frowBetween, width: '23%'}}>
          <Button style={{background: '#6163ff', color: 'white'}} href='https://t.co/Nb7mmxkp5O'>Discord</Button>
          <Button style={{background: '#6163ff', color: 'white'}} href='https://twitter.com/DinosolsNFT'>Twitter</Button>
        </div>

      </div>
    </div>
  )
}

export default navBar;