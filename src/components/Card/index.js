import styles from './Card.module.scss'
import {useState} from "react";


function Card ({id, title, price, imageUrl, onFavorite, onPlus, favorited = false}) {
    const [isAdded, setIsAdded] = useState(false)
    const [isFavorite, setIsFavorite] = useState(favorited)

    const onClickPlus = () => {
        onPlus({title, price, imageUrl})
        setIsAdded(!isAdded)
    }

    const onClickFavorite = () => {
        onFavorite({id, title, price, imageUrl})
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorite}>
                <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Favorite"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className={'d-flex justify-between align-center'}>
                <div className={'d-flex flex-column'}>
                    <span>Цена:</span>
                    <b>{price} UAH</b>
                </div>
                    <img className={styles.plus} onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="Plus"/>
            </div>
        </div>
    )
}

export default Card
