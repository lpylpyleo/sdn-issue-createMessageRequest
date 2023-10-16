import useSWR from 'swr'
import axios, { AxiosRequestConfig } from 'axios'

export const baseURL = 'https://hwedsw.read2n.space'

class Urls {
  static readonly hello = '/'
}

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export type ApiOptions = {
  method?: string | undefined
  body?: BodyInit | undefined
  params?: Record<string, any> | undefined
}

export async function request(config: AxiosRequestConfig) {
  const res = await instance.request(config)
  console.log(res)

  const json = res.data
  console.log(json)
  if (typeof json === 'object' && json['code'] != null && json['code'] != 0) {
    throw new Error(`${json['code']} ${json['msg']}`)
  }
  return json['data']
}

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    throw new Error(`${res.status} ${await res.text()}`)
  }
  const json = await res.json()
  console.log(json)
  if (typeof json === 'object' && json['code'] != null && json['code'] != 0) {
    throw new Error(`${json['code']} ${json['msg']}`)
  }
  return json['data']
}

