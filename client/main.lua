local ESX, calling = nil, nil

local business = {}

PhoneData = {
    Locked = false,
    Open = false,
    Focused = false,
    canBeUsed = false,
    cameraOpen = false,
    currentCamMode = false,
    flashlight = false,
    rpName = "",
    number = "",
    identifier = "",
    
    dict = nil,
    anim = nil
}

-- Threads

Citizen.CreateThread(function()
    while ESX == nil do
        ESX = exports['es_extended']:getSharedObject()
        Citizen.Wait(0)
    end

    while ESX.GetPlayerData().job == nil do
		Citizen.Wait(500)
	end

    -- while ESX.GetPlayerData().job3 == nil do -- only need if you have the job3
	-- 	Citizen.Wait(500)
	-- end

    ESX.PlayerData = ESX.GetPlayerData()

    PhoneData.identifier = ESX.GetPlayerData().identifier

    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(1)
            if NetworkIsSessionStarted() then
                TriggerServerEvent('cc_phone:onJoin')
                break
            end
        end
    end)
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)

        if PhoneData.Open then
            DisableAllControlActions(0)
            DisableAllControlActions(2)

            if PhoneData.cameraOpen then
                EnableControlAction(0, 1, true)
                EnableControlAction(0, 2, true)
            end

            if not PhoneData.Focused then
                EnableControlAction(0, 32, true)
                EnableControlAction(0, 34, true)
                EnableControlAction(0, 31, true)
                EnableControlAction(0, 30, true)
                EnableControlAction(0, 22, true)
                EnableControlAction(0, 21, true)

                -- car
                EnableControlAction(0, 71, true)
                EnableControlAction(0, 72, true)
                EnableControlAction(0, 59, true)

                -- push to talk
                EnableControlAction(0, 249, true)
            end
        else
            Citizen.Wait(500)
        end
    end
end)

RegisterNetEvent('esx:setJob')
AddEventHandler('esx:setJob', function(job)
    ESX.PlayerData.job = job
end)

RegisterNetEvent('esx:setJob3')
AddEventHandler('esx:setJob3', function(job)
    ESX.PlayerData.job3 = job
end)

-- Events

AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        SetNuiFocus(false, false)

        deletePhone()
    end
end)

-- Functions

function OpenPhone()
    for k, v in pairs(ESX.GetPlayerData().inventory) do
        if v.name == 'phone' then
            if v.count < 1 then
                TriggerEvent('cc_phone:sendNotify', 'Information', 'Du hast kein Handy dabei!', 'info', 4000)
                return
            end
        end
    end

    PhoneData.Locked = true
    PhoneData.Open = true

    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(true, true)

    haveAccess = false
    haveAccess3 = false

    for k, v in pairs(business) do
        if v.hasapp then
            if v.name == string.lower(ESX.PlayerData.job.name) then
                haveAccess = true
            end
        end
    end

    -- for k, v in pairs(business) do -- only if you have job3
    --     if v.hasapp then
    --         if v.name == string.lower(ESX.PlayerData.job3.name) then
    --             haveAccess3 = true
    --         end
    --     end
    -- end

    SendNUIMessage({
        action = 'open',
        haveAccess = haveAccess,
        haveAccess3 = haveAccess3,
        haveAccessName = ESX.PlayerData.job.label,
        -- haveAccess3Name = ESX.PlayerData.job3.label
    })

    PhoneAnimation(true)
    Citizen.Wait(250)
    PhoneData.Locked = false
end

function ClosePhone()
    CellCamActivate(false, false)

    PhoneData.Locked = true
    SetNuiFocusKeepInput(false)
    SetNuiFocus(false, false)

    SendNUIMessage({
        action = 'close',
    })
    
    PhoneAnimation(false)

    PhoneData.Open = false
    Citizen.Wait(250)
    PhoneData.Locked = false
end

function PhoneAnimation(pullingOut)
    if pullingOut then

        if calling then
            DoPhoneAnimation('cellphone_call_listen_base')
        else 
            DoPhoneAnimation('cellphone_text_in')
        end

        Citizen.Wait(400)
        newPhoneProp()
    else
        if not calling then
            DoPhoneAnimation('cellphone_text_out')

            Citizen.SetTimeout(400, function()
                StopAnimTask(PlayerPedId(), PhoneData.dict, PhoneData.anim, 2.5)
                deletePhone()
                PhoneData.dict = nil
                PhoneData.anim = nil
                threadNotStarted = false
            end)
        else
            DoPhoneAnimation('cellphone_text_to_call')
        end
    end
end

RegisterNUICallback('closePhone', function(data, cb)
    ClosePhone()
end)

RegisterNUICallback('focus', function(data, cb)
    SetNuiFocusKeepInput(not data.state)
    PhoneData.Focused = data.state
    cb()
end)

RegisterNUICallback('getData', function(data, cb)
    cb({
        name = PhoneData.rpName,
        identifier = PhoneData.identifier,
        server = Config.Server
    })
end)

-- Apps

-- Settings

RegisterNUICallback('getSettings', function(data, cb)
    local settings = Events.TriggerServerEvent('cc_phone:getSettings')

    if settings then
        cb({
            phone_number = settings.phone_number,
            flightmode = settings.flightmode,
            id = GetPlayerServerId(PlayerId()),
            avatar = settings.avatar
        })
    else
        cb({
            phone_number = 'no number',
            id = GetPlayerServerId(PlayerId()),
            flightmode = false,
            avatar = 'default'
        })
    end
end)

RegisterNUICallback('flightmode', function(data, cb)
    local toggle = Events.TriggerServerEvent('cc_phone:setFlightmode')

    if toggle then
        cb(true)
    else
        cb(false)
    end
end)

RegisterNUICallback('deletePicture', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:deletePicture', data.index, data.id)

    cb(data or {})
end)

RegisterNUICallback('getBackground', function(data, cb)
    cb(GetResourceKvpString('phone_background'))
end)

RegisterNUICallback('setBackground', function(data, cb)
    if data.background then
        SetResourceKvp('phone_background', data.background)
        return
    end

    DeleteResourceKvp('phone_background')
end)

RegisterNUICallback('setVolume', function(data, cb)
    if data.volume then
        SetResourceKvpInt('phone_volume_2', tonumber(data.volume))
        return
    end

    DeleteResourceKvp('phone_volume_2')
end)

RegisterNUICallback('getVolume', function(data, cb)
    cb(GetResourceKvpInt('phone_volume_2'))
end)

RegisterNUICallback('setAvatar', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:setAvatar', data.avatar)

    cb(data or {})
end)

-- Contacts

RegisterNUICallback('getContacts', function(data, cb)
    local contacts = Events.TriggerServerEvent('cc_phone:getContacts')

    cb(contacts or {})
end)

RegisterNUICallback('addContact', function (data, cb)
    local contacts = Events.TriggerServerEvent('cc_phone:addContact', data.number, data.name, data.favorite)

    cb(contacts or {})
end)

RegisterNUICallback('editContact', function(data, cb)
    local contacts = Events.TriggerServerEvent('cc_phone:editContact', data.id, data.index, data.name, data.number, data.favorite)

    cb(contacts or {})
end)

RegisterNUICallback('deleteContact', function(data, cb)
    local contacts = Events.TriggerServerEvent('cc_phone:deleteContact', data.id, data.index)

    cb(contacts or {})
end)

-- Message

RegisterNUICallback('getChat', function(data, cb)
    local messages, isInContacts, avatar = Events.TriggerServerEvent('cc_phone:getChat', data.number)

    cb({
        messages = messages,
        isInContacts = isInContacts,
        avatar = avatar
    } or {})
end)

RegisterNUICallback('getMessages', function(data, cb)
    local messages = Events.TriggerServerEvent('cc_phone:getMessages')

    cb(messages or {})
end)

RegisterNUICallback('sendMessage', function(data, cb)
    local coords = nil

    if data.coords then
        coords = GetEntityCoords(PlayerPedId())
        coords = { coords.x, coords.y }
    end

    local messages = Events.TriggerServerEvent('cc_phone:sendMessage', data.msg, data.number, data.type, coords)
    
    cb(messages or {})
end)

RegisterNUICallback('setWaypoint', function(data, cb)
    if data.x and data.y then
        local x = round(data.x, 0)
        local y = round(data.y, 0)
        SetNewWaypoint(x, y)
    end
end)

RegisterNUICallback('getCoords', function(data, cb)
    local coords = GetEntityCoords(PlayerPedId())

    cb({
        x = coords.x,
        y = coords.y
    })
end)

RegisterNetEvent('cc_phone:updateMessages')
AddEventHandler('cc_phone:updateMessages', function(msgs)
    SendNUIMessage({
        action = 'updateMessages',
        msgs = msgs
    })
end)

RegisterNetEvent('cc_phone:updateGroupMessages')
AddEventHandler('cc_phone:updateGroupMessages', function(groups)
    SendNUIMessage({
        action = 'updateGroupMessages',
        groups = groups
    })
end)

RegisterNetEvent('cc_phone:updateGroupChat')
AddEventHandler('cc_phone:updateGroupChat', function(groupId, number, type, msg, time, author, coords)
    SendNUIMessage({
        action = 'updateGroupChat',
        groupId = groupId,
        number = number,
        type = type,
        msg = msg,
        time = time,
        author = author,
        coords = coords
    })
end)

RegisterNetEvent('cc_phone:updateChat')
AddEventHandler('cc_phone:updateChat', function(number, type, msg, time, name, coords)
    SendNUIMessage({
        action = 'notify',
        app = 'Message',
        title = 'Nachricht',
        message = 'Neue Nachricht von ' .. name
    })

    SendNUIMessage({
        action = 'updateChat',
        type = type,
        number = number,
        msg = msg,
        time = time,
        coords = coords
    })
end)

-- Call

RegisterNUICallback('getCalls', function(data, cb)
    local calls = Events.TriggerServerEvent('cc_phone:getCalls')

    cb(calls or {})
end)

RegisterNUICallback('deleteRecent', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:deleteRecent', data.id, data.index)

    cb(data or {})
end)

RegisterNUICallback('attemptCall', function(data, cb)
    if not calling then
        calling = data.number

        local bool, callFrequenz = Events.TriggerServerEvent('cc_phone:attemptCall', data.number)

        if bool == nil then
            DoPhoneAnimation('cellphone_text_to_call')
        else
            DoPhoneAnimation('cellphone_call_to_text')
        end

        cb({
            text = bool,
            state = callFrequenz
        })
    end
end)

RegisterNetEvent('cc_phone:gettingCall', function(number, name, callFrequenz)
    SendNUIMessage({
        action = 'requestCall',
        number = number,
        name = name,
        callFrequenz = callFrequenz
    })
end)

RegisterNUICallback('answerCall', function(data, cb)
    if calling then 
        Events.TriggerServerEvent('cc_phone:declineCall', calling, data.callFrequenz)
    end

    calling = data.number
    Events.TriggerServerEvent('cc_phone:answerCall', data.number, data.callFrequenz)
end)

RegisterNUICallback('declineCall', function(data, cb)
    calling = nil

    Events.TriggerServerEvent('cc_phone:declineCall', data.number, data.callFrequenz)
end)

RegisterNetEvent('cc_phone:declineCall', function()
    calling = nil

    if PhoneData.Open then
        DoPhoneAnimation('cellphone_call_to_text')
    else
        DoPhoneAnimation('cellphone_call_out')
        Citizen.SetTimeout(400, function()
            StopAnimTask(PlayerPedId(), PhoneData.dict, PhoneData.anim, 2.5)
            deletePhone()
            PhoneData.dict = nil
            PhoneData.anim = nil
            threadNotStarted = false
        end)
    end

    SendNUIMessage({
        action = 'declineCall'
    })
end)

RegisterNetEvent('cc_phone:answerCall', function(number, callFrequenz)
    calling = number

    DoPhoneAnimation('cellphone_text_to_call')

    SendNUIMessage({
        action = 'answerCall',
        callFrequenz = callFrequenz
    })
end)

-- Radio

RegisterNUICallback('joinRadio', function(data, cb)
    local frequenz = tonumber(data.frequenz)
    local canAccess = false

    if Config.RadioAccess[frequenz] then
        for k, v in pairs(Config.RadioAccess[frequenz].jobs) do
            if ESX.PlayerData.job.name == v then
                canAccess = true
            end
        end

        if canAccess then
            if IsPMA() then
                exports['pma-voice']:SetRadioChannel(frequenz, true)
            else
                exports['saltychat']:SetRadioChannel(frequenz, true)
            end
            cb(true)
        else
            cb(false)
        end
    else
        if IsPMA() then
            exports['pma-voice']:SetRadioChannel(frequenz, true)
        else
            exports['saltychat']:SetRadioChannel(frequenz, true)
        end
        cb(true)
    end
end)

RegisterNUICallback('leaveRadio', function(data, cb)
    if IsPMA() then
        exports['pma-voice']:removePlayerFromRadio()
    else
        exports['saltychat']:SetRadioChannel('', true)
    end
end)

-- camera

RegisterNUICallback('openCamera', function(data, cb)
    PhoneData.cameraOpen = true
    DisplayRadar(false)
    CreateMobilePhone(1)
    CellCamActivate(true, true)
    CellCamDisableThisFrame(PhoneData.currentCamMode)
end)

RegisterNUICallback('flashlight', function(data, cb)
    PhoneData.flashlight = not PhoneData.flashlight

    while PhoneData.flashlight do
        local ped = PlayerPedId()
        local coords = GetEntityCoords(phoneProp)
        local forward = GetEntityForwardVector(ped)
        DrawSpotLight(coords.x, coords.y, coords.z, forward.x, forward.y, forward.z, 255, 255, 255, 10.0, 25.0, 0.0, 40.0, 25.0)
        Citizen.Wait(0)
    end
end)

RegisterNUICallback('sendPicture', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:sendPicture', data.link)

    cb(data or {})
end)

RegisterNUICallback('getGallery', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:getGallery')

    cb(data or {})
end)

RegisterNUICallback('cameraState', function(data, cb)    
    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(data.state, data.state)
end)

RegisterNUICallback('switchCam', function(data, cb)
    PhoneData.currentCamMode = not PhoneData.currentCamMode
    CellCamDisableThisFrame(PhoneData.currentCamMode)
end)

RegisterNUICallback('takePicture', function(data, cb)
    exports['screenshot-basic']:requestScreenshot(function(data)
        cb(data)
    end)
end)

RegisterNUICallback('closeCamera', function(data, cb)
    PhoneData.cameraOpen = false
    DisplayRadar(true)
    DestroyMobilePhone()
    CellCamActivate(false, false)

    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(true, true)

    if PhoneData.open and not PhoneData.locked then
        PhoneAnimation(true)
    end
end)

-- Notes

RegisterNUICallback('getNotes', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:getNotes')

    cb(data or {})
end)

RegisterNUICallback('saveNotes', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:saveNotes', data.notes)

    cb(data or {})
end)

-- Business

RegisterNetEvent('cc_phone:getBusinessInformation')
AddEventHandler('cc_phone:getBusinessInformation', function(nu, rpName, myNumber)
    business = nu
    canBeUsed = true

    PhoneData.rpName = rpName
    PhoneData.number = myNumber

    SendNUIMessage({
        action = 'updateshit',
        rpName = PhoneData.rpName,
        number = PhoneData.number
    })
end)

RegisterNUICallback('setMOTD', function(data, cb)
    TriggerServerEvent('cc_phone:setMOTD', data.text, data.job3)
end)

RegisterNUICallback('getBusiness', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:getBusiness')

    cb(data or {})
end)

RegisterNUICallback('getBusiness2', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:getBusiness2')

    cb(data or {})
end)

RegisterNUICallback('rankUp', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:rankUp', data.number, data.job3)

    cb(data or {})
end)

RegisterNUICallback('rankDown', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:rankDown', data.number, data.job3)

    cb(data or {})
end)

RegisterNUICallback('kickPlayer', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:kickPlayer', data.number, data.job3)

    cb(data or {})
end)

-- Dispatch

RegisterNUICallback('getDispatchJobs', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:getDispatchData')

    cb(data or {})
end)

RegisterNUICallback('sendDispatch', function(data, cb)
    TriggerServerEvent('cc_phone:sendDispatch', data.job, data.desc, data.sendNumber)
    cb('ok')
end)

RegisterNUICallback('getDispatches', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:getDispatches')

    cb({ dispatches = data, title = ESX.PlayerData.job.label } or {})
end)

RegisterNUICallback('getDispatchType', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:getDispatchType', data.type)

    cb(data or {})
end)

RegisterNUICallback('getDispatchChat', function(data, cb)
    local chat, reason = Events.TriggerServerEvent('cc_phone:getDispatchChat', data.uniqueId)

    cb({
        chat = chat,
        reason = reason
    } or {})
end)

RegisterNUICallback('acceptDispatch', function(data, cb)
    if data.type == 'accept' then
        local x = round(data.x, 0)
        local y = round(data.y, 0)
        SetNewWaypoint(x, y) 
    end

    local data = Events.TriggerServerEvent('cc_phone:acceptDispatch', data.job, data.uniqueId, data.playerId, data.type)

    cb(data or {})
end)

RegisterNUICallback('declineDispatch', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:declineDispatch', data.job, data.uniqueId, data.playerId, data.type)

    cb(data or {})
end)

-- Group

RegisterNUICallback('getGroups', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:getGroups', data.name, data.members)
    
    cb(data or {})
end)

RegisterNUICallback('getGroupData', function(data, cb)
    local members, name, avatar = Events.TriggerServerEvent('cc_phone:getGroupData', data.groupId)

    cb({
        name = name,
        avatar = avatar,
        members = members
    } or {})
end)

RegisterNUICallback('getGroupChat', function(data, cb)
    local data, permission, avatar = Events.TriggerServerEvent('cc_phone:getGroupChat', data.groupId)

    cb({
        messages = data,
        permission = permission,
        avatar = avatar
    } or {})
end)

RegisterNUICallback('changeGroupAvatar', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:changeGroupAvatar', data.groupId, data.avatar)

    cb(data or {})
end)

RegisterNUICallback('createGroup', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:createGroup', data.name, data.members)
    
    cb(data or {})
end)

RegisterNUICallback('addGroupMember', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:addGroupMember', data.groupId, data.members)

    cb(data or {})
end)

RegisterNUICallback('deleteGroup', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:deleteGroup', data.groupId)

    cb(data or {})
end)

RegisterNUICallback('sendGroupMessage', function(data, cb)
    local coords = nil

    if data.coords then
        coords = GetEntityCoords(PlayerPedId())
        coords = { coords.x, coords.y }
    end

    local data = Events.TriggerServerEvent('cc_phone:sendGroupMessage', data.groupId, data.msg, data.type, coords)
    
    cb(data or {})
end)

RegisterNUICallback('setGroupAdmin', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:setGroupAdmin', data.groupId, data.member, data.permission)
    
    cb(data or {})
end)

RegisterNUICallback('kickGroup', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:kickGroup', data.groupId, data.member, data.number)
    
    cb(data or {})
end)

RegisterNUICallback('leaveGroup', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:leaveGroup', data.groupId)
    
    cb(data or {})
end)

RegisterNUICallback('changeGroupName', function(data, cb)
    local data = Events.TriggerServerEvent('cc_phone:changeGroupName', data.groupId, data.name)
    
    cb(data or {})
end)

RegisterNUICallback('getGarage', function(data, cb)
    local data = exports['cc_core']:getVehicles()

    cb(data or {})
end)

RegisterNUICallback('getGarageWaypoint', function(data, cb)
    local coords = exports['cc_core']:getGarageCoords(data.type, data.status)

    if coords ~= nil then
        SetNewWaypoint(coords.x, coords.y)
    end

    cb()
end)

RegisterNetEvent('cc_phone:sendNotify')
AddEventHandler('cc_phone:sendNotify', function(title, message, type, timeout)
    sendNotify(title, message, type, timeout)
end)

-- Open Phone

RegisterCommand('cc_phone:openPhone', function()
    if canBeUsed and not PhoneData.Locked then
        if PhoneData.Open then
            if not PhoneData.cameraOpen then
                ClosePhone()
            end
        else
            OpenPhone()
        end
    end
end)

RegisterKeyMapping('cc_phone:openPhone', 'Handy öffnen', 'keyboard', Config.DefaultPhoneKey)

local function isPhoneOpen()
    return PhoneData.Open
end

exports('isPhoneOpen', isPhoneOpen)

function round(number, numDec)
    local multi = 10 ^ (numDec or 0)

    return math.floor(number * multi + 0.5) / multi
end