

import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const formSchema = z.object({
    username: z.string().min(2).max(50),
})

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"


export function ProfileForm() {


}


export const InputForm = () => {





    const [file, setFile] = useState<File | null>()
    const [prompt, setPrompt] = useState<string | null>(null)

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const newFile = event.target.files[0]
            setFile(newFile)
            console.log(newFile)
        }
    }

    function handlePromptChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value) {
            const newText = event.target.value
            setPrompt(newText)
            console.log(prompt)
        }
    }

    const handleSubmit = async () => {

        const formData = new FormData();

        if (file && prompt) {

            console.log("uploading file")
            formData.append("imageFile", file)
            console.log("uploading prompt")
            formData.append("prompt", prompt)
        }
        else {
            console.error("Error: invalid prompt or file")
        }

        console.log("form data", formData)

        await fetch('https://refacer.onrender.com/uploadPhoto', {
            method: "POST",
            body: formData
        });



    }



    return (
        <>
            <div className="flex flex-col border gap-10 p-5 border-gray rounded">

                <div className="flex font-semibold ">
                    Upload image to be processed
                </div>

                <div className="flex flex-col gap-5 ">

                    <div className="text-xs flex flex-col">
                        Prompt

                        <input className="border border-gray-300 rounded p-1" onChange={handlePromptChange}>
                        </input>
                    </div>


                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Small file input</label>
                    <input className="block w-full mb-5 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="small_size" type="file" onChange={handleFileChange} />

                    <Button className="bg-orange-500 rounded text-white" onClick={handleSubmit}>
                        Submit
                    </Button>

                </div>



                <div>

                </div>


            </div>

        </>

    )

}


export const ExampleForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )

}