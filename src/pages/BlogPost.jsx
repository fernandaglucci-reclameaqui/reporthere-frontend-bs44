import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Post } from '@/api/entities';
import ReactMarkdown from 'react-markdown';
import { Loader2, AlertCircle, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPostPage() {
    const location = useLocation();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams(location.search);
                const slug = params.get('slug');
                if (!slug) {
                    throw new Error("No post specified.");
                }
                const results = await Post.filter({ slug: slug }, null, 1);
                if (results.length === 0) {
                    throw new Error("Post not found.");
                }
                setPost(results[0]);
            } catch (err) {
                console.error("Error fetching post:", err);
                setError(err.message);
            }
            setLoading(false);
        };
        fetchPost();
    }, [location.search]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Could not load post</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link to={createPageUrl("blog")}>
                        <Button variant="outline">Back to Blog</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link to={createPageUrl("blog")}>
                        <Button variant="ghost">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Blog
                        </Button>
                    </Link>
                </div>

                <article>
                    <header className="mb-8">
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{post.title}</h1>
                        <div className="flex items-center text-md text-gray-500">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span>Published on {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                    </header>

                    {post.cover_url && (
                        <img src={post.cover_url} alt={post.title} className="w-full aspect-video object-cover rounded-lg mb-8" />
                    )}

                    <div className="prose prose-lg max-w-none prose-green">
                        <ReactMarkdown>{post.body_markdown}</ReactMarkdown>
                    </div>
                </article>
            </div>
        </div>
    );
}