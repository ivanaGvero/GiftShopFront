import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import productService from "../../services/product.service";
import reviewService from "../../services/review.service";

export default function ReviewEdit() {

    const [products, setProducts] = useState([]);

    const ratingRef = useRef(null);
    const productRef = useRef(null);
    const commentRef = useRef(null);

    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const productsData = await productService.getAll();
            setProducts(productsData.data);

            const response = await reviewService.get(id);
            ratingRef.current.value = response.data.rating;
            productRef.current.value = response.data.product.productId;
            commentRef.current.value = response.data.comment;
        }

        fetchData();
    }, []);

    const {id} = useParams();

    function save() {
        
        const comment = commentRef.current.value;
        const rating = ratingRef.current.value;
        const product = products.find(x => x.productId === +productRef.current.value);
        
        if (!comment || !rating || !product) {
            setError(true);
            return;
        }

        reviewService.update(id, {
            product,
            rating,
            comment,
        })
        .then(data => {
            console.log("Successfully updated")
            setError(false);
            alert("Successfully updated");
        })
        .catch(err => {
            console.log(err)
            alert(err);
        })
    }

    return (
        <>
            <h1>Edit review</h1>

            <div className="w-50 m-auto">
                <form>
                    <div className="form-group mt-2">
                        <label>Product</label>
                        <select ref={productRef} className="form-control">
                            {products.map((p, idx) => (
                                <option key={idx} value={p.productId}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group mt-2">
                        <label>Rating</label>
                        <input type="number" ref={ratingRef} className="form-control" name="price" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Comment</label>
                        <textarea ref={commentRef} className="form-control"></textarea>
                    </div>
                   
                    <div className="form-group mt-2">
                        <button type="button" className="btn btn-primary" onClick={save}>Save</button>
                    </div>

                    {error && <div className="mt-2 bg-danger text-center">All fields are required</div>}
                </form>
            </div>
        </>
    )
}