import { useState, useEffect, useRef } from 'react';
import axios, { type AxiosInstance } from 'axios';

// Import the new components
import Post from './components/Post';
import PostForm from './components/PostForm';
import Spinner from './components/Spinner';

// --- API Configuration ---
const api: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// --- Type Definitions ---
interface PostData {
    _id: string;
    text: string;
    createdAt: string;
}

// --- Main App Component ---
function App() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const wallEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get<PostData[]>('/posts');
                setPosts(response.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError("Could not connect to the wall. Make sure the server is running.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const handlePostSubmit = async (text: string) => {
        if (!text.trim()) return;
        try {
            const response = await api.post<PostData>('/posts', { text });
            setPosts([response.data, ...posts]);
        } catch (err) {
            console.error("Error adding document: ", err);
            setError("Failed to post message. Please try again.");
            throw err;
        }
    };

    return (
        <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
            <header className="text-center p-6 bg-white border-b">
                <h1 className="text-4xl font-bold text-gray-800">The Infinite Wall</h1>
                <p className="text-gray-500">What's on your mind? Share it with the world.</p>
            </header>

            <main className="flex-grow flex flex-col">
                <PostForm onPostSubmit={handlePostSubmit} />
                <div className="flex-grow p-4 overflow-y-auto">
                    <div className="flex flex-col items-center justify-start gap-4">
                        {isLoading && <Spinner />}
                        {error && <p className="text-red-500 font-semibold p-4">{error}</p>}
                        {!isLoading && !error && posts.map((post: PostData) => (
                            <Post key={post._id} text={post.text} timestamp={post.createdAt} />
                        ))}
                        <div ref={wallEndRef} />
                    </div>
                </div>
            </main>

            <footer className="text-center p-4 text-sm text-gray-400 border-t bg-white">
                Built with love by Aditya
            </footer>
        </div>
    );
}

export default App;