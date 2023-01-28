import React, {useContext, useEffect, useState} from "react";
import Card from "../components/Card";
import axios from "axios";
import AppContext from "../context";


function Orders () {
    const { onAddToFavorite} = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios('https://635c2bbafc2595be26422339.mockapi.io/orders')
                // setOrders(data.map((obj) => obj.items)).flat()
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            } catch (err) {
                alert('Ошибка при запросе заказов')
                console.log(err)
            }
        })()
    }, [])

    return (
        <div className={"content p-40"}>
            <div className={'d-flex align-center mb-40 justify-between'}>
                <h1>Мои заказы</h1>
            </div>

            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                        <Card
                            key={index}
                            {...item}
                            loading={isLoading}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Orders