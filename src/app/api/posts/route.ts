import { sanityFetch } from "@/sanity/lib/live";
import { postsPaginatedQuery, postsCountQuery } from "@/sanity/lib/queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '2'); // Start from page 2 since initial 20 are server-rendered
    const limit = parseInt(searchParams.get('limit') || '20');
    const start = (page - 1) * limit;
    const end = start + limit;

    // Fetch posts and total count in parallel
    const [postsResult, countResult] = await Promise.all([
      sanityFetch({
        query: postsPaginatedQuery,
        perspective: "published",
        params: { start, end }
      }),
      sanityFetch({
        query: postsCountQuery,
        perspective: "published"
      })
    ]);

    const posts = postsResult.data || [];
    const totalCount = countResult.data || 0;
    const hasMore = start + posts.length < totalCount;

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        totalCount,
        hasMore,
        totalPages: Math.ceil(totalCount / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
