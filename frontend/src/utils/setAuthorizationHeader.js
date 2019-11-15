
export default (token = null) => {
  let bearer = 'Bearer '
  if (token) {
    let meta = { "Content-Type": "application/json", 'Authorization': bearer+token }
  return  new Headers(meta)
  } else {
    let meta = {"Content-Type": "application/json"}
  return  new Headers(meta)
  }
};
