import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilteredJobs = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`http://localhost:8000/api/v1/jobs/filterjob/${selectedCategory}`);
                setJobs(response.data.data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        if (selectedCategory) {
            fetchJobs();
        }
    }, [selectedCategory]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div>
            <label htmlFor="category">Select a category:</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select</option>
                <option value="cook">Cook</option>
                <option value="c">C</option>
                <option value="TEST">Test</option>
            </select>

            <h2>Filtered Jobs</h2>
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <h3>{job.title}</h3>
                        <p>Category: {job.category}</p>
                        <p>Description: {job.description}</p>
                        <img src={job.thumbnail} alt="" />
                        {/* Render other job details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilteredJobs;
