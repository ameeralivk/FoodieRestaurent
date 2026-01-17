const isOpenNow = (open: string, close: string) => {
  const now = new Date();

  const [oh, om] = open.split(":").map(Number);
  const [ch, cm] = close.split(":").map(Number);

  const openTime = new Date();
  openTime.setHours(oh, om, 0);

  const closeTime = new Date();
  closeTime.setHours(ch, cm, 0);

  return now >= openTime && now <= closeTime;
};

export default isOpenNow