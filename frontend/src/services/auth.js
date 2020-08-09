export default function logout(eventhandler, props) {
  eventhandler.preventDefault();
  localStorage.removeItem("user");
  localStorage.removeItem("accesstoken");
  localStorage.removeItem("apikey");
  // console.log(props);
  props.value.history.push("/");
}
