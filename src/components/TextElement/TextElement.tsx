import { PortableText } from "next-sanity"
import "./text-element.scss"
import { extractDate } from "@/helpers";

type TextEl = {
    _type: "textBlock";
    _ref: string;
    _updatedAt: string;
    title: string | null;
    text: Array<{
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

export default function TextElement({ textEl }: { textEl: TextEl }) {
    return (
        <div className="text-element__wrapper">
            <div className="text-element__container">
                {textEl?.title ? <h2>{textEl.title}</h2> : null}
                <PortableText value={textEl.text || []} />
                <span className="text-element__updated-at">Updated on {extractDate(textEl?._updatedAt)}</span>
            </div>
        </div>
    )

}