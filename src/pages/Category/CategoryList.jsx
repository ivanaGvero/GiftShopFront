import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom";
import FilterComponent from "../../components/Filter/FilterComponent";
import DataTable from "react-data-table-component";
import categoryService from "../../services/category.service";

export default function CategoryList() {

    const userRole = localStorage.getItem("role");

    //Const 
    const columns = [
        {
            name: 'Id',
            selector: row => row.categoryId,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.categoryName,
            sortable: true,
        },
        {
            cell:(row) => userRole && userRole === "ROLE_STAFF" && <Link className="btn btn-warning" to={"/category/edit/" + row.categoryId}>Edit</Link>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            cell:(row) => userRole && userRole === "ROLE_STAFF" && <button className="btn btn-danger" onClick={() => deleteRecord(row.categoryId)} id={row.categoryId}>Delete</button>,
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
       categoryService.getAll().then(response => {
        console.log(response.data)
        setData(response.data);
        setFilteredData(response.data);
       })
    }, []);

    useEffect(() => {
        setFilteredData(data.filter(item => item.categoryName.toLowerCase().includes(filterText.toLowerCase())));
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
        categoryService.delete(id).then(response => {
            const newData = data.filter(x => x.categoryId !== id);
            const newFilteredData = filteredData.filter(x => x.categoryId !== id);
            setData(newData);
            setFilteredData(newFilteredData);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <>
           {userRole && userRole === "ROLE_STAFF" && <div>
                <Link to="/category/add" className="btn btn-success">New category</Link>
            </div>}

            <div className="col-md-12">
            <DataTable
                    title="Category List"
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