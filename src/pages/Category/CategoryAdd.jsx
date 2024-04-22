import { useRef, useState } from "react"
import categoryService from "../../services/category.service";

export default function CategoryAdd() {

    const nameRef = useRef(null);

    const [error, setError] = useState(false);

    function save() {
        
        const name = nameRef.current.value;
        
        if (!name) {
            setError(true);
            return;
        }

        categoryService.create({
            categoryName: name
        })
        .then(data => {
            console.log("Successfully saved")
            setError(false);
            alert("Successfully saved");
        })
        .catch(err => {
            console.log(err)
            alert(err);
        })
    }

    return (
        <>
            <h1>New category</h1>

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