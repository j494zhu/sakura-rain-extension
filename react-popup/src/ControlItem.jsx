import React from 'react';

const ControlItem = ({label, type, value, onChange, min, max, step, displayValue}) => {
    return (
        <div style={{marginBottom: '15px', padding: '10px', background: '#f9f9f9', borderRadius: '5px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                <label style={{fontWeight: 'bold', fontSize: '14px', color: '#AA336A'}}>
                    {label}
                </label>

                {type === 'range' && (
                    <span style={{fontSize: '12px', color: '#666'}}>
                        {displayValue}
                    </span>
                )}

                {type === 'checkbox' && (
                    <input
                        type='checkbox'
                        checked={value}
                        onChange={(e => onChange(e.target.checked))}
                    />
                )}
            </div>

            {type === 'range' && (
                <input
                    type='range'
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={(e) => onChange(parseFloat(e.target.value))}
                    style={{width: '100px', cursor: 'pointer'}}
                />
            )}
        </div>
    );
};
export default ControlItem;