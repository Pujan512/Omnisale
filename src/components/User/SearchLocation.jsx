import React, { useState, useEffect } from 'react';

const SearchLocation = ({ setLocation }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchSuggestions = async () => {
        setLoading(true);
        try {
            if (query.length > 2) {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}+Kathmandu&format=json&addressdetails=1`);
                const data = await response.json();
                const list = data.filter(place => place.display_name.includes('Kathmandu'));
                if(list.length == 0 ) 
                    setError(true);
                else
                    setError(false);
                setSuggestions(list);
            } else {
                setSuggestions([]);
            }
        } catch (error) {
            console.error('Error fetching data from Nominatim API:', error);
        }
        setLoading(false);
    };


    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.name);
        setLocation(`placeId:${suggestion.place_id},lon:${suggestion.lon},lat:${suggestion.lat},name:${suggestion.name}`)
        setSuggestions([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            e.stopPropagation(); 
            fetchSuggestions();
        }
    }

    return (
        <div>
            {/* <label htmlFor="location">Search Location: </label> */}
            <input
                className='border-1 text-white p-2 rounded-sm w-full'
                id='location'
                name='location'
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search Location"
            />
            {loading && <p>Loading...</p> }
            {!loading && suggestions.length > 0 && (
                <ul>
                    {suggestions.map((suggestion) => (
                        <li className='border-1 p-2 m-1 cursor-pointer hover:underline' key={suggestion.place_id} onClick={() => { handleSuggestionClick(suggestion) }}>
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}
            {error && <p className='text-red-500'>Try another nearby location.</p>}
        </div>
    );
};

export default SearchLocation;
