export const getPort = () => {
  const port = process.env.PORT;
  if (!port) return 29890;
  return +port;
};
