type FetchResponse = {
  status: 'success' | 'error'
  error: string | null
  data: Array<{ id: number; collection: Array<{ id: number; icon_url: string }> }> | null
}

export class StandAPI {
  private headers: Headers

  constructor() {
    this.headers = new Headers()
    this.headers.append(
      'Authorization',
      'Bearer f2a670eb2648148553ab28d77612f4362dae3a59b7ad17ae2e9d14c910439a5c56f25693e568d8eb0995a743c1ae52a3a6cf9324b9a41ca94cde2a0e4d28fb21f8f28547ac4c58c21fd8ea24d22dce33c4bd46268c15e7106e3dd73b9a6efb96bd800d513a98e9a43b7bddd649ef6c0ec76bbae3ebc4c61e8e7bed95e8313783'
    )
    this.headers.append(
      'Cookie',
      '__cf_bm=0ignn_iPROKE0ao_rFIWm2FqUrxcFeuTLjpWBZQBgKQ-1721344085-1.0.1.1-MGMW9QlLMinMEGruP09T7C_ZF09gNSQW1MUSOW0kvo2WK_neEf4AOu0XUaiBjlMpn3K7.36Lj9O667WfuwmegQ'
    )
  }

  private async fetchStandData(url: string): Promise<FetchResponse> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: this.headers,
      redirect: 'follow'
    }

    try {
      const response = await fetch(url, requestOptions)

      if (response.status === 200) {
        const result = await response.json()

        if (result.data.length > 0) {
          const data = result.data.map((item: any) => ({
            id: item.id,
            collection: item.attributes.collection.map((col: any) => ({
              id: col.id,
              icon_url: col.icon.data.attributes.url,
              title: col.title,
              video_url: col.video.data.attributes.url
            }))
          }))

          return {
            status: 'success',
            error: null,
            data: data
          }
        } else {
          return {
            status: 'error',
            error: 'Ошибка: данные не найдены',
            data: null
          }
        }
      } else {
      }
    } catch (error) {
      return {
        status: 'error',
        error: `Ошибка: ${(error as Error).message}`,
        data: null
      }
    }
  }

  public async checkKeyValidity(key: string): Promise<string> {
    const url = `https://stand.evil-chan.ru/api/stands?populate=deep,3&filters[key][$eq]=${key}`
    return (await this.fetchStandData(url)).status
  }

  public async getIcons(key: string) {
    const url = `https://stand.evil-chan.ru/api/stands?populate=deep,3&filters[key][$eq]=${key}`
    return await this.fetchStandData(url)
  }
}
