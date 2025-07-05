import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseapi"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import Swal from "sweetalert2"
import z from "zod"

const bookFormSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    author: z.string().min(2, "Author must be at least 2 characters"),
    genre: z.string().min(2, "Genre must be at least 2 characters"),
    isbn: z.string().min(10, "ISBN must be at least 10 characters"),
    description: z.string().optional(),
    copies: z.number().min(0, "Copies cannot be negative"),
})

type BookFormValues = z.infer< typeof bookFormSchema >

const EditBookPage = () => {

    const {id} = useParams<{id : string }>()
    const navigate = useNavigate()
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
     // Fetch existing book data
  const { data: book, isLoading, error } = useGetBookQuery(id!);

  const form = useForm<BookFormValues>({
    resolver : zodResolver(bookFormSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: '',
      isbn: '',
      description: '',
      copies: 0,
    }
  })

  useEffect(() => {
    if (book) {
      form.reset({
        title: book.data.title,
        author: book.data.author,
        genre: book.data.genre,
        isbn: book.data.isbn,
        description: book.data.description || '',
        copies: book.data.copies,
      });
    }
  }, [book, form]);


const onSubmit = async (values: BookFormValues) => {
    try {
      await updateBook({
        id: id!,
        data : values,
      }).unwrap();

      await Swal.fire({
        icon: 'success',
        title: 'Book Updated!',
        text: 'Book has been updated successfully.',
        confirmButtonText: 'OK'
      });

      navigate(`/books/${id}`);
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update the book.',
        confirmButtonText: 'Try Again'
      });
    }
  };










  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 mr-2" />
        <span>Loading book details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        <span>Error loading book details</span>
      </div>
    );
  }

    return (
     <div className="container mx-auto p-4 max-w-4xl">
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
    <div className="flex items-center">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(-1)}
        className="mr-2"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-xl sm:text-2xl font-bold">Edit {book?.data.title}</h1>
    </div>
    <div className="flex gap-2 w-full sm:w-auto">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate(`/books/${id}`)}
        className="flex-1 sm:flex-none"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isUpdating}
        className="flex-1 sm:flex-none"
      >
        {isUpdating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="hidden sm:inline">Updating...</span>
          </>
        ) : (
          <>
            <span className="inline sm:hidden">Update</span>
            <span className="hidden sm:inline">Update Book</span>
          </>
        )}
      </Button>
    </div>
  </div>

  {/* Form Section */}
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <div className="grid grid-cols-1 gap-6">
      {/* Top Row - Single Column on Mobile */}
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block font-medium">Title*</label>
          <Input
            {...form.register("title")}
            placeholder="Book title"
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Description</label>
          <Textarea
            {...form.register("description")}
            placeholder="Book description"
            className="min-h-[100px]"
          />
        </div>
      </div>

      {/* Bottom Row - Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block font-medium">Author*</label>
          <Input
            {...form.register("author")}
            placeholder="Author name"
          />
          {form.formState.errors.author && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.author.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Genre*</label>
          <Input
            {...form.register("genre")}
            placeholder="Book genre"
          />
          {form.formState.errors.genre && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.genre.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block font-medium">ISBN*</label>
          <Input
            {...form.register("isbn")}
            placeholder="International Standard Book Number"
          />
          {form.formState.errors.isbn && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.isbn.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Copies*</label>
          <Input
            type="number"
            min="0"
            {...form.register("copies", { valueAsNumber: true })}
          />
          {form.formState.errors.copies && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.copies.message}
            </p>
          )}
        </div>
      </div>
    </div>
  </form>
</div>
    )
}

export default EditBookPage