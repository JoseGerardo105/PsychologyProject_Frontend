import React, { useState } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  TextField,
  FormHelperText,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "auto",
  },
  formControl: { marginTop: theme.spacing(2), minWidth: 200 },
  formControlLabel: { marginTop: theme.spacing(1) },
  createButton: {
    backgroundColor: "#130663",
    color: "white",
    "&:hover": { backgroundColor: "#0a044c" },
    marginRight: theme.spacing(1),
  },
  dialogContent: {
    minWidth: "350px",
    maxHeight: "400px",
    overflowY: "auto", //scroll vertical auto
  },
  errorMessage: {
    wordBreak: "break-word",
    whiteSpace: "normal",
    maxWidth: "280px",
  },
  formContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));
const AppointmentForm = ({
  onClose,
  onCreate,
  selectedDate,
  selectedEnd,
  allDay,
  patients,
}) => {
  const classes = useStyles();
  const [patientId, setPatientId] = useState("");
  const [dateTime, setDateTime] = useState(selectedDate);
  const [endDateTime, setEndDateTime] = useState(selectedEnd);
  const [error, setError] = useState(null);
  const isDateValid = () => {
    const startDate = new Date(dateTime);
    const endDate = new Date(endDateTime);
    const diffInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
    if (startDate > endDate || diffInDays > 7) {
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDateValid()) {
      setError(
        "La fecha de inicio no puede ser posterior a la fecha de finalización, y la duración del evento no puede ser superior a 7 días."
      );
      return;
    }
    onCreate({ patientId, start: dateTime, end: endDateTime, allDay });
    onClose();
  };
  return (
    <div className={classes.formContainer}>
      <Dialog open onClose={onClose} maxWidth="md">
        {" "}
        <DialogTitle>Crear cita</DialogTitle>{" "}
        <DialogContent className={classes.dialogContent}>
          {" "}
          <form onSubmit={handleSubmit} className={classes.form}>
            {" "}
            <Autocomplete
              id="patientId"
              options={patients} // Aquí debes proporcionar la lista de pacientes obtenida de la base de datos
              getOptionLabel={(option) => (option ? option.name : "")} // Asume que cada paciente tiene una propiedad 'name'
              value={patientId}
              onChange={(event, newValue) => setPatientId(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Paciente" variant="outlined" />
              )}
            />{" "}
            <br />{" "}
            <TextField
              id="selectedDate"
              label="Fecha y hora de inicio"
              value={new Date(selectedDate).toLocaleString()}
              InputProps={{ readOnly: true }}
            />{" "}
            <br />{" "}
            <DateTimePicker
              id="dateTime"
              label="Editar fecha y hora de inicio"
              inputVariant="outlined"
              value={dateTime}
              onChange={(date) => setDateTime(date.toISOString())}
            />{" "}
            <br />{" "}
            <TextField
              id="selectedEndDate"
              label="Fecha y hora de fin"
              value={new Date(selectedEnd).toLocaleString()}
              InputProps={{ readOnly: true }}
            />{" "}
            <br />{" "}
            <DateTimePicker
              id="endDateTime"
              label="Editar fecha y hora de fin"
              inputVariant="outlined"
              value={endDateTime}
              onChange={(date) => setEndDateTime(date.toISOString())}
            />{" "}
            <br />{" "}
            {error && (
              <FormHelperText className={classes.errorMessage} error>
                {error}{" "}
              </FormHelperText>
            )}{" "}
          </form>{" "}
        </DialogContent>{" "}
        <DialogActions>
          {" "}
          <Button onClick={onClose} color="primary">
            {" "}
            Cancelar{" "}
          </Button>{" "}
          <Button
            onClick={handleSubmit}
            className={classes.createButton}
            color="primary"
          >
            {" "}
            Crear cita{" "}
          </Button>{" "}
        </DialogActions>{" "}
      </Dialog>
    </div>
  );
};
export default AppointmentForm;
