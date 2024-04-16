import React from "react"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {

    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    })

    //open = false, kun ikkuna on kiinni
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            year: props.params.data.year,
            price: props.params.data.price

        })
    }

    const handleSave = () => {
        console.log("EditCar: update car information")
        props.updateCar(props.params.data._links.car.href, car)
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open}>
                <DialogTitle>
                    Add Car
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Brand"
                        value={car.brand}
                        onChange={(e) => setCar({ ...car, brand: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Model"
                        value={car.model}
                        onChange={(e) => setCar({ ...car, model: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Color"
                        value={car.color}
                        onChange={(e) => setCar({ ...car, color: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Fuel"
                        value={car.fuel}
                        onChange={(e) => setCar({ ...car, fuel: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Year"
                        value={car.year}
                        onChange={(e) => setCar({ ...car, year: e.target.value })}
                        variant="standard"
                        fullWidth />

                    <TextField
                        margin="dense"
                        label="Price"
                        value={car.price}
                        onChange={(e) => setCar({ ...car, price: e.target.value })}
                        variant="standard"
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}