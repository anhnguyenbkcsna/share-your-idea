var response = {
  data: {
    alg: '',
    aud: '',
    email: '',
    exp: '',
    family_name: '',
    given_name: '',
    name: '',
    locale: '',
    typ: 'JWT',
    picture: '',
  },
  status: 200,
  statusText: '',
}

export const validateGoogleResponse = (response, token) => {
  const data = response.data
  if (data.aud !== process.env.REACT_APP_CLIENT_ID) {
    return 'Unauthorized User - Invalid Aud'
  }

  const expire = parseInt(data.exp)
  if (!expire) {
    return 'Invalid Expire'
  }

  const current = Date.now() / 1000
  if (expire < current) {
    console.log('expire', expire, '  --  ', current)
    return 'Expired Token Error'
  }

  localStorage.setItem('email', data.email)
  localStorage.setItem('name', data.name)
  localStorage.setItem('api_token', token)
  return true
}
