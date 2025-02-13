const nameDescriptionRegx = /^[a-zA-Z0-9\s]+$/;
const contentAreaRegx = /^[a-zA-Z0-9\s.,!?'"()\-&@+]*$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

module.exports = {
  nameDescriptionRegx,
  contentAreaRegx,
  emailRegex,
  passwordRegex,
};
