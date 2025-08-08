// src/components/Post.tsx

import React from 'react';

// Define the shape of the props for the Post component
interface PostProps {
    text: string;
    timestamp: string;
}

const Post: React.FC<PostProps> = ({ text, timestamp }) => {
    // Format the date to be more readable
    const date = new Date(timestamp).toLocaleString();
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 m-4 transition-transform transform hover:scale-105 w-full max-w-md animate-fade-in">
            <p className="text-gray-800 text-lg break-words">{text}</p>
            <p className="text-right text-xs text-gray-400 mt-4">{date}</p>
        </div>
    );
};

export default Post;