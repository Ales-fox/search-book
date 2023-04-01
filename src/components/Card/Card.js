import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Card.css';

function Card(props) {
    const {card} = props;
    let { bookId } = useParams();
    bookId = card.id;

    return (
        <div className='card'>
            <Link className='card__link link' to={bookId} state={{card: card}}>
                {card.volumeInfo.imageLinks? <img className='card__img' src={card.volumeInfo.imageLinks.smallThumbnail || card.volumeInfo.imageLinks.thumbnail
                    } alt=''/> : <p className='card__img card__img_no text'>Нет изображения</p>}
            </Link>
            <h4 className='card__categories text'>{card.volumeInfo.categories}</h4>
            <h3 className='card__name text'>{card.volumeInfo.title}</h3>
            <p className='card__authors text'>{card.volumeInfo.authors}</p>
        </div>
    )
}

export default Card;