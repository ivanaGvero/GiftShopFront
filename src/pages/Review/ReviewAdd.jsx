
import { useEffect, useRef, useState } from "react";
import productService from "../../services/product.service";
import reviewService from "../../services/review.service";
import { useParams } from "react-router-dom";

export default function ReviewAdd() {
    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const ratingRef = useRef(null);
    const commentRef = useRef(null);
    const productRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await productService.getAll();
                setProducts(productsData.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const selectedProduct = products.find(p => p.productId === +id);
        productRef.current = selectedProduct;
    }, [id, products]);

    function save() {
        const comment = commentRef.current.value;
        const rating = ratingRef.current.value;
        const selectedProduct = productRef.current;
        
        if (!comment || !rating || !selectedProduct) {
            setError(true);
            return;
        }

        if (rating < 0 || rating > 5) {
            alert("Wrong value entered for rating");
            return;
        }

        reviewService.create({
            product: selectedProduct,
            rating,
            comment,
            user: {
                userId: localStorage.getItem('userId')
            }
        })
        .then(data => {
            console.log("Successfully saved");
            setError(false);
            alert("Successfully saved");
        })
        .catch(err => {
            console.error("Error saving review:", err);
            alert("Error saving review");
        });
    }

    return (
        <>
            

            <div className="text-center"> {}
    <div className="m-auto" style={{ maxWidth: "200px" }}> {}
        <img src='/rev.webp' alt='login' width={200} height={200} />
    </div>
</div>

            <div className="w-50 m-auto">
                <form>
                  
                    <div className="form-group mt-2">
                        <label>Rating</label>
                        <input type="number" ref={ratingRef} min={0} max={5} className="form-control" name="price" />
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
    );
}
