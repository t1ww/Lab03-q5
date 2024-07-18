import axios, { type AxiosResponse } from 'axios'
import type { EventItem } from '@/types'  // Adjust the import to match your folder structure

const apiClient = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Anuphat5056/DBSON',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getEvents(perPage: number, page: number): Promise<AxiosResponse<EventItem[]>> {
        return apiClient.get<EventItem[]>(`/events?_limit=${perPage}&_page=${page}`)
    },
    getEventById(id: number): Promise<AxiosResponse<EventItem>> {
        return apiClient.get<EventItem>(`/events/${id}`)
    }
}
