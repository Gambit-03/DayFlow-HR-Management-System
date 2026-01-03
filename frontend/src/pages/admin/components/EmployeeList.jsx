import { List, ListItemButton, ListItemText, Paper } from "@mui/material";

const employees = [
  { id: 1, name: "Rahul Patel", dept: "IT" },
  { id: 2, name: "Sujal Nang", dept: "HR" },
  { id: 3, name: "Neel Shah", dept: "Finance" },
];

const EmployeeList = ({ onSelect }) => {
  return (
    <Paper sx={{ maxWidth: 300 }}>
      <List>
        {employees.map((emp) => (
          <ListItemButton key={emp.id} onClick={() => onSelect(emp)}>
            <ListItemText primary={emp.name} secondary={emp.dept} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default EmployeeList;
