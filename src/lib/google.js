    /*
    useEffect(() => {
        if(!book.thumbnail) {
            fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
            .then(response => {return response.json()})
            .then((data) => { 
                // book.imageUrl = data.items[0].volumeInfo.imageLinks.thumbnail;
                setImageUrl(data.items[0].volumeInfo.imageLinks.thumbnail);
                
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [query, book]);
    */