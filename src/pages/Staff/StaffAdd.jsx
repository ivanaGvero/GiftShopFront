import { useRef, useState } from "react"
import staffService from "../../services/staff.service";

export default function StaffAdd() {

    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const postionRef = useRef(null);

    const [error, setError] = useState(false);

    function save() {
        
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const position = postionRef.current.value;
        
        
        if (!name || !surname || !email || !username || !password  || !position) {
            setError(true);
            return;
        }

        staffService.create({
            user: {
                name,
                surname,
                email,
                username,
                password,
            },
            position,
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
            <h1>New staff</h1>

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
                        <label>Email</label>
                        <input type="email" ref={emailRef} className="form-control" name="email" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Username</label>
                        <input type="text" ref={usernameRef} className="form-control" name="username" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Password</label>
                        <input type="text" ref={passwordRef} className="form-control" name="username" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Position</label>
                        <input type="text" ref={postionRef} className="form-control" name="position" />
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