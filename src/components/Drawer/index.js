import React, {useState} from "react";
import axios from "axios";
import Info from '../info'
import {useCart} from "../../hooks/useCart";

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer ({onClose, items = [], onRemove, opened}) {
    const {cartItems, setCartItems, totalPrice} = useCart()
    const [orderId, setOrderId] = useState(null)
    const [isOrderComplete, setIsOrderComplete] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post('https://635c2bbafc2595be26422339.mockapi.io/orders', {items: cartItems})
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await axios.delete('https://63c6ed58d307b7696743f513.mockapi.io/cart/' + item.id)
                await delay(1000)
            }

        } catch (err) {
            alert('Ошибка при создании заказа')
        }
        setIsLoading(false)
    }


    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className={'mb-30 d-flex justify-between'}>Корзина <img onClick={onClose} className={'removeBtn cu-p'} src="/img/btn-remove.svg" alt="Remove"/>
                </h2>

                {
                    items.length > 0 ? (<div className={'d-flex flex-column flex'}>
                        <div className="items flex">
                            {items.map((obj) => (
                                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                                    <div className={'mr-20 flex'}>
                                        <p className={'mb-5'}>{obj.title}</p>
                                        <b>{obj.price} грн.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className={'removeBtn'} src="/img/btn-remove.svg" alt="Remove"/>
                                </div>
                            ))}
                        </div>
                        <div className={'cartTotalBlock'}>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>{totalPrice} грн.</b>
                                </li>
                                <li className={'d-flex'}>
                                    <span>Налог 5%</span>
                                    <div></div>
                                    <b>{totalPrice * 0.05} грн.</b>
                                </li>
                            </ul>
                            <button disabled={isLoading} onClick={onClickOrder} className={'greenButton'}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
                        </div>
                    </div>) : (
                        <Info title={isOrderComplete ? 'Заказ формлен!' : 'Корзина пустая'} description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, что бы сделать заказ.'} image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'} />
                    )
                }
            </div>

        </div>
    )
}

export default Drawer