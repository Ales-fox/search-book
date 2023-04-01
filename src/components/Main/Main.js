import React, { useState, useEffect }from 'react';
import Card from '../Card/Card';
import './Main.css';

function Main(props) {
    const { bookList, totalItems } = props;

    const [ index, setIndex ] = useState(0); // Показывает кол-во нажатий на кнопку Ещё
   console.log(bookList.length);

    useEffect(() => {
        props.onMore(index);
    } , [index]) // Реагирует на смену кол-ва нажатий на кнопку ещё

    return (
        <main className='main'>
            {bookList.length ? <h3 className='main__title'>{`Found ${totalItems} results`}</h3> : ''}
            <div className='main__cards'>
                {bookList.length ? bookList.map((card, index) => (
                    <Card key={card.id}
                          card={card}/>
                )) : ''}
            </div>
            {(totalItems!==0 || totalItems!==bookList.length)? <button type='button' className='buttonMore text' onClick={ () => setIndex( index + 1)}>More</button> : ''}
        </main>
    )
}

export default Main;