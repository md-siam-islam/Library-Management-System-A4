import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "@/redux/api/baseapi";
import Swal from "sweetalert2";
import { BookPlus } from "lucide-react";

function CreateBook() {
  const [createBook, { isLoading }] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Ensure copies is number
      data.copies = parseInt(data.copies);
      data.available = data.copies > 0; // Set available status
      
      await createBook(data).unwrap();

      Swal.fire({
        title: "Success!",
        icon: "success",
        text: "Book has been created.",
      });

      reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create book. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <BookPlus className="h-8 w-8 text-blue-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            Create a New Book
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Title*</label>
              <Input
                placeholder="Book title"
                {...register("title", { required: "Title is required" })}
                className="w-full"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message as string}
                </p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="block mb-2 font-medium">Author*</label>
              <Input
                placeholder="Author name"
                {...register("author", { required: "Author is required" })}
              />
              {errors.author && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.author.message as string}
                </p>
              )}
            </div>

            {/* Genre */}
            <div>
              <label className="block mb-2 font-medium">Genre*</label>
              <Input
                placeholder="Book genre"
                {...register("genre", { required: "Genre is required" })}
              />
              {errors.genre && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.genre.message as string}
                </p>
              )}
            </div>

            {/* ISBN */}
            <div>
              <label className="block mb-2 font-medium">ISBN*</label>
              <Input
                placeholder="International Standard Book Number"
                {...register("isbn", { required: "ISBN is required" })}
              />
              {errors.isbn && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.isbn.message as string}
                </p>
              )}
            </div>

            {/* Copies */}
            <div>
              <label className="block mb-2 font-medium">Copies*</label>
              <Input
                type="number"
                min="1"
                {...register("copies", {
                  required: "Copies is required",
                  min: {
                    value: 1,
                    message: "Minimum 1 copy required",
                  },
                })}
              />
              {errors.copies && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.copies.message as string}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Description</label>
              <Textarea
                placeholder="Book description"
                className="resize-none min-h-[120px]"
                {...register("description")}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="w-full sm:w-auto"
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                "Create Book"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;