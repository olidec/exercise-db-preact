import { h, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { cat, loadCat } from '../signals/categories.js';

export default function NewExForm() {
    const [selectedCat, setSelectedCat] = useState(null);

    useEffect(() => {
        loadCat();
    }, []);

    console.log(selectedCat);

    return (
        <div>
            <select onChange={(e) => setSelectedCat(cat.value.find(category => category.id === e.target.value))}>
                {cat.value.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            {selectedCat && (
                <select>
                    {selectedCat.subcategory.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

