import PageContentWrapper from "@/components/PageContentWrapper/PageContentWrapper";
import { sanityFetch } from "@/sanity/lib/live";
import { homepageMetaQuery, postsInitialQuery, postsCountQuery } from "@/sanity/lib/queries";
import { HomepageMetaQueryResult, PostsQueryResult } from "@/types/sanityTypes";
import PostTile from "@/components/Homepage/PostTile/PostTile";
import PostTilesWrapper from "@/components/Homepage/PostTileWrapper/PostTilesWrapper";
import LoadMorePosts from "@/components/Homepage/LoadMorePosts/LoadMorePosts";

export async function generateMetadata() {
  const { data }: { data: HomepageMetaQueryResult } = await sanityFetch({
    query: homepageMetaQuery, perspective: "published", tags: ["homepage"]
  })

  const metadata = data?.pageMeta;

  return {
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    keywords: metadata?.keywords ?? "",
    title: metadata?.title ?? metadata?.ogTitle ?? "",
    creator: "Billy Myles-Berkouwer",
    publisher: "Billy Myles-Berkouwer",
    description: metadata?.description ?? "",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      images: metadata?.ogImage?.url ?? "",
      title: metadata?.ogTitle ?? "",
      type: "website",
      description: metadata?.description ?? "",
      publishedTime: metadata?._updatedAt ?? "",
      authors: ["Billy Myles-Berkouwer"],
    },
  };
}

export default async function Home() {
  // Fetch initial 20 posts server-side
  const [postsResult, countResult] = await Promise.all([
    sanityFetch({
      query: postsInitialQuery,
      perspective: "published",
      tags: ["homepage"]
    }),
    sanityFetch({
      query: postsCountQuery,
      perspective: "published",
      tags: ["homepage"]
    })
  ]);

  const initialPosts: PostsQueryResult = postsResult.data || [];
  const totalCount = countResult.data || 0;
  const hasMore = initialPosts.length < totalCount;

  return (
    <PageContentWrapper>
      <PostTilesWrapper>
        {initialPosts.map((post) => (
          <PostTile
            key={post._id}
            title={post.title}
            //@ts-expect-error - textContent is not typed correctly
            text={post.textContent}
            id={post._id}
            image={post.imageArray?.images?.[0]?.asset}
            updatedAt={post._updatedAt}
            createdAt={post.createdAt}
          />
        ))}
      </PostTilesWrapper>
      {hasMore && (
        <LoadMorePosts 
          initialPostsCount={initialPosts.length}
          totalCount={totalCount}
        />
      )}
    </PageContentWrapper>
  );
}
