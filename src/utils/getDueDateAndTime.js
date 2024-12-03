function getDueDateAndTime(timestamp) {
  if (!timestamp) {
    timestamp = Date.now() + 1000 * 60 * 60 * 24 * 29;
  }

  const dueDateTime = new Date(timestamp);

  const formatNumber = (num) => String(num).padStart(2, "0");

  const year = dueDateTime.getFullYear();
  const month = formatNumber(dueDateTime.getMonth() + 1);
  const day = formatNumber(dueDateTime.getDate());
  const P_VBANK_DT = `${year}${month}${day}`;

  const hours = formatNumber(dueDateTime.getHours());
  const minutes = formatNumber(dueDateTime.getMinutes());
  const P_VBANK_TM = `${hours}${minutes}`;

  return { P_VBANK_DT, P_VBANK_TM };
}

module.exports = getDueDateAndTime;