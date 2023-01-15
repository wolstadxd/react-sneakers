import React from "react";

function Header () {
    return (
        <header className={'d-flex justify-between align-center'}>
            <div className={'headerLeft d-flex align-center'}>
                <img width={40} height={40} src='/img/logo.png' alt={'logo'}/>
                <div className={'headerInfo'}>
                    <h3 className={'text-uppercase'}>React Sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className={'headerRight d-flex'}>
                <li className={'mr-30'}>
                    <img className={'mr-10'} width={18} height={18} src='/img/cart.svg' alt={'cart'}/>
                    <span>1205 грн.</span>
                </li>
                <li>
                    <img width={18} height={18} src='/img/user.svg' alt={'user'}/>
                </li>
            </ul>
        </header>
    )
}

export default Header
