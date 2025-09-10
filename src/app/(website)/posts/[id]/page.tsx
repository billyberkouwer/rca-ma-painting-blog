import ImageElement from "@/components/Posts/ImageElement/ImageElement";
import PageContentWrapper from "@/components/PageContentWrapper/PageContentWrapper";
import TextElement from "@/components/Posts/TextElement/TextElement";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { postByIdQuery, postsQuery } from "@/sanity/lib/queries";
import "./page.scss";
import { PortableText } from "next-sanity";
import { extractDate } from "@/helpers";
import { PostByIdQueryResult, PostsQueryResult } from "@/types/sanityTypes";



export async function generateStaticParams() {
    const posts: PostsQueryResult = await client.fetch(postsQuery);
    return posts.map((post) => ({
        id: post._id,
    }));
}


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data }: { data: PostByIdQueryResult } = await sanityFetch({
        query: postByIdQuery, perspective: "published", params: { id }
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
        keywords: metadata?.keywords ?? "art, painting, blog, RCA, MA",
        title: metadata?.ogTitle ?? data?.title + " | Post | RCA MA Painting Blog 2025 / 2026" ?? "",
        creator: "Billy Myles-Berkouwer",
        publisher: "Billy Myles-Berkouwer",
        description: metadata?.description ?? data?.textContent?.[0]?.children?.[0]?.text ?? "",
        alternates: {
            canonical: `/posts/${id}`,
        },
        openGraph: {
            images: metadata?.ogImage?.url ?? data?.imageArray?.images?.[0]?.asset?.url ?? "",
            title: metadata?.ogTitle ?? data?.title + " | Post | RCA MA Painting Blog 2025 / 2026" ?? "",
            type: "website",
            description: metadata?.description ?? data?.textContent?.[0]?.children?.[0]?.text ?? "",
            publishedTime: metadata?._updatedAt ?? data?._updatedAt ?? "",
            authors: ["Billy Myles-Berkouwer"],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data } = await sanityFetch({ query: postByIdQuery, params: { id } });
    return (
        <PageContentWrapper>
            <h1>{data?.title}</h1>
            <div className="images-array__wrapper">
                {data?.imageArray?.images?.map((image, i) => (
                    <ImageElement key={image._key} imageEl={image.asset || null} altText={data?.imageArray?.alt + " " + (i + 1)} isFirst={i === 0} />
                ))}
            </div>
            <div className="images-array__caption">
                <PortableText value={data?.imageArray?.caption || []} />
            </div>
            <TextElement textEl={data?.textContent} />
            {data?._updatedAt && <p className="text-element__updated-at">Created on {data?.createdAt ? extractDate(data?.createdAt) : extractDate(data?._createdAt)}</p>}
        </PageContentWrapper>
    )
} 