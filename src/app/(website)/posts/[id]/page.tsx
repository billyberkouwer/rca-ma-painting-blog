import ImageElement from "@/components/Posts/ImageElement/ImageElement";
import PageContentWrapper from "@/components/PageContentWrapper/PageContentWrapper";
import TextElement from "@/components/Posts/TextElement/TextElement";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { postByIdQuery, postsQuery } from "@/sanity/lib/queries";
import "./page.scss";
import { PortableText } from "next-sanity";
import { extractDate } from "@/helpers";
import { PostsQueryResult } from "@/types/sanityTypes";

export async function generateStaticParams() {
    const posts: PostsQueryResult = await client.fetch(postsQuery);
    return posts.map((post) => ({
        id: post._id,
    }));
}

export default async function Page({ params }: { params: { id: string } }) {
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
            {data?._updatedAt && <p className="text-element__updated-at">Updated on {extractDate(data?._updatedAt)}</p>}
        </PageContentWrapper>
    )
} 