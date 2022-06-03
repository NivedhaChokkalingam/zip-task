import { GiphyFetch } from '@giphy/js-fetch-api';

export const search = async (name: string,offset: number) =>{
    const gf = new GiphyFetch(`${process.env.REACT_APP_GIHPY_API_KEY}`)
    const { data: gifs } = await gf.search(name, { lang: 'es', limit: 10, type: 'gifs', offset: offset })
    return gifs
}

export const trending = async (offset: number) =>{
    const gf = new GiphyFetch(`${process.env.REACT_APP_GIHPY_API_KEY}`)
    const { data: trending } = await gf.trending({ limit: 10, offset: offset})
    return trending
}
