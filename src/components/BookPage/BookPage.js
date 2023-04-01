import React from 'react';
import { useLocation } from "react-router-dom";
import './BookPage.css';

function BookPage(props) {
    const location = useLocation();
    const { card } = location.state;

    return (
        <main className='book'>
            <div className='book__img'>
                {card.volumeInfo.imageLinks? <img className='img' src={card.volumeInfo.imageLinks.thumbnail} alt=''/> : <p className='img img_no text'>Нет изображения</p>}
            </div>
            <div className='book__information'>
                <h4 className='book__categories text'>{card.volumeInfo.categories}</h4>
                <h3 className='book__name text'>{card.volumeInfo.title}</h3>
                <p className='book__authors text'>{card.volumeInfo.authors}</p>
                <div className='book__description'>
                    <p className='text'>{card.volumeInfo?.description}</p>
                </div>
            </div>
        </main>
    )
}

export default BookPage;