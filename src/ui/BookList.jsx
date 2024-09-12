import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getBooks } from '../lib/supabase';

const BookList = () => {
    const from = 0;
    const to = 24;
    const [books, setBooks] = useState([]);

    const getAllBooks = useCallback(async () => {
        const booksData = await getBooks(from, to);
        console.log(booksData);
        setBooks(booksData.data);
    }, []);

    useEffect(() => {
        getAllBooks();
    }, [getAllBooks]);

    return (
        <div className="books-table">
            {books.map(book => (
                <div key={book.id} className="books-row">
                    <Link className="flex" to={`/books/${book.id}`}>
                        <div className="books-table-title">{book.title}</div>
                        <div className="books-table-author">{book.author}</div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

 export default BookList;