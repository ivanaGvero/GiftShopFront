import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import productService from '../../services/product.service';
import brandService from '../../services/brand.service';
import categoryService from '../../services/category.service';

const ProductAdd = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lager, setLager] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(false);

    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const categoryRef = useRef(null);
    const brandRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const brands = await brandService.getAll();
            setBrands(brands.data);
            const categories = await categoryService.getAll();
            setCategories(categories.data);
        };

        fetchData();
    }, []);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const save = () => {

        const brand = brands.find(x => x.brandId === +brandRef.current.value);
        const category = categories.find(x => x.categoryId === +categoryRef.current.value);

        if (!name || !description || !price || !lager || !selectedImage || !brand || !category) {
            setError(true);
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('lager', lager);
        formData.append('brandId', brand.brandId);
        formData.append('categoryId', category.categoryId);
        
        productService.create(formData)
            .then((response) => {
                console.log(response.data);
                setError(false);
                alert('Product created successfully.');
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to create the product.');
            });
    };

    return (
        <>
            <h1>New Product</h1>

            <div className="w-50 m-auto">
                <form>
                    <div className="form-group mt-2">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group mt-2">
                        <label>Price</label>
                        <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label>Lager</label>
                        <input
                            type="number"
                            className="form-control"
                            value={lager}
                            onChange={(e) => setLager(e.target.value)}
                        />
                    </div>

                    <div className="form-group mt-2">
                        <label>Brand</label>
                        <select ref={brandRef} className="form-control">
                            {brands.map((b, idx) => (
                                <option key={idx} value={b.brandId}>{b.brandName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mt-2">
                        <label>Category</label>
                        <select ref={categoryRef} className="form-control">
                            {categories.map((c, idx) => (
                                <option key={idx} value={c.categoryId}>{c.categoryName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mt-2">
                        <label>Image</label>
                        <input type="file" onChange={handleImageChange} />
                    </div>

                    <div className="form-group mt-2">
                        <button type="button" className="btn btn-primary" onClick={save}>
                            Save
                        </button>
                    </div>

                    {error && <div className="mt-2 bg-danger text-center">All fields are required</div>}
                </form>
            </div>
        </>
    );
};

export default ProductAdd;