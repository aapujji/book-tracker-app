import { useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getBooksData, updateBookStatus } from '../lib/supabase';
import { statusOptions } from '../lib/data';
import Dropdown from '../ui/Dropdown';
import Review from '../ui/Review';

const BookPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [status, setStatus] = useState('');

    const getBook = useCallback(async () => {
        const bookData = await getBooksData('id', id);
        setBook(bookData.data[0]);
        setStatus(bookData.data[0].exclusive_shelf);
    }, []);

    useEffect(() => {
        getBook();
    }, [getBook]);

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
        updateBookStatus(event.target.value, book.id);
    }

    const thumbnail = book.thumbnail ?? `https://covers.openlibrary.org/b/isbn/${book.isbn13}-L.jpg`;

    return (
        <div className="book-page">
            <div className="book-page-details flex">
                <div className="flex-30">
                    <img src={thumbnail} alt={book.title} />
                    </div>
                <div className="flex-70">
                    <h1 className="book-page-heading">{book.title}</h1>
                    <h2 className="book-page-subheading">{book.author}</h2>
                    <Dropdown id="exclusive_shelf" name="exclusive_shelf" options={statusOptions} defaultValue={status} onChange={handleStatusChange} />
                </div>
            </div>
            <div className="book-page-review">
                <Review review={book.my_review} />
            </div>
        </div>
    )
}

export default BookPage;