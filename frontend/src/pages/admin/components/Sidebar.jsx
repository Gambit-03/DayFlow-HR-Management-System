import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  EventAvailable as AttendanceIcon,
  CalendarToday as LeaveIcon,
  Payment as PayrollIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";

const drawerWidth = 260;

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { text: "Analytics Dashboard", icon: <AnalyticsIcon />, badge: null },
    { text: "Employee Management", icon: <PeopleIcon />, badge: null },
    { text: "Attendance", icon: <AttendanceIcon />, badge: null },
    { text: "Leave Management", icon: <LeaveIcon />, badge: 15 },
    { text: "Payroll", icon: <PayrollIcon />, badge: null },
  ];

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#1e293b",
          color: "white",
        },
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#60a5fa" }}>
          DayFlow
        </Typography>
        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
          HR Management System
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: "#334155" }} />

      {/* Admin Profile */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "#60a5fa" }}>A</Avatar>
        <Box>
          <Typography variant="body2" fontWeight="bold">
            Admin User
          </Typography>
          <Typography variant="caption" sx={{ color: "#94a3b8" }}>
            HR Officer
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ bgcolor: "#334155", mb: 2 }} />

      {/* Navigation Menu */}
      <List sx={{ px: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "#60a5fa",
                  "&:hover": {
                    bgcolor: "#3b82f6",
                  },
                },
                "&:hover": {
                  bgcolor: "#334155",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  color="error"
                  sx={{ height: 20, fontSize: "0.7rem" }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: "#334155", my: 2 }} />

      {/* Bottom Menu */}
      <List sx={{ px: 1, mt: "auto" }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            sx={{
              borderRadius: 2,
              "&:hover": { bgcolor: "#334155" },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
            <Chip
              label="3"
              size="small"
              color="warning"
              sx={{ height: 20, fontSize: "0.7rem" }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            sx={{
              borderRadius: 2,
              "&:hover": { bgcolor: "#334155" },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,
              "&:hover": { bgcolor: "#dc2626" },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "#64748b" }}>
          v1.0.0 - 2026
        </Typography>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
