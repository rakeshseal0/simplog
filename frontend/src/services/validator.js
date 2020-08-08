export function UsernameValidator(user) {
  var letters = /^[A-Za-z]+$/;
  if (user.match(letters)) {
    return true;
  } else {
    return false;
  }
}

export function PasswordValidator(passw) {
  return passw.length > 6 ? true : false;
}
