export const getFileUrl = (key: string) => {
  // return `https://utfs.io/a/${process.env.UPLOADTHING_APP_ID}/${key}`;
  return `https://${process.env.UPLOADTHING_APP_ID}.ufs.sh/f/${key}`;
};

export const formatSize = (size: number) => {
  const lengthOfNumber = size.toString().length;

  if (lengthOfNumber === 4) return (size / 1024).toFixed(2) + " kb";
  if (lengthOfNumber === 5) return (size / 1024).toFixed(2) + " mb";
  return size + " b";
};
