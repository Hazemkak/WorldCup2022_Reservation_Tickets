import React from "react";
import { defaultAlert, useAlert } from "../../context/AlertContext";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./styles/Alert.css";

const Icons: { [key: string]: React.ReactElement } = {
    error: <ErrorIcon color="error" />,
    success: <CheckCircleIcon color="success" />,
};

function AlertMessage() {
    const context = useAlert();

    React.useEffect(() => {
        setTimeout(() => {
            context.setMessage(defaultAlert);
        }, 3000);
    }, [context]);

    return (
        <>
            {context?.message?.show && (
                <div className={`container`}>
                    <div className={`box`}>
                        <div className={`title`}>{context?.message?.text}</div>
                        <div className={`icon`}>
                            {Icons[context?.message?.type ?? "error"]}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AlertMessage;
