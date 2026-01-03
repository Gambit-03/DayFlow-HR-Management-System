import { Button, Card, CardContent, Stack } from "@mui/material";

const LeaveApproval = ({ employee }) => {
  const leaves = [{ id: 1, type: "Sick Leave", date: "2024-09-10" }];

  return (
    <>
      <h3>Leave Requests - {employee.name}</h3>

      {leaves.map((leave) => (
        <Card key={leave.id} sx={{ mb: 2 }}>
          <CardContent>
            <p>{leave.type}</p>
            <p>{leave.date}</p>

            <Stack direction="row" spacing={2}>
              <Button color="success" variant="contained">
                Approve
              </Button>
              <Button color="error" variant="outlined">
                Reject
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default LeaveApproval;
