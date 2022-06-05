import React from "react";
import "./Toggle.css";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';

const Toggle = () => {
    return (
        <div className="toggle-header">
            <ButtonGroup className="button-group">
                <Button>
                    last month
                </Button>
                <Button>
                    last 6 months
                </Button>
                <Button>
                    all-time
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default Toggle;