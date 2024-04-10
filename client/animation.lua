phoneProp, phoneModel = 0, GetHashKey('prop_npc_phone')
threadNotStarted = false

local function AnimationLoop()
    if not threadNotStarted then
        threadNotStarted = true
        
        Citizen.CreateThread(function()
            while PhoneData.dict ~= nil and PhoneData.anim do
                local ped = PlayerPedId()
    
                if not IsEntityPlayingAnim(ped, PhoneData.dict, PhoneData.anim, 3) and not PhoneData.cameraOpen then
                    LoadAnimation(PhoneData.dict)
                    TaskPlayAnim(ped, PhoneData.dict, PhoneData.anim, 3.0, 3.0, -1, 50, 0, false, false, false)
                end
                
                SetCurrentPedWeapon(ped, GetHashKey('WEAPON_UNARMED'), true)

                Citizen.Wait(500)
            end
        end) 
    end
end

function newPhoneProp()
    deletePhone()
    
    RequestModel(phoneModel)
    
    while not HasModelLoaded(phoneModel) do
        Citizen.Wait(1)
    end

    phoneProp = CreateObject(phoneModel, 1.0, 1.0, 1.0, 1, 1, 0)

    local ped = PlayerPedId()
    local bone = GetPedBoneIndex(ped, 28422)
	local isUnarmed = GetCurrentPedWeapon(ped, "WEAPON_UNARMED")

	if not isUnarmed then
		AttachEntityToEntity(phoneProp, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	else
		SetCurrentPedWeapon(ped, "WEAPON_UNARMED", true)
		AttachEntityToEntity(phoneProp, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	end
end

function DoPhoneAnimation(animation)
    local ped = PlayerPedId()
    local dict = "cellphone@"
    local anim = animation

    if IsPedInAnyVehicle(ped, false) then
        dict = "anim@cellphone@in_car@ps"
    end

    LoadAnimation(dict)
    TaskPlayAnim(ped, dict, anim, 3.0, 3.0, -1, 50, 0, false, false, false)

    PhoneData.dict = dict
    PhoneData.anim = anim

    AnimationLoop()
end

function DoPhoneShit()
    DoPhoneAnimation('cellphone_text_out')
end

function deletePhone()
    if phoneProp ~= 0 then
		DeleteEntity(phoneProp)
        phoneProp = 0
    end
end

function LoadAnimation(dict)
    RequestAnimDict(dict)

    while not HasAnimDictLoaded(dict) do
        Citizen.Wait(0)
    end
end