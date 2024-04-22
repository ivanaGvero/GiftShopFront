import { useEffect, useRef, useState } from "react"
import brandService from "../../services/brand.service";
import { useParams } from "react-router-dom";

export default function EditBrand() {


    const nameRef = useRef(null);

    const [error, setError] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        brandService.get(id)
            .then(response => {
                nameRef.current.value = response.data.brandName;
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

        brandService.update(id, {
            brandName: name
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
            <h1>Edit brand</h1>

            <div className="w-50 m-auto">
                <form>
                    <div className="form-group mt-2">
                        <label>Name</label>
                        <input ref={nameRef} className="form-control" name="brandName" />
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