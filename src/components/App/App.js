import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import BookPage from '../BookPage/BookPage';
import Preloader from '../Preloader/Preloader';
import bookApi from '../../utils/bookApi';

function App() {
  const [bookList, setBookList] = useState([]); // Массив найденных книг
  const [totalItems, setTotalItems] = useState(0); // Кол-во найденных книг
  const [isLoading, setIsLoading] = useState(false); // Переключатель для индикатора загрузки

  useEffect(() => {
    localStorage.clear();
  }, []);
  // Нажатие кнопки Search
  const handleSearchClick = (searchword, orderBy, categories) => { 
    setIsLoading(true);   
    bookApi(searchword, orderBy, categories)
      .then((list) => {
        localStorage.setItem('list', JSON.stringify(list.items));
        setBookList(list.items);
        setTotalItems(list.totalItems);
      })
      .catch( err => {
        console.log('Произошла ошибка');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  // Нажатие кнопки More
  const handleMoreClick=(index) => {
    setIsLoading(true); 
    const startIndex=index*30+1;
    bookApi(localStorage.getItem('search'), localStorage.getItem('sort'), localStorage.getItem('categories'), startIndex)
    .then((list) => {
      const newList = JSON.parse(localStorage.getItem('list')).concat(list.items);
      setBookList(newList);
      localStorage.setItem('list', JSON.stringify(newList));
    })
    .catch( err => {
      console.log('Произошла ошибка');
    })
    .finally(() => {
      setIsLoading(false);
    });
  }


  return (
    <div className="App">
      <Header onSearch={handleSearchClick}/>
      <Routes>
        <Route path='/' element={<Main bookList={bookList} totalItems={totalItems} onMore={handleMoreClick}/>}/>
        <Route path=':bookId' element={<BookPage/>}/>
      </Routes>   
      <Preloader  isLoading={isLoading}/> 
    </div>
  );
}

export default App;
