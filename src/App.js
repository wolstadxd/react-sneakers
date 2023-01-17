import React from 'react';
import 'macro-css'
import Card from './components/Card'
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [
    {
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: 12999,
        imageUrl: '/img/sneakers/1.jpg'
    },
    {
    name: 'Мужские Кроссовки Nike Air Max 270',
        price: 15400,
        imageUrl: '/img/sneakers/2.jpg'
    },
    {
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: 8500,
        imageUrl: '/img/sneakers/3.jpg'
    },
    {
    name: 'Кроссовки Puma X Aka Boku Future Rider',
        price: 9600,
        imageUrl: '/img/sneakers/4.jpg'
    }
]


function App() {

  return (
    <div className={'wrapper'}>

      <Drawer />

      <Header />

      <div className={"content p-40"}>
        <div className={'d-flex align-center mb-40 justify-between'}>
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search"/>
            <input placeholder={'Поиск...'} />
          </div>
        </div>

        <div className="d-flex flex-wrap">

            {arr.map((obj) => (
                <Card
                    title={obj.name}
                    price={obj.price}
                    imageUrl={obj.imageUrl}
                />
            ))}

        </div>

      </div>
    </div>
  )
}

export default App;
