import { h, useEffect, createSignal } from 'preact';
import { getEntryById } from '../api'; // Assuming you have an API module for database operations

const FindUnique = () => {
    const [entry, setEntry] = createSignal(null);
    const [error, setError] = createSignal(null);

    useEffect(() => {
        const entryId = 'your-unique-id'; // Replace with the actual unique ID

        getEntryById(entryId)
            .then(entry => {
                setEntry(entry);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    if (error()) {
        return <div>Error: {error().message}</div>;
    }

    if (!entry()) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{entry().title}</h1>
            <p>{entry().content}</p>
        </div>
    );
};

export default FindUnique;
