// import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const BookCard = (data) => {
    const book = data.book;

    const thumbnail = book.thumbnail ?? `https://covers.openlibrary.org/b/isbn/${book.isbn13}-M.jpg`;

    return (
        <div className="book-card">
            <div className="book-card-image-container">
                {thumbnail && (<img className="book-thumbnail" src={thumbnail} alt={book.title} />)}
                {!thumbnail && (<span className="book-card-image"></span>)}
            </div>
            <h5 className="book-card-title">{book.title}</h5>
            <h6 className="book-card-author">{book.author}</h6>
            {book.exclusive_shelf === 'read' && (
                <div className="book-card-read">
                    <FontAwesomeIcon icon={faCircleCheck} />
                </div>
            )}
        </div>
    )
}

export default BookCard;