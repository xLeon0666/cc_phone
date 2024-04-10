Events = {}

if IsDuplicityVersion() then 
    Events.RegisterServerEvent = function(name, fn)
        RegisterNetEvent(('cc_event:server_event:' .. name), function(...)
            local playerId = source

            TriggerClientEvent(('cc_event:server_event:' .. name), playerId, fn(playerId, ...))
        end)
    end

    Events.TriggerClientEvent = function(playerId, name, ...)
        local p = promise.new()

        local handler = RegisterNetEvent(('cc_event:client_event:' .. name), function(...)
            p:resolve({ ... })
        end)

        TriggerClientEvent(('cc_event:client_event:' .. name), playerId, ...)

        local data = Citizen.Await(p)
        
        RemoveEventHandler(handler)

        return table.unpack(data)
    end
else
    Events.TriggerServerEvent = function(name, ...)
        local p = promise.new()

        local handler = RegisterNetEvent(('cc_event:server_event:' .. name), function (...)
            p:resolve({ ... })
        end)

        TriggerServerEvent(('cc_event:server_event:' .. name), ...)

        local data = Citizen.Await(p)
        
        RemoveEventHandler(handler)

        return table.unpack(data)
    end

    Events.RegisterClientEvent = function(name, fn)
        RegisterNetEvent(('cc_event:client_event:' .. name), function(...)
            TriggerServerEvent(('cc_event:client_event:' .. name), fn(...))
        end)
    end
end