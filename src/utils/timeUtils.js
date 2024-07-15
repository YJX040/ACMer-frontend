// utils/timeUtils.js

export const formatTime = (row, column, cellValue) => {
  console.log('formatTime', row, column, cellValue);
  if (!cellValue) return '';
  const date = new Date(cellValue * 1000);
  return date.toLocaleString();
};

export const formatDuration = (row, column, cellValue) => {
  if (!cellValue) return '';
  if (cellValue < 0) {
    const days = Math.abs(Math.floor(cellValue / (24 * 3600)));
    return `${days}天后`;
  }
  if (cellValue < 3600) {
    const minutes = Math.floor(cellValue / 60);
    return `${minutes}分钟`;
  }
  if (cellValue < 86400) {
    const hours = Math.floor(cellValue / 3600);
    return `${hours}小时`;
  }
  if (cellValue > 365 * 24 * 3600) {
    const years = Math.floor(cellValue / (365 * 24 * 3600));
    return `${years}年前`;
  }
  const days = Math.floor(cellValue / (24 * 3600));
  return `${days}天`;
};
