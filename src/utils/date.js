module.exports = function getDay() {
  const day = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return day.toLocaleDateString('en-US', options);
};
