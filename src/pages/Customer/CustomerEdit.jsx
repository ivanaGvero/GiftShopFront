import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom";
//import addressService from "../../services/address.service";
import customerService from "../../services/customer.service";

export default function CustomerEdit() {

    const [addresses, setAddresses] = useState([]);

    const nameRef = useRef(null);
    const surnameRef = useRef(null);
    const addressRef = useRef(null);
    const phoneRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            //const addressesData = await addressService.getAll();
            //setAddresses(addressesData.data);

            const response = await customerService.get(id);
            nameRef.current.value = response.data.user.name;
            surnameRef.current.value = response.data.user.surname;
            phoneRef.current.value = response.data.phone;
            addressRef.current.value = response.data.address;
        }

        fetchData();
    }, []);

    const [error, setError] = useState(false);

    const {id} = useParams();

    function save() {
        
        const name = nameRef.current.value;
        const surname = surnameRef.current.value;
        const phone = phoneRef.current.value;
        const address = addressRef.current.value;
        //const address = addresses.find(x => x.addressId === +addressRef.current.value);
        
        if (!name || !surname || !address || !phone) {
            setError(true);
            return;
        }

        customerService.update(id, {
            user: {
                name,
                surname,
            },
            phone,
            address
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
            <h1>Edit customer</h1>

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