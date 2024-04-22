/*import { useEffect, useMemo, useState } from "react"
import FilterComponent from "../../components/Filter/FilterComponent";
import DataTable from "react-data-table-component";
import orderService from "../../services/order.service";

export default function OrderList() {

    //Const 
    const columns = [
        {
            name: 'Id',
            selector: row => row.orderId,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.orderDate,
            sortable: true,
        },
        {
            name: 'State',
            selector: row => row.orderStatus,
            sortable: true,
        },
        {
            name: 'Items',
            cell: (row) => (
                <ul>
                {row.orderItems.map((item, idx) => (
                    <li key={idx}>{item.product.name} - {item.quantity}x</li>
                    ))}
                </ul>
                )
        },
        {
            name: 'Total',
            selector: row => row.orderPrice,
            sortable: true,
        },
        {
            cell:(row) => row.orderStatus === 'CREATED' ? <button className="btn btn-warning" onClick={() => finishOrder(row.orderId)} id={row.orderId}>Finish</button> : <div></div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            cell:(row) => <button className="btn btn-danger" onClick={() => deleteRecord(row.orderId)} id={row.orderId}>Delete</button>,
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
       orderService.getAll().then(response => {
        console.log(response.data)
        setData(response.data);
        setFilteredData(response.data);
       })
    }, []);

    useEffect(() => {
        setFilteredData(data.filter(item => item.orderDate.toLowerCase().includes(filterText.toLowerCase())));
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
        orderService.delete(id).then(response => {
            const newData = data.filter(x => x.orderId !== id);
            const newFilteredData = filteredData.filter(x => x.orderId !== id);
            setData(newData);
            setFilteredData(newFilteredData);
        }).catch(err => {
            console.log(err);
        });
    }

    function finishOrder(id) {
        orderService.update(id, {
            orderStatus: "FINISHED"
        }).then(response => {
            setData(state => {
                state.forEach(x => {
                    if (x.orderId === +id) {
                        x.orderStatus = 'FINISHED'
                    }
                })
                return state;
            });
            setFilteredData([...filteredData]);
        }).catch(err => {
            alert("Update failed")
        });
    }

    return (
        <>

            <div className="col-md-12">
            <DataTable
                    title="Orders List"
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
*/
import { useEffect, useMemo, useState } from "react";
import FilterComponent from "../../components/Filter/FilterComponent";
import DataTable from "react-data-table-component";
import orderService from "../../services/order.service";

export default function OrderList() {

    //Const 
    const columns = [
        {
            name: 'Id',
            selector: row => row.orderId,
            sortable: true,
        },
        {
            name: 'Date',
            selector: row => row.orderDate,
            sortable: true,
        },
        {
            name: 'State',
            selector: row => row.orderStatus,
            sortable: true,
            cell: row => (
                <select
                    value={row.orderStatus}
                    onChange={(e) => handleStatusUpdate(row.orderId, e.target.value)}
                >
                    <option value="CREATED">Created</option>
                    <option value="PAYED">Payed</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="PREPARED">Prepared</option>
                    <option value="FINISHED">Finished</option>
                </select>
            )
        },
        {
            name: 'Items',
            cell: (row) => (
                <ul>
                {row.orderItems.map((item, idx) => (
                    <li key={idx}>{item.product.name} - {item.quantity}x</li>
                    ))}
                </ul>
                )
        },
        {
            name: 'Total',
            selector: row => row.orderPrice,
            sortable: true,
        },
        {
            cell:(row) => <button className="btn btn-danger" onClick={() => deleteRecord(row.orderId)} id={row.orderId}>Delete</button>,
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
        orderService.getAll().then(response => {
            console.log(response.data)
            setData(response.data);
            setFilteredData(response.data);
        })
    }, []);

    useEffect(() => {
        setFilteredData(data.filter(item => item.orderDate.toLowerCase().includes(filterText.toLowerCase())));
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
        orderService.delete(id).then(response => {
            const newData = data.filter(x => x.orderId !== id);
            const newFilteredData = filteredData.filter(x => x.orderId !== id);
            setData(newData);
            setFilteredData(newFilteredData);
        }).catch(err => {
            console.log(err);
        });
    }

    function handleStatusUpdate(orderId, newStatus) {
        orderService.update(orderId, { orderStatus: newStatus }).then(response => {
            const updatedData = data.map(order => {
                if (order.orderId === orderId) {
                    return { ...order, orderStatus: newStatus };
                }
                return order;
            });
            setData(updatedData);
            setFilteredData(updatedData);
        }).catch(error => {
            console.error('Failed to update status:', error);
        });
    }

    return (
        <>
            <div className="col-md-12">
                <DataTable
                    title="Orders List"
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

