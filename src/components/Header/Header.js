import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ValidationSearch from '../ValidationSearch/ValidationSearch.js';
import './Header.css';

function Header(props) {
  const [value, setValue] = useState('');
  const [selectValue, setSelectValue] = useState({categories: 'all', sort: 'relevance'});

  const [error, setError] = useState(true);
  const [formValid, setFormValid] = useState(false);
  
  //Смотрит есть ли в строке поиска поисковое слово, если нет то выдает ошибку
  useEffect(() => {
    if (error === true) {
        setFormValid(false);
    } else {
        setFormValid(true);
    }
}, [error]);

  // Управление инпутами
  function handleChangeValue(e) {
    setValue(e.target.value);
    ValidationSearch(e, setError);
  };

  //Управление select
  function handleChangeSelectValue(e) {
    const name=e.target.name;
    setSelectValue((old) => ({
      ...old,
      [name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('search', value);
    localStorage.setItem('sort', selectValue.sort);
    localStorage.setItem('categories', selectValue.categories);
    props.onSearch(value, selectValue.sort, selectValue.categories);
  };

  return (
    <header className="header">
        
        <Link className='link' to='/'><h1 className='text text_white header__title'>Search for books</h1></Link>
        <form className="form" onSubmit={handleSubmit}>
          <div className='search'>
              <input className='search__input' type='text' placeholder='Search'onChange={handleChangeValue} value={value} required/>
              <button className='search__button text text_white' type='submit' disabled={!formValid}>Search</button>
          </div>
          <div className='search__categories'>
            <label for='categories' className='text text_white header__label'>Categories</label>
            <select id='categories' name='categories' className='header__select' value={selectValue.categories} onChange={handleChangeSelectValue}>
                <option>all</option>
                <option>art</option>
                <option>biography</option>
                <option>computers</option>
                <option>history</option>
                <option>medical</option>
                <option>poetry</option>
            </select>
            <label for='sort' className='text text_white header__label'>Sorting by</label>
            <select id='sort' name='sort' className='header__select' value={selectValue.sort} onChange={handleChangeSelectValue}>
              <option>relevance</option>
              <option>newest</option>
            </select>
          </div>          
        </form>
    </header>
  );
}

export default Header;
