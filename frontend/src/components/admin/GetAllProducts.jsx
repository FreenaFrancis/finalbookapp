import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GetAllProducts() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/book/getBook')
            .then((response) => {
                setBooks(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEdit = (id) => {
        navigate(`/dashboard/editboook/${id}`); // Adjust route as needed
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await axios.delete(`http://localhost:5000/api/book/deleteBook/${id}`);
                setBooks(books.filter(book => book._id !== id)); // Update state after deletion
            } catch (error) {
                console.error("Error deleting the book:", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-8 bg-gradient-to-r from-blue-100 to-green-100 min-h-screen" style={{marginLeft:'230px',marginTop:'-650px'}}>
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Available Books</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img 
                                        src={`http://localhost:5000/images/${book.image}`} 
                                        alt={book.bookname} 
                                        className="h-20 w-20 object-cover"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{book.bookname}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{book.author}</td>
                                <td className="px-6 py-4 whitespace-nowrap">${book.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button 
                                        onClick={() => handleEdit(book._id)} 
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(book._id)} 
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetAllProducts;
