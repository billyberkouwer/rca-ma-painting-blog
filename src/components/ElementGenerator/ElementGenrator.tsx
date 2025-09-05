import ImageElement from "../ImageElement/ImageElement"
import TextElement from "../TextElement/TextElement"
import { HomepageQueryResult } from "@/types/sanityTypes";

type ElementData = NonNullable<NonNullable<HomepageQueryResult>['elements']>[number];

export default function ElementGenerator({ dataEl, isFirst = false }: { dataEl: ElementData, isFirst?: boolean }) {

    if (dataEl._type === "imageBlock") {
        return <ImageElement imageEl={dataEl} isFirst={isFirst} />
    }

    if (dataEl._type === "textBlock") {
        return <TextElement textEl={dataEl} />
    }

    return null;
}