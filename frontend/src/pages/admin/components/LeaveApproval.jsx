import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Comment as CommentIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

const LeaveApproval = ({ employee }) => {
  const [leaveRequests] = useState([
    {
      id: 1,
      empId: employee?.id || "EMP001",
      empName: employee?.name || "Rahul Patel",
      type: "Sick Leave",
      startDate: "2026-01-10",
      endDate: "2026-01-12",
      days: 3,
      reason: "Not feeling well, doctor advised rest",
      appliedDate: "2026-01-05",
      status: "Pending",
      comments: [],
    },
    {
      id: 2,
      empId: employee?.id || "EMP001",
      empName: employee?.name || "Rahul Patel",
      type: "Paid Leave",
      startDate: "2026-01-20",
      endDate: "2026-01-22",
      days: 3,
      reason: "Family function",
      appliedDate: "2026-01-03",
      status: "Pending",
      comments: [],
    },
    {
      id: 3,
      empId: employee?.id || "EMP001",
      empName: employee?.name || "Rahul Patel",
      type: "Casual Leave",
      startDate: "2025-12-28",
      endDate: "2025-12-29",
      days: 2,
      reason: "Personal work",
      appliedDate: "2025-12-20",
      status: "Approved",
      comments: [
        {
          author: "Admin",
          text: "Approved as requested",
          date: "2025-12-21",
        },
      ],
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [actionType, setActionType] = useState("");
  const [comment, setComment] = useState("");
  const [expandedRows, setExpandedRows] = useState({});

  const handleOpenDialog = (leave, action) => {
    setSelectedLeave(leave);
    setActionType(action);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setComment("");
  };

  const handleSubmitAction = () => {
    // TODO: API call to approve/reject leave with comment
    console.log(
      `${actionType} leave ID ${selectedLeave.id} with comment: ${comment}`
    );
    handleCloseDialog();
  };

  const toggleRow = (leaveId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [leaveId]: !prev[leaveId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      case "Pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getLeaveTypeColor = (type) => {
    switch (type) {
      case "Sick Leave":
        return "error";
      case "Paid Leave":
        return "success";
      case "Casual Leave":
        return "info";
      case "Unpaid Leave":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">
          Leave Requests - {employee?.name || "All Employees"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {leaveRequests.filter((l) => l.status === "Pending").length} pending
          requests
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.light" }}>
              <TableCell />
              <TableCell sx={{ fontWeight: "bold" }}>Employee</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Leave Type</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Days
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((leave) => (
              <>
                <TableRow key={leave.id} hover>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => toggleRow(leave.id)}
                    >
                      <ExpandMoreIcon
                        sx={{
                          transform: expandedRows[leave.id]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "0.3s",
                        }}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {leave.empName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {leave.empId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={leave.type}
                      color={getLeaveTypeColor(leave.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{leave.startDate}</TableCell>
                  <TableCell>{leave.endDate}</TableCell>
                  <TableCell align="center">
                    <Chip label={leave.days} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={leave.status}
                      color={getStatusColor(leave.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {leave.status === "Pending" ? (
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircle />}
                          onClick={() => handleOpenDialog(leave, "Approve")}
                        >
                          Approve
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() => handleOpenDialog(leave, "Reject")}
                        >
                          Reject
                        </Button>
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {leave.status}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>

                {/* Expandable Details Row */}
                <TableRow key={`${leave.id}-details`}>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={8}
                  >
                    <Collapse
                      in={expandedRows[leave.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 2 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography
                                  variant="subtitle2"
                                  color="primary"
                                  gutterBottom
                                >
                                  <InfoIcon
                                    fontSize="small"
                                    sx={{ verticalAlign: "middle", mr: 1 }}
                                  />
                                  Leave Details
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ mt: 2 }}>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Applied Date
                                  </Typography>
                                  <Typography variant="body1" gutterBottom>
                                    {leave.appliedDate}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 2 }}
                                  >
                                    Reason
                                  </Typography>
                                  <Typography variant="body1">
                                    {leave.reason}
                                  </Typography>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography
                                  variant="subtitle2"
                                  color="primary"
                                  gutterBottom
                                >
                                  <CommentIcon
                                    fontSize="small"
                                    sx={{ verticalAlign: "middle", mr: 1 }}
                                  />
                                  Comments & History
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                                {leave.comments.length > 0 ? (
                                  <Box sx={{ mt: 2 }}>
                                    {leave.comments.map((cmt, idx) => (
                                      <Box key={idx} sx={{ mb: 2 }}>
                                        <Typography
                                          variant="caption"
                                          color="text.secondary"
                                        >
                                          {cmt.author} - {cmt.date}
                                        </Typography>
                                        <Typography variant="body2">
                                          {cmt.text}
                                        </Typography>
                                      </Box>
                                    ))}
                                  </Box>
                                ) : (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 2 }}
                                  >
                                    No comments yet
                                  </Typography>
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Approval/Rejection Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{actionType} Leave Request</DialogTitle>
        <DialogContent>
          {selectedLeave && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Employee:</strong> {selectedLeave.empName} (
                {selectedLeave.empId})
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Leave Type:</strong> {selectedLeave.type}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Duration:</strong> {selectedLeave.startDate} to{" "}
                {selectedLeave.endDate} ({selectedLeave.days} days)
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Reason:</strong> {selectedLeave.reason}
              </Typography>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Add Comment (Required)"
                placeholder="Enter your comments here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mt: 3 }}
                required
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            color={actionType === "Approve" ? "success" : "error"}
            onClick={handleSubmitAction}
            disabled={!comment.trim()}
          >
            {actionType}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaveApproval;
