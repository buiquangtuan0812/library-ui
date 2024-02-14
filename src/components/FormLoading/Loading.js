import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading({ props }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
            <ReactLoading type="spin" color="#1b3764" height={100} width={50} />
            <div style={{ color: '#1b3764', marginTop: '-20px', fontSize: 18 }}>{props}</div>
        </div>
    );
}
