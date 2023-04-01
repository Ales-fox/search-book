const ValidationSearch = (e, setError) => {
    if (!e.target.value) {
        setError(true);
        return;
    } else {
        setError(false);
        return;
    }
}

export default ValidationSearch;