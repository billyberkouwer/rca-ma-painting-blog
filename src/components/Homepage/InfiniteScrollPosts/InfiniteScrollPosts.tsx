'use client';

import { useState, useEffect, useCallback } from 'react';
import PostTile from '../PostTile/PostTile';
import PostTilesWrapper from '../PostTileWrapper/PostTilesWrapper';
import { SanityImageAsset } from '@/types/sanityTypes';
import { PortableTextBlock } from 'next-sanity';
import "./infinite-scroll-posts.scss";
interface Post {
  _id: string;
  title: string;
  textContent: PortableTextBlock[];
  imageArray: {
    images: Array<{
      asset: SanityImageAsset;
    }>;
  };
}

interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  hasMore: boolean;
  totalPages: number;
}

export default function InfiniteScrollPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const fetchPosts = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/posts?page=${page}&limit=20`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      
      if (append) {
        setPosts(prev => [...prev, ...data.posts]);
      } else {
        setPosts(data.posts);
      }
      
      setPagination(data.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (pagination?.hasMore && !loading) {
      fetchPosts(pagination.page + 1, true);
    }
  }, [pagination, loading, fetchPosts]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 // Load when 1000px from bottom
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  // Initial load
  useEffect(() => {
    fetchPosts(1, false);
  }, [fetchPosts]);

  if (error) {
    return (
      <div className="error__wrapper">
        <p>Error: {error}</p>
        <button onClick={() => fetchPosts(1, false)}>Retry</button>
      </div>
    );
  }

  return (
    <PostTilesWrapper>
      {posts.map((post) => (
        <PostTile
          key={post._id}
          title={post.title}
          text={post.textContent}
          id={post._id}
          image={post.imageArray.images[0]?.asset}
        />
      ))}
      {loading && (
        <div style={{ 
          width: '100%', 
          textAlign: 'center', 
          padding: '2rem',
          gridColumn: '1 / -1' // Span full width
        }}>
          Loading more posts...
        </div>
      )}
      {pagination && !pagination.hasMore && posts.length > 0 && (
        <div style={{ 
          width: '100%', 
          textAlign: 'center', 
          padding: '2rem',
          gridColumn: '1 / -1' // Span full width
        }}>
          No more posts to load
        </div>
      )}
    </PostTilesWrapper>
  );
}
