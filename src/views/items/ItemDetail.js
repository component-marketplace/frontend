import React, { useState } from 'react';
import styled from 'styled-components';
import { useItemDetailContext } from '../../contexts/ItemDetailContext';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';

const ItemDetail = styled((props) => {
  const { className } = props;
  const { item, components, refetch } = useItemDetailContext();
  const [componentDetail, setComponentDetail] = useState();
  const [newComponentOpen, setNewComponentOpen] = useState();
  const [newSaleOpen, setNewSaleOpen] = useState();

  const deleteItemComponent = async(id) => {
    await fetch(`http://localhost:4000/v1/item_components/${id}`, {method: 'delete'});
    setComponentDetail();
    refetch();
  }

  return(
    <div className={className}>
      <div style={{width: '65%'}}>
        <div style={{textAlign: 'left'}}>
          <Link to='/items'>{'<-'} All Items</Link>
        </div>
        <h1>{item?.name}</h1>
        <h2>Inventory: {item?.stock_quantity}</h2>
        <h2>Buffer: {item?.fg_buffer}</h2>
        <div className='component-container'>
          <div className='add-new' onClick={() => setNewComponentOpen(true)}>+ Add New</div>
          {components?.map(component => {
            const isSelected = componentDetail?.id === component.id;
            return (
              <div key={component.id} className='component-card' data-active={isSelected} onClick={() => setComponentDetail(isSelected ? null : component)}>
                <h3>{component.name}</h3>
                <div style={{width: '100%'}}>Inventory: {component.stock_quantity}</div>
              </div>
            );
          })}
        </div>
        {componentDetail &&
          <div style={{border: '3px solid #89CFF0', margin: '20px'}}>
            <div style={{cursor: 'pointer'}} onClick={() => deleteItemComponent(componentDetail.id)}>Delete</div>
            <h2>{componentDetail.name}</h2>
            <div>{componentDetail.description}</div>
            <div>Inventory: {componentDetail.stock_quantity}</div>
          </div>
        }
        <div>
          <h2>Sales</h2>
          <button style={{marginBottom: '50px'}} onClick={() => setNewSaleOpen(true)}>Issue Sale</button>
          <div className='sales-container'>
            {item?.sales?.map(receipt => {
              const date = new Date(receipt.created_at)
              const formattedDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
              return(
                <div className='receipt'>
                  <div>{formattedDate}</div>
                  <div>Quantity: {receipt.quantity}</div>
                  <div>Price / Item: ${receipt.price}</div>
                  <div>Revenue: ${receipt.price * receipt.quantity}</div>
                  <div>Cost / Item: ${receipt.cost_to_build}</div>
                  <div>Gross Profit: ${((receipt.price - receipt.cost_to_build) * receipt.quantity).toFixed(2)}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='actions-container'>
        <div className='actions-menu'>
          <div style={{backgroundColor: 'white'}}>Item Info</div>
          {/* <div>Incoming Components</div>
          <div>Sales</div>
          <div>Statistics</div> */}
        </div>
        <div className='content'>
          <div>Price: ${item.price}</div>
          <div>Cost to build: ${item.costToBuild}</div>
          <div className='profit'>Profit: ${item.profit}</div>
          <h2>Charts</h2>
        </div>
      </div>
      <NewComponentForm itemId={item?.id} open={Boolean(newComponentOpen)} handleClose={() => setNewComponentOpen(false)} />
      <NewSaleForm itemId={item?.id} open={Boolean(newSaleOpen)} handleClose={() => setNewSaleOpen(false)} />
    </div>
  )
})`
  width: 100%;
  padding: 50px;
  display: flex;
  box-sizing: border-box;

  .sales-container {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    width: 100%;

    .receipt {
      cursor: pointer;
      border-radius: 5px;
      padding: 20px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
  }

  .component-container {
    width: 500px;
    display: flex;
    flex-wrap: nowrap;
    gap: 50px;
    box-sizing: border-box;
    overflow-x: auto;
    margin: auto;

    .add-new {
      background-color: white;
      border: 3px solid pink;
      padding: 25px;
      border-radius: 5px;
      cursor: pointer;
    }

    .component-card {
      background-color: pink;
      padding: 25px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-wrap: wrap;

      &[data-active="true"]{
        border: 3px solid #89CFF0;
        background-color: white;
      }
    }
  }

  .actions-container {
    margin: 50px 0; 
    border: 3px solid pink; 
    width: 35%;
    border-radius: 5px;

    .actions-menu {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      background-color: pink;

      > * {
        background-color: pink;
        padding: 10px;
        flex: 0 0 1;
        border-top-right-radius: 5px;
      }
    }

    .content {
      padding: 20px 40px;

      div {
        text-align: left;
        font-size: 26px;
        font-weight: bold;
        margin: 20px 0;
      }

      .profit {
        padding-top: 10px;
        border-top: 1px solid black;
      }
    }
  }
`;

export default ItemDetail;

const NewComponentForm = styled((props) => {
  const { className, handleClose, open, itemId } = props;
  const { refetch } = useItemDetailContext();
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const createItemComponent = async() => {
    await fetch(`http://localhost:4000/v1/item_components?item_id=${itemId}&name=${name}&description=${description}`, {method: 'post'});
    refetch();
    handleClose();
  }

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
        <button onClick={() => createItemComponent()}>Submit</button>
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

const NewSaleForm = styled((props) => {
  const { className, handleClose, open, itemId } = props;
  const { refetch } = useItemDetailContext();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const createItemComponent = async() => {
    await fetch(`http://localhost:4000/v1/sale_receipts?item_id=${itemId}&price=${price}&organization_id=1&quantity=${quantity}`, {method: 'post'});
    refetch();
    handleClose();
  }

  return(
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <div className={className}>
        <div>Quantity:</div>
        <input onChange={(e) => setQuantity(e.target.value)} type='text' />
        <div>Price:</div>
        <input onChange={(e) => setPrice(e.target.value)} type='text' />
        <button onClick={() => createItemComponent()}>Submit</button>
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
