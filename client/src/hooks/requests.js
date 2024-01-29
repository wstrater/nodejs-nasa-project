const API_URL = process.env.API_URL || 'http://localhost:8000/v1';

// Load planets and return as JSON.
async function httpGetPlanets() {
    const res = await fetch(`${API_URL}/planets`);
    return await res.json();
}

  // Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
    const res = await fetch(`${API_URL}/launches`);
    const launches = await res.json();
    return launches.sort((a, b) => {
        return a.flightNumber - b.flightNumber;
    })
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
    const options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(launch)
    };

    try {
        const flightNumber = Number(launch.flightNumber || -1);
        if (flightNumber > 0) {
            options.method = 'PUT';
            return await fetch(`${API_URL}/launches/${flightNumber}`, options);
        } else {
            options.method = 'POST';
            return await fetch(`${API_URL}/launches`, options);
        }
    } catch (err) {
        console.log(err);
        return {
            ok: false
        }
    }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
    try {
        return await fetch(`${API_URL}/launches/${id}`, {
            method: 'DELETE'
        });
    } catch (err) {
        console.log(err);
        return {
            ok: false
        }
    }
}

export {
    httpGetPlanets,
    httpGetLaunches,
    httpSubmitLaunch,
    httpAbortLaunch,
};
