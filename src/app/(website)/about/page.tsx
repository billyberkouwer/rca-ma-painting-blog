import PageContentWrapper from "@/components/PageContentWrapper/PageContentWrapper";
import { sanityFetch } from "@/sanity/lib/live";
import { aboutMetaQuery, aboutQuery } from "@/sanity/lib/queries";
import { AboutMetaQueryResult } from "@/types/sanityTypes";
import { PortableText } from "next-sanity";
import Link from "next/link";
import "./page.scss";

export async function generateMetadata() {
    const { data }: { data: AboutMetaQueryResult } = await sanityFetch({
        query: aboutMetaQuery, perspective: "published"
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

export default async function About() {
    const { data } = await sanityFetch({ query: aboutQuery, perspective: "published" });
    return (
        <PageContentWrapper>
            <h1>{data?.title || "About"}</h1>
            {data?.textContent && <div className="about-content">
                <PortableText value={data?.textContent || []} />
            </div>}
            <Link href="/" className="back-to-home">Browse Posts</Link>
        </PageContentWrapper>
    )
}