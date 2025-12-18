import React, { useState, useRef } from 'react';

// Types
type UserRole = 'Admin' | 'Editor' | 'Writer' | 'Guest';
type NewsCategory = 'News' | 'Announcement' | 'AI Feature' | 'Tutorial' | 'Promotion' | 'Event' | 'Community' | 'Maintenance';
type MediaType = 'photo' | 'video';

interface Comment {
    id: number;
    author: string;
    authorRole: UserRole;
    content: string;
    date: string;
    likes: number;
    isLiked: boolean;
    replies: Comment[];
}

interface NewsPost {
    id: number;
    title: string;
    content: string;
    mediaType: MediaType;
    mediaUrls: string[]; 
    date: string;
    author: string;
    authorRole: UserRole;
    category: NewsCategory;
    likes: number;
    isLiked: boolean;
    shares: number;
    views: number;
    comments: Comment[];
}

const CATEGORIES: ("All" | NewsCategory)[] = ["All", "News", "Announcement", "AI Feature", "Tutorial", "Promotion", "Event", "Community", "Maintenance"];

// Helper function to format numbers (e.g., 1200 -> 1.2k)
const formatNumber = (num: number): string => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
};

const MOCK_NEWS: NewsPost[] = [
    {
        id: 1,
        title: "Welcome to YouNan Photography App 2.5",
        content: "Our biggest update yet! We've integrated the latest Gemini 2.5 models for even better photo restoration and uniform replacement. Experience faster generation and more realistic results today.",
        mediaType: 'photo',
        mediaUrls: ["https://picsum.photos/seed/restoration/800/600"],
        date: "2025-05-15",
        author: "YouNan Admin",
        authorRole: "Admin",
        category: "Announcement",
        likes: 1240,
        isLiked: false,
        shares: 450,
        views: 12000,
        comments: [
            {
                id: 101,
                author: "Chamnan",
                authorRole: "Editor",
                content: "The quality improvement on the faces is noticeable! Great work team.",
                date: "2025-05-15",
                likes: 42,
                isLiked: false,
                replies: []
            }
        ]
    },
    {
        id: 2,
        title: "Mastering the Uniform Changer",
        content: "Learn how to perfectly align the new office uniforms with your original portraits using our advanced AI refinement tools.",
        mediaType: 'video',
        mediaUrls: ["https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"],
        date: "2025-05-20",
        author: "Sokha",
        authorRole: "Editor",
        category: "Tutorial",
        likes: 850,
        isLiked: true,
        shares: 120,
        views: 25000,
        comments: []
    }
];

export const News: React.FC = () => {
    const [posts, setPosts] = useState<NewsPost[]>(MOCK_NEWS);
    const [userRole, setUserRole] = useState<UserRole>('Admin');
    const [currentUser] = useState("YouNan Admin");
    const [isWriting, setIsWriting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<"All" | NewsCategory>("All");
    
    const [expandedContent, setExpandedContent] = useState<number[]>([]);
    const [showShareMenu, setShowShareMenu] = useState<number | null>(null);
    const [showComments, setShowComments] = useState<number | null>(null);
    const [replyingTo, setReplyingTo] = useState<{postId: number, commentId: number} | null>(null);

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newCategory, setNewCategory] = useState<NewsCategory>('News');
    const [newMediaType, setNewMediaType] = useState<MediaType>('photo');
    
    const [newMediaFiles, setNewMediaFiles] = useState<File[]>([]);
    const [videoInputType, setVideoInputType] = useState<'url' | 'upload'>('url');
    const [newVideoUrl, setNewVideoUrl] = useState(''); 
    const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
    
    const [commentInputs, setCommentInputs] = useState<{[key: number]: string}>({});
    const [replyInputs, setReplyInputs] = useState<{[key: number]: string}>({});

    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Toggle comments drawer for a specific post
    const toggleComments = (postId: number) => {
        setShowComments(showComments === postId ? null : postId);
    };

    // Handle liking/unliking a comment
    const handleCommentLike = (postId: number, commentId: number) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                const updatedComments = post.comments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            isLiked: !comment.isLiked,
                            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
                        };
                    }
                    return comment;
                });
                return { ...post, comments: updatedComments };
            }
            return post;
        }));
    };

    const handlePost = () => {
        if (!newTitle || !newContent) return;

        let mediaUrls: string[] = [];

        if (newMediaType === 'photo') {
            if (newMediaFiles.length > 0) {
                mediaUrls = newMediaFiles.map(file => URL.createObjectURL(file));
            }
        } else {
            if (videoInputType === 'upload' && newVideoFile) {
                mediaUrls = [URL.createObjectURL(newVideoFile)];
            } else if (videoInputType === 'url') {
                mediaUrls = [newVideoUrl || "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"];
            }
        }

        const newPost: NewsPost = {
            id: Date.now(),
            title: newTitle,
            content: newContent,
            mediaType: newMediaType,
            mediaUrls: mediaUrls,
            date: new Date().toLocaleDateString('en-CA'),
            author: currentUser, 
            authorRole: userRole,
            category: newCategory,
            likes: 0,
            isLiked: false,
            shares: 0,
            views: 0,
            comments: []
        };

        setPosts([newPost, ...posts]);
        setNewTitle('');
        setNewContent('');
        setNewCategory('News');
        setNewMediaType('photo');
        setNewMediaFiles([]);
        setNewVideoUrl('');
        setNewVideoFile(null);
        setIsWriting(false);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewMediaFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const handlePostLike = (postId: number) => {
        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    isLiked: !post.isLiked,
                    likes: post.isLiked ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    const handleAddComment = (postId: number) => {
        const text = commentInputs[postId];
        if (!text?.trim()) return;

        const newComment: Comment = {
            id: Date.now(),
            author: currentUser,
            authorRole: userRole,
            content: text,
            date: "Just now",
            likes: 0,
            isLiked: false,
            replies: []
        };

        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                return { ...post, comments: [...post.comments, newComment] };
            }
            return post;
        }));

        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    };

    const handleReply = (postId: number, parentCommentId: number) => {
        const text = replyInputs[parentCommentId];
        if (!text?.trim()) return;

        const newReply: Comment = {
            id: Date.now(),
            author: currentUser,
            authorRole: userRole,
            content: text,
            date: "Just now",
            likes: 0,
            isLiked: false,
            replies: []
        };

        setPosts(prev => prev.map(post => {
            if (post.id === postId) {
                const newComments = post.comments.map(c => {
                    if (c.id === parentCommentId) {
                        return { ...c, replies: [...c.replies, newReply] };
                    }
                    return c;
                });
                return { ...post, comments: newComments };
            }
            return post;
        }));

        setReplyInputs(prev => ({ ...prev, [parentCommentId]: '' }));
        setReplyingTo(null);
    };

    const toggleExpand = (id: number) => {
        setExpandedContent(prev => 
            prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
        );
    };

    const filteredPosts = selectedCategory === "All" 
        ? posts 
        : posts.filter(post => post.category === selectedCategory);

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20 font-sans" onClick={() => setShowShareMenu(null)}>
            
            {/* Category Filter Pills & Role Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div 
                    ref={scrollContainerRef}
                    className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1 flex-grow"
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`whitespace-nowrap px-6 py-2.5 rounded-2xl text-sm font-black tracking-wide transition-all border-2 shadow-sm ${
                                selectedCategory === cat
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-100 translate-y-[-2px]'
                                    : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200 hover:text-indigo-600'
                            }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Relocated Role Switcher */}
                <div className="bg-white p-2 rounded-2xl border-2 border-slate-100 flex items-center gap-3 shadow-sm shrink-0">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Role</span>
                    <select 
                        value={userRole} 
                        onChange={(e) => setUserRole(e.target.value as UserRole)}
                        className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none p-1.5 shadow-sm"
                    >
                        <option value="Admin">Admin</option>
                        <option value="Editor">Editor</option>
                        <option value="Writer">Writer</option>
                        <option value="Guest">Guest</option>
                    </select>
                </div>
            </div>

            {/* Creation Trigger */}
            {userRole !== 'Guest' && !isWriting && (
                <div 
                    className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 flex items-center gap-4 cursor-pointer hover:shadow-xl hover:border-indigo-200 transition-all group"
                    onClick={() => setIsWriting(true)}
                >
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                    </div>
                    <div className="flex-grow">
                        <p className="text-slate-400 font-bold text-lg">What's the latest update, {userRole}?</p>
                    </div>
                </div>
            )}

            {/* News Creation Form */}
            {isWriting && (
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-2 border-indigo-50 animate-in fade-in slide-in-from-top-4 duration-500 relative">
                     <button 
                        onClick={() => setIsWriting(false)}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    
                    <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Create New Post</h3>

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Post Title</label>
                                <input 
                                    type="text" 
                                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none font-bold text-slate-800 transition-all placeholder:text-slate-300"
                                    placeholder="បញ្ចូលចំណងជើងអត្ថបទ..."
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                                <select 
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value as NewsCategory)}
                                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none font-bold text-slate-800 transition-all"
                                >
                                    {CATEGORIES.filter(c => c !== "All").map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Content / Description</label>
                            <textarea 
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none font-medium text-slate-800 transition-all h-40 placeholder:text-slate-300"
                                placeholder="រៀបរាប់ពីខ្លឹមសារព័ត៌មាន..."
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                            />
                        </div>

                        {/* Media Selection */}
                        <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Media Attachments</label>
                            
                            <div className="flex gap-4 mb-6">
                                <button 
                                    onClick={() => setNewMediaType('photo')}
                                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl font-black transition-all border-2 ${
                                        newMediaType === 'photo' 
                                        ? 'bg-white border-indigo-600 text-indigo-600 shadow-md' 
                                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                                    }`}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    Photos
                                </button>
                                <button 
                                    onClick={() => setNewMediaType('video')}
                                    className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl font-black transition-all border-2 ${
                                        newMediaType === 'video' 
                                        ? 'bg-white border-indigo-600 text-indigo-600 shadow-md' 
                                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                                    }`}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                    Video
                                </button>
                            </div>

                            {newMediaType === 'photo' ? (
                                <div 
                                    className="border-4 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-white transition-all group"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                    </div>
                                    <p className="font-bold text-slate-500">Drop images or click to upload</p>
                                    <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    
                                    {newMediaFiles.length > 0 && (
                                        <div className="mt-8 flex flex-wrap gap-3 justify-center">
                                            {newMediaFiles.map((file, idx) => (
                                                <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md group/img">
                                                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setNewMediaFiles(prev => prev.filter((_, i) => i !== idx)); }}
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 transition-opacity"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-1 bg-slate-200 rounded-xl w-fit">
                                        <button onClick={() => setVideoInputType('url')} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${videoInputType === 'url' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>URL LINK</button>
                                        <button onClick={() => setVideoInputType('upload')} className={`px-4 py-2 rounded-lg text-xs font-black transition-all ${videoInputType === 'upload' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'}`}>FILE UPLOAD</button>
                                    </div>
                                    {videoInputType === 'url' ? (
                                        <input 
                                            type="text" 
                                            className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none font-bold text-slate-800 transition-all placeholder:text-slate-300"
                                            placeholder="Paste MP4 Video URL..."
                                            value={newVideoUrl}
                                            onChange={(e) => setNewVideoUrl(e.target.value)}
                                        />
                                    ) : (
                                        <div 
                                            className="border-4 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-white transition-all"
                                            onClick={() => videoInputRef.current?.click()}
                                        >
                                            <p className="font-bold text-slate-500">{newVideoFile ? newVideoFile.name : "Choose video file"}</p>
                                            <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => setNewVideoFile(e.target.files?.[0] || null)} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 pt-6">
                            <button 
                                onClick={() => setIsWriting(false)}
                                className="px-8 py-4 text-slate-500 font-black tracking-widest hover:text-slate-800 transition-colors uppercase text-xs"
                            >
                                Discard
                            </button>
                            <button 
                                onClick={handlePost}
                                disabled={!newTitle || !newContent}
                                className={`px-10 py-4 bg-indigo-600 text-white rounded-[2rem] font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-xs ${(!newTitle || !newContent) ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                            >
                                Publish Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Post Feed List */}
            <div className="space-y-10">
                {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                    <article key={post.id} className="bg-white rounded-[2.5rem] shadow-xl border border-slate-50 overflow-hidden hover:shadow-2xl transition-all group/post">
                        
                        {/* Post Metadata Header */}
                        <div className="p-8 pb-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-black text-xl shadow-inner">
                                    {post.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 leading-none mb-1">{post.author}</h4>
                                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                                        <span>{post.date}</span>
                                        <span className="text-slate-200">•</span>
                                        <span className={`px-2 py-0.5 rounded-lg border-2 ${
                                            post.authorRole === 'Admin' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-500 border-green-100'
                                        }`}>{post.authorRole}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <span className="text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] bg-slate-50 text-slate-500 border border-slate-100">
                                {post.category}
                            </span>
                        </div>

                        {/* Title & Body */}
                        <div className="px-8 py-4">
                             <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover/post:text-indigo-600 transition-colors leading-tight">{post.title}</h3>
                             <div className="relative">
                                <p className={`text-slate-600 font-medium text-lg leading-relaxed ${expandedContent.includes(post.id) ? '' : 'line-clamp-3'}`}>
                                    {post.content}
                                </p>
                                <button 
                                    onClick={() => toggleExpand(post.id)} 
                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-black mt-3 flex items-center gap-1 group/btn"
                                >
                                    {expandedContent.includes(post.id) ? 'Collapse text' : 'Continue reading'}
                                    <svg className={`w-4 h-4 transition-transform ${expandedContent.includes(post.id) ? 'rotate-180' : 'group-hover/btn:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </button>
                             </div>
                        </div>

                        {/* Visual Media Section */}
                        <div className="px-8 py-4">
                            {post.mediaType === 'video' ? (
                                <div className="rounded-[2rem] overflow-hidden bg-black aspect-video shadow-2xl relative group/video">
                                    <video controls className="w-full h-full object-cover" src={post.mediaUrls[0]}>
                                        Video support required.
                                    </video>
                                </div>
                            ) : (
                                post.mediaUrls.length > 0 && (
                                    <div className={`grid gap-4 ${
                                        post.mediaUrls.length === 1 ? 'grid-cols-1' : 
                                        post.mediaUrls.length === 2 ? 'grid-cols-2' : 
                                        'grid-cols-3'
                                    }`}>
                                        {post.mediaUrls.map((img, idx) => (
                                            <div key={idx} className={`rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] cursor-zoom-in ${
                                                post.mediaUrls.length === 3 && idx === 0 ? 'col-span-2 row-span-2 h-[500px]' : 'h-64'
                                            } ${post.mediaUrls.length === 1 ? 'h-[500px]' : ''}`}>
                                                <img src={img} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
                        </div>

                        {/* Engagement Metrics */}
                        <div className="px-8 py-4 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-white"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                                    <div className="w-6 h-6 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-white"><svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z"/></svg></div>
                                </div>
                                <span className="pl-1">{formatNumber(post.likes)} Interactions</span>
                            </div>
                            <div className="flex gap-4">
                                <span>{post.comments.length} Comments</span>
                                <span>{post.shares} Shares</span>
                            </div>
                        </div>

                        {/* Post Actions Row */}
                        <div className="p-4 px-8 flex gap-4">
                            <button 
                                onClick={() => handlePostLike(post.id)}
                                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-xs transition-all tracking-widest uppercase ${
                                    post.isLiked ? 'bg-red-50 text-red-600 shadow-inner' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                }`}
                            >
                                <svg className={`w-5 h-5 ${post.isLiked ? 'fill-current animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                {post.isLiked ? 'Loved' : 'Love'}
                            </button>
                            
                            <button 
                                onClick={() => toggleComments(post.id)}
                                className="flex-1 flex items-center justify-center gap-3 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 font-black text-xs transition-all tracking-widest uppercase"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                                Comment
                            </button>
                            
                            <div className="flex-1 relative">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setShowShareMenu(showShareMenu === post.id ? null : post.id); }}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 font-black text-xs transition-all tracking-widest uppercase"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                                    Share
                                </button>
                                {showShareMenu === post.id && (
                                    <div className="absolute bottom-full left-0 mb-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                                        <button className="w-full flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl text-sm font-black text-slate-700 transition-colors">
                                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white"><svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></div>
                                            Facebook
                                        </button>
                                        <button className="w-full flex items-center gap-4 p-4 hover:bg-indigo-50 rounded-2xl text-sm font-black text-slate-700 transition-colors">
                                            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white"><svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.462 15.598c-.231.85-1.201 2.548-2.203 3.136-.88.517-1.873.75-2.882.644-2.023-.21-4.071-1.504-5.322-3.056-1.523-1.887-2.188-4.34-1.83-6.732.329-2.203 1.574-3.992 3.328-4.836.884-.425 1.884-.539 2.862-.321 1.623.361 2.942 1.518 3.541 3.023.23.577.348 1.192.348 1.812 0 1.04-.33 2.053-.941 2.871-.153.205-.329.39-.526.554.218.041.442.062.668.062 1.332 0 2.411-.844 2.411-1.884 0-.323-.084-.633-.243-.907-.123-.211-.295-.39-.502-.526.16-.046.315-.116.458-.208.204-.132.378-.299.513-.492z"/></svg></div>
                                            Telegram
                                        </button>
                                        <button className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 border-t border-slate-50 mt-2">
                                            Copy Permalink
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Comments Drawer */}
                        {showComments === post.id && (
                            <div className="bg-slate-50 p-8 border-t-2 border-slate-100 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-[1rem] bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg">Me</div>
                                    <div className="flex-grow flex gap-3">
                                        <input 
                                            type="text" 
                                            placeholder="Join the conversation..." 
                                            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none font-medium text-slate-700 transition-all shadow-sm"
                                            value={commentInputs[post.id] || ''}
                                            onChange={(e) => setCommentInputs(prev => ({...prev, [post.id]: e.target.value}))}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                        />
                                        <button onClick={() => handleAddComment(post.id)} className="bg-indigo-600 text-white px-6 rounded-2xl shadow-lg hover:bg-indigo-700 transition-all active:scale-90">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {post.comments.length > 0 ? post.comments.map(comment => (
                                        <div key={comment.id} className="animate-in slide-in-from-left-4 fade-in duration-300">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 font-black text-xs">{comment.author.charAt(0)}</div>
                                                <div className="flex-grow">
                                                    <div className="bg-white p-5 rounded-3xl rounded-tl-none shadow-sm border border-slate-100 inline-block max-w-full">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-sm font-black text-slate-900">{comment.author}</span>
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comment.date}</span>
                                                        </div>
                                                        <p className="text-slate-600 font-medium">{comment.content}</p>
                                                    </div>
                                                    <div className="flex items-center gap-6 mt-2 ml-4">
                                                        <button 
                                                            onClick={() => setReplyingTo({postId: post.id, commentId: comment.id})}
                                                            className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline"
                                                        >
                                                            Reply
                                                        </button>
                                                        <button 
                                                            className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors"
                                                            onClick={() => handleCommentLike(post.id, comment.id)}
                                                        >
                                                            Love ({comment.likes})
                                                        </button>
                                                    </div>

                                                    {/* Nested Replies Rendering */}
                                                    {comment.replies.length > 0 && (
                                                        <div className="mt-4 space-y-4 pl-4 border-l-4 border-slate-100 ml-4">
                                                            {comment.replies.map(reply => (
                                                                <div key={reply.id} className="flex gap-3 animate-in slide-in-from-left-2 duration-300">
                                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 font-black text-[10px]">{reply.author.charAt(0)}</div>
                                                                    <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                                                                        <div className="flex items-center gap-2 mb-1">
                                                                            <span className="text-xs font-black text-slate-900">{reply.author}</span>
                                                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{reply.date}</span>
                                                                        </div>
                                                                        <p className="text-xs text-slate-600 font-medium">{reply.content}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Reply Entry */}
                                                    {replyingTo?.commentId === comment.id && (
                                                        <div className="mt-4 flex gap-2 animate-in fade-in duration-300">
                                                            <input 
                                                                autoFocus
                                                                className="flex-grow p-3 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-indigo-400 font-medium text-xs shadow-inner"
                                                                placeholder={`Reply to ${comment.author}...`}
                                                                value={replyInputs[comment.id] || ''}
                                                                onChange={(e) => setReplyInputs(prev => ({...prev, [comment.id]: e.target.value}))}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleReply(post.id, comment.id)}
                                                            />
                                                            <button onClick={() => handleReply(post.id, comment.id)} className="bg-indigo-600 text-white px-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">Send</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-10">
                                            <p className="font-black text-slate-300 uppercase tracking-[0.2em] text-xs">No comments found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </article>
                )) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                        </div>
                        <p className="text-slate-400 font-black uppercase tracking-widest">Feed is empty</p>
                    </div>
                )}
            </div>
        </div>
    );
};