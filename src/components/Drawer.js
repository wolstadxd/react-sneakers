import React from "react";

function Drawer ({onClose, items = [], onRemove}) {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className={'mb-30 d-flex justify-between'}>Корзина <img onClick={onClose} className={'removeBtn cu-p'} src="/img/btn-remove.svg" alt="Remove"/>
                </h2>

                {
                    items.length > 0 ? (<div>
                        <div className="items">
                            {items.map((obj) => (
                                <div className="cartItem d-flex align-center mb-20">
                                    <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                                    <div className={'mr-20 flex'}>
                                        <p className={'mb-5'}>{obj.title}</p>
                                        <b>{obj.price} грн.</b>
                                    </div>
                                    <img onClick={() => onRemove(obj.id)} className={'removeBtn'} src="/img/btn-remove.svg" alt="Remove"/>
                                </div>
                            ))}
                        </div>
                        <div className={'cartTotalBlock flex'}>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>21 498 грн.</b>
                                </li>
                                <li className={'d-flex'}>
                                    <span>Налог 5%</span>
                                    <div></div>
                                    <b>1074 грн.</b>
                                </li>
                            </ul>
                            <button className={'greenButton'}>Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/></button>
                        </div>
                    </div>) : (<div className="cartEmpty d-flex align-center justify-center flex-column flex">
                            <img width={120} height={120} src="/img/empty-cart.jpg" alt="Empty" className="mb-20"/>
                            <h2>Корзина пустая</h2>
                            <p className={'opacity-6'}>Добавьте хотя бы одну пару кроссовок, что бы сделать заказ.</p>
                            <button onClick={onClose} className={"greenButton buttonBack"}>
                                <img src="/img/arrow.svg" alt="Arrow"/>
                                Вернуться назад
                            </button>
                        </div>)
                }
            </div>

        </div>
    )
}

export default Drawer