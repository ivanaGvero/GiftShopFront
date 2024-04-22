import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
import staffService from "../../services/staff.service";

export default function StaffEdit() {


    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const positionRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await staffService.get(id);
            nameRef.current.value = response.data.user.name;
            surnameRef.current.value = response.data.user.surname;
            positionRef.current.value = response.data.position;
        }

        fetchData();
    }, []);

    const [error, setError] = useState(false);

    const {id} = useParams();

    function save() {
        
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const position = positionRef.current.value;
        
        if (!name || !surname || !position) {
            setError(true);
            return;
        }

        staffService.update(id, {
            user: {
                name,
                surname,
            },
            position,
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
            <h1>Edit staff</h1>

            <div className="w-50 m-auto">
                <form>
                    <div className="form-group mt-2">
                        <label>Name</label>
                        <input ref={nameRef} className="form-control" name="name" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Surname</label>
                        <input type="text" ref={surnameRef} className="form-control" name="surname" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Position</label>
                        <input type="text" ref={positionRef} className="form-control" name="position" />
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