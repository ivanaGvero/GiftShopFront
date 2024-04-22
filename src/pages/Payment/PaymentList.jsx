import { useEffect, useMemo, useState } from "react"
import FilterComponent from "../../components/Filter/FilterComponent";
import DataTable from "react-data-table-component";
import paymentService from "../../services/payment.service";

export default function PaymentList() {

    //Const 
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Customer',
            selector: row => row.userEmail,
            sortable: true,
        },
        {
            name: 'Customer Address',
            selector: row => row.userAddress,
            sortable: true,
        },
        {
            name: 'Currency',
            selector: row => row.currency,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: row => row.amount,
            sortable: true,
        },
      ];

    // States
    const [data, setData] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState([]);	

    useEffect(() => {
       paymentService.getAll().then(response => {
        console.log(response.data)
        setData(response.data);
        setFilteredData(response.data);
       })
    }, []);

    useEffect(() => {
        setFilteredData(data.filter(item => item.email?.toLowerCase()?.includes(filterText.toLowerCase())));
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


    return (
        <>
            <div className="col-md-12">
            <DataTable
                    title="Stripe Payments List"
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