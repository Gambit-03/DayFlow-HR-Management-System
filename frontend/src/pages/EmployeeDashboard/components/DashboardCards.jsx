import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Person, Event, AccessTime, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DashboardCards = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Profile", icon: <Person />, path: "/profile" },
    { title: "Leave", icon: <Event />, path: "/leave" },
    { title: "Attendance", icon: <AccessTime />, path: "/attendance" },
    { title: "Logout", icon: <Logout />, path: "/logout" },
  ];

  return (
    <div className="top-cards">
      {cards.map((card, index) => (
        <Card
          key={index}
          className="dashboard-card"
          onClick={() => navigate(card.path)}
        >
          <CardContent className="card-content">
            {card.icon}
            <Typography variant="h6">{card.title}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
