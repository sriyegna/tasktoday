export const parseDate = (dateStr) => {
  return dateStr.split("00:00:00")[0];
};

export const parseTitle = (data) => {
  let retStr = "";
  const objData = JSON.parse(data);
  for (let i = 0; i < objData.blocks.length; i++) {
    if (retStr < 20) {
      retStr += objData.blocks[i].text;
    } else {
      break;
    }
  }
  return retStr;
};
