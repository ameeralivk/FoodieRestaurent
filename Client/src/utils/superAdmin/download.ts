
  const handleDownload = async (url: string) => {
  try {
    const response = await fetch(url, { mode: "cors" }); // fetch file
    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);

    const fileName = url.split("/").pop() || "document.pdf";
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error("Download failed:", err);
  }
};


export default handleDownload
