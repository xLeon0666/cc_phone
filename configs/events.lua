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

local VoiceSystem = nil
if IsDuplicityVersion() then
    CreateThread(function()
        local hasPMA = GetResourceState('pma-voice') == 'started'
        local hasSalty = GetResourceState('saltychat') == 'started'
        if hasPMA or hasSalty then
            if hasPMA and hasSalty then
                print('[^2cc_phone^0] ^3WARNING:^7 Both pma-voice and saltychat resources are running! Please set VoiceSystem to ^2pma-voice^7 or ^2saltychat^7 manually or stop one of the resources!')
            end
            VoiceSystem = hasPMA and 'pma-voice' or 'saltychat'
            print('[^2cc_phone^0] INFO:^7 Voice system automatically set to ^2' .. VoiceSystem .. '^7')
        else
            print('[^2cc_phone^0] ^3WARNING:^7 No voice system resource found! Please start ^2pma-voice^7 or ^2saltychat^7 or set VoiceSystem manually!')
        end
    end)
end

function IsPMA()
    return VoiceSystem == 'pma-voice'
end