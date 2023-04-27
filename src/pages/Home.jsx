import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  Event,
  Group,
  LibraryBooks,
  Assessment,
  AccountCircle,
  ExitToApp,
} from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  drawer: { width: 240, flexShrink: 0, background: "#130663" },
  drawerPaper: { width: 240, background: "#130663", color: "white" },
  nested: { paddingLeft: theme.spacing(4) },
  icon: { color: "white" },
  subMenuText: { fontSize: "0.9rem" },
}));
const Home = () => {
  const classes = useStyles();
  const [openCitas, setOpenCitas] = React.useState(false);
  const [openPacientes, setOpenPacientes] = React.useState(false);
  const [openHistorias, setOpenHistorias] = React.useState(false);
  const handleClickCitas = () => {
    setOpenCitas(!openCitas);
  };
  const handleClickPacientes = () => {
    setOpenPacientes(!openPacientes);
  };
  const handleClickHistorias = () => {
    setOpenHistorias(!openHistorias);
  };
  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
    >
      {" "}
      <List>
        {" "}
        <ListItem button onClick={handleClickCitas}>
          {" "}
          <ListItemIcon className={classes.icon}>
            {" "}
            <Event />{" "}
          </ListItemIcon>{" "}
          <ListItemText
            primary="Citas"
            classes={{ primary: classes.text }}
          />{" "}
          {openCitas ? <ExpandLess /> : <ExpandMore />}{" "}
        </ListItem>{" "}
        <Collapse in={openCitas} timeout="auto" unmountOnExit>
          {" "}
          <List component="div" disablePadding>
            {" "}
            <ListItem button className={classes.nested}>
              {" "}
              <ListItemText primary="Agendar Cita" />{" "}
            </ListItem>{" "}
          </List>{" "}
        </Collapse>
        <ListItem button onClick={handleClickPacientes}>
          {" "}
          <ListItemIcon className={classes.icon}>
            {" "}
            <Group />{" "}
          </ListItemIcon>{" "}
          <ListItemText
            primary="Pacientes"
            classes={{ primary: classes.text }}
          />{" "}
          {openPacientes ? <ExpandLess /> : <ExpandMore />}{" "}
        </ListItem>{" "}
        <Collapse in={openPacientes} timeout="auto" unmountOnExit>
          {" "}
          <List component="div" disablePadding>
            {" "}
            <ListItem button className={classes.nested}>
              {" "}
              <ListItemText primary="Registrar Paciente" />{" "}
            </ListItem>{" "}
            <ListItem button className={classes.nested}>
              {" "}
              <ListItemText primary="Buscar Paciente" />{" "}
            </ListItem>{" "}
          </List>{" "}
        </Collapse>
        <ListItem button onClick={handleClickHistorias}>
          {" "}
          <ListItemIcon className={classes.icon}>
            {" "}
            <LibraryBooks />{" "}
          </ListItemIcon>{" "}
          <ListItemText
            primary="Historias"
            classes={{ primary: classes.text }}
          />{" "}
          {openHistorias ? <ExpandLess /> : <ExpandMore />}{" "}
        </ListItem>{" "}
        <Collapse in={openHistorias} timeout="auto" unmountOnExit>
          {" "}
          <List component="div" disablePadding>
            {" "}
            <ListItem button className={classes.nested}>
              {" "}
              <ListItemText primary="Crear Historia" />{" "}
            </ListItem>{" "}
            <ListItem button className={classes.nested}>
              {" "}
              <ListItemText primary="Buscar Historia" />{" "}
            </ListItem>{" "}
          </List>{" "}
        </Collapse>
        <ListItem button>
          {" "}
          <ListItemIcon className={classes.icon}>
            {" "}
            <Assessment />{" "}
          </ListItemIcon>{" "}
          <ListItemText
            primary="Reportes"
            classes={{ primary: classes.text }}
          />{" "}
        </ListItem>
        <ListItem button>
          {" "}
          <ListItemIcon className={classes.icon}>
            {" "}
            <AccountCircle />{" "}
          </ListItemIcon>{" "}
          <ListItemText
            primary="Mi Perfil"
            classes={{ primary: classes.text }}
          />{" "}
        </ListItem>
        <ListItem button>
          {" "}
          <ListItemIcon className={classes.icon}>
            {" "}
            <ExitToApp />{" "}
          </ListItemIcon>{" "}
          <ListItemText
            primary="Salir"
            classes={{ primary: classes.text }}
          />{" "}
        </ListItem>{" "}
      </List>{" "}
    </Drawer>
  );
};
export default Home;
