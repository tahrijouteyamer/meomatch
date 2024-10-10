export const formatTime = function (time: number) {
  return [
    Math.floor((time % 3600) / 60),
    ("00" + Math.floor(time % 60)).slice(-2),
  ].join(":");
};
