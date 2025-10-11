import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Post } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Loader2, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const PostSkeleton = () => (
    <Card className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t-lg"></div>
        <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        </CardContent>
        <CardFooter>
            <div className="h-10 bg-gray-200 rounded w-28"></div>
        </CardFooter>
    </Card>
);


export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const publishedPosts = await Post.filter({ status: 'published' }, '-created_date');
                setPosts(publishedPosts);
            } catch (error) {
                console.error("Error fetching blog posts:", error);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Our Blog</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                        Insights, tips, and updates on consumer rights and business reputation.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PostSkeleton />
                        <PostSkeleton />
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <Card key={post.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                                <Link to={createPageUrl(`BlogPost?slug=${post.slug}`)} className="block">
                                    <img src={post.cover_url} alt={post.title} className="aspect-[16/9] w-full rounded-t-lg object-cover" />
                                </Link>
                                <CardHeader>
                                    <CardTitle>
                                        <Link to={createPageUrl(`BlogPost?slug=${post.slug}`)} className="text-xl font-bold text-gray-900 hover:text-green-600">
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                    <div className="flex items-center text-sm text-gray-500 pt-2">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        {new Date(post.created_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="text-gray-600 line-clamp-3">
                                        <ReactMarkdown components={{ p: ({children}) => <>{children}</> }}>
                                            {post.body_markdown}
                                        </ReactMarkdown>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link to={createPageUrl(`BlogPost?slug=${post.slug}`)}>
                                        <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                                            Read More <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold text-gray-800">No Posts Yet</h3>
                        <p className="text-gray-500 mt-2">Check back soon for new articles and updates.</p>
                    </div>
                )}
            </div>
        </div>
    );
}