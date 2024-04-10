ESX = exports['es_extended']:getSharedObject()
Phones = {}
Groups = {}
avatarUrls = {}
Dispatches = {}
uniqueId = 0

-- Events

business = {}

MySQL.ready(function()
    MySQL.Async.fetchAll('SELECT * FROM jobs', {}, function(result)
        for k, v in pairs(result) do
            local jobName = string.lower(v.name)
            MySQL.Async.fetchAll('SELECT * FROM phone_business WHERE job = @job', {
                ['@job'] = jobName
            }, function(result2)
                for k1, v1 in pairs(result2) do
                    local job = string.lower(v1.job)
                    if job == jobName then
                        business[job] = {
                            name = job,
                            motd = v1.motd,
                            hasapp = v1.hasapp
                        }
                        return
                    end
                end

                local hasapp = true

                if jobName == 'unemployed' then
                    hasapp = false
                end

                business[jobName] = {
                    name = jobName,
                    motd = 'Default MOTD',
                    hasapp = hasapp
                }

                MySQL.Async.execute('INSERT INTO phone_business (job, motd, hasapp) VALUES (@job, @motd, @hasapp)', {
                    ['@job'] = jobName,
                    ['@motd'] = 'Default MOTD',
                    ['hasapp'] = hasapp
                }, function(result)
                end)
            end)
        end
    end)

    local result = MySQL.Sync.fetchAll('SELECT * FROM phone_groups')

    for k, v in pairs(result) do
        local messages = nil

        local result2 = MySQL.Sync.fetchAll('SELECT * FROM phone_group_messages WHERE groupId = @groupId', {
            ['@groupId'] = v.id
        })

        if #result2 ~= 0 then
            messages = {}

            for k1, v1 in pairs(result2) do
                table.insert(messages, {
                    msg = v1.message,
                    date = v1.date,
                    type = v1.type,
                    number = v1.number,
                    coords = { v1.x, v1.y }
                })
            end

            messages = json.encode(messages)
        end

        Groups[v.id] = CreateGroup(v.id, v.owner, v.name, v.avatar, v.members, messages)
    end

    local result2 = MySQL.Sync.fetchAll('SELECT number, avatarurl FROM phone_informations WHERE avatarurl IS NOT NULL')

    for k, v in pairs(result2) do
        avatarUrls[v.number] = v.avatarurl
    end
end)

AddEventHandler('playerDropped', function()
    local playerId = source

    if Phones[playerId] then
        Phones[playerId] = nil 
    end

    for k, v in pairs(Dispatches) do
        if v.playerId == playerId then
            Dispatches[v.uniqueId] = nil
        end
    end
end)

RegisterServerEvent('cc_phone:onJoin')
AddEventHandler('cc_phone:onJoin', function()
    local playerId = source
    Citizen.Wait(2500)

    if not Phones[playerId] then
        Phones[playerId] = {}
        local identifier = ESX.GetPlayerIdentifier(playerId)

        if identifier ~= nil then
            MySQL.Async.fetchAll('SELECT * FROM phones WHERE identifier = @identifier', {
                ["@identifier"] = identifier
            }, function (result)
                if #result ~= 0 then
                    local phone_number = result[1].phone_number
                    local calls, contacts, messages, gallery, groups, notes = nil, nil, nil, nil, nil, ''

                    MySQL.Async.fetchAll('SELECT id, target, date FROM phone_calls WHERE caller = @caller ORDER BY id DESC LIMIT 250', {
                        ['@caller'] = phone_number
                    }, function(result2)
                        if #result2 ~= 0 then
                            calls = {}

                            for k, v in pairs(result2) do
                                table.insert(calls, {
                                    id = v.id,
                                    number = v.target,
                                    date = v.date
                                })
                            end

                            calls = json.encode(calls)
                        end
                        
                        MySQL.Async.fetchAll('SELECT * FROM phone_contacts WHERE user = @number', {
                            ['@number'] = phone_number
                        }, function(result3)
                            if #result3 ~= 0 then
                                contacts = {}

                                for k, v in pairs(result3) do
                                    table.insert(contacts, {
                                        id = v.id,
                                        name = v.name,
                                        number = v.number,
                                        favorite = v.favorite
                                    })
                                end

                                contacts = json.encode(contacts)
                            end

                            MySQL.Async.fetchAll('SELECT * FROM phone_messages WHERE identifier = @number', {
                                ['@number'] = phone_number
                            }, function(result4)
                                if #result4 ~= 0 then
                                    messages = {}

                                    for k, v in pairs(result4) do
                                        if messages[v.index] then
                                            table.insert(messages[v.index], {
                                                number = v.number,
                                                msg = v.message,
                                                date = v.date,
                                                type = v.type,
                                                coords = { v.x, v.y }
                                            })
                                        else
                                            messages[v.index] = {{
                                                number = v.number,
                                                msg = v.message,
                                                date = v.date,
                                                type = v.type,
                                                coords = { v.x, v.y }
                                            }}
                                        end
                                    end

                                    messages = json.encode(messages)
                                end

                                MySQL.Async.fetchAll('SELECT * FROM phone_gallery WHERE number = @number', {
                                    ['@number'] = phone_number
                                }, function(result5)
                                    if #result5 ~= 0 then
                                        gallery = {}

                                        for k, v in pairs(result5) do
                                            table.insert(gallery, {
                                                id = v.id,
                                                link = v.link,
                                                date = v.date
                                            })
                                        end
                                    
                                        gallery = json.encode(gallery) 
                                    end

                                    MySQL.Async.fetchAll('SELECT * FROM phone_informations WHERE number = @number', {
                                        ['@number'] = phone_number
                                    }, function(result6)
                                        if #result6 ~= 0 then
                                            notes = result6[1].notes
                                        end

                                        MySQL.Async.fetchAll('SELECT groupId FROM phone_group_members WHERE user = @user', {
                                            ['@user'] = phone_number
                                        }, function(result6)
                                            if #result6 ~= 0 then
                                                groups = {}

                                                for k, v in pairs(result6) do
                                                    table.insert(groups, {
                                                        groupId = v.groupId,
                                                        permission = 0
                                                    })
                                                end

                                                groups = json.encode(groups)
                                            end

                                            Phones[playerId] = CreatePhone(playerId, identifier, phone_number, contacts, messages, calls, gallery, groups, notes)
                                            ESX.GetPlayerFromId(playerId).set('phone_number', phone_number)
                                            TriggerClientEvent('cc_phone:getBusinessInformation', playerId, business, ESX.GetPlayerRPName(playerId), phone_number)
                                        end)
                                    end)
                                end)
                            end)
                        end)
                    end)
                else
                    local number = GenerateNumber()
    
                    MySQL.Async.fetchAll('SELECT phone_number FROM phones WHERE phone_number = @phone_number', {
                        ['@phone_number'] = number
                    }, function(result)
                        if #result == 0 then
                            MySQL.Async.execute('INSERT INTO phones (identifier, phone_number) VALUES (@identifier, @phone_number)', {
                                ['@identifier'] = identifier,
                                ['@phone_number'] = number
                            }, function(row)
                                Phones[playerId] = CreatePhone(playerId, identifier, number, nil, nil, nil, nil, nil, '')
                                ESX.GetPlayerFromId(playerId).set('phone_number', number)
                                TriggerClientEvent('cc_phone:getBusinessInformation', playerId, business, ESX.GetPlayerRPName(playerId), number)
                            end)
                        else
                            Phones[playerId] = nil
                            TriggerEvent('cc_phone:generateNumber', playerId)
                        end
                    end)
                end
            end)
        end
    end
end)

AddEventHandler('cc_phone:generateNumber', function(playerId)
    Citizen.Wait(2500)

    if not Phones[playerId] then
        local identifier = ESX.GetPlayerIdentifier(playerId)

        if identifier ~= nil then
            local number = GenerateNumber()
    
            MySQL.Async.fetchAll('SELECT phone_number FROM phones WHERE phone_number = @phone_number', {
                ['@phone_number'] = number
            }, function(result)
                if #result == 0 then
                    MySQL.Async.execute('INSERT INTO phones (identifier, phone_number) VALUES (@identifier, @phone_number)', {
                        ['@identifier'] = identifier,
                        ['@phone_number'] = number
                    }, function(row)
                        Phones[playerId] = CreatePhone(playerId, identifier, number, nil, nil, nil, nil, nil, '')
                        ESX.GetPlayerFromId(playerId).set('phone_number', number)
                        TriggerClientEvent('cc_phone:getBusinessInformation', playerId, business, ESX.GetPlayerRPName(playerId), number)
                    end)
                else
                    Phones[playerId] = nil
                    TriggerEvent('cc_phone:generateNumber', playerId)
                end
            end)
        else
            Phones[playerId] = nil
        end
    end
end)

-- Apps

-- Settings

Events.RegisterServerEvent('cc_phone:getSettings', function(source)
    local settings = {
        phone_number = Phones[source].number,
        flightmode = Phones[source].getFlightmode(),
        darkmode = false,
        avatar = avatarUrls[tonumber(Phones[source].getNumber())] or 'default'
    }

    return settings
end)

Events.RegisterServerEvent('cc_phone:setFlightmode', function(source)
    if Phones[source].getFlightmode() then
        Phones[source].setFlightmode(false)
        return false
    else
        Phones[source].setFlightmode(true)
        return true
    end
end)

Events.RegisterServerEvent('cc_phone:setAvatar', function(source, avatar)
    if Phones[source] ~= nil then
        local number = Phones[source].getNumber()

        avatarUrls[tonumber(number)] = avatar

        MySQL.Async.execute('UPDATE phone_informations SET avatarurl = @avatar WHERE number = @number', {
            ['@avatar'] = avatar,
            ['@number'] = number
        }, function(result)
            if result == 0 then
                MySQL.Async.insert('INSERT INTO phone_informations (number, notes, avatarurl) VALUES (@number, @notes, @avatarurl)', {
                    ['@number'] = number,
                    ['@notes'] = nil,
                    ['@avatarurl'] = avatar
                })
            end
        end)
    end 
end)

-- Contacts

Events.RegisterServerEvent('cc_phone:getContacts', function(source)
    local contacts = {}

    for k, v in pairs(Phones[source].getContacts()) do
        table.insert(contacts, {
            id = v.id,
            number = v.number,
            name = v.name,
            favorite = v.favorite,
            avatar = avatarUrls[tonumber(v.number)] or 'default'
        })
    end

    return contacts
end)

Events.RegisterServerEvent('cc_phone:addContact', function(source, number, name, favorite)
    if Phones[source].number == number then
        return Phones[source].getContacts()
    end

    MySQL.Async.insert('INSERT INTO phone_contacts (user, name, number, favorite) VALUES (@user, @name, @number, @favorite)', {
        ['@user'] = Phones[source].number,
        ['@name'] = name,
        ['@number'] = number,
        ['@favorite'] = favorite,
    }, function(insertId)
        Phones[source].addContact(insertId, tonumber(number), name, favorite)
    end)

    return Phones[source].getContacts()
end)

Events.RegisterServerEvent('cc_phone:editContact', function(source, id, index, name, number, favorite)
    Phones[source].editContact(index + 1, name, number, favorite)

    MySQL.Async.execute('UPDATE phone_contacts SET name = @name, number = @number, favorite = @favorite WHERE user = @user AND id = @id', {
        ['@name'] = name,
        ['@number'] = number,
        ['@favorite'] = favorite,
        ['@user'] = Phones[source].number,
        ['@id'] = id
    })

    return Phones[source].getContacts()
end)

Events.RegisterServerEvent('cc_phone:deleteContact', function(source, id, index)
    Phones[source].deleteContact(index + 1)

    MySQL.Async.execute('DELETE FROM phone_contacts WHERE user = @user AND id = @id', {
        ['@user'] = Phones[source].number,
        ['@id'] = id
    })

    return Phones[source].getContacts()
end)

-- Call

Events.RegisterServerEvent('cc_phone:getCalls', function(source)
    local call = Phones[source].getCalls()

    local calls = {}

    for k, v in pairs(call) do
        local index, contactId, isContact = IsNumberInContact(Phones[source].getContacts(), v.number)

        table.insert(calls, {
            id = v.id,
            callIndex = k,
            contactId = contactId,
            index = index,
            name = IsNumberInContacts(Phones[source].getContacts(), v.number),
            number = v.number,
            date = v.date,
            isFav = IsNumberInFav(Phones[source].getContacts(), v.number),
            isContact = isContact
        })
    end

    return calls
end)

Events.RegisterServerEvent('cc_phone:deleteRecent', function(source, id, index)
    Phones[source].deleteRecent(index + 1)

    MySQL.Async.execute('DELETE FROM phone_calls WHERE caller = @caller AND id = @id', {
        ['@caller'] = Phones[source].number,
        ['@id'] = id
    })

    return Phones[source].getCalls()
end)

Events.RegisterServerEvent('cc_phone:attemptCall', function(source, number)
    local phone = GetPlayerPhone(source)
    local target = GetPlayerFromPhone(number)

    if tonumber(phone.number) == tonumber(number) then
        local targetPhone = GetPlayerPhone(target)
        TriggerClientEvent('cc_phone:gettingCall', target, phone.number, IsNumberInContacts(targetPhone.getContacts(), phone.number))
        return 'Du kannst nicht mit dir Selber telefonieren!', false
    end

    phone.addCall(IsNumberInContacts(phone.getContacts(), number), number, os.time(), IsNumberInFav(phone.getContacts(), number), IsNumberInContact(phone.getContacts(), number))

    MySQL.Async.insert('INSERT INTO phone_calls (caller, target, date) VALUES (@caller, @target, @date)', {
        ['@caller'] = phone.number,
        ['@target'] = number,
        ['@date'] = os.time()
    })

    MySQL.Async.insert('INSERT INTO phone_calls (caller, target, date) VALUES (@caller, @target, @date)', {
        ['@caller'] = number,
        ['@target'] = phone.number,
        ['@date'] = os.time()
    })

    if target then
        local targetPhone = GetPlayerPhone(target)

        targetPhone.addCall(IsNumberInContacts(targetPhone.getContacts(), phone.number), phone.number, os.time(), IsNumberInFav(targetPhone.getContacts(), phone.number), IsNumberInContact(targetPhone.getContacts(), phone.number))
    end

    if target then
        local targetPhone = GetPlayerPhone(target)
        local itemPhone = ESX.GetPlayerInventoryItem(target, 'phone')
        local count = 0

        if itemPhone ~= nil then
            count = itemPhone.count
        end

        if count >= 1 then
            if targetPhone then
                if not targetPhone.getIsInCall() then
                    if not targetPhone.getFlightmode() then
                        phone.setIsInCall(true)
                        targetPhone.setIsInCall(true)
                        TriggerClientEvent('cc_phone:gettingCall', target, phone.number, IsNumberInContacts(targetPhone.getContacts(), phone.number), 'CC-' .. target)
                        return 'CC-' .. target, true
                    else
                        TriggerClientEvent('cc_phone:declineCall', source)
                        return 'Diese Person hat Flugmodus aktiviert!', false
                    end
                else
                    TriggerClientEvent('cc_phone:declineCall', source)
                    return 'Diese Person ist derzeit schon am Telefonieren!', false
                end
            else
                TriggerClientEvent('cc_phone:declineCall', source)
                return 'Diese Person ist derzeit nicht Erreichbar!', false
            end 
        else
            TriggerClientEvent('cc_phone:declineCall', source)
            return 'Diese Person ist derzeit nicht Erreichbar!', false
        end
    else
        TriggerClientEvent('cc_phone:declineCall', source)
        return 'Diese Person ist derzeit nicht Erreichbar!', false
    end
end)

Events.RegisterServerEvent('cc_phone:answerCall', function(source, number, callFrequenz)
    local phone = GetPlayerPhone(source)
    local target = GetPlayerFromPhone(number)
    local targetPhone = GetPlayerPhone(target)

    exports['saltychat']:AddPlayerToCall(callFrequenz, source)
    exports['saltychat']:AddPlayerToCall(callFrequenz, target)

    TriggerClientEvent('cc_phone:answerCall', source, number, callFrequenz)
    TriggerClientEvent('cc_phone:answerCall', target, number, callFrequenz)
end)

Events.RegisterServerEvent('cc_phone:declineCall', function(source, number, callFrequenz)
    local phone = GetPlayerPhone(source)
    local target = GetPlayerFromPhone(number)
    local targetPhone = GetPlayerPhone(target)

    TriggerClientEvent('cc_phone:declineCall', source)

    exports['saltychat']:RemovePlayerFromCall(callFrequenz, source)

    if target then
        phone.setIsInCall(false)
        targetPhone.setIsInCall(false)
        TriggerClientEvent('cc_phone:declineCall', target)
        exports['saltychat']:RemovePlayerFromCall(callFrequenz, target)
    end
end)

-- message app

Events.RegisterServerEvent('cc_phone:getChat', function(source, number)
    local messages = Phones[source].getMessages()
    local author, isInContacts = IsNumberInContacts(Phones[source].getContacts(), number)

    return messages[tostring(number)], isInContacts, avatarUrls[tonumber(number)] or 'default'
end)

Events.RegisterServerEvent('cc_phone:getMessages', function(source)
    local phone = GetPlayerPhone(source)

    return FormatMessages(phone)
end)

Events.RegisterServerEvent('cc_phone:sendMessage', function(source, msg, number, type, coords)
    local phone = GetPlayerPhone(source)
    local target = GetPlayerPhone(GetPlayerFromPhone(number))

    if isBlacklistedString(msg) then
        return
    end

    if type == 'SI' then
        if string.find(msg, 'imgur') then
            if string.find(msg, 'png') or string.find(msg, 'jpg') or string.find(msg, 'jpeg') then
            else
                return
            end
        else
            return
        end
    end

    local targetType = ''

    if type == 'ST' then
        targetType = 'RT'
    elseif type == 'SL' then
        targetType = 'RL'
    elseif type == 'SI' then
        targetType = 'RI'
    end

    phone.addMessage(number, msg, type, coords)
    
    local x, y = nil, nil

    if coords ~= nil then
        x, y = coords[1], coords[2]
    end

    MySQL.Async.insert('INSERT INTO phone_messages (`index`, number, message, identifier, type, date, x, y) VALUES (@index, @number, @message, @identifier, @type, @date, @x, @y)', {
        ['@index'] = number,
        ['@number'] = number,
        ['@message'] = msg,
        ['@identifier'] = phone.number,
        ['@type'] = type,
        ['@date'] = os.time(),
        ['@x'] = x,
        ['@y'] = y
    })

    MySQL.Async.insert('INSERT INTO phone_messages (`index`, number, message, identifier, type, date, x, y) VALUES (@index, @number, @message, @identifier, @type, @date, @x, @y)', {
        ['@index'] = phone.number,
        ['@number'] = phone.number,
        ['@message'] = msg,
        ['@identifier'] = number,
        ['@type'] = targetType,
        ['@date'] = os.time(),
        ['@x'] = x,
        ['@y'] = y
    })

    if target then
        local messages = target.getMessages()
        local contacts = target.getContacts()

        if messages[phone.number] then
            table.insert(messages[phone.number], {
                number = phone.number,
                msg = msg,
                date = os.time(),
                type = targetType,
                coords = coords
            })
        else
            messages[phone.number] = {{
                number = phone.number,
                msg = msg,
                date = os.time(),
                type = targetType,
                coords = coords
            }}
        end

        target.setMessages(messages)

        TriggerClientEvent('cc_phone:updateChat', target.source, phone.number, targetType, msg, os.time(), IsNumberInContacts(target.getContacts(), phone.number), coords)
        
        local name = IsNumberInContacts(contacts, phone.number)
        
        TriggerClientEvent('cc_phone:updateMessages', target.source, FormatMessages(target))
    end

    TriggerClientEvent('cc_phone:updateMessages', source, FormatMessages(phone))

    return phone.getMessages()[tostring(number)]
end)

-- Business

Events.RegisterServerEvent('cc_phone:getBusiness', function(source)
    local xPlayers = exports['cc_core']:GetPlayersFix()
    local jobName = ESX.GetPlayerJob(source).name

    local data = {
        members = {},
        onlinemembers = 0,
        motd = ''
    }

    for k, v in pairs(xPlayers) do
        if v.job == jobName then

            local phone = GetPlayerPhone(v.playerId)

            if phone then
                if v.job == jobName then
                    table.insert(data.members, {
                        id = v.playerId,
                        name = v.rpName,
                        job = { grade = v.jobGrade },
                        number = phone.number
                    })
        
                    data.onlinemembers = data.onlinemembers + 1
                end
            end 
        end
    end

    local motd = business[string.lower(jobName)].motd

    if motd ~= nil then
        data.motd = motd
        return data
    else
        data.motd = ''
        return data
    end
end)

Events.RegisterServerEvent('cc_phone:getBusiness2', function(source)
    local xPlayers = exports['cc_core']:GetPlayersFix()
    local playerId = source
    local jobName = ESX.GetPlayerJob3(playerId).name

    local data = {
        members = {},
        onlinemembers = 0,
        motd = ''
    }

    for k, v in pairs(xPlayers) do
        if v.job3 == jobName then

            local phone = GetPlayerPhone(v.playerId)

            if phone then
                if v.job3 == jobName then
                    table.insert(data.members, {
                        id = v.playerId,
                        name = v.rpName,
                        job = { grade = v.job3Grade },
                        number = phone.number
                    })
        
                    data.onlinemembers = data.onlinemembers + 1
                end
            end 
        end
    end

    local motd = business[string.lower(jobName)].motd

    if motd ~= nil then
        data.motd = motd
        return data
    else
        data.motd = ''
        return data
    end
end)

Events.RegisterServerEvent('cc_phone:rankUp', function(source, number, job3)
    local target = GetPlayerFromPhone(number)
    
    if not job3 then
        local job = ESX.GetPlayerJob(source)
        local targetJob = ESX.GetPlayerJob(target)

        local data = {
            can = false,
            message = ''
        }

        if targetJob.grade == tonumber(getMaximumGrade(job.name)) - 1 then
            data.can = false
            data.message = 'Du hast keine Rechte, jemanden weiter zu befördern.'
            return data
        else
            if source == target then
                data.can = false
                data.message = 'Du kannst dich nicht selber befördern!'
                return data
            end

            if targetJob.grade >= job.grade then
                data.can = false
                data.message = 'Du hast keine Rechte, jemanden weiter zu befördern.'
                return data
            end

            if job.grade_name == 'boss' and job.name == targetJob.name then
                data.can = true
                data.message = 'Du hast ' .. ESX.GetPlayerRPName(target) .. ' befördert (' .. targetJob.grade + 1 .. ').'

                ESX.SetPlayerJob(target, targetJob.name, tonumber(targetJob.grade) + 1)

                return data
            else
                data.can = false
                data.message = 'Du hast keine Berechtigung.'
                return data
            end
        end
    else
        local job = ESX.GetPlayerJob3(source)
        local targetJob = ESX.GetPlayerJob3(target)
    
        local data = {
            can = false,
            message = ''
        }
    
        if targetJob.grade == tonumber(getMaximumGrade(job.name)) - 1 then
            data.can = false
            data.message = 'Du hast keine Rechte, jemanden weiter zu befördern.'
            return data
        else
            if source == target then
                data.can = false
                data.message = 'Du kannst dich nicht selber befördern!'
                return data
            end
    
            if targetJob.grade >= job.grade then
                data.can = false
                data.message = 'Du hast keine Rechte, jemanden weiter zu befördern.'
                return data
            end
    
            if job.grade_name == 'boss' and job.name == targetJob.name then
                data.can = true
                data.message = 'Du hast ' .. ESX.GetPlayerRPName(target) .. ' befördert (' .. targetJob.grade + 1 .. ').'
    
                ESX.SetPlayerJob3(target, targetJob.name, tonumber(targetJob.grade) + 1)
    
                return data
            else
                data.can = false
                data.message = 'Du hast keine Berechtigung.'
                return data
            end
        end
    end
end)

Events.RegisterServerEvent('cc_phone:rankDown', function(source, number, job3)
    local target = GetPlayerFromPhone(number)

    if not job3 then
        local job = ESX.GetPlayerJob(source)
        local targetJob = ESX.GetPlayerJob(target)

        local data = {
            can = false,
            message = ''
        }

        if targetJob.grade == 1 then
            data.can = false
            data.message = 'Du hast keine Rechte, jemanden weiter zu degradieren.'
            return data
        else
            if job.grade_name == 'boss' and job.name == targetJob.name then
                if source == target then
                    data.can = false
                    data.message = 'Du kannst dich nicht selber degradieren!'
                    return data
                end

                if targetJob.grade >= job.grade then
                    data.can = false
                    data.message = 'Du hast keine Rechte, jemanden weiter zu degradieren.'
                    return data
                end

                data.can = true
                data.message = 'Du hast ' .. ESX.GetPlayerRPName(target) .. ' runtergestuft (' .. targetJob.grade - 1 .. ').'

                ESX.SetPlayerJob(target, targetJob.name, tonumber(targetJob.grade) - 1)

                return data
            else
                data.can = false
                data.message = 'Du hast keine Berechtigung.'
                return data
            end
        end
    else
        local job = ESX.GetPlayerJob3(source)
        local targetJob = ESX.GetPlayerJob3(target)
    
        local data = {
            can = false,
            message = ''
        }
    
        if targetJob.grade == 1 then
            data.can = false
            data.message = 'Du hast keine Rechte, jemanden weiter zu degradieren.'
            return data
        else
            if job.grade_name == 'boss' and job.name == targetJob.name then
                if source == target then
                    data.can = false
                    data.message = 'Du kannst dich nicht selber degradieren!'
                    return data
                end
    
                if targetJob.grade >= job.grade then
                    data.can = false
                    data.message = 'Du hast keine Rechte, jemanden weiter zu degradieren.'
                    return data
                end
    
                data.can = true
                data.message = 'Du hast ' .. ESX.GetPlayerRPName(target) .. ' runtergestuft (' .. targetJob.grade - 1 .. ').'
    
                ESX.SetPlayerJob3(target, targetJob.name, tonumber(targetJob.grade) - 1)
    
                return data
            else
                data.can = false
                data.message = 'Du hast keine Berechtigung.'
                return data
            end
        end
    end
end)

Events.RegisterServerEvent('cc_phone:kickPlayer', function(source, number, job3)
    local target = GetPlayerFromPhone(number)

    if not job3 then
        local job = ESX.GetPlayerJob(source)
        local targetJob = ESX.GetPlayerJob(target)

        local data = {
            can = false,
            message = ''
        }

        if job.grade_name == 'boss' and job.name == targetJob.name then
            if source == target then
                data.can = false
                data.message = 'Du kannst dich nicht selber feuern!'
                return data
            end

            if targetJob.grade >= job.grade then
                data.can = false
                data.message = 'Du hast keine Rechte, jemanden zu feueren.'
                return data
            end
            
            data.can = true
            data.message = 'Du hast ' .. ESX.GetPlayerRPName(target) .. ' gefeuert.'
            ESX.SetPlayerJob(target, 'unemployed', 0)
            return data
        else
            data.can = false
            data.message = 'Du hast keine Berechtigung.'
            return data
        end
    else
        local job = ESX.GetPlayerJob3(source)
        local targetJob = ESX.GetPlayerJob3(target)
    
        local data = {
            can = false,
            message = ''
        }
    
        if job.grade_name == 'boss' and job.name == targetJob.name then
            if source == target then
                data.can = false
                data.message = 'Du kannst dich nicht selber feuern!'
                return data
            end
    
            if targetJob.grade >= job.grade then
                data.can = false
                data.message = 'Du hast keine Rechte, jemanden zu feueren.'
                return data
            end
            
            data.can = true
            data.message = 'Du hast ' .. ESX.GetPlayerRPName(target) .. ' gefeuert.'
            ESX.SetPlayerJob3(target, 'unemployed', 0)
            return data
        else
            data.can = false
            data.message = 'Du hast keine Berechtigung.'
            return data
        end
    end
end)

RegisterNetEvent('cc_phone:setMOTD')
AddEventHandler('cc_phone:setMOTD', function(text, job3)
    local playerId = source

    if isBlacklistedString(text) then
        return
    end

    if not job3 then
        local job = ESX.GetPlayerJob(playerId).name
        local jobName = string.lower(job)

        business[jobName].motd = text

        MySQL.Async.execute('UPDATE phone_business SET motd = @motd WHERE job = @job', {
            ['@motd'] = text,
            ['@job'] = jobName
        })
    else
        local job = ESX.GetPlayerJob3(playerId).name
        local jobName = string.lower(job)

        business[jobName].motd = text
    
        MySQL.Async.execute('UPDATE phone_business SET motd = @motd WHERE job = @job', {
            ['@motd'] = text,
            ['@job'] = jobName
        })
    end
end)

-- Dispatch

Events.RegisterServerEvent('cc_phone:getDispatchData', function(source, number)
    local name = ESX.GetPlayerJob(source).name

    local data = {
        dispatches = {},
        haveAccess = false
    }

    for k, v in pairs(Config.dispatchJobs) do
        if name == v.name then
            data.haveAccess = true
        end

        table.insert(data.dispatches, {
            name = v.name,
            label = v.label
        })
    end

    return data
end)

local DispatchTimeout = {}

function isInDistance(job, coords)
    for k, v in pairs(Dispatches) do
        if v.job == job then
            local distance = #(v.coords - coords)

            if distance <= 30.0 then
                return true
            end
        end
    end

    return false
end

RegisterNetEvent('cc_phone:sendDispatch')
AddEventHandler('cc_phone:sendDispatch', function(job, desc)
    local playerId = source

    if desc == nil then
        desc = 'tot'
    end

    if isBlacklistedString(desc) then
        return
    end

    if DispatchTimeout[playerId] == nil then
        DispatchTimeout[playerId] = false
    end

    if not DispatchTimeout[playerId] then
        local playerCoords = ESX.GetPlayerCoords(playerId, true)

        -- if isInDistance(job, playerCoords) then
        --     TriggerClientEvent('cc_phone:sendNotify', playerId, 'Dispatch', 'Es ist schon ein Dispatch im Umkreis von 30M offen!', 'info', 4000)
        --     return
        -- end

        DispatchTimeout[playerId] = true

        for k, v in pairs(Config.dispatchJobs) do
            if v.name == job then
                local xPlayers = exports['cc_core']:GetPlayersFix()
                uniqueId = uniqueId + 1
    
                for k1, v1 in pairs(xPlayers) do
                    local zJobName = ESX.GetPlayerJob(v1.playerId).name
    
                    if zJobName == job then
                        local distance = #(playerCoords - ESX.GetPlayerCoords(v1.playerId, true))
                        TriggerClientEvent('cc_phone:sendNotify', v1.playerId, 'Dispatch', 'Es ist ein Notruf eingegangen! Entfernung: ' .. round(distance, 2) .. 'M', 'info', 4000)
                    end
                end

                Dispatches[uniqueId] = {
                    playerId = playerId,
                    job = job,
                    messages = {
                        {
                            msg = 'Location',
                            date = os.time(),
                            type = 'RL',
                            coords = { playerCoords.x, playerCoords.y }
                        },

                        {
                            msg = desc,
                            date = os.time(),
                            type = 'RT'
                        }
                    },

                    rpName = ESX.GetPlayerRPName(playerId),
                    coords = playerCoords,
                    type = 'open'
                }
            end
        end

        Citizen.SetTimeout(60000, function()
            DispatchTimeout[playerId] = false
        end)
    else
        TriggerClientEvent('cc_phone:sendNotify', playerId, 'Dispatch', 'Du kannst kein Dispatch senden derzeit ist kein Cooldown aktiv versuches bitte in 1 minute wieder', 'info', 4000)
    end
end)

Events.RegisterServerEvent('cc_phone:getDispatches', function(source)
    local dispatches = {}
    local jobName = ESX.GetPlayerJob(source).name

    for k, v in pairs(Dispatches) do
        if jobName == v.job then
            table.insert(dispatches, {
                type = v.type
            })
        end
    end

    return dispatches
end)

Events.RegisterServerEvent('cc_phone:getDispatchType', function(source, dispatchType)
    local dispatches = {}
    local jobName = ESX.GetPlayerJob(source).name

    for k, v in pairs(Dispatches) do
        if jobName == v.job then
            if v.type == dispatchType then
                local messages = v.messages
                local lastMessage, lastDate = 'Keine vorhanden'

                if #messages ~= 0 then
                    if messages[#messages] ~= nil then
                        lastMessage = messages[#messages].msg  
                        lastDate = messages[#messages].date
                    end
                end

                local distance = #(v.coords - ESX.GetPlayerCoords(source, true))

                table.insert(dispatches, {
                    uniqueId = k,
                    rpName = v.rpName .. ' - ' .. round(distance, 2) .. 'm',
                    playerId = v.playerId,
                    job = v.job,
                    lastMessage = lastMessage,
                    lastDate = lastDate,
                    coords = { v.coords.x, v.coords.y }
                })
            end
        end
    end

    return dispatches
end)

Events.RegisterServerEvent('cc_phone:getDispatchChat', function(source, uniqueId)
    uniqueId = tonumber(uniqueId)
    local jobName = ESX.GetPlayerJob(source).name

    if Dispatches[uniqueId] ~= nil then
        if Dispatches[uniqueId].job == jobName then
            local dispatchReason = Dispatches[uniqueId].reason
            return Dispatches[uniqueId].messages, dispatchReason
        end
    end
end)

Events.RegisterServerEvent('cc_phone:acceptDispatch', function(source, job, uniqueId, playerId, dType)
    uniqueId = tonumber(uniqueId)

    if ESX.GetPlayerJob(source).name == job then
        if Dispatches[uniqueId] ~= nil then
            if Dispatches[uniqueId].job == job then
                if dType ~= 'delete' then    
                    Dispatches[uniqueId].type = dType
                end

                local target = Dispatches[uniqueId].playerId

                if dType == 'accept' then
                    TriggerClientEvent('cc_phone:sendNotify', target, 'Handy - Dispatch', 'Dein Dispatch wurde angenommen!', 'info', 4000)
                    TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch angenommen!', 'info', 4000)
                    Dispatches[uniqueId].reason = 'Dispatch wurde angenommen von ' .. ESX.GetPlayerRPName(source)
                elseif dType == 'decline' then
                    TriggerClientEvent('cc_phone:sendNotify', target, 'Handy - Dispatch', 'Dein Dispatch wurde abgelehnt!', 'info', 4000)
                    TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch abgelehnt!', 'info', 4000)
                    Dispatches[uniqueId].reason = 'Dispatch wurde abgelehnt von ' .. ESX.GetPlayerRPName(source)
                elseif dType == 'open' then
                    TriggerClientEvent('cc_phone:sendNotify', target, 'Handy - Dispatch', 'Dein Dispatch wurde wieder eröffnet!', 'info', 4000)
                    TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch wieder eröffnet!', 'info', 4000)
                    Dispatches[uniqueId].reason = nil
                elseif dType == 'close' then
                    TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch geschlossen!', 'info', 4000)
                    Dispatches[uniqueId].reason = 'Dispatch wurde geschlossen von ' .. ESX.GetPlayerRPName(source)
                elseif dType == 'delete' then
                    if ESX.GetPlayerJob(source).grade_name == 'boss' then
                        Dispatches[uniqueId] = nil
                        TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch gelöscht!', 'info', 4000) 
                    else
                        TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast keine Bereichtungen Dispatches zu löschen!', 'info', 4000) 
                    end
                end
            end
        end
    end
end)

Events.RegisterServerEvent('cc_phone:declineDispatch', function(source, job, uniqueId, playerId, dType)
    uniqueId = tonumber(uniqueId)
    
    if ESX.GetPlayerJob(source).name == job then
        if Dispatches[uniqueId] ~= nil then
            if Dispatches[uniqueId].job == job then
                if dType ~= 'delete' then    
                    Dispatches[uniqueId].type = dType
                end
                
                local target = Dispatches[uniqueId].playerId

                if dType == 'accept' then
                    TriggerClientEvent('cc_phone:sendNotify', target, 'Handy - Dispatch', 'Dein Dispatch wurde angenommen!', 'info', 4000)
                    TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch angenommen!', 'info', 4000)
                    Dispatches[uniqueId].reason = 'Dispatch wurde abgenommen von ' .. ESX.GetPlayerRPName(source)
                elseif dType == 'decline' then
                    TriggerClientEvent('cc_phone:sendNotify', target, 'Handy - Dispatch', 'Dein Dispatch wurde abgelehnt!', 'info', 4000)
                    TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch abgelehnt!', 'info', 4000)
                    Dispatches[uniqueId].reason = 'Dispatch wurde abgelehnt von ' .. ESX.GetPlayerRPName(source)
                elseif dType == 'open' then
                    TriggerClientEvent('cc_phone:sendNotify', target, 'Handy - Dispatch', 'Dein Dispatch wurde wieder eröffnet!', 'info', 4000)
                    TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch wieder eröffnet!', 'info', 4000)
                    Dispatches[uniqueId].reason = nil
                elseif dType == 'close' then
                    TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch geschlossen!', 'info', 4000)
                    Dispatches[uniqueId].reason = 'Dispatch wurde geschlossen von ' .. ESX.GetPlayerRPName(source)
                elseif dType == 'delete' then
                    if ESX.GetPlayerJob(source).grade_name == 'boss' then
                        Dispatches[uniqueId] = nil
                        TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast ein Dispatch gelöscht!', 'info', 4000) 
                    else
                        TriggerClientEvent('cc_phone:sendNotify', source, 'Handy - Dispatch', 'Du hast keine Bereichtungen Dispatches zu löschen!', 'info', 4000) 
                    end
                end
            end
        end
    end
end)

-- Group

Events.RegisterServerEvent('cc_phone:getGroups', function(source)
    if Phones[source] ~= nil then
        local groups = Phones[source].getGroups()
        local clientGroups = {}

        for k, v in pairs(groups) do
            local messages = Groups[v.groupId].getMessages()
            local length = #messages
            local lastMessage, lastDate = 'Keine Nachrichten vorhanden!', 0

            if length ~= 0 then
                lastMessage = messages[length].msg
                lastDate = messages[length].date
            end

            table.insert(clientGroups, {
                id = v.groupId,
                name = Groups[v.groupId].getName(),
                msg = lastMessage,
                date = lastDate,
                avatar = Groups[v.groupId].getAvatar() or 'default'
            })
        end

        return clientGroups
    end
end)

Events.RegisterServerEvent('cc_phone:getGroupData', function(source, groupId)
    groupId = tonumber(groupId)

    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            local number = Phones[source].getNumber()
            local groupMembers = Groups[groupId].getMembers()
            local contacts = Phones[source].getContacts()
            local members = {}

            for k, v in pairs(groupMembers) do
                local name = 'Ich'

                if tonumber(v.number) ~= tonumber(number) then
                    name = IsNumberInContacts(contacts, v.number)
                end

                table.insert(members, {
                    number = v.number,
                    name = name,
                    permission = v.permission,
                    avatar = avatarUrls[tonumber(v.number)] or 'default'
                })
            end

            return members, Groups[groupId].getName(), Groups[groupId].getAvatar() or 'default'
        end
    end
end)

Events.RegisterServerEvent('cc_phone:changeGroupAvatar', function(source, groupId, avatar)
    groupId = tonumber(groupId)
    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            Groups[groupId].setAvatar(avatar)
        end
    end
end)

Events.RegisterServerEvent('cc_phone:getGroupChat', function(source, groupId)
    groupId = tonumber(groupId)
    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            return FormatGroupMessages(Phones[source].getNumber(), Phones[source].getContacts(), Groups[groupId].getMessages()), havePermissions(Groups[groupId].getMembers(), Groups[groupId].getOwner(), Phones[source].getNumber()), Groups[groupId].getAvatar() or 'default'
        end
    end
end)

Events.RegisterServerEvent('cc_phone:sendGroupMessage', function(source, groupId, msg, type, coords)
    groupId = tonumber(groupId)
    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            if isBlacklistedString(msg) then
                return
            end
        
            if type == 'SI' then
                if string.find(msg, 'imgur') then
                    if string.find(msg, 'png') or string.find(msg, 'jpg') or string.find(msg, 'jpeg') then
                    else
                        return
                    end
                else
                    return
                end
            end

            local x, y = nil, nil
            local number = Phones[source].number

            if coords ~= nil then
                x, y = coords[1], coords[2]
            end

            local time = os.time()

            MySQL.Async.insert('INSERT INTO phone_group_messages (groupId, number, message, type, date, x, y) VALUES (@groupId, @number, @message, @type, @date, @x, @y)', {
                ['@groupId'] = groupId,
                ['@number'] = number,
                ['@message'] = msg,
                ['@type'] = type,
                ['@date'] = time,
                ['@x'] = x,
                ['@y'] = y
            })

            Groups[groupId].addMessage(tonumber(number), msg, time, type, coords)

            
        end
    end
end)

Events.RegisterServerEvent('cc_phone:createGroup', function(source, name, members)
    if Phones[source] ~= nil then
        local number = Phones[source].getNumber()
        
        for k, v in pairs(members) do
            if tonumber(v.number) == tonumber(number) then
                table.remove(members, k)
            end
        end

        table.insert(members, {
            number = number,
            permission = 2
        })

        local newMembers = json.encode(members)
        local groupId = nil

        MySQL.Async.insert('INSERT INTO phone_groups (owner, name, members) VALUES (@owner, @name, @members)', {
            ['@owner'] = number,
            ['@name'] = name,
            ['@members'] = newMembers
        }, function(insertId)
            Groups[insertId] = CreateGroup(insertId, number, name, nil, newMembers, nil)
            groupId = insertId
        end)

        while groupId == nil do
            Citizen.Wait(50)
        end

        for k, v in pairs(members) do
            local phoneNumber = tonumber(v.number)
            local source = GetPlayerFromPhone(phoneNumber)
            local phone = GetPlayerPhone(source)

            if phone ~= nil then
                phone.addGroup(groupId, v.permission)
            end

            MySQL.Async.insert('INSERT INTO phone_group_members (user, groupId) VALUES (@user, @groupId)', {
                ['@user'] = phoneNumber,
                ['@groupId'] = groupId
            })
        end
    end
end)

Events.RegisterServerEvent('cc_phone:addGroupMember', function(source, groupId, members)
    groupId = tonumber(groupId)

    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            local groupMembers = Groups[groupId].getMembers()
            local number = Phones[source].getNumber()
            local foundNewMembers = {}

            for k, v in pairs(members) do
                if tonumber(v.number) == tonumber(number) then
                    table.remove(members, k)
                end
            end

            for k, v in pairs(groupMembers) do
                for k1, v1 in pairs(members) do
                    if tonumber(v1.number) == tonumber(v.number) then
                        table.remove(members, k1)
                    end
                end
            end

            for k, v in pairs(members) do
                local phoneNumber = tonumber(v.number)
                local source = GetPlayerFromPhone(phoneNumber)
                local phone = GetPlayerPhone(source)

                if phone ~= nil then
                    phone.addGroup(groupId, 0)
                end

                Groups[groupId].addMember(phoneNumber)
    
                MySQL.Async.insert('INSERT INTO phone_group_members (user, groupId) VALUES (@user, @groupId)', {
                    ['@user'] = phoneNumber,
                    ['@groupId'] = groupId
                })
            end
        end
    end
end)

Events.RegisterServerEvent('cc_phone:deleteGroup', function(source, groupId)
    groupId = tonumber(groupId)

    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            local number = Phones[source].getNumber()
            local owner = Groups[groupId].getOwner()

            if tonumber(number) == tonumber(owner) then
                for k, v in pairs(Groups[groupId].getMembers()) do
                    local source = GetPlayerFromPhone(v.number)
                    local phone = GetPlayerPhone(source)

                    if phone ~= nil then
                        phone.removeGroup(groupId)
                    end
                end

                Groups[groupId] = nil

                MySQL.Async.execute('DELETE FROM phone_group_members WHERE groupId = @groupId', {
                    ['@groupId'] = groupId
                })

                MySQL.Async.execute('DELETE FROM phone_group_messages WHERE groupId = @groupId', {
                    ['@groupId'] = groupId
                })

                MySQL.Async.execute('DELETE FROM phone_groups WHERE id = @groupId', {
                    ['@groupId'] = groupId
                })
            end
        end
    end
end)

Events.RegisterServerEvent('cc_phone:leaveGroup', function(source, groupId)
    groupId = tonumber(groupId)

    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            local number = Phones[source].getNumber()
            local owner = Groups[groupId].getOwner()

            if tonumber(owner) ~= tonumber(number) then
                Phones[source].removeGroup(groupId)
                Groups[groupId].removeMember(number)
            
                MySQL.Async.execute('DELETE FROM phone_group_members WHERE groupId = @groupId AND user = @user', {
                    ['@groupId'] = groupId,
                    ['@user'] = number
                })
            end
        end
    end
end)

Events.RegisterServerEvent('cc_phone:setGroupAdmin', function(source, groupId, memberIndex, permission)
    groupId = tonumber(groupId)

    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            local number = Phones[source].getNumber()
            local owner = Groups[groupId].getOwner()

            if tonumber(owner) == tonumber(number) then
                Groups[groupId].updateMember(memberIndex + 1, nil, permission)
            end
        end
    end
end)

Events.RegisterServerEvent('cc_phone:kickGroup', function(source, groupId, memberIndex, memberNumber)
    groupId = tonumber(groupId)

    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            local number = Phones[source].getNumber()
            local owner = Groups[groupId].getOwner()

            if tonumber(owner) == tonumber(number) then
                Groups[groupId].removeMember(nil, true, memberIndex + 1)
                
                local targetSource = GetPlayerFromPhone(memberNumber)
                local phone = GetPlayerPhone(targetSource)

                if phone ~= nil then
                    phone.removeGroup(groupId)
                
                    MySQL.Async.execute('DELETE FROM phone_group_members WHERE groupId = @groupId AND user = @user', {
                        ['@groupId'] = groupId,
                        ['@user'] = phone.number
                    })
                end
            end
        end
    end
end)

Events.RegisterServerEvent('cc_phone:changeGroupName', function(source, groupId, groupName)
    groupId = tonumber(groupId)

    if Phones[source] ~= nil then
        if Groups[groupId] ~= nil then
            local number = Phones[source].getNumber()
            local owner = Groups[groupId].getOwner()

            if tonumber(owner) == tonumber(number) then
                Groups[groupId].setName(groupName)
            end
        end
    end
end)

-- Camera

Events.RegisterServerEvent('cc_phone:sendPicture', function(source, link)
    if string.find(link, 'imgur') then
        if string.find(link, 'png') or string.find(link, 'jpg') or string.find(link, 'jpeg') then
            MySQL.Async.insert('INSERT INTO phone_gallery (number, link, date) VALUES (@number, @link, @date)', {
                ['@number'] = Phones[source].getNumber(),
                ['@link'] = link,
                ['@date'] = os.time()
            }, function(insertId)
                Phones[source].addImage(insertId, link, os.time())
            end)
        end
    end
end)

Events.RegisterServerEvent('cc_phone:getGallery', function(source)
    return Phones[source].getGallery()
end)

Events.RegisterServerEvent('cc_phone:deletePicture', function(source, index, id)
    Phones[source].removeImage(index)

    MySQL.Async.execute('DELETE FROM phone_gallery WHERE id = @id AND number = @number', {
        ['@id'] = id,
        ['@number'] = Phones[source].number
    })
end)

-- Notes

Events.RegisterServerEvent('cc_phone:getNotes', function(source)
    return Phones[source].getNotes()
end)

Events.RegisterServerEvent('cc_phone:saveNotes', function(source, notes)
    if Phones[source] ~= nil then
        local number = Phones[source].getNumber()

        MySQL.Async.execute('UPDATE phone_informations SET notes = @notes WHERE number = @number', {
            ['@notes'] = notes,
            ['@number'] = number
        }, function(result)
            if result == 0 then
                MySQL.Async.insert('INSERT INTO phone_informations (number, notes, avatarurl) VALUES (@number, @notes, @avatarurl)', {
                    ['@number'] = number,
                    ['@notes'] = notes,
                    ['@avatarurl'] = nil
                })
            end
        end)
    
        Phones[source].setNotes(notes)
    
        return 'Notiz gespeichert'
    end
end)

-- Functions

function GetPlayerPhone(source)
    return Phones[source]
end

function GenerateNumber()
    return math.random(111, 999) .. '' .. math.random(111, 999)
end

function GetPlayerFromPhone(number)
    for k, v in pairs(Phones) do 
        if tonumber(v.number) == tonumber(number) then 
            return v.source
        end
    end
end

function IsNumberInContacts(contacts, number)
    local isInContact = false

    for k, v in pairs(contacts) do
        if tonumber(number) == tonumber(v.number) then
            number = v.name
            isInContact = true
        end
    end

    return number, isInContact
end

function IsNumberInContact(contacts, number)
    for k, v in pairs(contacts) do 
        if tonumber(number) == tonumber(v.number) then 
            return k, v.id, true
        end
    end

    return 0, 0, false
end

function IsNumberInFav(contacts, number)
    for k, v in pairs(contacts) do 
        if tonumber(number) == tonumber(v.number) then
            if v.favorite then
                return true
            end
        end
    end

    return false
end

function getMaximumGrade(jobname)
	local result = MySQL.Sync.fetchAll('SELECT * FROM job_grades WHERE job_name = @jobname ORDER BY `grade` DESC ;', {
		['@jobname'] = jobname
	})

	if result[1] ~= nil then
		return result[1].grade
	end

	return nil
end

function FormatMessages(phone)
    if not phone then 
        return 
    end

    local messages = phone.getMessages()
    local contacts = phone.getContacts()

    local msgs = {}

    for k, v in pairs(messages) do
        local author, isIn =  IsNumberInContacts(contacts, k)

        table.insert(msgs, {
            msg = v[#v].msg,
            avatar = avatarUrls[tonumber(k)] or 'default',
            author = author,
            number = k,
            date = v[#v].date
        })
    end

    table.sort(msgs, function(a, b) return tonumber(a.date) > tonumber(b.date) end)

    local formated = {}

    for i = 1, 10 do
        table.insert(formated, msgs[i])
    end

    return formated
end

function FormatGroupChats()
    if not phone then 
        return 
    end

    local messages = phone.getMessages()
    local contacts = phone.getContacts()

    local msgs = {}

    for k, v in pairs(messages) do
        table.insert(msgs, {
            msg = v[#v].msg,
        })
    end

    table.sort(msgs, function(a, b) return tonumber(a.date) > tonumber(b.date) end)

    return msgs
end

function FormatGroupMessages(number, contacts, messages)
    local msgs = {}
    number = tonumber(number)

    for k, v in pairs(messages) do
        local targetType = v.type
        
        if v.number ~= number then
            if v.type == 'ST' then
                targetType = 'RT'
            elseif v.type == 'SL' then
                targetType = 'RL'
            elseif v.type == 'SI' then
                targetType = 'RI'
            end
        end

        table.insert(msgs, {
            msg = v.msg,
            author = IsNumberInContacts(contacts, v.number),
            number = v.number,
            date = v.date,
            type = targetType,
            coords = v.coords
        })
    end

    table.sort(msgs, function(a, b) return tonumber(a.date) < tonumber(b.date) end)

    return msgs
end

function havePermissions(members, owner, number)
    if tonumber(owner) == tonumber(number) then
        return 2
    end

    for k, v in pairs(members) do
        if tonumber(v.number) == tonumber(number) then
            return v.permission
        end
    end

    return 0
end

function isBlacklistedString(input)
    for k, v in pairs(Config.BlacklistedStrings) do
        if string.find(input, v) then
            return true
        end
    end

    return false
end

function round(number, numDec)
    local multi = 10 ^ (numDec or 0)

    return math.floor(number * multi + 0.5) / multi
end

local querys = {}
local queryShit = 0
local queryExecute = 0
local queryId = 0

function insertQuery(type, query, args)
    queryId = queryId + 1

    querys[queryId] = {
        type = type,
        query = query,
        args = args
    }

    executeQuery()
end

function executeQuery()
    if queryShit < 3 and queryId > queryExecute then
        queryExecute = queryExecute + 1
        queryShit = queryShit + 1

        local data = querys[queryExecute]

        if data.type == 'insert' then
            MySQL.Async.insert(data.query, data.args, function()
                queryShit = queryShit - 1

                executeQuery()
            end)
        elseif data.type == 'execute' then
            MySQL.Async.execute(data.query, data.args, function()
                queryShit = queryShit - 1

                executeQuery()
            end)
        end
    end
end