import { config } from 'dotenv'
if (process.env.NODE_ENV !== 'production') config()

const apiURL = {
  eod () {
    const url = new URL(process.env.MARKETSTACK_BASE_URL as string)
    url.pathname = 'v1/eod/latest'
    url.searchParams.set('access_key', process.env.MARKETSTACK_API_KEY as string)

    return url
  }
}

export default apiURL