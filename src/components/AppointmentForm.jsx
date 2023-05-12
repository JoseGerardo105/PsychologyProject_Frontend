import React, { useState, useEffect } from "react";
import { DateTimePicker } from "@material-ui/pickers";
import { Autocomplete } from "@material-ui/lab";
import { MenuItem } from "@material-ui/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  TextField,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
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
  formContainer: { display: "flex", justifyContent: "center" },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    "&:hover": { backgroundColor: "darkred" },
  },
}));
const AppointmentForm = ({
  onClose,
  onCreate,
  onUpdate,
  onUpdateWithButton,
  onDelete,
  selectedEvent,
  selectedDate,
  selectedEnd,
  allDay,
  patients,
  psychologists,
}) => {
  const classes = useStyles();
  const [patientId, setPatientId] = useState(
    selectedEvent ? selectedEvent.extendedProps.patient_id : null
  );
  const [psychologistId, setPsychologistId] = useState(
    selectedEvent ? selectedEvent.extendedProps.psychologist_id : null
  );
  const [status, setStatus] = useState(
    selectedEvent ? selectedEvent.extendedProps.status : ""
  );
  const [notes, setNotes] = useState(
    selectedEvent ? selectedEvent.extendedProps.notes : ""
  );
  const [price_cop, setPriceCop] = useState(
    selectedEvent ? selectedEvent.extendedProps.price_cop : ""
  );
  const [dateTime, setDateTime] = useState(
    selectedEvent ? selectedEvent.start.toISOString() : selectedDate
  );
  const [endDateTime, setEndDateTime] = useState(
    selectedEvent ? selectedEvent.end.toISOString() : selectedEnd
  );
  const [eventData, setEventData] = useState(null);

  console.log("patients:", patients);
  console.log("psychologists:", psychologists);
  useEffect(() => {
    if (selectedEvent) {
      setEventData({
        patientId: selectedEvent.extendedProps.patient_id,
        psychologistId: selectedEvent.extendedProps.psychologist_id,
        status: selectedEvent.extendedProps.status,
        notes: selectedEvent.extendedProps.notes,
        priceCop: selectedEvent.extendedProps.price_cop,
        start: selectedEvent.start.toISOString(),
        end: selectedEvent.end.toISOString(),
      });
    } else {
      setEventData(null);
    }
  }, [selectedEvent]);
  const [error, setError] = useState(null);
  const [notesError, setNotesError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [patientError, setPatientError] = useState("");
  const [priceCopError, setPriceCopError] = useState("");
  const [psychologistError, setPsychologistError] = useState("");
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
    let hasErrors = false;
    if (!psychologistId) {
      setPsychologistError("Por favor, selecciona un psicólogo.");
      hasErrors = true;
    } else {
      setPsychologistError("");
    }
    if (!patientId) {
      setPatientError("Por favor, selecciona un paciente.");
      hasErrors = true;
    } else {
      setPatientError("");
    }
    if (!isDateValid()) {
      setError(
        "La fecha de inicio no puede ser posterior a la fecha de finalización, y la duración del evento no puede ser superior a 7 días."
      );
      hasErrors = true;
    } else {
      setError("");
    }
    if (!status) {
      setStatusError("Por favor, seleccione el estado de la cita");
      hasErrors = true;
    } else {
      setStatusError("");
    }
    if (!notes) {
      setNotesError("Por favor, ingrese almenos una nota");
      hasErrors = true;
    } else {
      setNotesError("");
    }
    if (!price_cop) {
      setPriceCopError("Por favor, ingrese el precio de la consulta.");
      hasErrors = true;
    } else {
      setPriceCopError("");
    }
    if (!hasErrors) {
      if (selectedEvent) {
        onUpdateWithButton(selectedEvent, eventData);
      } else {
        const newPatient = patients.find((p) => p.id === patientId);
        const newPsychologist = psychologists.find(
          (p) => p.id === psychologistId
        );

        onCreate({
          patientId: newPatient,
          psychologistId: newPsychologist,
          start: dateTime,
          end: endDateTime,
          allDay,
          status: status,
          notes: notes,
          price_cop: price_cop,
        });
      }
      onClose();
    }
  };
  return (
    <div className={classes.formContainer}>
      {" "}
      <Dialog open onClose={onClose} maxWidth="md">
        {" "}
        <DialogTitle>
          {" "}
          {selectedEvent ? "Actualizar Cita" : "Crear Cita"}{" "}
        </DialogTitle>{" "}
        <DialogContent className={classes.dialogContent}>
          {" "}
          <form onSubmit={handleSubmit} className={classes.form}>
            {" "}
            <Autocomplete
              id="patientId"
              options={patients}
              getOptionLabel={(option) => (option ? option.name : "")}
              value={patients.find((p) => p.id === patientId) || null}
              onChange={(event, newValue) => {
                setPatientId(newValue ? newValue.id : null);
                if (newValue) {
                  setPatientError("");
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Paciente" variant="outlined" />
              )}
            />{" "}
            {patientError && (
              <FormHelperText error>{patientError}</FormHelperText>
            )}{" "}
            <Autocomplete
              id="psychologistId"
              options={psychologists}
              getOptionLabel={(option) => (option ? option.name : "")}
              value={psychologists.find((p) => p.id === psychologistId) || null}
              onChange={(event, newValue) => {
                setPsychologistId(newValue ? newValue.id : null);
                if (newValue) {
                  setPsychologistError("");
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Psicólogo" variant="outlined" />
              )}
            />
            {psychologistError && (
              <FormHelperText error>{psychologistError}</FormHelperText>
            )}{" "}
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
              onChange={(date) => {
                setDateTime(date.toISOString());
                if (isDateValid()) {
                  setError("");
                }
              }}
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
              onChange={(date) => {
                setEndDateTime(date.toISOString());
                if (isDateValid()) {
                  setError("");
                }
              }}
            />{" "}
            {error && (
              <FormHelperText className={classes.errorMessage} error>
                {" "}
                {error}{" "}
              </FormHelperText>
            )}{" "}
            <br />{" "}
            <FormControl className={classes.formControl}>
              {" "}
              <InputLabel id="status-label">Estado de la cita</InputLabel>{" "}
              <Select
                labelId="status-label"
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                required
              >
                {" "}
                <MenuItem value={"active"}>Activa</MenuItem>{" "}
                <MenuItem value={"cancelled"}>Cancelada</MenuItem>{" "}
                <MenuItem value={"in_progress"}>En progreso</MenuItem>{" "}
              </Select>{" "}
            </FormControl>{" "}
            {statusError && (
              <FormHelperText error>{statusError}</FormHelperText>
            )}{" "}
            <br />{" "}
            <TextField
              id="notes"
              label="Notas"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              variant="outlined"
              required
            />{" "}
            {notesError && <FormHelperText error>{notesError}</FormHelperText>}{" "}
            <br />{" "}
            <TextField
              id="price_cop"
              label="Precio Consulta"
              type="number"
              value={price_cop}
              onChange={(event) => {
                const value = event.target.value;
                if (value >= 0) {
                  setPriceCop(value);
                }
              }}
              variant="outlined"
              inputProps={{ min: 0, step: 100 }}
              required
            />{" "}
            {priceCopError && (
              <FormHelperText error>{priceCopError}</FormHelperText>
            )}{" "}
            <br />{" "}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          {selectedEvent && (
            <Button
              onClick={() => {
                onDelete(selectedEvent);
                onClose();
              }}
              className={classes.deleteButton}
              color="secondary"
            >
              Eliminar
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            className={classes.createButton}
            color="primary"
          >
            {selectedEvent ? "Actualizar Cita" : "Crear Cita"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AppointmentForm;
