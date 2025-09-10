import { PortableText } from "next-sanity"
import "./text-element.scss"
import { PostByIdQueryResult } from "@/types/sanityTypes";

type TextEl = NonNullable<NonNullable<PostByIdQueryResult>['textContent']> | undefined | null;

export default function TextElement({ textEl }: { textEl: TextEl }) {
    if (textEl) {
        return (
            <div className="text-element__wrapper">
                <div className="text-element__container">
                    <PortableText value={textEl || []} />
                </div>
            </div>
        )
    }
    return null;

}