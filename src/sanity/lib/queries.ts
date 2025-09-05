import { defineQuery } from "next-sanity";

export const homepageQuery = defineQuery(`*[_type == "index"][0] {
    ...,
    "elements": elements[] {
        _type,
        _ref,
        ...@-> {
            _type,
            ...select(
                _type == "imageBlock" => {
                    "image": image.asset->,
                    alt,
                    caption
                },
                _type == "textBlock" => {
                    title,
                    text
                }
            )
        }
    }
  }`)

export const homepageMetaQuery = defineQuery(
    `*[_type == "index"][0] {
     "pageMeta": pageMeta{
        keywords,
        _updatedAt,
        title,
        description,
        ogType,
        ogTitle,
        ogDescription,
        "ogImage": image.asset->
     }
    }
  `);