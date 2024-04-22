import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import categoryService from "../../services/category.service";

export default function CategoryEdit() {


    const nameRef = useRef(null);

    const [error, setError] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        categoryService.get(id)
            .then(response => {
                nameRef.current.value = response.data.categoryName;
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function save() {
        
        const name = nameRef.current.value;
        
        if (!name) {
            setError(true);
            return;
        }

        categoryService.update(id, {
            categoryName: name
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
            <h1>Edit category</h1>

            <div className="w-50 m-auto">
                <form>
                    <div className="form-group mt-2">
                        <label>Name</label>
                        <input ref={nameRef} className="form-control" name="categoryName" />
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