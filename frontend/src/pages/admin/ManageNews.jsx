import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Plus, Trash2, Calendar, FileText, ImagePlus, Type, Edit, Eye, EyeOff, X } from 'lucide-react'

const ManageNews = () => {
    const { backendUrl, atoken } = useContext(AppContext)
    const fileInputRef = useRef(null)

    const [editingId, setEditingId] = useState(null)
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [date, setDate] = useState('')
    const [status, setStatus] = useState(true)
    const [loading, setLoading] = useState(false)
    const [newsList, setNewsList] = useState([])

    // Multiple images: new files picked by user
    const [newImages, setNewImages] = useState([])           // File[]
    const [newImagePreviews, setNewImagePreviews] = useState([]) // Object URLs

    // When editing: images already saved on the server
    const [existingImages, setExistingImages] = useState([]) // URL strings

    const fetchNews = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/getNews', { headers: { atoken } })
            if (data.success) {
                setNewsList(data.news)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const editNews = (item) => {
        setEditingId(item._id)
        setTitle(item.title)
        setSummary(item.summary)
        setContent(item.content)
        setDate(item.date)
        setStatus(item.status)
        // Support both legacy `image` (string) and new `images` (array)
        const imgs = item.images && item.images.length ? item.images : (item.image ? [item.image] : [])
        setExistingImages(imgs)
        setNewImages([])
        setNewImagePreviews([])
        window.scrollTo(0, 0)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setTitle('')
        setSummary('')
        setContent('')
        setDate('')
        setStatus(true)
        setExistingImages([])
        clearNewImages()
    }

    const clearNewImages = () => {
        newImagePreviews.forEach(url => URL.revokeObjectURL(url))
        setNewImages([])
        setNewImagePreviews([])
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files)
        if (!files.length) return
        const previews = files.map(f => URL.createObjectURL(f))
        setNewImages(prev => [...prev, ...files])
        setNewImagePreviews(prev => [...prev, ...previews])
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const removeNewImage = (index) => {
        URL.revokeObjectURL(newImagePreviews[index])
        setNewImages(prev => prev.filter((_, i) => i !== index))
        setNewImagePreviews(prev => prev.filter((_, i) => i !== index))
    }

    const removeExistingImage = (index) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index))
    }

    const toggleStatus = async (item) => {
        try {
            const formData = new FormData()
            formData.append('id', item._id)
            formData.append('title', item.title)
            formData.append('summary', item.summary)
            formData.append('content', item.content)
            formData.append('date', item.date)
            formData.append('status', !item.status)
            const imgs = item.images && item.images.length ? item.images : (item.image ? [item.image] : [])
            imgs.forEach(url => formData.append('existingImages', url))

            const { data } = await axios.post(backendUrl + '/api/admin/update-news', formData, { headers: { atoken } })
            if (data.success) {
                toast.success("Status updated")
                fetchNews()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const totalImages = existingImages.length + newImages.length
            if (!editingId && totalImages === 0) {
                setLoading(false)
                return toast.error('At least one image is required')
            }
            if (editingId && totalImages === 0) {
                setLoading(false)
                return toast.error('At least one image must remain')
            }

            const formData = new FormData()
            formData.append('title', title)
            formData.append('summary', summary)
            formData.append('content', content)
            formData.append('date', date)
            formData.append('status', status)

            // Append newly picked files
            newImages.forEach(file => formData.append('images', file))

            let url = backendUrl + '/api/admin/add-news'

            if (editingId) {
                url = backendUrl + '/api/admin/update-news'
                formData.append('id', editingId)
                // Send kept existing images so backend can preserve them
                existingImages.forEach(imgUrl => formData.append('existingImages', imgUrl))
            }

            const { data } = await axios.post(url, formData, { headers: { atoken } })

            if (data.success) {
                toast.success(data.message)
                cancelEdit()
                fetchNews()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setLoading(false)
    }

    const deleteNews = async (id) => {
        try {
            if (confirm("Are you sure you want to delete this news?")) {
                const { data } = await axios.post(backendUrl + '/api/admin/delete-news', { id }, { headers: { atoken } })
                if (data.success) {
                    toast.success(data.message)
                    fetchNews()
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchNews()
    }, [])

    const totalImageCount = existingImages.length + newImages.length

    return (
        <div className='m-5 w-full'>
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Manage News</h1>
                <p className="text-gray-500">Post updates and news for the public website. Toggle status to hide/show.</p>
            </div>

            <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl shadow-sm mb-10">
                <form onSubmit={onSubmitHandler} className='flex flex-col gap-6'>

                    <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-lg font-semibold text-gray-700">{editingId ? 'Edit News' : 'Add New Post'}</h2>
                        {editingId && <button type='button' onClick={cancelEdit} className="text-sm text-red-500 hover:text-red-700">Cancel Edit</button>}
                    </div>

                    {/* Title */}
                    <div className='flex flex-col gap-2'>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <Type size={16} /> Post Title
                        </label>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className='border rounded px-3 py-2 outline-blue-500'
                            type="text"
                            placeholder='e.g. New Research Grant Awarded'
                            required
                        />
                    </div>

                    {/* Summary */}
                    <div className='flex flex-col gap-2'>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <FileText size={16} /> Summary (Short Description)
                        </label>
                        <textarea
                            onChange={(e) => setSummary(e.target.value)}
                            value={summary}
                            className='border rounded px-3 py-2 outline-blue-500'
                            rows={2}
                            placeholder='Brief summary for the card view...'
                            required
                        />
                    </div>

                    {/* Content */}
                    <div className='flex flex-col gap-2'>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <FileText size={16} /> Full Content
                        </label>
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            className='border rounded px-3 py-2 outline-blue-500'
                            rows={6}
                            placeholder='Full details of the news...'
                            required
                        />
                    </div>

                    {/* Date */}
                    <div className='flex flex-col gap-2'>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <Calendar size={16} /> Date
                        </label>
                        <input
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                            className='border rounded px-3 py-2 outline-blue-500 w-full md:w-64'
                            type="date"
                            required
                        />
                    </div>

                    {/* Images Section */}
                    <div className='flex flex-col gap-3'>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <ImagePlus size={16} />
                            Images&nbsp;
                            <span className="text-gray-400 font-normal">
                                ({totalImageCount} selected{editingId ? ', optional to change' : ', at least 1 required'})
                            </span>
                        </label>

                        {/* Thumbnail grid */}
                        {totalImageCount > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {/* Existing server images (edit mode) */}
                                {existingImages.map((url, idx) => (
                                    <div key={'ex-' + idx} className="relative w-24 h-24 rounded overflow-hidden border bg-gray-100 group">
                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(idx)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove"
                                        >
                                            <X size={12} />
                                        </button>
                                        {idx === 0 && existingImages.length + newImages.length > 1 && (
                                            <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5">Cover</span>
                                        )}
                                    </div>
                                ))}

                                {/* New local image previews */}
                                {newImagePreviews.map((url, idx) => (
                                    <div key={'new-' + idx} className="relative w-24 h-24 rounded overflow-hidden border bg-gray-100 group">
                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(idx)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove"
                                        >
                                            <X size={12} />
                                        </button>
                                        {existingImages.length === 0 && idx === 0 && newImages.length > 1 && (
                                            <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5">Cover</span>
                                        )}
                                    </div>
                                ))}

                                {/* Add more button */}
                                <label
                                    htmlFor="images-input"
                                    className="w-24 h-24 rounded border-2 border-dashed border-blue-300 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 text-blue-400 transition-colors"
                                    title="Add more images"
                                >
                                    <ImagePlus size={22} />
                                    <span className="text-[11px] mt-1">Add more</span>
                                </label>
                            </div>
                        )}

                        {/* Upload button (shown when no images yet) */}
                        {totalImageCount === 0 && (
                            <label
                                htmlFor="images-input"
                                className="flex items-center gap-3 cursor-pointer border-2 border-dashed border-blue-200 rounded-lg px-4 py-5 hover:bg-blue-50 transition-colors"
                            >
                                <ImagePlus className="text-blue-400" size={28} />
                                <div>
                                    <p className="text-blue-600 font-medium text-sm">Click to upload images</p>
                                    <p className="text-gray-400 text-xs">JPG, PNG, WEBP — up to 10 images</p>
                                </div>
                            </label>
                        )}

                        <input
                            ref={fileInputRef}
                            onChange={handleImageSelect}
                            type="file"
                            id="images-input"
                            accept="image/*"
                            multiple
                            hidden
                        />
                    </div>

                    {/* Status Checkbox for Edit Mode */}
                    {editingId && (
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="status"
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                                className="w-5 h-5 text-blue-600"
                            />
                            <label htmlFor="status" className="text-gray-700 font-medium cursor-pointer">Published (Visible to Public)</label>
                        </div>
                    )}

                    <button type='submit' className='bg-blue-600 w-full md:w-auto md:self-start text-white px-8 py-3 rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'>
                        {loading ? 'Processing...' : <>{editingId ? <Edit size={18} /> : <Plus size={18} />} {editingId ? 'Update News' : 'Add News'}</>}
                    </button>
                </form>
            </div>

            {/* News List */}
            <div className="w-full max-w-4xl">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Published News</h2>
                <div className="grid grid-cols-1 gap-4">
                    {newsList.map((item, index) => {
                        const coverImg = (item.images && item.images.length) ? item.images[0] : item.image
                        const imgCount = (item.images && item.images.length) ? item.images.length : 1
                        return (
                            <div key={index} className={`bg-white border rounded p-4 flex flex-col md:flex-row gap-4 items-start md:items-center ${!item.status ? 'opacity-70 bg-gray-50' : ''}`}>
                                <div className="relative">
                                    <img src={coverImg} alt="" className="w-24 h-16 object-cover rounded bg-gray-100" />
                                    {!item.status && <div className="absolute inset-0 bg-black/10 flex items-center justify-center rounded"><EyeOff className="text-gray-600" size={20} /></div>}
                                    {imgCount > 1 && (
                                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                            +{imgCount - 1}
                                        </span>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                                        {!item.status && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Hidden</span>}
                                    </div>
                                    <p className="text-sm text-gray-500">{item.date} • {item.summary.substring(0, 60)}... • <span className="text-blue-500">{imgCount} image{imgCount !== 1 ? 's' : ''}</span></p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => toggleStatus(item)}
                                        className={`p-2 rounded transition-colors ${item.status ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                        title={item.status ? "Deactivate" : "Activate"}
                                    >
                                        {item.status ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </button>
                                    <button
                                        onClick={() => editNews(item)}
                                        className="text-blue-600 hover:bg-blue-50 p-2 rounded transition-colors"
                                        title="Edit News"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteNews(item._id)}
                                        className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                                        title="Delete News"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    {newsList.length === 0 && <p className="text-gray-500 text-center py-8">No news published yet.</p>}
                </div>
            </div>
        </div>
    )
}

export default ManageNews
