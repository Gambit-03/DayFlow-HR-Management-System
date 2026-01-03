import React from "react";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";
import mockActivities from "../data/mockActivities";

const RecentActivities = () => {
  return (
    <Card className="activity-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Activities
        </Typography>

        <List>
          {mockActivities.map((activity) => (
            <ListItem key={activity.id}>
              {activity.action} — {activity.date}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
