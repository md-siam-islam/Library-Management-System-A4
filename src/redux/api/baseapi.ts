import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string; // Optional
  copies: number;
  available: boolean;
}

export const baseApi = createApi({
    reducerPath : "baseApi",
    baseQuery : fetchBaseQuery ({baseUrl : "http://localhost:5000/api"}),
    endpoints : (builder) => ({
        getAllBooks : builder.query<Book[], void>({
            query : () => ({
                url : "/books",
                method : "GET"
            })
        }),
        deleteBook : builder.mutation<void, string>({
            query : (id) => ({
                url : `/books/${id}`,
                method : "DELETE"
            })
        })
    })
})

export const {useGetAllBooksQuery, useDeleteBookMutation} = baseApi;