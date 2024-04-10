Config = {}

Config.SaveInterval = 3

Config.dispatchJobs = {
    [1] = {
        name = 'police',
        label = 'Police'
    },

    [2] = {
        name = 'ambulance',
        label = 'Ambulance'
    },

    [3] = {
        name = 'doj',
        label = 'DOJ'
    },

    [4] = {
        name = 'driver',
        label = 'Fahrschule'
    },

    [5] = {
        name = 'mechanic',
        label = 'Mechanic'
    },

    [6] = {
        name = 'sheriff',
        label = 'Sheriffs'
    },

    [7] = {
        name = 'taxi',
        label = 'Taxi'
    },
}

Config.BlacklistedStrings = {
    '<',
    '>',
    'mp3',
    'mp4',
    'mov',
    'wav'
}

Config.GetName = function(xPlayer)
    return xPlayer.getRPName()
end