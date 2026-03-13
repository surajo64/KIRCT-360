import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import LoadingOverlay from "../components/loadingOverlay.jsx";

const ManageJobVacancies = () => {
    const { token, backendUrl } = useContext(AppContext);
    const [vacancies, setVacancies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "on going",
        sections: [{ heading: "", items: [""] }]
    });

    const fetchVacancies = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/get-job-vacancies`);
            if (data.success) setVacancies(data.vacancies);
        } catch (err) {
            toast.error("Failed to fetch vacancies");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSectionChange = (index, field, value) => {
        const updatedSections = [...formData.sections];
        updatedSections[index][field] = value;
        setFormData({ ...formData, sections: updatedSections });
    };

    const handleItemChange = (sIndex, iIndex, value) => {
        const updatedSections = [...formData.sections];
        updatedSections[sIndex].items[iIndex] = value;
        setFormData({ ...formData, sections: updatedSections });
    };

    const addSection = () => {
        setFormData({
            ...formData,
            sections: [...formData.sections, { heading: "", items: [""] }]
        });
    };

    const removeSection = (index) => {
        const updatedSections = formData.sections.filter((_, i) => i !== index);
        setFormData({ ...formData, sections: updatedSections });
    };

    const addItem = (sIndex) => {
        const updatedSections = [...formData.sections];
        updatedSections[sIndex].items.push("");
        setFormData({ ...formData, sections: updatedSections });
    };

    const removeItem = (sIndex, iIndex) => {
        const updatedSections = [...formData.sections];
        updatedSections[sIndex].items = updatedSections[sIndex].items.filter((_, i) => i !== iIndex);
        setFormData({ ...formData, sections: updatedSections });
    };

    const openAddModal = () => {
        setSelectedVacancy(null);
        setFormData({
            title: "",
            description: "",
            status: "on going",
            sections: [{ heading: "", items: [""] }]
        });
        setIsModalOpen(true);
    };

    const openEditModal = (vacancy) => {
        setSelectedVacancy(vacancy);
        setFormData({
            title: vacancy.title,
            description: vacancy.description || "",
            status: vacancy.status,
            sections: vacancy.sections.length > 0 ? vacancy.sections.map(s => ({
                heading: s.heading,
                items: [...s.items]
            })) : [{ heading: "", items: [""] }]
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (selectedVacancy) {
                const { data } = await axios.post(
                    `${backendUrl}/api/admin/update-job-vacancy`,
                    { id: selectedVacancy._id, ...formData },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (data.success) toast.success("Vacancy updated successfully!");
            } else {
                const { data } = await axios.post(
                    `${backendUrl}/api/admin/add-job-vacancy`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                if (data.success) toast.success("Vacancy added successfully!");
            }

            fetchVacancies();
            setIsModalOpen(false);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to save vacancy");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteVacancy = async (id) => {
        if (!window.confirm("Are you sure you want to delete this vacancy?")) return;
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/delete-job-vacancy`,
                { id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.success) {
                toast.success("Vacancy deleted successfully!");
                fetchVacancies();
            }
        } catch {
            toast.error("Failed to delete vacancy");
        }
    };

    const filteredVacancies = vacancies.filter(v =>
        v.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-blue-800 text-center mb-2">MANAGE JOB VACANCIES</h1>
            <p className="text-gray-600 text-center mb-6">Create and manage job postings</p>

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border px-4 py-2 w-full sm:w-1/2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                        onClick={openAddModal}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all flex items-center"
                    >
                        Add New Vacancy
                    </button>
                </div>

                <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                    <div className="bg-blue-600 text-white grid grid-cols-12 p-4 text-sm font-semibold">
                        <div className="col-span-1">#</div>
                        <div className="col-span-4">Title</div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-2">Created At</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {filteredVacancies.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">No vacancies found</div>
                    ) : (
                        filteredVacancies.map((vacancy, index) => (
                            <div key={vacancy._id} className="grid grid-cols-12 items-center p-4 border-b border-gray-100 hover:bg-white transition-colors">
                                <div className="col-span-1">{index + 1}</div>
                                <div className="col-span-4 font-semibold">{vacancy.title}</div>
                                <div className="col-span-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${vacancy.status === 'on going' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {vacancy.status}
                                    </span>
                                </div>
                                <div className="col-span-2 text-sm text-gray-600">{new Date(vacancy.createdAt).toLocaleDateString()}</div>
                                <div className="col-span-2 flex justify-end gap-2">
                                    <button onClick={() => openEditModal(vacancy)} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">Edit</button>
                                    <button onClick={() => deleteVacancy(vacancy._id)} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-blue-700 p-6 rounded-t-3xl flex justify-between items-center text-white">
                            <h2 className="text-xl font-bold">{selectedVacancy ? "Update Vacancy" : "Add Vacancy"}</h2>
                            <button onClick={() => setIsModalOpen(false)}>&times;</button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Job Title *</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border rounded-xl px-4 py-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Status *</label>
                                    <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded-xl px-4 py-2">
                                        <option value="on going">On Going</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Description (Optional)</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className="w-full border rounded-xl px-4 py-2"></textarea>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-gray-700">Content Sections</h3>
                                    <button type="button" onClick={addSection} className="text-blue-600 font-semibold">+ Add Section</button>
                                </div>

                                {formData.sections.map((section, sIndex) => (
                                    <div key={sIndex} className="p-4 border rounded-xl bg-gray-50 relative">
                                        <button type="button" onClick={() => removeSection(sIndex)} className="absolute top-2 right-2 text-red-500">Remove</button>
                                        <div className="mb-4">
                                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Section Heading *</label>
                                            <input
                                                type="text"
                                                value={section.heading}
                                                onChange={(e) => handleSectionChange(sIndex, 'heading', e.target.value)}
                                                required
                                                placeholder="e.g. Requirements, Responsibilities"
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Items *</label>
                                            {section.items.map((item, iIndex) => (
                                                <div key={iIndex} className="flex gap-2">
                                                    <textarea
                                                        value={item}
                                                        onChange={(e) => handleItemChange(sIndex, iIndex, e.target.value)}
                                                        required
                                                        rows="2"
                                                        placeholder="Add multiline details, bullets, or numbers..."
                                                        className="flex-1 border rounded-lg px-3 py-2"
                                                    ></textarea>
                                                    <button type="button" onClick={() => removeItem(sIndex, iIndex)} className="text-red-500">Trash</button>
                                                </div>
                                            ))}
                                            <button type="button" onClick={() => addItem(sIndex)} className="text-sm text-blue-600 font-medium">+ Add Item</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-xl">Cancel</button>
                                <button type="submit" disabled={isLoading} className="bg-blue-600 text-white px-8 py-2 rounded-xl font-semibold">
                                    {isLoading ? "Saving..." : "Save Vacancy"}
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

export default ManageJobVacancies;
