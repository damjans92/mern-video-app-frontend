export const validateSignIn = (fields, setErrors) => {
  const errorsArr = {}
  for (let input in fields) {
    if (!fields[input].trim().length > 0) {
      errorsArr[input] = `${input} is a required field`
    }

    if (input === 'email' && fields[input].trim().length > 0) {
      let isEmailValid = /\S+@\S+\.\S+/.test(fields[input])
      if (!isEmailValid) errorsArr.emailNotValid = `email is not valid`
    }
  }

  setErrors(errorsArr)

  if (Object.keys(errorsArr).length === 0) {
    console.log(errorsArr)
    return true
  } else {
    return false
  }
}

export const validateSignUp = (fields, acceptTerms, setErrors) => {
  const errorsArr = {}
  for (let input in fields) {
    if (input !== 'acceptTerms' && !fields[input].trim().length > 0) {
      errorsArr[input] = `${input} is a required field`
    }

    if (input === 'email' && fields[input].trim().length > 0) {
      let isEmailValid = /\S+@\S+\.\S+/.test(fields[input])
      if (!isEmailValid) errorsArr.emailNotValid = `email is not valid`
    }

    if (input === 'password' && fields[input].trim().length < 6) {
      errorsArr[input] = `Password should have at least 6 characters!`
    }

    if (input === 'acceptTerms' && acceptTerms === false) {
      errorsArr[input] = 'You need to accept terms and conditions'
    }
  }

  setErrors(errorsArr)

  if (Object.keys(errorsArr).length === 0) {
    console.log(errorsArr)
    return true
  } else {
    return false
  }
}
