import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { makeStyles } from "@material-ui/core/styles";
import { formatDate } from "@fullcalendar/core";
import { INITIAL_EVENTS, createEventId } from "../event-utils";
import esLocale from "@fullcalendar/core/locales/es";

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
  };

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    let title = prompt("Porfavor ingresa el titulo del evento");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  handleEventClick = (clickInfo) => {
    if (
      confirm(
        `¿Estás seguro de que deseas eliminar este evento?'${clickInfo.event.title}'`
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

    return (
      <div className={classes.homeContainer}>
        <FullCalendar
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
