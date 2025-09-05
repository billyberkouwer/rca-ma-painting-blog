import Image from "next/image";
import { SanityImageMetadata, SanityAssetSourceData } from "@/types/sanityTypes";
import "./image-element.scss";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';
import { extractDate } from "@/helpers";
import { PortableText } from "@portabletext/react";

export default function ImageElement({ imageEl }: {
    imageEl: ImageEl
}) {
    if (imageEl.image?.url) {
        return (
            <div className="image-element__wrapper">
                <div className="image-element__container">
                    <div className="image__wrapper" style={{ aspectRatio: imageEl.image?.metadata?.dimensions?.aspectRatio || 1 }}>
                        <Zoom zoomImg={{ sizes: "100%", src: imageEl.image?.url }} zoomMargin={20} >
                            <Image style={{ aspectRatio: imageEl.image?.metadata?.dimensions?.aspectRatio || 1 }} src={imageEl.image?.url} alt={imageEl.alt || "Missing alt text here, sorry!"} fill sizes="(max-width: 768px) 100vw, 50vw" quality={50} />
                        </Zoom>
                    </div>
                    <div className="image__caption">
                        <PortableText value={imageEl?.caption || []} />
                    </div>
                    <span className="text-element__updated-at">Updated on {extractDate(imageEl._updatedAt)}</span>
                </div>
            </div>
        )
    }
    return null;
}


type ImageEl = {
    _type: "imageBlock";
    _ref: string;
    _createdAt: string;
    _updatedAt: string;
    image: {
        _id: string;
        _type: "sanity.imageAsset";
        _createdAt: string;
        _updatedAt: string;
        _rev: string;
        originalFilename?: string;
        label?: string;
        title?: string;
        description?: string;
        altText?: string;
        sha1hash?: string;
        extension?: string;
        mimeType?: string;
        size?: number;
        assetId?: string;
        uploadId?: string;
        path?: string;
        url?: string;
        metadata?: SanityImageMetadata;
        source?: SanityAssetSourceData;
    } | null;
    alt: string | null;
    caption: Array<{
        children?: Array<{
            marks?: Array<string>;
            text?: string;
            _type: "span";
            _key: string;
        }>;
        style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
            href?: string;
            _type: "link";
            _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
    }> | null;
}

