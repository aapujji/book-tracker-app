import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";

const SearchForm = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchBooks = useCallback(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.items[0].volumeInfo);
            setResults(data.items);
        })
        .catch(e => console.log(e));
    }, [query]);

    useEffect(() => {
        if (query) {
            searchBooks();
        }
    }, [query, searchBooks]);

    const handleInputChange = (event) => {
        document.getElementById('search-results').style.display = 'block';
        setQuery(event.target.value);
    }

    return (
        <div className="search-form">
            <TextInput label="Search" id="search" className="search-field" isRequired onChange={handleInputChange} value={query} />
            <ul id="search-results" className="search-results">
                {results.map((item,key) => {
                    return (
                        <li key={key}>
                            <Link to={`/books/new`} className="search-link flex" state={{ googleBook: item.volumeInfo }}>
                                {(item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail) && (
                                    <img className="search-link-image" src={item.volumeInfo.imageLinks.smallThumbnail} alt={item.volumeInfo.title} width="30" />
                                )}
                                <span className="search-link-text">{item.volumeInfo.title} by {item.volumeInfo.authors}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SearchForm;