import { defineQuery } from "next-sanity";

export const homepageQuery = defineQuery(`*[_type == "index"][0] {
    ...,
    "elements": elements[] | order(@->._createdAt desc) {
        _type,
        _ref,
        ...@-> {
            _type,
            ...select(
                _type == "imageBlock" => {
                    _createdAt,
                    _updatedAt,
                    "image": image.asset->{
                        ...
                    },
                    alt,
                    caption
                },
                _type == "textBlock" => {
                    _createdAt,
                    _updatedAt,
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

export const postsQuery = defineQuery(`*[_type == "posts"] | order(coalesce(createdAt, _createdAt) desc) {
    _id,
    _createdAt,
    _updatedAt,
    title,
    textContent,
    createdAt,
    "imageArray": imageArray{
        ...,
        "images": images[]{
            ...,
            "asset": asset->
        }
    }
}`);

export const postsPaginatedQuery = defineQuery(`*[_type == "posts"] | order(coalesce(createdAt, _createdAt) desc) [$start...$end] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    textContent,
    createdAt,
    "imageArray": imageArray{
        ...,
        "images": images[]{
            ...,
            "asset": asset->
        }
    }
}`);

export const postsInitialQuery = defineQuery(`*[_type == "posts"] | order(coalesce(createdAt, _createdAt) desc) [0...20] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    textContent,
    createdAt,
    "imageArray": imageArray{
        ...,
        "images": images[]{
            ...,
            "asset": asset->
        }
    }
}`);

export const postsCountQuery = defineQuery(`count(*[_type == "posts"])`);

export const postByIdQuery = defineQuery(`*[_type == "posts" && _id == $id][0] {
    ...,
    _id,
    _createdAt,
    _updatedAt,
    title,
    textContent,
    createdAt,
    "imageArray": imageArray{
        ...,
        "images": images[]{
            ...,
            "asset": asset->
        }
    },
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
}`);

export const aboutMetaQuery = defineQuery(`*[_type == "about"][0] {
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
}`);

export const aboutQuery = defineQuery(`*[_type == "about"][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    textContent,
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
}`);