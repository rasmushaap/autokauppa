import { AgGridReact } from "ag-grid-react"
import { useEffect, useState } from "react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {

    const [cars, setCars] = useState([{ brand: '', model: '' }])
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [msgSnackbar, setMsgSnackbar] = useState("")

    const [colDefs, setColDefs] = useState([
        { field: 'brand' },
        { field: 'model' },
        { field: 'color' },
        { field: 'fuel' },
        { field: 'year' },
        { field: 'price' },
        { cellRenderer: (params) => <EditCar updateCar={updateCar} params={params} />, width: 120},
        { cellRenderer: (params) => <Button size="small" color="error" onClick={() => deleteCar(params)}>Delete</Button>, width: 120 }
    ])

    useEffect(() => getCars, [])

    const getCars = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', { method: 'GET' })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(responseData => {
                console.log(responseData._embedded.cars)
                setCars(responseData._embedded.cars)
            })
            .catch(error => console.error(error))
    }

    const deleteCar = (params) => {
        console.log(params.data._links.car.href)
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.car.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setOpenSnackbar(true)
                        setMsgSnackbar("Delete OK!")
                        getCars()
                    }
                    else {
                        setOpenSnackbar(true)
                        setMsgSnackbar("Delete not OK!")
                    }
                })
                .catch(error => console.error(error))
        }

    }

    const addCar = (car) => {
        console.log("Carlist: addCar")
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            console.log(response)
            if(response.ok) {
                setMsgSnackbar("Auto lisätty onnistuneesti!")
                setOpenSnackbar(true)
                return response.json()
            } else {
                throw new Error("Datan vienti ei onnistunut")
            }
        })
        .then(data => {
            console.log("Data: " + data)
            getCars()
        })
    }

    const updateCar = (url, updatedCar) => {
        console.log("Carlist: updateCar")
        fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            console.log(response)
            if(response.ok) {
                setMsgSnackbar("Auto päivitetty onnistuneesti!")
                setOpenSnackbar(true)
                return response.json()
            } else {
                throw new Error("Datan vienti ei onnistunut")
            }
        })
        .then(data => {
            console.log("Data: " + data)
            getCars()
        })
    }

    return (
        <>
        <AddCar addCar={addCar}/>
            <div className="ag-theme-material" style={{ width: "100%", height: 500 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => {
                        setOpenSnackbar(false)
                        setMsgSnackbar("")
                    }}>

                </Snackbar>
            </div>
        </>
    )
}