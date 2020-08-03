export const regExMapping ={
  "username":RegExp(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/),
  "name":RegExp(/^[a-zA-Z0-9! @#$%^&*)(+=._-]{0,64}$/),
  "email":RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
  "url":RegExp(/^([-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))/),
  "contact" : RegExp(/^((\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}){0,32}$/),
  "department" : RegExp(/^[a-zA-Z0-9!@ #\$%\^\&*\)\(+=._-]{0,64}$/),
  "affiliation" : RegExp(/^[a-zA-Z0-9!@ #\$%\^\&*\)\(+=._-]{0,64}$/),
  "providerGroup" : RegExp(/^[a-zA-Z0-9!@ #\$%\^\&*\)\(+=._-]{0,64}$/),
  "password": RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
  "sample_type_id": RegExp(/^[0-9]+$/),
  "description" : RegExp(/^[a-zA-Z0-9!@ #\$%\^\&*\)\(+=._-]{0,1000}$/),
  "sample_descriptor_id" : RegExp(/^[a-zA-Z0-9! @#$%^&*)(+=._-]{1,32}$/),
  "value" : RegExp(/^[a-zA-Z0-9! @#$%^&*)(+=._-]{1,64}$/),
  "unit_of_measurment" : RegExp(/^[a-zA-Z0-9! @#$%^&*)(+=._-]{0,256}$/),
  "sampleName" : RegExp(/^[a-zA-Z0-9! @#$%^&*)(+=._-]{1,50}$/),

};
