export const nullField = "This field cannot be null. Please fill"
export const lengthField = "Length should be less than 50 characters"
export const lengthField1 = "Length should be less than 64 characters"
export const lengthField2 = "Length should be less than 256 characters"
export const lengthField3 = "Length should be less than 1000 characters"
export const vusername = "Minimum Eight Characters"
export const vpassword = "Minimum eight characters, at least one letter and one number"
export const vname = "Enter a valid name. Length should be between 4-64"
export const vcontact = "Enter a valid Contact. Format: +12 123 123 1234 or 123 123 1234 "
export const vurl = "Enter a valid Url"
export const vdepartment = "Enter a valid Department. Length should be less than 64 character"
export const vaffiliation = "Enter a valid Affiliation. Length should be less than 64 character"
export const vproviderGroup = "Enter a valid Provider Group. Length should be less than 64 character"
export const vwrongCredentials = "Incorrect Username or Password"

export default   (res) => {
  if(res.ok) {
    return [res.text(), false]
  } else {
    return [res.json(),true]
  }
}
