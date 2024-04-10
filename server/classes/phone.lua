function CreatePhone(source, identifier, number, contacts, messages, calls, gallery, groups, notes)
    local self = {}

    self.source = source
    self.identifier = identifier
    self.number = number
    self.contacts = json.decode(contacts) or {}
    self.messages = json.decode(messages) or {}
    self.calls = json.decode(calls) or {}
    self.gallery = json.decode(gallery) or {}
    self.groups = json.decode(groups) or {}
    self.notes = notes or ''
    self.flightmode = false
    self.call = false

    self.getSource = function()
        return self.source
    end

    self.getIdentifier = function()
        return self.identifier
    end

    self.getNumber = function()
        return self.number
    end

    self.getIsInCall = function()
        return self.call
    end

    self.setIsInCall = function(call)
        self.call = call
    end
    
    self.getFlightmode = function()
        return self.flightmode
    end

    self.setFlightmode = function(flightmode)
        self.flightmode = flightmode
    end

    -- getters
    self.getContacts = function()
        return self.contacts
    end

    self.getMessages = function()
        return self.messages
    end

    self.getCalls = function()
        return self.calls
    end

    self.getGallery = function()
        return self.gallery
    end

    self.getGroups = function()
        return self.groups
    end

    -- setters
    self.setMessages = function(messages)
        self.messages = messages
    end

    self.setCalls = function(calls)
        self.calls = calls
    end

    self.addContact = function(id, number, name, favorite)
        table.insert(self.contacts, {
            id = id,
            number = number,
            name = name,
            favorite = favorite
        })
    end

    self.addCall = function(name, number, date, isFav, isContact)
        table.insert(self.calls, {
            number = number,
            date = date
        })
    end

    self.addMessage = function(number, msg, type, coords)
        if self.messages[number] then 
            table.insert(self.messages[number], {
                number = self.number,
                msg = msg,
                date = os.time(),
                type = type,
                coords = coords
            })
        else
            self.messages[number] = {{
                number = self.number,
                msg = msg,
                date = os.time(),
                type = type,
                coords = coords
            }}
        end
    end

    -- edit

    self.editContact = function(index, name, number, favorite)
        local contact = self.contacts[index]
        self.messages[number] = self.messages[contact.number]

        if contact.number ~= number then
        end

        if contact.number ~= number then
            self.messages[contact.number] = nil
        end

        self.contacts[index] = {
            number = number,
            name = name,
            delete = true,
            favorite = favorite
        }
    end

    self.deleteContact = function(i)
        table.remove(self.contacts, i)
    end

    self.deleteRecent = function(i)
        table.remove(self.calls, i)
    end

    self.addImage = function(insertId, link, date)
        table.insert(self.gallery, {
            id = insertId,
            link = link,
            date = date
        })
    end

    self.removeImage = function(k)
        table.remove(self.gallery, k)
    end

    self.getNotes = function()
        return self.notes
    end

    self.setNotes = function(notes)
        self.notes = notes
    end

    self.addGroup = function(groupId, permission)
        table.insert(self.groups, {
            groupId = groupId,
            permission = permission
        })
    end

    self.removeGroup = function(index)
        for k, v in pairs(self.groups) do
            if tonumber(v.groupId) == tonumber(index) then
                table.remove(self.groups, k)
            end
        end
    end

    return self
end