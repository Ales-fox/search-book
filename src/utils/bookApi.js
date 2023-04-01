const getAllBooks = (searchword, orderBy, categories, index = 0) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${categories !== 'all' ? 'subject:'+categories+'&' : ''}${searchword}&orderBy=${orderBy}&maxResults=30&startIndex=${index}`, {
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => getResponseData(res))
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}  ${res.statusText}`);
    }
    return res.json();
}

export default getAllBooks;