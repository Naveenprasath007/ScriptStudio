import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditorModal = ({ initialValue = '' }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [text, setText] = useState(initialValue);
    const [comment, setComment] = useState('');

    useEffect(() => {
        setText(initialValue);
    }, [initialValue]);

    const modules = {
        toolbar: [
            // Add other toolbar options as needed
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }], // Include alignment options here

            ['clean'], // remove formatting button
        ],
    };

    const handleSubmit = () => {
        console.log('Text:', text);
        console.log('Comment:', comment);
        // Add your submission logic here
    };

    return (
        <div>
            {/* Toggle Button */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded transition duration-300 ease-in-out"
                onClick={() => setIsModalOpen(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="relative p-5 border w-3/4 md:w-1/2 lg:w-3/4 shadow-lg rounded-md bg-white" style={{ minHeight: '70vh' }}>
                        {/* Close Button Wrapper */}
                        <div className="absolute top-0 right-0 mt-2 mr-2">
                            <button
                                className="text-red-500 hover:text-red-700 font-bold text-3xl"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>
                        {/* Text Editor with Scrollable Content and Custom Toolbar */}
                        <div className="mt-8 rounded-lg" >
                            <ReactQuill 
                            theme="snow" 
                            value={text} 
                            onChange={setText}
                            style={{ height: '200px', overflowY: 'auto' }}
                            modules={modules} />
                        </div>
                        {/* Comment Box */}
                        <textarea
                            className="mt-4 w-full h-24 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-300 ease-in-out"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        {/* Submit Button */}
                        <button
                            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextEditorModal;
