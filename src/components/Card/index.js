import styles from './Card.module.scss'
import {useContext, useState} from "react";
import ContentLoader from 'react-content-loader'
import AppContext from "../../context";


function Card ({id, title, price, imageUrl, onFavorite, onPlus,
                   favorited= false,
                   loading = false}) {
    const {isItemAdded} = useContext(AppContext)
    const [isFavorite, setIsFavorite] = useState(favorited)

    const onClickPlus = () => {
        onPlus({id, parentId: id, title, price, imageUrl})
    }

    const onClickFavorite = () => {
        onFavorite({id, title, price, imageUrl})
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={180}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
                    <rect x="0" y="125" rx="5" ry="5" width="100" height="15" />
                    <rect x="0" y="162" rx="5" ry="5" width="80" height="25" />
                    <rect x="118" y="154" rx="5" ry="5" width="32" height="32" />
                    <rect x="0" y="106" rx="5" ry="5" width="150" height="15" />
                </ContentLoader> :
                    <>
                        {onFavorite && (<div className={styles.favorite} onClick={onClickFavorite}>
                            <img src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt="Unliked"/>
                        </div>)}
                    <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
                    <h5>{title}</h5>
                    <div className={'d-flex justify-between align-center'}>
                        <div className={'d-flex flex-column'}>
                            <span>Цена:</span>
                            <b>{price} UAH</b>
                        </div>
                        {onPlus && <img
                            className={styles.plus}
                            onClick={onClickPlus}
                            src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                            alt="Plus"/>
                        }
                    </div>
                </>
            }

        </div>
    )
}

export default Card
