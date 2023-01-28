import React, { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import 'macro-css'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";


function App() {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData () {
            try {
                const [cartResponse, favoritesResponse, itemsResponse ] = await Promise.all([
                    await axios.get('https://63c6ed58d307b7696743f513.mockapi.io/cart'),
                    await axios.get('https://635c2bbafc2595be26422339.mockapi.io/favorites'),
                    await axios.get('https://63c6ed58d307b7696743f513.mockapi.io/items')
                ])

                setIsLoading(false)
                setCartItems(cartResponse.data)
                setFavorites(favoritesResponse.data)
                setItems(itemsResponse.data)
            } catch (error) {
                alert('Ошибка при запросе даннных')
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
            if (findItem) {
                setCartItems(prevState => prevState.filter((item) => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://63c6ed58d307b7696743f513.mockapi.io/cart/${findItem.id}`)
            } else {
                setCartItems((prevState) => [...prevState, obj])
                const { data } = await axios.post('https://63c6ed58d307b7696743f513.mockapi.io/cart', obj)
                setCartItems((prevState) => prevState.map((item) => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            alert('Не получилось добавит в корзину')
            console.log(error)
        }
    }

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://63c6ed58d307b7696743f513.mockapi.io/cart/${id}`)
            setCartItems(prevState => prevState.filter(item => Number(item.id) !== Number(id)))
        } catch (error) {
            alert('Не удалось удалить')
        }
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://635c2bbafc2595be26422339.mockapi.io/favorites/${obj.id}`)
                setFavorites(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                const { data } = await axios.post('https://635c2bbafc2595be26422339.mockapi.io/favorites', obj)
                setFavorites(prevState => [...prevState, data])
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты')
            console.log(error)
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id))
    }

    return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems, onAddToFavorite, onAddToCart}}>
        <div className={'wrapper'}>

            <div>
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}
                />
            </div>

            <Header
                onClickCart={() => setCartOpened(true)}
            />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            items={items}
                            cartItems={cartItems}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            isLoading={isLoading}
                        />
                    }
                ></Route>

                <Route path="/favorites"
                       element={
                           <Favorites />
                       }></Route>
                <Route path="/orders"
                       element={
                           <Orders />
                       }></Route>
            </Routes>

        </div>
    </AppContext.Provider>
  )
}

export default App;
