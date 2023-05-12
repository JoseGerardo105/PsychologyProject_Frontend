import React, { createRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { formatDate } from "@fullcalendar/core";
import esLocale from "@fullcalendar/core/locales/es";
import AppointmentForm from "../components/AppointmentForm";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axiosClient from '../config/axios';


const useStyles = makeStyles((theme) => ({
  homeContainer: {
    width: "80%",
    height: "80vh",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100vh",
    },
  },
}));

class Home extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
    locale: "es", //español por defecto
    showAppointmentForm: false,
    selectedDate: null,
    patients: [],
    psychologists: [],
    appointments: [],
  };

  componentDidMount() {
    Promise.all([this.fetchPatients(), this.fetchPsychologists()]).then(() => {
      this.fetchAppointments();
    });
  }

  handleEventDidMount = (eventInfo) => {
    const status = eventInfo.event.extendedProps.status;
    const eventElement = eventInfo.el;

    switch (status) {
      case "active":
        eventElement.style.backgroundColor = "#130663";
        break;
      case "in_progress":
        eventElement.style.backgroundColor = "green";
        break;
      case "cancelled":
        eventElement.style.backgroundColor = "red";
        break;
      default:
        break;
    }
  };

  fetchAppointments = async () => {
    try {

      const response = await axiosClient.get(
        "/psychologists/get-appointments"
      );
      const appointments = response.data;
      console.log("Citas Cargadas cargados: ", appointments);
      const calendarEvents = appointments.map((appointment) => {
        // Encuentra el paciente correspondiente al patient_id
        const patient = this.state.patients.find(
          (p) => p.id === appointment.patient_id
        );
        // Utiliza el nombre del paciente en el título del evento
        const title = patient
          ? `Cita con  ${patient.name}`
          : `Cita con  ${appointment.patient_id}`;

        return {
          id: appointment.id,
          title,
          start: new Date(appointment.start_time),
          end: new Date(appointment.end_time),
          status: appointment.status,
        };
      });
      this.setState({ currentEvents: calendarEvents });
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };

  fetchPatients = async () => {
    try {
      const response = await axiosClient.get(
        "/psychologists/get-patients"
      );
      const patients = response.data;
      this.setState({ patients });
      console.log("Pacientes cargados: ", patients);
      return patients;
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
    }
  };

  fetchPsychologists = async () => {
    try {
      const response = await axiosClient.get(
        "/psychologists/get-psychologists"
      );
      const psychologists = response.data;
      this.setState({ psychologists });
      console.log("Psicologos cargados: ", psychologists);
      return psychologists;
    } catch (error) {
      console.error("Error al obtener los Psicólogos:", error);
    }
  };

  calendarRef = createRef();

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    this.setState({
      selectedEvent: null,
      selectedDate: selectInfo.startStr,
      selectedEnd: selectInfo.endStr,
      allDay: selectInfo.allDay,
      showAppointmentForm: true,
    });
  };
  handleEventDrop = async (info) => {
    const newStartTime = info.event.start.toISOString();
    const newEndTime = info.event.end.toISOString();
    const eventId = info.event.id;
    const status = info.event.extendedProps.status;
    const notes = info.event.extendedProps.notes;
    const price_cop = info.event.extendedProps.price_cop;

    try {
      await axiosClient.patch(
        `/psychologists/update-appointment/${eventId}`,
        {
          start_time: newStartTime,
          end_time: newEndTime,
          status,
          notes,
          price_cop,
        }
      );
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
    }
  };
  handleCloseAppointmentForm = () => {
    this.setState({
      showAppointmentForm: false,
      selectedDate: null,
    });
  };

  handleCreateAppointment = async (formData) => {
    const {
      patientId,
      psychologistId,
      start,
      end,
      allDay,
      status,
      notes,
      price_cop,
    } = formData;
    try {
      await axiosClient.post(
        "/psychologists/create-appointment",
        {
          patient_id: patientId.id,
          psychologist_id: psychologistId.id,
          start_time: start,
          end_time: end,
          status: status,
          notes: notes,
          price_cop: price_cop,
        }
      );
      console.log('cita creada')
    } catch (error) {
      console.error("Error al crear la cita:", error);
    }
    const calendarApi = this.calendarRef.current.getApi();
    const newEvent = {
      title: `Cita con ${patientId.name}`,
      start,
      end,
      allDay,
      status,
      notes,
      price_cop,
    };
    calendarApi.addEvent(newEvent);

    this.setState({
      currentEvents: [...this.state.currentEvents, newEvent],
    });
  };

  handleDeleteAppointment = async (selectedEvent) => {
    const eventId = selectedEvent.id;

    try {
      await axiosClient.delete(
        `/psychologists/delete-appointment/${eventId}`
      );
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }

    const calendarApi = this.calendarRef.current.getApi();
    selectedEvent.remove();
  };

  handleUpdateAppointment = async (selectedEvent, updatedData) => {
    const eventId = selectedEvent.id;
    try {
      await axiosClient.patch(
        `/psychologists/update-appointment-form/${eventId}`,
        {
          start_time: updatedData.start,
          end_time: updatedData.end,
          status: updatedData.status,
          notes: updatedData.notes,
          price_cop: updatedData.price_cop,
        }
      );
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
    }
    const calendarApi = this.calendarRef.current.getApi();
    selectedEvent.setProp(
      "title",
      `Cita con paciente ${updatedData.patient.name}`
    );
    selectedEvent.setStart(updatedData.start);
    selectedEvent.setEnd(updatedData.end);
    selectedEvent.setExtendedProp("status", updatedData.status);
    selectedEvent.setExtendedProp("notes", updatedData.notes);
    selectedEvent.setExtendedProp("price_cop", updatedData.price_cop);
    calendarApi.updateEvent(selectedEvent);
  };

  handleUpdateAppointmentWithButton = async (selectedEvent, updatedData) => {
    const eventId = selectedEvent.id;
    try {
      await axiosClient.patch(
        `/psychologists/update-appointment/${eventId}`,
        {
          start_time: updatedData.start,
          end_time: updatedData.end,
          status: updatedData.status,
          notes: updatedData.notes,
          price_cop: updatedData.price_cop,
        }
      );
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
    }
    const calendarApi = this.calendarRef.current.getApi();
    selectedEvent.setProp(
      "title",
      `Cita con paciente ${updatedData.patient?.name}`
    );
    selectedEvent.setStart(updatedData.start);
    selectedEvent.setEnd(updatedData.end);
    selectedEvent.setExtendedProp("status", updatedData.status);
    selectedEvent.setExtendedProp("notes", updatedData.notes);
    selectedEvent.setExtendedProp("price_cop", updatedData.price_cop);
    calendarApi.refetchEvents();
  };

  handleEventClick = (clickInfo) => {
    this.setState({
      selectedEvent: clickInfo.event,
      selectedDate: clickInfo.event.start.toISOString(),
      selectedEnd: clickInfo.event.end.toISOString(),
      showAppointmentForm: true,
    });
  };

  handleLenguageChange = () => {
    this.setState({
      locale: this.state.locale === "es" ? "en" : "es",
    });
  };

  render() {
    const { classes } = this.props;
    const { currentEvents } = this.state;
    return (
      <div>
        <div className={classes.homeContainer}>
          <FullCalendar
            ref={this.calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "timeGridDay,timeGridWeek,dayGridMonth,listDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={currentEvents}
            select={this.handleDateSelect}
            eventDrop={this.handleEventDrop}
            eventContent={renderEventContent}
            eventClick={this.handleEventClick}
            eventDidMount={this.handleEventDidMount}
            //eventColor="#130663"
            eventTextColor="#FFFFFF"
            eventBorderColor="#000000"
            height={"100vh"}
            locales={[esLocale]}
            locale={this.state.locale}
          />
          {this.state.showAppointmentForm && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <AppointmentForm
                open={this.state.showAppointmentForm}
                onClose={this.handleCloseAppointmentForm}
                onCreate={this.handleCreateAppointment}
                onUpdate={this.handleUpdateAppointment}
                onUpdateWithButton={this.handleUpdateAppointmentWithButton}
                onDelete={this.handleDeleteAppointment}
                selectedDate={this.state.selectedDate}
                selectedEnd={this.state.selectedEnd}
                allDay={this.state.allDay}
                patients={this.state.patients}
                psychologists={this.state.psychologists}
                selectedEvent={this.state.selectedEvent}
              />
            </MuiPickersUtilsProvider>
          )}
        </div>
      </div>
    );
  }
}

function renderEventContent(eventInfo) {
  // Formatear la fecha y hora de inicio y finalización
  const startTime = formatDate(eventInfo.event.start, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const endTime = formatDate(eventInfo.event.end, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div style={{ color: "white", fontSize: "0.6rem" }}>
      <div>
        <b>{`${startTime} - ${endTime}`}</b>
      </div>
      <div>
        <i>{eventInfo.event.title}</i>
      </div>
    </div>
  );
}

export default function HomeWithStyles(props) {
  const classes = useStyles();
  return <Home classes={classes} {...props} />;
}
