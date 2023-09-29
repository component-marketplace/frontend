import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useItemsContext } from '../../contexts/ItemsContext';
import Dialog from '@mui/material/Dialog';

const Items = styled((props) => {
  const { className } = props;
  const { items } = useItemsContext();
  const [newItemOpen, setNewItemOpen] = useState();

  return(
    <div className={className}>
      <h1>Overview</h1>
      <div className='overview-container'>
        <div>You have 5 critical actions</div>
        <div>Your sales are up 10% this month</div>
        <div>There are cheaper components available for you</div>
      </div>
      <h1>Your Items</h1>
      <div className='items-container'>
        <div className='add-new' onClick={() => setNewItemOpen(true)}>+ Add New</div>
        {items?.map(item => {
          return (
            <Link to={`/items/${item.id}`} key={item.id}>
              <div className='item'>{item.name}</div>
            </Link>
          )
        })}
      </div>
      <NewItemForm open={Boolean(newItemOpen)} handleClose={() => setNewItemOpen(false)}/>
    </div>
  )
})`
  width: 100%;

  .overview-container {
    padding: 50px;
    width: 75%;
    margin: auto;
    border: 5px solid #89CFF0;
    border-radius: 5px;
    overflow-x: auto;
    display: flex;
    justify-content: space-evenly;

    > * {
      background-color: #89CFF0;
      color: white;
      padding: 50px;
      margin: 10px;
      display: flex;
      flex-wrap: wrap;
      width: 250px;
      justify-content: center;
      text-align: center;
      border-radius: 5px;
    }
  }

  .items-container {
    padding: 50px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    box-sizing: border-box;

    .add-new {
      background-color: white;
      border: 3px solid pink;
      padding: 50px;
      border-radius: 5px;
      cursor: pointer;
    }

    .item {
      background-color: pink;
      padding: 50px;
      border-radius: 5px;
    }
  }
`;

export default Items;

const NewItemForm = styled((props) => {
  const { className, handleClose, open } = props;
  const { refetch } = useItemsContext();
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const createItem = async() => {
    await fetch(`http://localhost:3000/v1/items?name=${name}&description=${description}`, {method: 'post'});
    refetch();
    handleClose();
  };

  return(
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <div className={className}>
        <div>Name:</div>
        <input onChange={(e) => setName(e.target.value)} type='text' />
        <div>Description:</div>
        <input onChange={(e) => setDescription(e.target.value)} type='textarea' />
        <button onClick={() => createItem()}>Submit</button>
      </div>
    </Dialog>
  )
})`
  padding: 50px;

  input {
    border-radius: 5px;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 15px;
    width: 100%;

    &:focus {
      outline-color: pink;
    }
  }

  button {
    padding: 5px 10px;
    text-align: center;
    background-color: pink;
    border-radius: 5px;
  }
`;
