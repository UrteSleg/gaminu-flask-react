import React from "react";

export default function LoadingPage() {
    return (
        <div className="loading-full">
            <div className="spinner-border spinner-holder" style={{ width: "7rem", height: "7rem" }} role="status"></div>
        </div>
    );
}