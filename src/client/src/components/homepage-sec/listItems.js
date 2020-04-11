import React, { Component } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import NoteAddIcon from "@material-ui/icons/NoteAdd";

export const mainListItems = (
  <div dir="rtl">
    <ListItem button>
      <ListItemIcon>
        <PersonAddIcon
          style={{ marginRight: "10%", color: "white" }}
          fontSize="medium"
        />
      </ListItemIcon>
      <ListItemText style={{ textAlign: "right", color: "white" }}>
        إضافة طالب جديد
      </ListItemText>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NoteAddIcon
          style={{ marginRight: "7%", color: "white" }}
          fontSize="medium"
        />
      </ListItemIcon>
      <ListItemText style={{ textAlign: "right", color: "white" }}>
        تأجيل التجنيد العسكري
      </ListItemText>
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
