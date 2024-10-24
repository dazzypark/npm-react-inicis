function getDueDateAndTime(timestamp) {
  if (!timestamp) {
    timestamp = Date.now() + 1000 * 60 * 60 * 24 * 29;
  }

  const date = new Date(timestamp);

  const dueDateTime = new Date(date.getTime());

  const P_VBANK_DT = dueDateTime.toISOString().split("T")[0].replace(/-/g, "");

  const hours = String(dueDateTime.getHours()).padStart(2, "0");
  const minutes = String(dueDateTime.getMinutes()).padStart(2, "0");
  const P_VBANK_TM = `${hours}${minutes}`;

  return { P_VBANK_DT, P_VBANK_TM };
}

module.exports = getDueDateAndTime;
