import { useState, useEffect } from 'react';
import { statusOptions } from '../lib/data';
import { updateBookStatus } from '../lib/supabase';
import Dropdown from './Dropdown';

const BookBannerCard = (data) => {
    const book = data.book;

    const [status, setStatus] = useState(book.exclusive_shelf);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        updateBookStatus(event.target.value, book.id);
    }

    const thumbnail = book.thumbnail ?? `https://covers.openlibrary.org/b/isbn/${book.isbn13}-M.jpg`;

    return (
        <div className="book-banner-card flex" key={book.id}>
            <div className="book-banner-image">
                {thumbnail && (<img className="book-thumbnail" src={thumbnail} alt={book.title} />)}
                {!thumbnail && (<span className="book-banner-image-default"></span>)}
            </div>
            <div className="book-banner-details">
                <h3 className="book-banner-title">{book.title}</h3>   
                <h4 className="book-banner-author">{book.author}</h4>
                {book.date_started && (<span>Started {book.date_started}</span> )}
                <Dropdown id="exclusive_shelf" name="exclusive_shelf" options={statusOptions} defaultValue={status} onChange={handleStatusChange} />
            </div>
        </div>
    )
}

 export default BookBannerCard;