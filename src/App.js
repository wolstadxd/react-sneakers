import React, {useEffect, useState} from 'react';
import 'macro-css'
import Card from './components/Card'
import Header from "./components/Header";
import Drawer from "./components/Drawer";



function App() {

    const [items, setItems] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [cartOpened, setCartOpened] = useState(false)

    useEffect(() => {
        fetch('https://63c6ed58d307b7696743f513.mockapi.io/items')
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                setItems(json)
            })
    }, [])

    const onAddToCart = (obj) => {
        setCartItems(prevState => [...prevState, obj])
    }
    console.log(cartItems)


    return (
    <div className={'wrapper'}>

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}

      <Header
        onClickCart={() => setCartOpened(true)}
      />

      <div className={"content p-40"}>
        <div className={'d-flex align-center mb-40 justify-between'}>
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            <input placeholder={'Поиск...'} />
          </div>
        </div>

        <div className="d-flex flex-wrap">

            {items.map((item) => (
                <Card
                    title={item.title}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onFavorite={() => console.log('Добавили в закладки')}
                    onPlus={(obj) => onAddToCart(obj)}
                />
            ))}

        </div>

      </div>
    </div>
  )
}

export default App;
