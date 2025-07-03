import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "@/redux/api/baseapi";
import Swal from "sweetalert2";

function CreateBook() {
    const [createBook] = useCreateBookMutation();

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
            console.log(data)

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
                text: "Something went wrong!",
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="font-bold text-center underline text-2xl mb-8">
                Create a New Book
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 max-w-2xl mx-auto"
            >
                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title*</label>
                    <Input
                        placeholder="Book title"
                        {...register("title", { required: "Title is required" })}
                    />
                    {typeof errors.title?.message === "string" && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                {/* Author */}
                <div>
                    <label className="block mb-1 font-medium">Author*</label>
                    <Input
                        placeholder="Author name"
                        {...register("author", { required: "Author is required" })}
                    />
                    {typeof errors.author?.message === "string" && (
                        <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                    )}
                </div>

                {/* Genre */}
                <div>
                    <label className="block mb-1 font-medium">Genre*</label>
                    <Input
                        placeholder="Book genre"
                        {...register("genre", { required: "Genre is required" })}
                    />
                    {typeof errors.genre?.message === "string" && (
                        <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
                    )}
                </div>

                {/* ISBN */}
                <div>
                    <label className="block mb-1 font-medium">ISBN*</label>
                    <Input
                        placeholder="International Standard Book Number"
                        {...register("isbn", { required: "ISBN is required" })}
                    />
                    {typeof errors.isbn?.message === "string" && (
                        <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <Textarea
                        placeholder="Book description"
                        className="resize-none"
                        {...register("description")}
                    />
                </div>

                {/* Copies */}
                <div>
                    <label className="block mb-1 font-medium">Copies*</label>
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
                    {typeof errors.copies?.message === "string" && (
                        <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Create Book</Button>
                </div>
            </form>
        </div>
    );
}

export default CreateBook;
