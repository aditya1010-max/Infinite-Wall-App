import React, { useState } from 'react';

interface PostFormProps {
    onPostSubmit: (text: string) => Promise<void>;
}

const PostForm: React.FC<PostFormProps> = ({ onPostSubmit }) => {
    const [text, setText] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim() && !isSubmitting) {
            setIsSubmitting(true);
            try {
                await onPostSubmit(text);
                setText('');
            } catch (error) {
                console.error("Error posting message:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="p-4 bg-gray-100/50 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <textarea
                        value={text}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        placeholder="Write something on the wall..."
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                        rows={3}
                        disabled={isSubmitting}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting || !text.trim()}
                        className="w-full md:w-auto bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                    >
                        {isSubmitting ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;