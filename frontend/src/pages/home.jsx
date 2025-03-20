import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    return (
        <>
            {/* Navbar */}
            <div className="navBar">
                <div className="navLeft">
                    <h2 className="logoText">Digital Meetup</h2>
                </div>
                <div className="navRight">
                    <IconButton onClick={() => navigate("/history")}>
                        <RestoreIcon />
                    </IconButton>
                    <p>History</p>
                    <Button
                        variant="outlined"
                        className="logoutBtn"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="meetContainer">
                <div className="leftPanel">
                    <h2 className="headline">
                        Delivering Exceptional Video Call Quality with the Excellence of Quality Education
                    </h2>
                    <div className="inputContainer">
                        <TextField
                            onChange={(e) => setMeetingCode(e.target.value)}
                            label="Enter Meeting Code"
                            variant="outlined"
                            className="meetingInput"
                        />
                        <Button
                            variant="contained"
                            onClick={handleJoinVideoCall}
                            className="joinBtn"
                        >
                            Join
                        </Button>
                    </div>
                </div>
                <div className="rightPanel">
                    <img src="/vdcallhome.jpg" alt="Video Call" className="homeImage" />
                </div>
            </div>
        </>
    );
}

export default withAuth(HomeComponent);
