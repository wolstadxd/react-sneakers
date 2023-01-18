import React, {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import axios from "axios";
import 'macro-css'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";



function App() {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        axios.get('https://63c6ed58d307b7696743f513.mockapi.io/items').then(res => {
            setItems(res.data)
        })
        axios.get('https://63c6ed58d307b7696743f513.mockapi.io/cart').then(res => {
            setCartItems(res.data)
        })
        axios.get('https://635c2bbafc2595be26422339.mockapi.io/favorites').then(res => {
            setFavorites(res.data)
        })
    }, [])

    const onAddToCart = (obj) => {
        axios.post('https://63c6ed58d307b7696743f513.mockapi.io/cart', obj)
        setCartItems(prevState => [...prevState, obj])
    }

    const onRemoveItem = (id) => {
        axios.delete(`https://63c6ed58d307b7696743f513.mockapi.io/cart/${id}`)
        setCartItems(prevState => prevState.filter(item => item.id !== id))
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => favObj.id === obj.id)) {
                axios.delete(`https://635c2bbafc2595be26422339.mockapi.io/favorites/${obj.id}`)
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

    return (
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
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        // Sneakers={Sneakers}
                    />
                }
            ></Route>

            <Route path="/favorites" element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}></Route>
        </Routes>

    </div>
  )
}

export default App;
