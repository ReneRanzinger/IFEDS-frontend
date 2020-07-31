export const nullField = "This field cannot be null. Please fill"
export const lengthField = "Length should be less than 50 characters"
export const lengthField1 = "Length should be less than 64 characters"
export const lengthField2 = "Length should be less than 256 characters"
export const lengthField3 = "Length should be less than 1000 characters"
export const username = "Minimum Eight Characters"
export const password = "Minimum eight characters, at least one letter and one number"
export const wrongCredentials = "Incorrect Username or Password"

export default   (res) => {
  if(res.ok) {
    return [res.text(), false]
  } else {
    return [res.json(),true]
  }
}
