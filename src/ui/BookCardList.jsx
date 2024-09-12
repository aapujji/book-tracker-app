import BookCard from "./BookCard";

const BookCardList = (data) => {
    console.log(data);
    const books = data.books;

    return (
        <div className="book-list flex">
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}    
        </div>
    )
}

export default BookCardList;