export const serialized = <T>(data: T[], field: string) => {
  const serializdeItems = data.map((element: T) => {
    return {
      ...element,
      [field]: `http://192.168.100.135:3333/uploads/${element[field]}`,
    };
  });
  return serializdeItems;
};
