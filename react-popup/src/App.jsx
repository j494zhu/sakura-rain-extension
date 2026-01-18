import {useState, useEffect} from 'react';
import ControlItem from './ControlItem';

function App(){ 
    const [config, setConfig] = useState({
        petalCount: 300, 
        useStaticSize: false,
        staticSize: 15,
        useStaticWind: false,
        baseWindSpeed: 2,
        windChangeSpeed: 0.005,
        windMaxRange: 3,
        gravity: 1.5,
        rotationSpeed: 0.02,
        swayAmplitude: 1,
        globalAlpha: 0.9
    });

    const handleChange = (new_item, new_value) => {
        setConfig(prev => ({
            ...prev,
            [new_item]: new_value
        }));
    };

    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0] && tabs[0].id) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'UPDATE_CONFIG',
                        data: config
                    });
                }
            });
        }else{
                console.log("send mock data", config);
            }
        }, [config]);

    return (
        <div style={{width: '300px', padding: '15px', fontFamily: 'Arial, sans-serif'}}>
            <h3 style={{ borderBottom: '2px solid #ffb7c5', paddingBottom: '10px', color: '#ff8da1', textAlign: 'center'}}>
                Custom Settings
            </h3>

            <ControlItem
                label='Density'
                type='range'
                value={config.petalCount}
                displayValue={config.petalCount}
                onChange={(val) => handleChange('petalCount', val)}
                min={0} 
                max={3000}
                step={50}
            />
            <hr style={{ border: '0', borderTop: '1px solid pink', margin: '15px 0' }}/>
            <ControlItem 
                label="Use Static Petal Size" 
                type="checkbox"
                value={config.useStaticSize}
                onChange={(val) => handleChange('useStaticSize', val)}
            />
            {config.useStaticSize && (
                <ControlItem 
                label="Static Size"
                type="range"
                value={config.staticSize} 
                displayValue={config.staticSize}
                onChange={(val) => handleChange('staticSize', val)}
                min={5} 
                max={50} 
                step={1}
                />
            )}
            <hr style={{ border: '0', borderTop: '1px solid pink', margin: '15px 0' }}/>
            <ControlItem 
                label="Use Static Wind Speed" 
                type="checkbox"
                value={config.useStaticWind}
                onChange={(val) => handleChange('useStaticWind', val)}
            />
            <ControlItem 
                label="Base Wind Speed" 
                type="range"
                value={config.baseWindSpeed} 
                displayValue={config.baseWindSpeed}
                onChange={(val) => handleChange('baseWindSpeed', val)}
                min={-10} 
                max={10} 
                step={0.5}
            />

            {!config.useStaticWind && (
                <div style={{ borderLeft: '3px solid pink', paddingLeft: '10px' }}>
                <ControlItem 
                    label="Gust Freq" 
                    type="range"
                    value={config.windChangeSpeed} 
                    displayValue={config.windChangeSpeed}
                    onChange={(val) => handleChange('windChangeSpeed', val)}
                    min={0.001} 
                    max={0.1} 
                    step={0.001}
                />
                <ControlItem 
                    label="Gust Range" type="range"
                    value={config.windMaxRange} 
                    displayValue={config.windMaxRange}
                    onChange={(val) => handleChange('windMaxRange', val)}
                    min={0} 
                    max={10} 
                    step={0.5}
                />
                </div>
            )}

            <hr style={{ border: '0', borderTop: '1px solid pink', margin: '15px 0' }}/>
            <ControlItem 
                label="Gravity" 
                type="range"
                value={config.gravity} 
                displayValue={config.gravity}
                onChange={(val) => handleChange('gravity', val)}
                min={0.5} 
                max={5} 
                step={0.1}
            />

            <ControlItem 
                label="Rotation Speed" type="range"
                value={config.rotationSpeed} displayValue={config.rotationSpeed}
                onChange={(val) => handleChange('rotationSpeed', val)}
                min={0} max={0.2} step={0.01}
            />

            <ControlItem 
                label="Sway Amplitude" 
                type="range"
                value={config.swayAmplitude} 
                displayValue={config.swayAmplitude}
                onChange={(val) => handleChange('swayAmplitude', val)}
                min={0} 
                max={5} 
                step={0.1}
            />

            <ControlItem 
                label="Opacity" 
                type="range"
                value={config.globalAlpha} 
                displayValue={config.globalAlpha}
                onChange={(val) => handleChange('globalAlpha', val)}
                min={0.1} 
                max={1} 
                step={0.1}
            />
        </div>
    );
}

export default App;