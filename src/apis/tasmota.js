const handleGetPowerResponse = (data) => {
    if (data.POWER === 'ON') {
        return true
    } else if (data.POWER === 'OFF') {
        return false
    }
    console.log('UNKNOWN RESPONSE FROM SWITCH: ', data)
    return false
}

export const getSwitchStatus = async (hostname) => {
    const res = await fetch(`${hostname}/cm?cmnd=Power`);
    const data = await res.json();
    return handleGetPowerResponse(data);
}


export const toggleSwitchStatus = async (hostname) => {
    const res = await fetch(`${hostname}/cm?cmnd=Power%20TOGGLE`);
    const data = await res.json();
    return handleGetPowerResponse(data);
}

export const getSwitchState = async (hostname) => {
    const res = await fetch(`${hostname}/cm?cmnd=State`);
    const data = await res.json();
    return data;
}