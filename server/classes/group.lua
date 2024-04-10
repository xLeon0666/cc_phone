function CreateGroup(id, owner, name, avatar, members, messages)
    local self = {}
	local timeoutCallbacks = {}

    self.id = id
    self.owner = owner
    self.name = name
    self.avatar = avatar
    self.members = json.decode(members) or {}
    self.messages = json.decode(messages) or {}

    self.getId = function()
        return self.id
    end

    self.getName = function()
        return self.name
    end

    self.setName = function(name)
        self.name = name

        self.updateGroup()
    end

    self.getAvatar = function()
        return self.avatar
    end

    self.setAvatar = function(avatar)
        self.avatar = avatar

        self.updateGroup()
    end
    
    self.getOwner = function(owner)
        return self.owner
    end

    self.getMembers = function()
        return self.members
    end

    self.getMessages = function()
        return self.messages
    end

    self.addMessage = function(number, msg, date, type, coords)
        table.insert(self.messages, {
            msg = msg,
            date = date,
            type = type,
            number = number,
            coords = coords
        })

        for k, v in pairs(self.members) do
            local id = GetPlayerFromPhone(v.number)

            if Phones[id] ~= nil then
                local myNumber = Phones[id].getNumber()
                local groups = Phones[id].getGroups()
                local contacts = Phones[id].getContacts()
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

                local author = IsNumberInContacts(contacts, number)
    
                if myNumber ~= number then
                    if type == 'ST' then
                        type = 'RT'
                    elseif type == 'SL' then
                        type = 'RL'
                    elseif type == 'SI' then
                        type = 'RI'
                    end
                end
    
                TriggerClientEvent('cc_phone:updateGroupMessages', id, clientGroups) 
                TriggerClientEvent('cc_phone:updateGroupChat', id, self.id, number, type, msg, date, author, coords)
            end
        end
    end

    self.setMessages = function(messages)
        self.messages = messages
    end

    self.addMember = function(number)
        table.insert(self.members, {
            number = number,
            permission = 0
        })

        self.updateGroup()
    end

    self.updateMember = function(index, number, permission)
        self.members[index].permission = permission
        
        self.updateGroup()
    end

    self.removeMember = function(number, isIndex, index)
        if isIndex then
            table.remove(self.members, index)
        else
            for k, v in pairs(self.members) do
                if tonumber(v.number) == tonumber(number) then
                    table.remove(self.members, k)     
                end    
            end
        end
        
        self.updateGroup()
    end

    self.updateGroup = function()
        for i = 1, #timeoutCallbacks, 1 do
			ESX.ClearTimeout(timeoutCallbacks[i])
			timeoutCallbacks[i] = nil
		end

        local timeoutCallback = ESX.SetTimeout(1000 * 60, function()
            MySQL.Async.execute('UPDATE phone_groups SET members = @members, name = @name, avatar = @avatar WHERE id = @id', {
                ['@members'] = json.encode(self.members),
                ['@name'] = self.name,
                ['@avatar'] = self.avatar,
                ['@id'] = self.id
            })
        end)

        table.insert(timeoutCallbacks, timeoutCallback)
    end

    return self
end