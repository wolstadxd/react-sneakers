import React from "react";
import {Link} from 'react-router-dom'
import {useCart} from "../hooks/useCart";

function Header (props) {

    const {totalPrice} = useCart()

    return (
        <header className={'d-flex justify-between align-center'}>
            <Link to={'/'}>
            <div className={'headerLeft d-flex align-center'}>
                <img width={40} height={40} src='/img/logo.png' alt={'logo'}/>
                <div className={'headerInfo'}>
                    <h3 className={'text-uppercase'}>React Sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            </Link>
            <ul className={'headerRight d-flex'}>
                <li className={'mr-30 align-center d-flex'}>
                    <img onClick={props.onClickCart} className={'mr-10 cu-p'} width={18} height={17} src='/img/cart.svg' alt={'Cart'}/>
                    <span>{totalPrice} грн.</span>
                </li>
                <li className={'mr-30 cu-p'}>
                    <Link to={'/favorites'}>
                        <img width={18} height={18} src='/img/heart.svg' alt={'Favorite'}/>
                    </Link>
                </li>
                <li>
                    <Link to={'/orders'}>
                        <img width={18} height={18} src='/img/user.svg' alt={'Favorite'}/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header
