import basic from "./basic";

export const pageMeta = {
  type: "document",
  name: "pageMeta",
  title: "Site Configuration",
  groups: [
    {
      name: "meta",
      title: "Site Info",
      default: true,
    },
    {
      name: "og",
      title: "Social Share Info",
    },
  ],
  fields: [
    ...basic.fields,
    {
      type: "text",
      name: "description",
      title: "Describe This Page",
    },
    {
      type: 'string',
      name: 'keywords',
      title: 'Keywords',
      description: 'A comma separated list of keywords, to be used in the keywords meta field. This is unlikely to be crawled by search engines but may still be worth including.',
    },
  ],
};
