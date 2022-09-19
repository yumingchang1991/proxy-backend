const cookiesOption = {
  authRefreshToken: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: 'None'
    // 1 day in milliseconds
  }
}

export default cookiesOption
