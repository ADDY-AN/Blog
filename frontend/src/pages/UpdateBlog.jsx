import React, { useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { MdEdit } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from '../components/ui/select'
import { Label } from '../components/ui/label'
import JoditEditor from 'jodit-react'
import axios from 'axios'
import { toast } from 'sonner'

const UpdateBlog = () => {
    const location = useLocation();
    const { blogId } = useParams();

    const { title: initialTitle = "Not provided", category: initialCategory = "Not provided" } = location.state || {}

    const [title, setTitle] = useState(initialTitle)
    const [category, setCategory] = useState(initialCategory)
    const [subtitle, setSubtitle] = useState("")
    const [content, setContent] = useState("")
    const [thumbnail, setThumbnail] = useState(null)

    const editor = useRef(null)

    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [isEditingCategory, setIsEditingCategory] = useState(false)

    const getSelectedCategory = (value) => {
        setCategory(value)
        setIsEditingCategory(false)
    }

    const handlePublish = async () => {

        const cleanDescription = content.replace(/^<p>(.*?)<\/p>$/i, "$1");
        const token = localStorage.getItem("token")
        const formData = new FormData()
        formData.append("title", title)
        formData.append("subtitle", subtitle)
        formData.append("description", cleanDescription)
        formData.append("category", category)
        formData.append("isPublished", true);
        if (thumbnail) {
            formData.append("file", thumbnail)
        }

        try {
            const response = await axios.put(
                `http://localhost:8000/api/v1/blog/${blogId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true // <- IMPORTANT!
                }
            );
            console.log("✅ Blog updated successfully", response.data)
            if (response.data.success) {
                toast.success("Blog updated successfully")
            } else {
                toast.error("Failed to update blog")
            }
        } catch (err) {
            console.error("❌ Error updating blog", err)
        }
    }
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        const token = localStorage.getItem("token");
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/v1/blog/delete/${blogId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                }
            );
            if (response.data.success) {
                toast.success("Blog deleted successfully");
                // redirect to dashboard or blog list
                window.location.href = "/dashboard/your-blogs";
            } else {
                toast.error("Failed to delete blog");
            }
        } catch (err) {
            console.error("❌ Error deleting blog", err);
            toast.error("Error deleting blog");
        }
    };

    return (
        <div className='pt-20 md:ml-[350px] md:h-full  bg-emerald-100 dark:bg-gradient-to-t from-emerald-950 to-gray-950 font-mono'>
            <div className='mt-2 flex justify-center'>
                <Card className='w-[900px] mb-10 dark:bg-gray-950 bg-emerald-50 shadow-sm shadow-emerald-950 rounded-2xl dark:border-1 dark:border-emerald-950 '>
                    <div className='flex flex-row'>
                        <h1 className='text-emerald-950 dark:text-emerald-50 ml-5 mt-2 text-xl font-bold mr-155'>Basic Blog Info</h1>
                        <Button onClick={handleDelete} className='w-[40px] bg-red-800 dark:bg-red-700 dark:border-0 dark:text-red-50 font-bold  text-red-50 hover:bg-red-950 hover:text-red-500 dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-red-500 hover:scale-105'>
                            <MdDeleteForever className='scale-150' />
                        </Button>
                    </div>
                    <p className='text-emerald-950 dark:text-emerald-50 ml-5'>Make Changes to Your Blog here. Click Publish when you are done</p>

                    <div className='ml-5'>
                        {/* Title Section */}
                        <div>
                            <span className='text-emerald-950 dark:text-emerald-50 font-semibold'>Title: </span>
                            {isEditingTitle ? (
                                <Input value={title} onChange={(e) => setTitle(e.target.value)} className='w-[300px] mt-1 text-emerald-950  dark:text-emerald-50 border-accent-foreground dark:border-0' />
                            ) : (
                                <span className='text-emerald-950 dark:text-emerald-100'>{title}</span>
                            )}
                            <Button variant="outline" size="lg" className='mt-1 bg-transparent border-0 shadow-none text-emerald-950  dark:text-emerald-50 dark:bg-transparent hover:scale-130 transition hover:text-emerald-500 hover:bg-transparent dark:hover:bg-transparent'
                                onClick={() => setIsEditingTitle(!isEditingTitle)}>
                                {isEditingTitle ? <FaSave className='scale-120 ' /> : <MdEdit className='scale-120 ' />}
                            </Button>
                        </div>

                        {/* Category Section */}
                        <div>
                            <span className='text-emerald-950 dark:text-emerald-50 font-semibold'>Category: </span>
                            {isEditingCategory ? (
                                <Select value={category} onValueChange={getSelectedCategory}>
                                    <SelectTrigger className=" mt-1 w-[400px] shadow-sm border-accent-foreground dark:border-0 text-emerald-950 dark:text-emerald-50">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Category</SelectLabel>
                                            <SelectItem value="AutoMobiles">Automobiles</SelectItem>
                                            <SelectItem value="Blogging">Blogging</SelectItem>
                                            <SelectItem value="Cooking">Cooking</SelectItem>
                                            <SelectItem value="Travel">Travel</SelectItem>
                                            <SelectItem value="Technology">Technology</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ) : (
                                <span className='text-emerald-950 dark:text-emerald-100 mr-1'>{category}</span>
                            )}
                            <Button variant="outline" size="sm" className='mt-1 bg-transparent border-0 shadow-none text-emerald-950  dark:text-emerald-50 dark:bg-transparent hover:scale-130 transition hover:text-emerald-500 hover:bg-transparent dark:hover:bg-transparent'
                                onClick={() => setIsEditingCategory(!isEditingCategory)}>
                                {isEditingCategory ? <FaSave className='ml-1 scale-125 ' /> : <MdEdit className='scale-120 ' />}
                            </Button>
                        </div>
                    </div>

                    {/* Subtitle */}
                    <div>
                        <Label className='text-emerald-950 dark:text-emerald-50 ml-5 mb-2 text-xl'>Subtitle:</Label>
                        <Input
                            placeholder="Add a subtitle..."
                            className='ml-5 w-[850px] mt-1 text-emerald-950 dark:text-emerald-50 border-accent-foreground dark:border-0'
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                        />
                    </div>

                    {/* Description using Jodit */}
                    <div className='ml-5 mt-4'>
                        <Label className='text-emerald-950 dark:text-emerald-50 mb-2 text-xl'>Description:</Label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1}
                            onBlur={newContent => setContent(newContent)}
                            onChange={() => { }} // optional
                            className='w-[850px] mt-1 mr-4 text-emerald-950 border-accent-foreground dark:border-0'
                        />
                    </div>

                    {/* Thumbnail Upload */}
                    <div className='ml-5 mt-4'>
                        <Label className='text-emerald-950 dark:text-emerald-50 mb-2 text-xl'>Thumbnail:</Label>
                        <Input
                            type="file"
                            className='w-[850px] mt-1 text-emerald-950 dark:text-emerald-50 border-accent-foreground dark:border-0'
                            onChange={(e) => setThumbnail(e.target.files[0])}
                        />
                    </div>

                    {/* Publish Button */}
                    <div className='space-x-3 mb-5'>
                        <Button onClick={handlePublish} className='ml-5 mt-4 w-[100px] bg-emerald-800 dark:bg-emerald-600 dark:border-0 dark:text-emerald-50 font-bold  text-emerald-50 hover:bg-emerald-950 hover:text-emerald-400 dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-emerald-500 hover:scale-105'>
                            Publish
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UpdateBlog