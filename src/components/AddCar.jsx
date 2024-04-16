import React from "react"
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AddCar(props) {

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
    }

    const handleSave = () => {
        console.log("AddCar: save a new car")
        props.addCar(car)
        setOpen(false)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>Add</Button>

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