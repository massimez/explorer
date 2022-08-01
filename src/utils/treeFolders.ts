export const data = [
  {
    label: "Dir 1",
    id: "1",
    children: [
      {
        label: "Dir 1-1",
        id: "11",
        children: [
          { label: "File 1-1-1", type: "file", id: "111" },
          { label: "sub-sub-folder 2", id: "112" },
        ],
      },
      { id: "12", label: "File1", type: "file" },
    ],
  },
  {
    label: "Dir 2",
    id: "2",
    children: [
      {
        label: "Dir 2-1",
        id: "21",
        children: [
          { label: "File 2-1-1", type: "file", id: "211" },
          {
            label: "sub-sub-folder 2",
            id: "212",
            children: [
              { label: "sub-sub-sub File 2-1-1-1", type: "file", id: "2111" },
              { label: "sub-sub-sub-folder 2", id: "212" },
            ],
          },
        ],
      },
      { id: "22", label: "File2", type: "file" },
    ],
  },
  { label: "File 3", type: "file", id: "3" },
];
