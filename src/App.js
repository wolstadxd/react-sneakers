import React, { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import 'macro-css'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";


function App() {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData () {
            setIsLoading(true)
            const cartResponse = await axios.get('https://63c6ed58d307b7696743f513.mockapi.io/cart')
            const favoritesResponse = await axios.get('https://635c2bbafc2595be26422339.mockapi.io/favorites')
            const itemsResponse = await axios.get('https://63c6ed58d307b7696743f513.mockapi.io/items')

            setIsLoading(false)

            setCartItems(cartResponse.data)
            setFavorites(favoritesResponse.data)
            setItems(itemsResponse.data)
        }
        fetchData()
    }, [])

    const onAddToCart = (obj) => {
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                axios.delete(`https://63c6ed58d307b7696743f513.mockapi.io/cart/${obj.id}`)
                setCartItems(prevState => prevState.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                axios.post('https://63c6ed58d307b7696743f513.mockapi.io/cart', obj)
                setCartItems(prevState => [...prevState, obj])
            }
        } catch (error) {
            alert(error)
        }
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://63c6ed58d307b7696743f513.mockapi.io/cart/${id}`)
        setCartItems(prevState => prevState.filter(item => item.id !== id))
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
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.id) === Number(id))
    }

    return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
        <div className={'wrapper'}>

            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem}/>}

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
            </Routes>

        </div>
    </AppContext.Provider>
  )
}

export default App;
