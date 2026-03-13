import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import LoadingOverlay from "../components/loadingOverlay.jsx";

const ManageNews = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    summary: "",
    content: "",
  });

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/getNews`);
      if (data.success) setNewsList(data.news);
    } catch (err) {
      toast.error("Failed to fetch news");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setSelectedNews(null);
    setFormData({ title: "", date: "", summary: "", content: "" });
    setImagePreview(null);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (news) => {
    setSelectedNews(news);
    setFormData({
      title: news.title,
      date: news.date,
      summary: news.summary,
      content: news.content,
    });
    setImagePreview(news.image);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();

      // Append form data
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });

      // Append image if selected
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      if (selectedNews) {
        // Update existing news
        const { data } = await axios.put(
          `${backendUrl}/api/admin/update/${selectedNews._id}`,
          submitData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if (data.success) toast.success("News updated successfully!");
      } else {
        // Create new news
        const { data } = await axios.post(
          `${backendUrl}/api/admin/addNews`,
          submitData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if (data.success) toast.success("News added successfully!");
      }

      fetchNews();
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(err.response?.data?.message || "Failed to save news");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", date: "", summary: "", content: "" });
    setImagePreview(null);
    setImageFile(null);
    setSelectedNews(null);
  };

  const toggleStatus = async (id) => {
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/admin/toggle/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.info(data.message);
        fetchNews();
      }
    } catch {
      toast.error("Failed to toggle status");
    }
  };

  const deleteNews = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news?")) {
      return;
    }

    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/admin/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success("News deleted successfully!");
        fetchNews();
      }
    } catch {
      toast.error("Failed to delete news");
    }
  };

  // Filter applications by name or department
  const filtereNews = newsList.filter(
    (a) =>
      a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-blue-800 text-center mb-2">
          MANAGE NEWS
        </h1>
        <p className="text-gray-600 text-center mb-6">Create, edit, and manage your news articles</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">

          {/* Search bar and Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-6 sm:mb-0 gap-6">
            <input
              type="text"
              placeholder="Search by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 w-full sm:w-1/2 lg:w-2/5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-200"
            />

            <button
              onClick={openAddModal}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center sm:ml-6 mt-4 sm:mt-0"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New News
            </button>
          </div>
        </div>


        {/* News List */}
        <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-blue-600 text-white grid grid-cols-12 p-4 border-b border-gray-200 text-sm font-semibold text-gray-700">
            <div className="col-span-1">#</div>
            <div className="col-span-2">Image</div>
            <div className="col-span-3">Title</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {filtereNews.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v3m0-3a2 2 0 012-2h2a2 2 0 012 2m-6 5v6m4-3H9" />
              </svg>
              <p className="text-lg">No news articles found</p>
              <p className="text-sm">Get started by adding your first news article</p>
            </div>
          ) : (
            filtereNews.map((news, index) => (
              <div
                key={news._id}
                className="grid grid-cols-12 items-center p-4 border-b border-gray-100 hover:bg-white transition-colors duration-150"
              >
                <div className="col-span-1 text-gray-600 font-medium">{index + 1}</div>
                <div className="col-span-2">
                  {news.image && (
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                  )}
                </div>
                <div className="col-span-3">
                  <div className="font-semibold text-gray-800 truncate">{news.title}</div>
                  <div className="text-sm text-gray-500 truncate">{news.summary}</div>
                </div>
                <div className="col-span-2 text-gray-600">{news.date}</div>

                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${news.status
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}
                  >
                    {news.status ? "Active" : "Disabled"}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end space-x-2">
                  <button
                    onClick={() => openEditModal(news)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-200 tooltip"
                    title="Edit News"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => toggleStatus(news._id)}
                    className={`p-2 rounded-lg transition-colors duration-200 tooltip ${news.status
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                    title={news.status ? "Disable News" : "Enable News"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {news.status ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      )}
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteNews(news._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-200 tooltip"
                    title="Delete News"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div
            className="bg-white/95 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-blue-100 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-700 to-blue-600 p-6 rounded-t-3xl flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                {selectedNews ? "Update News Article" : "Create New News Article"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/80 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      News Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="Enter news title"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Summary *
                    </label>
                    <textarea
                      name="summary"
                      value={formData.summary}
                      onChange={handleChange}
                      required
                      placeholder="Brief summary of the news"
                      rows="3"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      News Image *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 text-center hover:border-blue-400 transition-colors bg-gray-50/50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                        required={!selectedNews}
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {imagePreview ? (
                          <div className="space-y-2">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-40 object-cover rounded-xl shadow-md"
                            />
                            <p className="text-sm text-blue-600 font-medium">
                              Click to change image
                            </p>
                          </div>
                        ) : (
                          <div className="py-8">
                            <svg
                              className="w-12 h-12 text-gray-400 mx-auto mb-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-sm text-gray-600 font-medium">
                              Click to upload an image
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              PNG, JPG, JPEG up to 5MB
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="Write the full news content here..."
                  rows="6"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:brightness-110 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
                    1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {selectedNews ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {selectedNews ? "Update News" : "Create News"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default ManageNews;