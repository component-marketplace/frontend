import React from 'react';
import styled from 'styled-components';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const Nav = styled((props) => {
  const { className } = props;

  return(
    <div className={className} >
      <Link to='/items'>
        <CategoryIcon style={{color: 'white'}} fontSize='large' />
      </Link>
      <Link to='/actions'>
        <PendingActionsIcon style={{color: 'white'}} fontSize='large' />
      </Link>
    </div>
  )
})`
  background-color: #89CFF0;
  width: 100px;
  height: 100vh;
  padding: 20px 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
`;

export default Nav;