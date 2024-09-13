import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { getBooks, searchBooks } from '../lib/supabase';
import TextInput from './TextInput';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ITEMS_PER_PAGE = 24;

const BookList = () => {
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const getAllBooks = useCallback(async () => {
        const from = page * ITEMS_PER_PAGE;
        const to = from + ITEMS_PER_PAGE;
        const booksData = await getBooks(from, to);
        // console.log(booksData);
        setBooks(booksData.data);
    }, [page]);

    const getQueryBooks = useCallback(async () => {
        const queryStrings = query.split(/ /g);
        let searchQuery = '';
        queryStrings.map((str,index) => {
            searchQuery += `'${str}'`;
            if (index !== queryStrings.length-1) {
                searchQuery += ` | `;
            }
        });
        const booksData = await searchBooks(searchQuery);
        if (booksData.data) setBooks(booksData.data);
    }, [query]);

    useEffect(() => {
        if (query) getQueryBooks();
        else {
            getAllBooks();
        }
    }, [page, query, getQueryBooks, getAllBooks]);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    }

    const handleNext = () => {
        setPage(page+1);
    }

    const handleBack = () => {
        setPage(page-1);
    }

    return (
        <div className="books-table">
            <div className="filters">
                <div className="table-search">
                    <TextInput label="Search" id="search" className="search-field" onChange={handleInputChange} value={query} />
                </div>
                <div className="pagination">
                    {page !== 0 && (
                        <button type="button" onClick={handleBack}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    )}
                    <button type="button" onClick={handleNext}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
            <div className="header-row flex">
                <div className="header-col title">Title</div>
                <div className="header-col author">Author</div>
                <div className="header-col bookshelves">Bookshelves</div>
                <div className="header-col actions"></div>
            </div>
            {books.map(book => (
                <div key={book.id} className="row flex">
                    <Link className="title col" to={`/books/${book.id}`}>
                        <div className="title">{book.title}</div>
                    </Link>
                    <div className="author col">{book.author}</div>
                    <div className="bookshelves col">{book.bookshelves}</div>
                    <div className="actions col">
                        <Link to={`/books/edit/${book.id}`}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

 export default BookList;