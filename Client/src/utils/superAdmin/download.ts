const handleDownload = async (url: string) => {
  try {
  const link = document.createElement("a");
  link.href = url;
  link.download = "";
  link.click();
  } catch (err) {
    console.error("Download failed:", err);
  }
};

export default handleDownload;
