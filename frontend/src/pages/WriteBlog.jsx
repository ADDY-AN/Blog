import { Label } from '../components/ui/label'
import { Card, CardContent, CardTitle } from '../components/ui/card'
import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../components/ui/select'
import { Button } from '../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setBlog, setloading } from '../redux/blogSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'


const WriteBlog = () => {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blog, loading } = useSelector(store => store.blog)

  const createBlogHandler = async () => {
    try {
      dispatch(setloading(true))
      const res = await axios.post(`https://blog-4w1y.onrender.com/api/v1/blog`, { title, category }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })

      if (res.data.success) {

        dispatch(setBlog([...blog, res.data.blog]))
        navigate(`/dashboard/write-blog/${res.data.blog._id}`, {
          state: {
            title: res.data.blog.title,
            category: res.data.blog.category,
          },
        })
        toast.success(res.data.message)
      } else {
        toast.error("Something Went Wrong.")
      }

    } catch (error) {
      console.log(error)
    }
    finally {
      dispatch(setloading(false))
    }
  }

  const getSelectedCategory = (value) => {
    setCategory(value)
  }

  return (
    <div className='pt-20 md:ml-[350px] md:h-screen bg-emerald-100 dark:bg-gradient-to-t from-emerald-950 to-gray-950 font-mono'>
      <div className='mt-4 flex justify-center'>
        <Card className='w-[900px] dark:bg-gray-950 bg-emerald-50 shadow-sm shadow-emerald-950 rounded-2xl dark:border-1 dark:border-emerald-950 '>
          <CardTitle className='text-emerald-100 text-center font-semibold'>
            <div className='text-emerald-950 dark:text-emerald-50 flex justify-center font-bold text-3xl'>
              Let's Write a Blog
            </div>
          </CardTitle>
          <CardContent>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label className='text-emerald-950 dark:text-emerald-50 ml-1 mb-2 text-xl'>
                    Title
                  </Label>
                  <Input placeholder="Today's Hot Topics..." className=' dark:border-0 text-emerald-950 dark:text-emerald-50 shadow-sm border-accent-foreground' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <Label className='text-emerald-950 dark:text-emerald-50 ml-1 mb-2 text-xl'>
                    Category
                  </Label>
                  <Select onValueChange={getSelectedCategory}>
                    <SelectTrigger className="w-[400px] shadow-sm border-accent-foreground dark:border-0 text-emerald-950 dark:text-emerald-50">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup >
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="AutoMobiles">Automobiles</SelectItem>
                        <SelectItem value="Blogging">Blogging</SelectItem>
                        <SelectItem value="Cooking">Cooking</SelectItem>
                        <SelectItem value="Travel">Travel</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>

                  <Button type="button" onClick={createBlogHandler} variant="outline" className='w-[100px] bg-emerald-800 dark:bg-emerald-600 dark:border-0 dark:text-emerald-50 font-bold  text-emerald-50 hover:bg-emerald-950 hover:text-emerald-400 dark:hover:bg-transparent dark:hover:border-2 dark:hover:border-emerald-500 hover:scale-105'>
                    {
                      loading ? <><Loader2 className='mr-1 h-4 w-4 animate-spin' />Please wait</> : "Create"
                    }
                  </Button>

                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WriteBlog