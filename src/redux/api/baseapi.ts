import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
interface BorrowSummaryItem {
    _id: string;
    title: string;
    isbn: string;
    author: string;
    totalBorrowed: number;
    dueDate: string
}

interface Borrowbooksum<T> {
    message: string,
    success: string
    data: T;
}

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://library-backend-psi.vercel.app/api" }),
    endpoints: (builder) => ({
        getAllBooks: builder.query<Book[], void>({
            query: () => ({
                url: "/books",
                method: "GET"
            })
        }),
        getBook: builder.query<ApiResponse<Book>, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: "GET",
            })
        }),
        getBorrowSummary: builder.query<Borrowbooksum<BorrowSummaryItem[]>, void>({
            query: () => '/borrow/summary',
        }),
        deleteBook: builder.mutation<void, string>({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE"
            })
        }),
        borrowBook: builder.mutation<{ success: boolean }, { bookId: string; quantity: number; dueDate: string }>({
            query: (body) => ({
                url: "/borrow",
                method: "POST",
                body
            })
        }),
        createBook: builder.mutation<Book, Omit<Book, '_id'>>({
            query: (bookData) => ({
                url: '/books',
                method: 'POST',
                body: bookData,
            })
        }),
        updateBook: builder.mutation<Book,{ id: string; data: Partial<Book>}>({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
})

export const { useGetAllBooksQuery, useDeleteBookMutation, useCreateBookMutation, useGetBookQuery, useBorrowBookMutation, useGetBorrowSummaryQuery , useUpdateBookMutation} = baseApi;