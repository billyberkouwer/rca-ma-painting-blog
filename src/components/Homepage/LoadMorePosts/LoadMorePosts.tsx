'use client';

import { useState, useCallback, useEffect } from 'react';
import PostTile from '../PostTile/PostTile';
import { SanityImageAsset } from '@/types/sanityTypes';
import { PortableTextBlock } from 'next-sanity';
import './load-more-posts.scss';

interface Post {
  _id: string;
  title: string;
  textContent: PortableTextBlock[];
  createdAt?: string;
  imageArray: {
    images: Array<{
      asset: SanityImageAsset;
    }>;
  };
}

interface LoadMorePostsProps {
  initialPostsCount: number;
  totalCount: number;
}

export default function LoadMorePosts({ initialPostsCount, totalCount }: LoadMorePostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(2); // Start from page 2
  const [hasMore, setHasMore] = useState(true);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/posts?page=${currentPage}&limit=20`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      
      setPosts(prev => [...prev, ...data.posts]);
      setCurrentPage(prev => prev + 1);
      setHasMore(data.pagination.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, hasMore]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 // Load when 1000px from bottom
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  // Check if we have more posts to load
  useEffect(() => {
    const totalLoaded = initialPostsCount + posts.length;
    if (totalLoaded >= totalCount) {
      setHasMore(false);
    }
  }, [initialPostsCount, posts.length, totalCount]);

  if (error) {
    return (
      <div className="load-more-posts__error">
        <p>Error: {error}</p>
        <button onClick={loadMorePosts}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <PostTile
          key={post._id}
          title={post.title}
          text={post.textContent}
          id={post._id}
          image={post.imageArray.images[0]?.asset}
          createdAt={post.createdAt}
        />
      ))}
      {loading && (
        <div className="load-more-posts__loading">
          Loading more posts...
        </div>
      )}
      {!hasMore && posts.length > 0 && (
        <div className="load-more-posts__end">
          No more posts to load
        </div>
      )}
    </>
  );
}
