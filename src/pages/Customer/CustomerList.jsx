import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom";
import FilterComponent from "../../components/Filter/FilterComponent";
import DataTable from "react-data-table-component";
import customerService from "../../services/customer.service";

export default function CustomerList() {

    //Const 
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.user.name,
            sortable: true,
        },
        {
            name: 'Surname',
            selector: row => row.user.surname,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.user.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            cell:(row) => <Link className="btn btn-warning" to={"/customer/edit/" + row.id}>Edit</Link>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            cell:(row) => <button className="btn btn-danger" onClick={() => deleteRecord(row.id)} id={row.id}>Delete</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
      ];

    // States
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);	

    useEffect(() => {
       customerService.getAll().then(response => {
        console.log(response.data)
        setData(response.data);
        setFilteredData(response.data);
       })
    }, []);

    useEffect(() => {
        setFilteredData(data.filter(item => item.user.name.toLowerCase().includes(filterText.toLowerCase())));
      }, [filterText]);

    const searchMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText]);

    function deleteRecord(id) {
        customerService.delete(id).then(response => {
            const newData = data.filter(x => x.id !== id);
            const newFilteredData = filteredData.filter(x => x.id !== id);
            setData(newData);
            setFilteredData(newFilteredData);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
            <div>
                <Link to="/customer/add" className="btn btn-success">New Customer</Link>
            </div>

            <div className="col-md-12">
            <DataTable
                    title="Customer List"
                    columns={columns}
                    data={filteredData}
                    pagination
                    subHeader
                    subHeaderComponent={searchMemo}
                    selectableRows
                    persistTableHead
                />
        </div>  

        </>
    )
}