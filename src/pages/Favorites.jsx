import React, {useContext} from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Favorites () {

    const {favorites, onAddToFavorite} = useContext(AppContext)

    return (
        <div className={"content p-40"}>
            <div className={'d-flex align-center mb-40 justify-between'}>
                <h1>Мои закладки</h1>
            </div>

            <div className="d-flex flex-wrap">
                {favorites.map((item, index) => (
                        <Card
                            key={index}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Favorites