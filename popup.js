document.addEventListener('DOMContentLoaded', () => {

    // ids and default values
    const controls = {
        petalCount: { type: 'range', default: 300 },
        
        useStaticSize: { type: 'checkbox', default: false },
        staticSize: { type: 'range', default: 15 },
        
        useStaticWind: { type: 'checkbox', default: false },
        baseWindSpeed: { type: 'range', default: 2 },
        windChangeSpeed: { type: 'range', default: 0.005 },
        windMaxRange: { type: 'range', default: 3 },
        
        gravity: { type: 'range', default: 1.5 },
        rotationSpeed: { type: 'range', default: 0.02 },
        swayAmplitude: { type: 'range', default: 1 },
        globalAlpha: { type: 'range', default: 0.9 }
    };

    // visual states
    const updateVisualState = () => {
        const useStaticWind = document.getElementById('useStaticWind').checked;
        const dynamicControls = document.getElementById('dynamicWindControls');
        
        if (useStaticWind) {
            dynamicControls.classList.add('disabled');
        } else {
            dynamicControls.classList.remove('disabled');
        }
    };

    // send configs
    const sendData = () => {
        const data = {};
        for (let key in controls) {
            const input = document.getElementById(key);
            if (controls[key].type === 'checkbox') {
                data[key] = input.checked;
            } else if (controls[key].type === 'range') {
                data[key] = parseFloat(input.value);
            }
        }

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'UPDATE_CONFIG',
                    data: data
                });
            }
        });
    };

    // init controls and bind events
    for (let key in controls) {
        const input = document.getElementById(key);
        const display = document.getElementById(key + 'Val');
        
        if (!input) continue;

        // default value
        if (controls[key].type === 'checkbox') {
            input.checked = controls[key].default;
        } else {
            input.value = controls[key].default;
            if (display) display.textContent = input.value;
        }

        input.addEventListener('input', () => {
            if (display) display.textContent = input.value;
            updateVisualState();
            sendData();
        });
    }

    updateVisualState(); // run
});