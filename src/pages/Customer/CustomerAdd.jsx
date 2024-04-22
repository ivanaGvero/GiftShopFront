import { useEffect, useRef, useState } from "react"
//import addressService from "../../services/address.service";
import customerService from "../../services/customer.service";

export default function CustomerAdd() {

    //const [addresses, setAddresses] = useState([]);

    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const addressRef = useRef(null);
    const phoneRef = useRef(null);

    const [error, setError] = useState(false);

    /*useEffect(() => {
        const fetchData = async () => {
            const adressesData = await addressService.getAll();
            setAddresses(adressesData.data);
        }

        fetchData();
    }, []);
    */

    function save() {
        
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const phone = phoneRef.current.value;
        const address = addressRef.current.value;
        //const address = addresses.find(x => x.addressId === +addressRef.current.value);
        
        if (!name || !surname || !email || !username || !password || !address || !phone) {
            setError(true);
            return;
        }

        customerService.create({
            user: {
                name,
                surname,
                email,
                username,
                password,
            },
            phone,
            address
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
            <h1>New customer</h1>

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
                        <label>Phone</label>
                        <input type="text" ref={phoneRef} className="form-control" name="phone" />
                    </div>

                    <div className="form-group mt-2">
                        <label>Address</label>
                    <input type="text" ref={addressRef} className="form-control" name="address" />
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