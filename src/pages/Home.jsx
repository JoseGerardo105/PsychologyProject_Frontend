import React, { createRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "@fullcalendar/core";
import { INITIAL_EVENTS, createEventId } from "../event-utils";
import esLocale from "@fullcalendar/core/locales/es";
import AppointmentForm from "../components/AppointmentForm";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";

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
    appointments: [],
  };

  componentDidMount() {
    this.fetchPatients();
    this.fetchAppointments();
  }

  fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/psychologists/get-appointments"
      );
      const appointments = response.data;
      this.setState({ appointments });
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
  };
  fetchPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/psychologists/get-patients"
      );
      const patients = response.data;
      this.setState({ patients });
    } catch (error) {
      console.error("Error al obtener los pacientes:", error);
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
      selectedDate: selectInfo.startStr,
      selectedEnd: selectInfo.endStr,
      allDay: selectInfo.allDay,
      showAppointmentForm: true,
    });
  };

  handleCloseAppointmentForm = () => {
    this.setState({
      showAppointmentForm: false,
      selectedDate: null,
    });
  };

  handleCreateAppointment = (formData) => {
    const { patientId, start, end, allDay } = formData;

    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.addEvent({
      id: createEventId(),
      title: `Cita con paciente ${patientId.name}`,
      start,
      end,
      allDay,
    });
  };

  handleEventClick = (clickInfo) => {
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar este evento? '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };

  handleLenguageChange = () => {
    this.setState({
      locale: this.state.locale === "es" ? "en" : "es",
    });
  };

  render() {
    const { classes } = this.props;
    const calendarEvents = this.state.appointments.map((appointment) => ({
      id: appointment.id,
      title: `Cita con paciente ${appointment.patient_id}`,
      start: appointment.start_time,
      end: appointment.end_time,
    }));
    return (
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
          //initialEvents={calendarEvents}
          initialEvents={INITIAL_EVENTS}
          select={this.handleDateSelect}
          eventContent={renderEventContent}
          eventClick={this.handleEventClick}
          eventsSet={this.handleEvents}
          height={"80vh"}
          locales={[esLocale]}
          locale={this.state.locale}

          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
        {this.state.showAppointmentForm && (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <AppointmentForm
              open={this.state.showAppointmentForm}
              onClose={this.handleCloseAppointmentForm}
              onCreate={this.handleCreateAppointment}
              selectedDate={this.state.selectedDate}
              selectedEnd={this.state.selectedEnd}
              allDay={this.state.allDay}
              patients={this.state.patients}
            />
          </MuiPickersUtilsProvider>
        )}
      </div>
    );
  }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

export default function HomeWithStyles(props) {
  const classes = useStyles();
  return <Home classes={classes} {...props} />;
}
