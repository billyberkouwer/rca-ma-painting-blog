import Image from "next/image";
import { SanityImageAsset } from "@/types/sanityTypes";
import "./image-element.scss";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';

export default function ImageElement({ imageEl, isFirst = false, altText, zoom = true }: {
    imageEl: SanityImageAsset | null,
    isFirst?: boolean,
    altText?: string,
    zoom?: boolean
}) {
    if (imageEl?.url) {
        return (
            <Zoom zoomImg={{src: imageEl.url}} zoomMargin={20} isDisabled={!zoom}>
                <div className="image-element__wrapper">
                    <div className="image-element__container">
                        <div className="image__wrapper" style={{ aspectRatio: imageEl.metadata?.dimensions?.aspectRatio || 1 }}>
                            <Image placeholder="blur" 
                            blurDataURL={imageEl.metadata?.lqip || ""} 
                            priority={isFirst} 
                            style={{ aspectRatio: imageEl.metadata?.dimensions?.aspectRatio || 1 }} 
                            src={imageEl.url} alt={altText || "Missing alt text here, sorry!"} 
                            fill 
                            sizes="(max-width: 526px) 100vw, (max-width: 768px) 50vw, 33vw" 
                            quality={50} />
                        </div>
                    </div>
                </div >
            </Zoom>

        )
    }
    return null;
}

