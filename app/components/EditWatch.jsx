'use client'

import { useState } from "react"
import { updateWatch } from "../server-actions/updateWatch"

export default function EditWatch({ watch }) {
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        brand: watch.brand,
        model: watch.model,
        referenceNumber: watch.reference_number
    })
    
    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    return (
        <div>
            <button onClick={() => setShowModal(true)}
            className="bg-blue-500 rounded p-2 text-white">
                Edit
            </button>
            {
                showModal && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-6">
                        <div className="modal-content bg-gray-900 p-6 rounded-lg w-full max-w-md">
                            <span onClick={() => setShowModal(false)}>&times;</span>
                            <form action={updateWatch} onSubmit={() => setShowModal(false)}>
                                <input type="hidden" name="id" value={watch.id} />
                                <div>
                                    <label htmlFor="brand">Brand</label>
                                    <input type="text" name="brand" id="brand" 
                                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2"
                                    value={formData.brand} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="model">Model</label>
                                    <input type="text" name="model" id="model" 
                                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2"
                                    value={formData.model} onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="referenceNumber">Reference Number</label>
                                    <input type="text" name="referenceNumber" id="referenceNumber" 
                                    className="shadow appearance-none border border-gray-600 bg-gray-700 rounded w-full py-2"
                                    value={formData.referenceNumber} onChange={handleChange} />
                                </div>
                                <button type="submit"
                                className="bg-blue-500 rounded p-2 text-white">
                                    Update</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

