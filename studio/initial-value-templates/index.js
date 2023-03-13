export default (prev) => ([
  ...prev,
  {
    id: 'category-child',
    title: 'Category: Child',
    schemaType: 'category',
    parameters: [{name: `parentId`, title: `Parent ID`, type: `string`}],
    // This value will be passed-in from desk structure
    value: ({parentId}) => ({
      parent: {_type: 'reference', _ref: parentId},
    }),
  },
])
