import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image, Button, Table, TableBody, TableCell, TableCellLayout, TableHeader, TableHeaderCell, TableRow } from '@fluentui/react-components';
import { TextField } from '@fluentui/react';
import { Delete20Regular } from '@fluentui/react-icons';
import { cartCount, cartData } from "@/redux/actions/cartController";
import { columns } from '../../Constants/constant';
import classes from './CartModalCard.module.css'


const totalQuantity = (cartDetails) => {
    return cartDetails.reduce((accumulator, item) => {
        return accumulator + Number(item.quantity)
    }, 0)
}

const CartModalCard = ({setCartModal, isMobile}) => {
    const dispatch = useDispatch();
    const cartReduxData = useSelector((state) => state.cartData);
    const [ freezeQuantity, setFreezeQuantity] = useState(false)

    const totalSum = cartReduxData.reduce((accumulator, item) => {
        return accumulator + parseFloat(item.price.replace('₹','')) * item.quantity
    }, 0)

    console.log(cartReduxData)

    const handleQuantityChange = (e, cartItem) => {
        let newQuantity = Number(e.target.value)
        if(newQuantity<1) newQuantity = 1

        const updateCart = cartReduxData.map((cart) => {
            return cart.devicecatalogid === cartItem.devicecatalogid ? { ...cart, quantity: newQuantity } : cart
        })

        dispatch(cartData(updateCart))
        const totalCount = totalQuantity(updateCart)
        console.log(totalCount)
        dispatch(cartCount(totalCount))
    }

    const handleItemDelete = (cartItem) => {
        const filterData = cartReduxData.filter(
            (item) => item.devicecatalogid !== cartItem.devicecatalogid,
        )
        dispatch(cartData(filterData))
        const totalCount = totalQuantity(filterData)
        dispatch(cartCount(totalCount))
        if(totalCount<1) setCartModal(false)
    }

    const handleCheckout = () => {
        console.log('handleCheckout')
        setFreezeQuantity(true)

        setTimeout(() => {
            setFreezeQuantity(false)
        }, 2000);
    }

  return (
    <div className={classes.cartContainer}>
        <h2 className={classes.ModalTitle}> Cart Item </h2>
        { isMobile ?
            <> 
             {cartReduxData.map((cartItem, index) => {
               return(          
                <div>
                    <hr />
                    <div>
                        <Image
                            src={cartItem.images[0].blobURI}
                            alt={cartItem.images[0].altText}
                            className={classes.tableMobileImage}
                        />
                        <Button
                            icon={<Delete20Regular />}
                            aria-label="Delete"
                            title="Delete"
                            className={classes.modalDeleteButton}
                            onClick={() => handleItemDelete(cartItem)}
                        />  
                    </div>
                    <h3> {cartItem.devicesku} </h3>
                    <h2> {cartItem.price} </h2>
                    <div>
                        {freezeQuantity ? (
                                <> {cartItem.quantity} </>
                        ) : (
                            <TextField
                                type='number'
                                min={1}
                                max={20}
                                defaultValue={String(cartItem.quantity)}
                                className={classes.modalQuantity}
                                onChange={(e) => handleQuantityChange(e, cartItem)}
                            />
                        )} 
                    </div>
                    <p>  
                        ₹{(parseFloat(cartItem.price.replace('₹','')) * cartItem.quantity).toFixed(2)}  
                    </p>
                </div>
               )
             })}
                
                <hr/ > 
                <p className={classes.mobileTotalAmount} > 
                    Total: ₹ 
                    <span> {totalSum.toFixed(2)} </span> 
                </p>
            </>
            :
            <>  
                <hr />
                <Table className={classes.tableContainer} aria-label='Cart Table' >
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => {
                                return(
                                    <TableHeaderCell key={column.key} className={classes.tableHeader}> {column.label} </TableHeaderCell>
                                )
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cartReduxData.map((cartItem, index) => (
                            <TableRow key={index}>
                                <TableCell tabIndex={0} role='gridcell'>
                                    <TableCellLayout>
                                        <Image
                                            src={cartItem.images[0].blobURI}
                                            alt={cartItem.images[0].altText}
                                            className={classes.tableImage}
                                        />
                                    </TableCellLayout>
                                </TableCell>
                                <TableCell tabIndex={0} role='gridcell'>
                                    {cartItem.devicesku}
                                </TableCell>
                                <TableCell tabIndex={0} role='gridcell'>
                                    {cartItem.price}
                                </TableCell>
                                <TableCell tabIndex={0} role='gridcell'>
                                    {freezeQuantity ? (
                                        <> {cartItem.quantity} </>
                                    ) : (
                                        <TextField
                                            type='number'
                                            min={1}
                                            max={20}
                                            defaultValue={String(cartItem.quantity)}
                                            className={classes.modalQuantity}
                                            onChange={(e) => handleQuantityChange(e, cartItem)}
                                        />
                                    )}                            
                                </TableCell>
                                <TableCell tabIndex={0} role='gridcell'>
                                    ₹{(parseFloat(cartItem.price.replace('₹','')) * cartItem.quantity).toFixed(2)}                          
                                </TableCell>
                                <TableCell tabIndex={0} role='gridcell'>
                                    <Button
                                        icon={<Delete20Regular />}
                                        aria-label="Delete"
                                        title="Delete"
                                        className={classes.modalDeleteButton}
                                        onClick={() => handleItemDelete(cartItem)}
                                    />                       
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className={classes.borderBottomNone}>
                            <TableCell> </TableCell>
                            <TableCell />
                            <TableCell />
                            <TableCell > <hr/ > Total: </TableCell>
                            <TableCell > <hr/ > ₹{totalSum.toFixed(2)} </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </>
        }
        <div className={classes.checkoutButtonContainer}>
            <Button 
                className={classes.checkoutButton} 
                title='Checkout' 
                disabled={!cartData || cartData.length<=0} 
                onClick={handleCheckout}
            >
                Checkout
            </Button>
        </div>
    </div>

  )
}

export default CartModalCard