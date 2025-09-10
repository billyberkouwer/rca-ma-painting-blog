import ImageElement from "@/components/Posts/ImageElement/ImageElement";
import { SanityImageAsset } from "@/types/sanityTypes";
import { PortableTextBlock } from "next-sanity";
import Link from "next/link";
import "./post-tile.scss";
import { extractDate } from "@/helpers";

export default function PostTile({ title, text, id, image, color = "white", updatedAt, createdAt }: { title: string   | null, text: PortableTextBlock[] | PortableTextBlock | null, id: string, image: SanityImageAsset | null | undefined, color?: string, updatedAt?: string, createdAt?: string | null }) {
    // Extract text content from portable text blocks
    const textContent = text && Array.isArray(text)
        ? text
            .map(block => {
                if (block._type === 'block' && block.children) {
                    return block.children
                        .map(child => child.text || '')
                        .join('')
                }
                return ''
            })
            .join(' ')
            .trim()
        : '';

    // Limit to 140 characters
    const truncatedText = textContent.length > 140
        ? textContent.substring(0, 140) + '...'
        : textContent;

    return (
        <Link href={`/posts/${id}`} className="post-tile__wrapper" style={{ backgroundColor: color }}>
            <h2>{title}</h2>
            <ImageElement imageEl={image || null} zoom={false} />
            <p>{truncatedText}</p>
            <div className="tile-footer__wrapper">
                <p className="read-more">Read More</p>
                <p className="updated-at">{createdAt ? extractDate(createdAt) : (updatedAt ? extractDate(updatedAt) : "")}</p>
            </div>
        </Link>
    )
}